//! Source file viewing and resolution.

use tracing::{
    debug,
    error,
    info,
    instrument,
    warn,
};
use viewer_api::{
    axum::{
        extract::{
            Path,
            Query,
            State,
        },
        http::{
            HeaderMap,
            StatusCode,
        },
        response::Json,
    },
    source::{
        extract_snippet,
        SourceLocation,
    },
};

// Re-export shared utilities so crate-level code can access them
pub use viewer_api::source::detect_language;

use crate::{
    handlers::to_unix_path,
    state::{
        get_session_config,
        increment_source_count,
        AppState,
    },
    types::{
        ErrorResponse,
        SourceQuery,
    },
};

/// Fetch the content of a source file using the configured backend.
///
/// In local mode the file is read from disk.
/// In remote mode it is fetched via HTTP from the raw repository URL.
async fn fetch_content(
    state: &AppState,
    path: &str,
) -> Result<String, (StatusCode, Json<ErrorResponse>)> {
    let location =
        state
            .source_backend
            .resolve_url_or_path(path)
            .map_err(|e| {
                warn!(error = %e, path = %path, "Invalid source path");
                (StatusCode::BAD_REQUEST, Json(ErrorResponse { error: e }))
            })?;

    match location {
        SourceLocation::Path(full_path) => {
            debug!(full_path = %to_unix_path(&full_path), "Reading local source file");
            std::fs::read_to_string(&full_path).map_err(|e| {
                error!(
                    error = %e,
                    path = %to_unix_path(&full_path),
                    "Failed to read source file"
                );
                (
                    StatusCode::NOT_FOUND,
                    Json(ErrorResponse {
                        error: format!("Failed to read source file: {}", e),
                    }),
                )
            })
        },
        SourceLocation::Url(url) => {
            debug!(url = %url, "Fetching remote source file");
            let response = reqwest::get(&url).await.map_err(|e| {
                error!(error = %e, url = %url, "Failed to fetch remote source file");
                (
                    StatusCode::BAD_GATEWAY,
                    Json(ErrorResponse {
                        error: format!("Failed to fetch remote source file: {}", e),
                    }),
                )
            })?;

            if !response.status().is_success() {
                let status = response.status();
                warn!(url = %url, http_status = %status, "Remote source file not found");
                return Err((
                    StatusCode::NOT_FOUND,
                    Json(ErrorResponse {
                        error: format!(
                            "Remote source file not found: {} (HTTP {})",
                            path, status
                        ),
                    }),
                ));
            }

            response.text().await.map_err(|e| {
                error!(error = %e, url = %url, "Failed to read remote source response");
                (
                    StatusCode::BAD_GATEWAY,
                    Json(ErrorResponse {
                        error: format!("Failed to read remote source response: {}", e),
                    }),
                )
            })
        },
    }
}

/// Get full source file content or snippet around a line
#[instrument(skip(state, headers), fields(workspace_root = %to_unix_path(&state.workspace_root)))]
pub async fn get_source(
    State(state): State<AppState>,
    headers: HeaderMap,
    Path(path): Path<String>,
    Query(query): Query<SourceQuery>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    // Get session config for conditional logging
    let session = get_session_config(&state.sessions, &headers);
    let verbose = session.as_ref().map(|s| s.verbose).unwrap_or(false);

    // Track request count for this session
    let request_count = session
        .as_ref()
        .map(|s| increment_source_count(&state.sessions, &s.session_id));

    debug!(path = %path, line = ?query.line, context = query.context, "Getting source file");

    let content = fetch_content(&state, &path).await?;

    let language = detect_language(&path);

    // If line is specified, return a snippet
    if let Some(line) = query.line {
        let (snippet_content, start_line, end_line) =
            extract_snippet(&content, line, query.context);
        let line = line.min(content.lines().count()).max(1);

        // Only log if verbose or first request in session
        if verbose || request_count == Some(1) {
            info!(
                path = %path,
                line = line,
                start = start_line,
                end = end_line,
                language = %language,
                session_request = ?request_count,
                "Returning source snippet"
            );
        } else {
            debug!(
                path = %path,
                line = line,
                start = start_line,
                end = end_line,
                language = %language,
                session_request = ?request_count,
                "Returning source snippet"
            );
        }

        Ok(Json(serde_json::json!({
            "path": path,
            "content": snippet_content,
            "start_line": start_line,
            "end_line": end_line,
            "highlight_line": line,
            "language": language
        })))
    } else {
        // Return full file
        let total_lines = content.lines().count();

        // Only log if verbose or first request in session
        if verbose || request_count == Some(1) {
            info!(
                path = %path,
                total_lines = total_lines,
                language = %language,
                session_request = ?request_count,
                "Returning full source file"
            );
        } else {
            debug!(
                path = %path,
                total_lines = total_lines,
                language = %language,
                session_request = ?request_count,
                "Returning source file"
            );
        }

        Ok(Json(serde_json::json!({
            "path": path,
            "content": content,
            "language": language,
            "total_lines": total_lines
        })))
    }
}
