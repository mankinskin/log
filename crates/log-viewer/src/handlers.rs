//! HTTP request handlers for log operations.

use tracing::{
    debug,
    error,
    info,
    instrument,
    warn,
};
use viewer_api::axum::{
    extract::{
        Path,
        Query,
        State,
    },
    http::{
        header,
        HeaderMap,
        StatusCode,
    },
    response::{
        IntoResponse,
        Json,
    },
};

use crate::{
    log_parser::LogEntry,
    query,
    state::{
        get_session_config,
        AppState,
        SessionConfig,
        SESSION_HEADER,
    },
    types::{
        ErrorResponse,
        JqQuery,
        JqQueryResponse,
        LogContentResponse,
        LogFileInfo,
        SearchQuery,
        SearchResponse,
        SessionConfigUpdate,
    },
};

/// Convert a path to Unix-style string (forward slashes)
pub fn to_unix_path(path: &std::path::Path) -> String {
    path.to_string_lossy().replace('\\', "/")
}

fn is_invalid_filename(name: &str) -> bool {
    name.contains("..") || name.contains('/') || name.contains('\\')
}

fn entry_matches_query(
    entry: &LogEntry,
    regex: &regex::Regex,
    level_filter: Option<&str>,
) -> bool {
    if let Some(filter) = level_filter {
        if !entry.level.eq_ignore_ascii_case(filter) {
            return false;
        }
    }

    regex.is_match(&entry.message)
        || regex.is_match(&entry.raw)
        || regex.is_match(&entry.event_type)
        || regex.is_match(&entry.level)
        || entry
            .span_name
            .as_ref()
            .map(|s| regex.is_match(s))
            .unwrap_or(false)
        || entry
            .file
            .as_ref()
            .map(|f| regex.is_match(f))
            .unwrap_or(false)
        || entry
            .fields
            .iter()
            .any(|(k, v)| regex.is_match(k) || regex.is_match(&v.to_string()))
}

/// Get session configuration
pub async fn get_session(
    State(state): State<AppState>,
    headers: HeaderMap,
) -> Result<Json<SessionConfig>, (StatusCode, Json<ErrorResponse>)> {
    let session_id = headers
        .get(SESSION_HEADER)
        .and_then(|v| v.to_str().ok())
        .ok_or_else(|| {
            (
                StatusCode::BAD_REQUEST,
                Json(ErrorResponse {
                    error: format!("Missing {} header", SESSION_HEADER),
                }),
            )
        })?;

    let config =
        get_session_config(&state.sessions, &headers).unwrap_or_else(|| {
            SessionConfig {
                session_id: session_id.to_string(),
                ..Default::default()
            }
        });

    Ok(Json(config))
}

/// Update session configuration
pub async fn update_session(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(update): Json<SessionConfigUpdate>,
) -> Result<Json<SessionConfig>, (StatusCode, Json<ErrorResponse>)> {
    let session_id = headers
        .get(SESSION_HEADER)
        .and_then(|v| v.to_str().ok())
        .ok_or_else(|| {
            (
                StatusCode::BAD_REQUEST,
                Json(ErrorResponse {
                    error: format!("Missing {} header", SESSION_HEADER),
                }),
            )
        })?;

    // Ensure session exists
    get_session_config(&state.sessions, &headers);

    // Update configuration
    let mut sessions_guard = state.sessions.write().unwrap();
    let config = sessions_guard.get_mut(session_id).ok_or_else(|| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse {
                error: "Session not found after creation".to_string(),
            }),
        )
    })?;

    if let Some(verbose) = update.verbose {
        config.verbose = verbose;
        info!(session_id = %session_id, verbose = verbose, "Session verbosity updated");
    }

    Ok(Json(config.clone()))
}

/// List all available log files
#[instrument(skip(state), fields(log_dir = %to_unix_path(&state.log_dir)))]
pub async fn list_logs(
    State(state): State<AppState>
) -> Result<Json<Vec<LogFileInfo>>, (StatusCode, Json<ErrorResponse>)> {
    debug!("Listing log files");

    // If directory doesn't exist, return empty list
    if !state.log_dir.exists() {
        info!("Log directory does not exist, returning empty list");
        return Ok(Json(Vec::new()));
    }

    let entries = std::fs::read_dir(&state.log_dir).map_err(|e| {
        error!(error = %e, "Failed to read log directory");
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse {
                error: format!("Failed to read log directory: {}", e),
            }),
        )
    })?;

    let mut logs: Vec<LogFileInfo> = Vec::new();
    for entry in entries.flatten() {
        let path = entry.path();
        if path.extension().map_or(false, |ext| ext == "log") {
            let metadata = entry.metadata().ok();
            // Quick scan for markers (check first 64KB for speed)
            let bytes = std::fs::read(&path).unwrap_or_default();
            let scan_len = bytes.len().min(64 * 1024);
            let scan_bytes = &bytes[..scan_len];

            let has_graph_snapshot = scan_bytes
                .windows(b"graph_snapshot".len())
                .any(|w| w == b"graph_snapshot");

            // Scan for op_type markers in graph_op events
            // Support both old (escaped string) and new (raw object) log formats
            let has_search_ops = scan_bytes
                .windows(br#"\"op_type\":\"search\""#.len())
                .any(|w| w == br#"\"op_type\":\"search\""#)
                || scan_bytes
                    .windows(br#""op_type": "search""#.len())
                    .any(|w| w == br#""op_type": "search""#);

            let has_insert_ops = scan_bytes
                .windows(br#"\"op_type\":\"insert\""#.len())
                .any(|w| w == br#"\"op_type\":\"insert\""#)
                || scan_bytes
                    .windows(br#""op_type": "insert""#.len())
                    .any(|w| w == br#""op_type": "insert""#);

            // Detect search path transitions (path_transition field with actual content)
            let has_search_paths = scan_bytes
                .windows(b"path_transition".len())
                .any(|w| w == b"path_transition");

            let file_info = LogFileInfo {
                name: path.file_name().unwrap().to_string_lossy().to_string(),
                size: metadata.as_ref().map_or(0, |m| m.len()),
                modified: metadata.and_then(|m| {
                    m.modified().ok().map(|t| {
                        let datetime: chrono::DateTime<chrono::Utc> = t.into();
                        datetime.format("%Y-%m-%d %H:%M:%S").to_string()
                    })
                }),
                has_graph_snapshot,
                has_search_ops,
                has_insert_ops,
                has_search_paths,
            };
            debug!(file = %file_info.name, size = file_info.size, "Found log file");
            logs.push(file_info);
        }
    }

    // Sort by file name
    logs.sort_by(|a, b| a.name.cmp(&b.name));

    info!(count = logs.len(), "Listed log files");

    Ok(Json(logs))
}

/// Get contents of a specific log file
#[instrument(skip(state), fields(log_dir = %to_unix_path(&state.log_dir)))]
pub async fn get_log(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> Result<Json<LogContentResponse>, (StatusCode, Json<ErrorResponse>)> {
    debug!(file = %name, "Getting log file content");

    // Validate filename (prevent path traversal)
    if is_invalid_filename(&name) {
        warn!(file = %name, "Invalid filename - path traversal attempt");
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Invalid filename".to_string(),
            }),
        ));
    }

    let path = state.log_dir.join(&name);
    debug!(path = %to_unix_path(&path), "Reading log file");

    let content = std::fs::read_to_string(&path).map_err(|e| {
        error!(error = %e, path = %to_unix_path(&path), "Failed to read log file");
        (
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: format!("Failed to read log file: {}", e),
            }),
        )
    })?;

    let content_len = content.len();
    let entries = state.parser.parse(&content);
    let total_lines = content.lines().count();

    info!(
        file = %name,
        entries = entries.len(),
        total_lines = total_lines,
        content_bytes = content_len,
        "Parsed log file"
    );

    Ok(Json(LogContentResponse {
        name,
        entries,
        total_lines,
    }))
}

/// Search within a log file
#[instrument(skip(state), fields(log_dir = %to_unix_path(&state.log_dir)))]
pub async fn search_log(
    State(state): State<AppState>,
    Path(name): Path<String>,
    Query(query): Query<SearchQuery>,
) -> Result<Json<SearchResponse>, (StatusCode, Json<ErrorResponse>)> {
    debug!(file = %name, query = %query.q, level = ?query.level, limit = ?query.limit, "Searching log file");

    // Validate filename
    if is_invalid_filename(&name) {
        warn!(file = %name, "Invalid filename - path traversal attempt");
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Invalid filename".to_string(),
            }),
        ));
    }

    let path = state.log_dir.join(&name);
    let content = std::fs::read_to_string(&path).map_err(|e| {
        error!(error = %e, path = %to_unix_path(&path), "Failed to read log file for search");
        (
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: format!("Failed to read log file: {}", e),
            }),
        )
    })?;

    let entries = state.parser.parse(&content);

    // Build regex for search
    let regex = regex::RegexBuilder::new(&query.q)
        .case_insensitive(true)
        .build()
        .map_err(|e| {
            warn!(error = %e, query = %query.q, "Invalid regex in search query");
            (
                StatusCode::BAD_REQUEST,
                Json(ErrorResponse {
                    error: format!("Invalid regex: {}", e),
                }),
            )
        })?;

    // Filter entries
    let mut matches: Vec<LogEntry> = entries
        .into_iter()
        .filter(|entry| {
            entry_matches_query(entry, &regex, query.level.as_deref())
        })
        .collect();

    let total_matches = matches.len();

    // Apply limit
    if let Some(limit) = query.limit {
        matches.truncate(limit);
    }

    info!(
        file = %name,
        query = %query.q,
        total_matches = total_matches,
        returned = matches.len(),
        "Search completed"
    );

    Ok(Json(SearchResponse {
        query: query.q,
        matches,
        total_matches,
    }))
}

/// Query a log file using JQ filter expressions
#[instrument(skip(state), fields(log_dir = %to_unix_path(&state.log_dir)))]
pub async fn query_log(
    State(state): State<AppState>,
    Path(name): Path<String>,
    Query(params): Query<JqQuery>,
) -> Result<Json<JqQueryResponse>, (StatusCode, Json<ErrorResponse>)> {
    debug!(file = %name, jq = %params.jq, limit = ?params.limit, "JQ query on log file");

    // Validate filename
    if is_invalid_filename(&name) {
        warn!(file = %name, "Invalid filename - path traversal attempt");
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Invalid filename".to_string(),
            }),
        ));
    }

    let path = state.log_dir.join(&name);
    let content = std::fs::read_to_string(&path).map_err(|e| {
        error!(error = %e, path = %to_unix_path(&path), "Failed to read log file for query");
        (
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: format!("Failed to read log file: {}", e),
            }),
        )
    })?;

    let entries = state.parser.parse(&content);

    // Compile the JQ filter
    let filter = query::JqFilter::compile(&params.jq).map_err(|e| {
        warn!(error = %e.message, jq = %params.jq, "Invalid JQ query");
        (
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: format!("Invalid JQ query: {}", e.message),
            }),
        )
    })?;

    // Filter entries using JQ
    let mut matches: Vec<LogEntry> = entries
        .into_iter()
        .filter(|entry| {
            let json = serde_json::to_value(entry).ok();
            match json {
                Some(val) => filter.matches(&val),
                None => false,
            }
        })
        .collect();

    let total_matches = matches.len();

    // Apply limit
    if let Some(limit) = params.limit {
        matches.truncate(limit);
    }

    info!(
        file = %name,
        jq = %params.jq,
        total_matches = total_matches,
        returned = matches.len(),
        "JQ query completed"
    );

    Ok(Json(JqQueryResponse {
        query: params.jq,
        matches,
        total_matches,
    }))
}

/// Get function signatures for a log file
///
/// Returns a JSON object mapping function names to their parsed fn_sig objects.
/// The signatures are generated alongside log files in `target/debug_signatures/`.
/// Response is cached with a long max-age since signatures don't change for a given log file.
#[instrument(skip(state), fields(signatures_dir = %to_unix_path(&state.signatures_dir)))]
pub async fn get_signatures(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> Result<impl IntoResponse, (StatusCode, Json<ErrorResponse>)> {
    debug!(file = %name, "Getting signatures for log file");

    // Validate filename (prevent path traversal)
    if name.contains("..") || name.contains('/') || name.contains('\\') {
        warn!(file = %name, "Invalid filename - path traversal attempt");
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Invalid filename".to_string(),
            }),
        ));
    }

    // Replace .log extension with .json for the signatures file
    let sig_name = if name.ends_with(".log") {
        format!("{}.json", &name[..name.len() - 4])
    } else {
        format!("{}.json", name)
    };

    let path = state.signatures_dir.join(&sig_name);
    debug!(path = %to_unix_path(&path), "Reading signatures file");

    let content = std::fs::read_to_string(&path).map_err(|e| {
        // Return empty object if no signatures file exists (not an error)
        debug!(error = %e, path = %to_unix_path(&path), "No signatures file found, returning empty");
        (
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: format!("No signatures file found for: {}", name),
            }),
        )
    })?;

    info!(file = %sig_name, bytes = content.len(), "Served signatures file");

    // Return with cache headers - signatures don't change for a given log file
    Ok((
        [
            (header::CONTENT_TYPE, "application/json"),
            (header::CACHE_CONTROL, "public, max-age=86400, immutable"),
        ],
        content,
    ))
}
