//! Log Viewer HTTP Server and MCP Server
//!
//! Serves a web interface for viewing and querying tracing logs.
//!
//! # HTTP Endpoints
//! - GET /api/logs - List available log files
//! - GET /api/logs/:name - Get log file content
//! - GET /api/search/:name?q=query - Search within a log file
//! - GET /api/source/*path - Get source file content
//! - Static files served from /static
//!
//! # MCP Server
//! Run with `--mcp` flag to start the MCP server on stdio for agent integration.
//! The MCP server provides tools for querying logs using JQ syntax.
//!
//! # Frontend Modes
//! - **Auto (default):** Uses Vite dev server with hot reload if no pre-built
//!   `static/index.html` exists; otherwise serves static files.
//! - `--dev` — Force Vite dev server (hot reload).
//! - `--static` — Force serving pre-built static files.
//!
//! # Configuration
//!
//! Config file search order:
//! 1. Path in `LOG_VIEWER_CONFIG` environment variable
//! 2. `./log-viewer.toml` (current directory)
//! 3. `./config/log-viewer.toml` (config subdirectory)
//! 4. `<CARGO_MANIFEST_DIR>/log-viewer.toml`
//! 5. `~/.config/log-viewer/config.toml` (user config directory)
//!
//! # Environment Variables (override config file values)
//! - `LOG_DIR` - Directory containing log files (default: target/test-logs)
//! - `WORKSPACE_ROOT` - Workspace root for source file resolution
//! - `LOG_LEVEL` - Logging level: trace, debug, info, warn, error (default: info)
//! - `LOG_FILE` - Enable file logging to logs/log-viewer.log

mod config;
mod handlers;
mod log_parser;
mod mcp_server;
mod query;
mod router;
mod source;
mod state;
mod types;

use config::Config;
use std::{
    env,
    fs,
    net::SocketAddr,
    path::Path,
};
use viewer_api::{
    display_host,
    init_tracing_full,
    tracing::info,
    TracingConfig,
};

use handlers::to_unix_path;
use router::create_router;
use state::create_app_state_from_config;

// Re-export types needed by tests
pub use log_parser::{
    LogEntry,
    LogParser,
};
pub use state::{
    create_app_state,
    AppState,
    SessionConfig,
    SessionStore,
    SourceBackend,
    SESSION_HEADER,
};
pub use types::{
    ErrorResponse,
    JqQuery,
    JqQueryResponse,
    LogContentResponse,
    LogFileInfo,
    SearchQuery,
    SearchResponse,
};

/// Initialize tracing with optional file output
fn init_tracing(config: &Config) {
    let log_dir = config.resolve_server_log_dir();
    let tracing_config = TracingConfig {
        level: config.logging.level.clone(),
        file_logging: config.logging.file_logging,
        log_dir: Some(log_dir),
        log_file_prefix: "log-viewer".to_string(),
    };
    init_tracing_full(&tracing_config);
}

/// Return true only when `dir/index.html` looks like a Vite production build.
///
/// A dev index (`/src/main.tsx`) served by the Rust static server causes the
/// browser to request WGSL files as module scripts, which fails MIME checks.
fn has_built_static_frontend(dir: &Path) -> bool {
    let index_path = dir.join("index.html");
    let Ok(index_html) = fs::read_to_string(index_path) else {
        return false;
    };

    // Built Vite output points at hashed /assets bundles.
    let vite_build = index_html.contains("/assets/index-")
        // Dev index should never be served in static mode.
        && !index_html.contains("/src/main.tsx");

    // Built Trunk output includes wasm bootstrap and generated wasm artifact.
    let trunk_build = index_html.contains("_bg.wasm")
        && (index_html.contains("import init")
            || index_html.contains("TrunkApplicationStarted"));

    vite_build || trunk_build
}

#[tokio::main]
async fn main() {
    // Check for --mcp, --dev, and --static flags
    let args: Vec<String> = env::args().collect();
    let mcp_mode = args.iter().any(|arg| arg == "--mcp");
    let force_dev = args.iter().any(|arg| arg == "--dev");
    let force_static = args.iter().any(|arg| arg == "--static");

    // Load configuration from file and environment
    let config = Config::load();

    let log_dir = config.resolve_log_dir();
    let workspace_root = config.resolve_workspace_root();

    if mcp_mode {
        // MCP-only mode - run stdio server
        if let Err(e) =
            mcp_server::run_mcp_server(log_dir, workspace_root).await
        {
            eprintln!("MCP server error: {}", e);
            std::process::exit(1);
        }
    } else {
        // HTTP server mode (default)
        init_tracing(&config);

        let state = create_app_state_from_config(&config);
        info!(log_dir = %to_unix_path(&state.log_dir), exists = state.log_dir.exists(), "Log directory");
        info!(workspace_root = %to_unix_path(&state.workspace_root), "Workspace root");

        // Determine frontend mode:
        //   --dev          → always use Vite dev server
        //   --static       → always use pre-built static files
        //   (default)      → auto: use static if built, otherwise dev
        let static_dir = config.resolve_static_dir();
        let static_available = has_built_static_frontend(&static_dir);

        if force_static && !static_available {
            eprintln!(
                "--static requested but no built frontend was found in {}. \
Build it with either:\n  (cd memory-viewers/log-viewer/frontend && npx vite build)\n  (cd memory-viewers/log-viewer/frontend/dioxus && trunk build --release)",
                to_unix_path(&static_dir)
            );
            std::process::exit(1);
        }

        let dev_mode = force_dev || (!force_static && !static_available);

        // Frontend serving: dev proxy or static files
        let vite_port = config.server.vite_port;
        let _dev_server; // held alive for the lifetime of the server
        let frontend_mode;

        if dev_mode {
            let frontend_dir = config.resolve_frontend_dir();
            info!(frontend_dir = %to_unix_path(&frontend_dir), port = vite_port, "Starting Vite dev server (hot reload enabled)");

            match viewer_api::dev_proxy::DevServer::start(
                &frontend_dir,
                vite_port,
            )
            .await
            {
                Ok(server) => {
                    _dev_server = Some(server);
                    frontend_mode = router::FrontendMode::DevProxy(vite_port);
                },
                Err(e) => {
                    eprintln!("Failed to start Vite dev server: {}", e);
                    std::process::exit(1);
                },
            }
        } else {
            _dev_server = None;
            info!(static_dir = %to_unix_path(&static_dir), "Serving pre-built frontend");
            frontend_mode = router::FrontendMode::Static(static_dir);
        }

        let app = create_router(state, frontend_mode);

        // Bind to address from config
        let addr: SocketAddr =
            format!("{}:{}", config.server.host, config.server.port)
                .parse()
                .expect("Invalid server address in config");
        let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
        // Single-line URL log so VS Code's `serverReadyAction` regex can
        // capture it. Keep the exact "Listening on http://..." prefix — the
        // launch.json pattern matches on it across all viewers.
        info!(
            "Listening on http://{}:{}",
            display_host(&config.server.host),
            config.server.port
        );
        viewer_api::axum::serve(listener, app)
            .with_graceful_shutdown(viewer_api::shutdown_signal())
            .await
            .unwrap();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum_test::TestServer;
    use source::detect_language;
    use std::{
        collections::HashMap,
        fs,
        path::PathBuf,
        sync::{
            Arc,
            RwLock,
        },
    };
    use tempfile::TempDir;
    use viewer_api::source::resolve_source_path;

    /// Create a test app with a temporary log directory
    fn create_test_app() -> (TestServer, TempDir, TempDir) {
        let log_dir = TempDir::new().unwrap();
        let workspace_dir = TempDir::new().unwrap();

        let state = AppState {
            log_dir: log_dir.path().to_path_buf(),
            signatures_dir: log_dir
                .path()
                .parent()
                .unwrap_or(log_dir.path())
                .join("debug_signatures"),
            workspace_root: workspace_dir.path().to_path_buf(),
            parser: Arc::new(LogParser::new()),
            source_backend: SourceBackend::Local {
                workspace_root: workspace_dir.path().to_path_buf(),
            },
            sessions: Arc::new(RwLock::new(HashMap::new())),
        };

        let router = create_router(
            state,
            router::FrontendMode::Static(PathBuf::from("/nonexistent")),
        );
        let server = TestServer::new(router);

        (server, log_dir, workspace_dir)
    }

    /// Helper to create a sample log file
    fn create_log_file(
        dir: &TempDir,
        name: &str,
        content: &str,
    ) {
        let path = dir.path().join(name);
        fs::write(&path, content).unwrap();
    }

    /// Helper to create a sample source file
    fn create_source_file(
        dir: &TempDir,
        path: &str,
        content: &str,
    ) {
        let full_path = dir.path().join(path);
        if let Some(parent) = full_path.parent() {
            fs::create_dir_all(parent).unwrap();
        }
        fs::write(&full_path, content).unwrap();
    }

    #[tokio::test]
    async fn test_list_logs_empty() {
        let (server, _log_dir, _workspace_dir) = create_test_app();

        let response = server.get("/api/logs").await;
        response.assert_status_ok();

        let logs: Vec<LogFileInfo> = response.json();
        assert!(logs.is_empty());
    }

    #[tokio::test]
    async fn test_list_logs_with_files() {
        let (server, log_dir, _workspace_dir) = create_test_app();

        create_log_file(&log_dir, "test1.log", "INFO test message");
        create_log_file(&log_dir, "test2.log", "DEBUG another message");
        // Create a non-log file that should be ignored
        create_log_file(&log_dir, "readme.txt", "not a log");

        let response = server.get("/api/logs").await;
        response.assert_status_ok();

        let logs: Vec<LogFileInfo> = response.json();
        assert_eq!(logs.len(), 2);

        let names: Vec<&str> = logs.iter().map(|l| l.name.as_str()).collect();
        assert!(names.contains(&"test1.log"));
        assert!(names.contains(&"test2.log"));
        assert!(!names.contains(&"readme.txt"));
    }

    #[tokio::test]
    async fn test_get_log_file() {
        let (server, log_dir, _workspace_dir) = create_test_app();

        let log_content = r#"{"timestamp":"2024-01-01T00:00:00Z","level":"INFO","fields":{"message":"enter"},"span":{"name":"test_span"}}
{"timestamp":"2024-01-01T00:00:01Z","level":"DEBUG","fields":{"message":"some debug message"}}
{"timestamp":"2024-01-01T00:00:02Z","level":"INFO","fields":{"message":"close"},"span":{"name":"test_span"}}"#;
        create_log_file(&log_dir, "test.log", log_content);

        let response = server.get("/api/logs/test.log").await;
        response.assert_status_ok();

        let content: LogContentResponse = response.json();
        assert_eq!(content.name, "test.log");
        assert!(!content.entries.is_empty());
    }

    #[tokio::test]
    async fn test_get_log_file_not_found() {
        let (server, _log_dir, _workspace_dir) = create_test_app();

        let response = server.get("/api/logs/nonexistent.log").await;
        response.assert_status_not_found();
    }

    #[tokio::test]
    async fn test_get_log_path_traversal_blocked() {
        let (server, _log_dir, _workspace_dir) = create_test_app();

        // URL-encoded path traversal attempt
        let response = server.get("/api/logs/..%2Fsecret.log").await;
        response.assert_status_bad_request();

        // Backslash in filename
        let response = server.get("/api/logs/foo%5Cbar.log").await;
        response.assert_status_bad_request();
    }

    #[tokio::test]
    async fn test_search_log() {
        let (server, log_dir, _workspace_dir) = create_test_app();

        let log_content = r#"{"timestamp":"2024-01-01T00:00:00Z","level":"INFO","fields":{"message":"hello world"}}
{"timestamp":"2024-01-01T00:00:01Z","level":"DEBUG","fields":{"message":"goodbye world"}}
{"timestamp":"2024-01-01T00:00:02Z","level":"ERROR","fields":{"message":"error occurred"}}"#;
        create_log_file(&log_dir, "test.log", log_content);

        let response = server
            .get("/api/search/test.log")
            .add_query_param("q", "hello")
            .await;
        response.assert_status_ok();

        let result: SearchResponse = response.json();
        assert_eq!(result.query, "hello");
        assert!(result.total_matches > 0);
    }

    #[tokio::test]
    async fn test_search_log_with_level_filter() {
        let (server, log_dir, _workspace_dir) = create_test_app();

        let log_content = r#"{"timestamp":"2024-01-01T00:00:00Z","level":"INFO","fields":{"message":"info message"}}
{"timestamp":"2024-01-01T00:00:01Z","level":"DEBUG","fields":{"message":"debug message"}}
{"timestamp":"2024-01-01T00:00:02Z","level":"ERROR","fields":{"message":"error message"}}"#;
        create_log_file(&log_dir, "test.log", log_content);

        let response = server
            .get("/api/search/test.log")
            .add_query_param("q", "message")
            .add_query_param("level", "ERROR")
            .await;
        response.assert_status_ok();

        let result: SearchResponse = response.json();
        // Should only match ERROR level
        for entry in &result.matches {
            assert_eq!(entry.level, "ERROR");
        }
    }

    #[tokio::test]
    async fn test_search_invalid_regex() {
        let (server, log_dir, _workspace_dir) = create_test_app();

        create_log_file(&log_dir, "test.log", "INFO test");

        // Invalid regex with unclosed bracket
        let response = server
            .get("/api/search/test.log")
            .add_query_param("q", "[invalid")
            .await;
        response.assert_status_bad_request();
    }

    #[tokio::test]
    async fn test_get_source_file() {
        let (server, _log_dir, workspace_dir) = create_test_app();

        let source_content = r#"fn main() {
    println!("Hello, world!");
}
"#;
        create_source_file(&workspace_dir, "src/main.rs", source_content);

        let response = server.get("/api/source/src/main.rs").await;
        response.assert_status_ok();

        let result: serde_json::Value = response.json();
        assert_eq!(result["path"], "src/main.rs");
        assert_eq!(result["language"], "rust");
        assert!(result["content"].as_str().unwrap().contains("println"));
    }

    #[tokio::test]
    async fn test_get_source_snippet() {
        let (server, _log_dir, workspace_dir) = create_test_app();

        let source_content = "line1\nline2\nline3\nline4\nline5\nline6\nline7\nline8\nline9\nline10";
        create_source_file(&workspace_dir, "test.txt", source_content);

        let response = server
            .get("/api/source/test.txt")
            .add_query_param("line", "5")
            .add_query_param("context", "2")
            .await;
        response.assert_status_ok();

        let result: serde_json::Value = response.json();
        assert_eq!(result["highlight_line"], 5);
        assert_eq!(result["start_line"], 3);
        assert_eq!(result["end_line"], 7);
    }

    #[tokio::test]
    async fn test_get_source_path_traversal_blocked() {
        let (server, _log_dir, _workspace_dir) = create_test_app();

        // URL-encoded path traversal attempt
        let response =
            server.get("/api/source/..%2F..%2F..%2Fetc%2Fpasswd").await;
        response.assert_status_bad_request();
    }

    #[tokio::test]
    async fn test_get_source_not_found() {
        let (server, _log_dir, _workspace_dir) = create_test_app();

        let response = server.get("/api/source/nonexistent.rs").await;
        response.assert_status_not_found();
    }

    #[tokio::test]
    async fn test_detect_language() {
        assert_eq!(detect_language("test.rs"), "rust");
        assert_eq!(detect_language("test.ts"), "typescript");
        assert_eq!(detect_language("test.tsx"), "typescript");
        assert_eq!(detect_language("test.js"), "javascript");
        assert_eq!(detect_language("test.json"), "json");
        assert_eq!(detect_language("test.toml"), "toml");
        assert_eq!(detect_language("test.yaml"), "yaml");
        assert_eq!(detect_language("test.yml"), "yaml");
        assert_eq!(detect_language("test.md"), "markdown");
        assert_eq!(detect_language("test.unknown"), "plaintext");
    }

    #[tokio::test]
    async fn test_resolve_source_path_normalization() {
        let workspace = PathBuf::from("/workspace");

        // Forward slashes
        let result = resolve_source_path(&workspace, "src/main.rs");
        assert!(result.is_ok());

        // Backslashes (Windows)
        let result = resolve_source_path(&workspace, "src\\main.rs");
        assert!(result.is_ok());

        // Leading slashes removed
        let result = resolve_source_path(&workspace, "/src/main.rs");
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_resolve_source_path_traversal_blocked() {
        let workspace = PathBuf::from("/workspace");

        let result = resolve_source_path(&workspace, "../etc/passwd");
        assert!(result.is_err());

        let result = resolve_source_path(&workspace, "src/../../../etc/passwd");
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_query_log_jq() {
        let (server, log_dir, _workspace_dir) = create_test_app();

        // Create test log file with multiple entries (message inside fields)
        let log_content = r#"{"timestamp":"0.001","level":"INFO","fields":{"message":"test info 1","target":"test"}}
{"timestamp":"0.002","level":"ERROR","fields":{"message":"test error","target":"test"}}
{"timestamp":"0.003","level":"INFO","fields":{"message":"test info 2","target":"test"}}"#;
        create_log_file(&log_dir, "test.log", log_content);

        // Filter for ERROR level using JQ
        let response = server
            .get("/api/query/test.log")
            .add_query_param("jq", r#"select(.level == "ERROR")"#)
            .await;
        response.assert_status_ok();

        let result: JqQueryResponse = response.json();
        assert_eq!(result.total_matches, 1);
        assert_eq!(result.matches[0].level, "ERROR");
        assert_eq!(result.matches[0].message, "test error");
    }

    #[tokio::test]
    async fn test_query_log_jq_invalid() {
        let (server, log_dir, _workspace_dir) = create_test_app();

        create_log_file(
            &log_dir,
            "test.log",
            r#"{"level":"INFO","message":"test"}"#,
        );

        // Invalid JQ syntax
        let response = server
            .get("/api/query/test.log")
            .add_query_param("jq", "select(.invalid syntax")
            .await;
        response.assert_status_bad_request();
    }
}
