//! Application state and session management.

use serde::{
    Deserialize,
    Serialize,
};
use std::{
    collections::HashMap,
    env,
    path::PathBuf,
    sync::{
        Arc,
        RwLock,
    },
};
use viewer_api::axum::http::HeaderMap;

use crate::{
    config::Config,
    log_parser::LogParser,
};

// Re-export source backend for use in handlers
pub use viewer_api::source::SourceBackend;

// Re-export session header from shared module
pub use viewer_api::session::SESSION_HEADER;

/// Session configuration for per-client logging behavior
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SessionConfig {
    /// Unique session identifier
    pub session_id: String,
    /// Whether to enable verbose logging for this session (default: false)
    #[serde(default)]
    pub verbose: bool,
    /// Number of source requests made in this session
    #[serde(skip_deserializing)]
    pub source_request_count: usize,
}

impl Default for SessionConfig {
    fn default() -> Self {
        Self {
            session_id: String::new(),
            verbose: false,
            source_request_count: 0,
        }
    }
}

/// Session store - maps session IDs to their configuration
pub type SessionStore = Arc<RwLock<HashMap<String, SessionConfig>>>;

/// Application state shared across handlers
#[derive(Clone)]
pub struct AppState {
    pub log_dir: PathBuf,
    pub signatures_dir: PathBuf,
    pub workspace_root: PathBuf,
    pub parser: Arc<LogParser>,
    /// Strategy for serving source files (local disk or remote repository).
    pub source_backend: SourceBackend,
    /// Session store for per-client configuration
    pub sessions: SessionStore,
}

/// Create the application state from config
pub fn create_app_state_from_config(config: &Config) -> AppState {
    let log_dir = config.resolve_log_dir();
    let signatures_dir = config.resolve_signatures_dir();
    let workspace_root = config.resolve_workspace_root();
    let source_backend = resolve_source_backend(config, workspace_root.clone());
    AppState {
        log_dir,
        signatures_dir,
        workspace_root,
        parser: Arc::new(LogParser::new()),
        source_backend,
        sessions: Arc::new(RwLock::new(HashMap::new())),
    }
}

/// Determine the source backend from configuration and environment.
///
/// Priority:
/// 1. Explicit `[repository]` section in config file.
/// 2. Auto-detection via `GITHUB_ACTIONS` / `GITHUB_REPOSITORY` / `GITHUB_SHA`.
/// 3. Local filesystem (default).
fn resolve_source_backend(
    config: &Config,
    workspace_root: PathBuf,
) -> SourceBackend {
    let repo_cfg = &config.repository;

    // Build a remote backend if repo_url AND a commit are configured/detectable.
    let explicit_commit = repo_cfg
        .commit_hash
        .clone()
        .or_else(|| env::var("GITHUB_SHA").ok());

    if let (Some(repo_url), Some(commit)) =
        (repo_cfg.repo_url.as_ref(), explicit_commit)
    {
        // Parse "https://github.com/owner/repo" -> owner/repo
        if let Some(path) = repo_url
            .trim_end_matches('/')
            .strip_prefix("https://github.com/")
        {
            let parts: Vec<&str> = path.splitn(2, '/').collect();
            if parts.len() == 2 {
                return SourceBackend::github(
                    parts[0],
                    parts[1],
                    &commit,
                    repo_cfg.source_tree_path.clone(),
                );
            }
        }
        // repo_url was set but couldn't be parsed as a GitHub URL
        eprintln!(
            "WARNING: log-viewer [repository] repo_url '{}' could not be parsed as a \
             GitHub URL (expected format: https://github.com/owner/repo). \
             Falling back to auto-detection or local source serving.",
            repo_url
        );
    }

    // Fall back to environment-based auto-detection (e.g. GitHub Actions CI).
    SourceBackend::detect(workspace_root)
}

/// Create the application state (for backward compatibility and tests)
pub fn create_app_state(
    log_dir: Option<PathBuf>,
    workspace_root: Option<PathBuf>,
) -> AppState {
    let log_dir = log_dir
        .or_else(|| env::var("LOG_DIR").map(PathBuf::from).ok())
        .unwrap_or_else(|| {
            // Default to target/test-logs in workspace root
            let mut path =
                env::current_dir().expect("Failed to get current directory");
            // Try to find workspace root by looking for Cargo.toml
            while !path.join("Cargo.toml").exists() && path.parent().is_some() {
                path = path.parent().unwrap().to_path_buf();
            }
            path.join("target").join("test-logs")
        });

    let workspace_root = workspace_root
        .or_else(|| env::var("WORKSPACE_ROOT").map(PathBuf::from).ok())
        .unwrap_or_else(|| {
            let mut path =
                env::current_dir().expect("Failed to get current directory");
            while !path.join("Cargo.toml").exists() && path.parent().is_some() {
                path = path.parent().unwrap().to_path_buf();
            }
            path
        });

    // Signatures directory is sibling to log directory (target/debug_signatures/)
    let signatures_dir = log_dir
        .parent()
        .unwrap_or(&log_dir)
        .join("debug_signatures");

    let source_backend = SourceBackend::detect(workspace_root.clone());

    AppState {
        log_dir,
        signatures_dir,
        workspace_root,
        parser: Arc::new(LogParser::new()),
        source_backend,
        sessions: Arc::new(RwLock::new(HashMap::new())),
    }
}

/// Get or create session config from headers
/// Returns None if no session ID is provided (anonymous request)
pub fn get_session_config(
    sessions: &SessionStore,
    headers: &HeaderMap,
) -> Option<SessionConfig> {
    let session_id =
        headers.get(SESSION_HEADER).and_then(|v| v.to_str().ok())?;

    // Get or create session
    let sessions_guard = sessions.read().unwrap();
    if let Some(config) = sessions_guard.get(session_id) {
        Some(config.clone())
    } else {
        drop(sessions_guard);
        // Create new session with defaults
        let config = SessionConfig {
            session_id: session_id.to_string(),
            verbose: false,
            source_request_count: 0,
        };
        let mut sessions_guard = sessions.write().unwrap();
        sessions_guard.insert(session_id.to_string(), config.clone());
        Some(config)
    }
}

/// Increment source request counter for a session
pub fn increment_source_count(
    sessions: &SessionStore,
    session_id: &str,
) -> usize {
    let mut sessions_guard = sessions.write().unwrap();
    if let Some(config) = sessions_guard.get_mut(session_id) {
        config.source_request_count += 1;
        config.source_request_count
    } else {
        1
    }
}
