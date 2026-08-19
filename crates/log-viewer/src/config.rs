//! Configuration loading for log-viewer
//!
//! Config file search order:
//! 1. Path in `LOG_VIEWER_CONFIG` environment variable
//! 2. `./log-viewer.toml` (current directory)
//! 3. `./config/log-viewer.toml` (config subdirectory)
//! 4. `~/.config/log-viewer/config.toml` (user config directory)
//!
//! Environment variables override config file values.

use serde::{
    Deserialize,
    Serialize,
};
use std::{
    env,
    fs,
    path::PathBuf,
};
use tracing::{
    debug,
    info,
    warn,
};

/// Convert a path to Unix-style string (forward slashes)
fn to_unix_path(path: &std::path::Path) -> String {
    path.to_string_lossy().replace('\\', "/")
}

/// Main configuration structure
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(default)]
pub struct Config {
    /// Directory containing log files
    pub log_dir: Option<PathBuf>,
    /// Workspace root for source file resolution
    pub workspace_root: Option<PathBuf>,
    /// Directory containing debug signature JSON files.
    /// Defaults to sibling of log_dir's parent: `<log_dir>/../debug_signatures`
    pub signatures_dir: Option<PathBuf>,
    /// Directory for pre-built static frontend files (production mode).
    /// Defaults to `<CARGO_MANIFEST_DIR>/static`
    pub static_dir: Option<PathBuf>,
    /// Directory containing the Vite frontend project (dev mode).
    /// Defaults to `<CARGO_MANIFEST_DIR>/frontend`
    pub frontend_dir: Option<PathBuf>,
    /// Directory for the server's own log files.
    /// Defaults to `<CARGO_MANIFEST_DIR>/logs`
    pub server_log_dir: Option<PathBuf>,
    /// Repository configuration for remote source file access.
    pub repository: RepositoryConfig,
    /// Server configuration
    pub server: ServerConfig,
    /// Logging configuration
    pub logging: LoggingConfig,
    /// Base directory relative to which paths in the config file are resolved.
    /// Set automatically when loading from a file; not deserialized.
    #[serde(skip)]
    config_dir: Option<PathBuf>,
}

/// Server configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct ServerConfig {
    /// Host to bind to
    pub host: String,
    /// Port to listen on
    pub port: u16,
    /// Vite dev server port (dev mode only)
    pub vite_port: u16,
}

impl Default for ServerConfig {
    fn default() -> Self {
        Self {
            host: "127.0.0.1".to_string(),
            port: 3000,
            vite_port: 5173,
        }
    }
}

/// Repository configuration for remote source file access.
///
/// When the log-viewer runs in a deployed environment (e.g. GitHub Actions) it
/// cannot read source files from disk.  These settings allow it to fetch files
/// from the public repository using the raw GitHub content API instead.
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(default)]
pub struct RepositoryConfig {
    /// Public repository URL, e.g. `https://github.com/owner/repo`.
    /// Used to build raw content URLs when `commit_hash` is also set.
    pub repo_url: Option<String>,
    /// Git commit hash (full or short) to pin the raw file requests to.
    /// Defaults to the `GITHUB_SHA` environment variable when unset.
    pub commit_hash: Option<String>,
    /// Optional sub-directory within the repository that corresponds to the
    /// workspace root.  Set this when the code lives in a monorepo sub-folder.
    pub source_tree_path: Option<String>,
}

/// Logging configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct LoggingConfig {
    /// Log level: trace, debug, info, warn, error
    pub level: String,
    /// Enable file logging
    pub file_logging: bool,
}

impl Default for LoggingConfig {
    fn default() -> Self {
        Self {
            level: "info".to_string(),
            file_logging: false,
        }
    }
}

impl Config {
    /// Load configuration from file and environment variables
    pub fn load() -> Self {
        let mut config = Self::load_from_file().unwrap_or_default();
        config.apply_env_overrides();
        config
    }

    /// Search for and load config file
    fn load_from_file() -> Option<Self> {
        let config_paths = Self::config_search_paths();

        for path in config_paths {
            if path.exists() {
                match fs::read_to_string(&path) {
                    Ok(content) => match toml::from_str::<Config>(&content) {
                        Ok(mut config) => {
                            info!(
                                "Loaded config from: {}",
                                to_unix_path(&path)
                            );
                            // Remember config file directory for resolving relative paths
                            config.config_dir =
                                path.parent().map(|p| p.to_path_buf());
                            return Some(config);
                        },
                        Err(e) => {
                            warn!(
                                "Failed to parse config file {}: {}",
                                to_unix_path(&path),
                                e
                            );
                        },
                    },
                    Err(e) => {
                        debug!(
                            "Could not read config file {}: {}",
                            to_unix_path(&path),
                            e
                        );
                    },
                }
            }
        }

        debug!("No config file found, using defaults");
        None
    }

    /// Get list of paths to search for config file
    fn config_search_paths() -> Vec<PathBuf> {
        let mut paths = Vec::new();

        // 1. Environment variable
        if let Ok(path) = env::var("LOG_VIEWER_CONFIG") {
            paths.push(PathBuf::from(path));
        }

        // 2. Current directory
        if let Ok(cwd) = env::current_dir() {
            paths.push(cwd.join("log-viewer.toml"));
            paths.push(cwd.join("config").join("log-viewer.toml"));
        }

        // 3. Crate manifest directory (where the binary's Cargo.toml lives)
        let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
        paths.push(manifest_dir.join("log-viewer.toml"));

        // 4. User config directory
        if let Some(home) = dirs_path() {
            paths.push(
                home.join(".config").join("log-viewer").join("config.toml"),
            );
        }

        paths
    }

    /// Apply environment variable overrides
    fn apply_env_overrides(&mut self) {
        // LOG_DIR overrides config file
        if let Ok(log_dir) = env::var("LOG_DIR") {
            self.log_dir = Some(PathBuf::from(log_dir));
        }

        // WORKSPACE_ROOT overrides config file
        if let Ok(workspace_root) = env::var("WORKSPACE_ROOT") {
            self.workspace_root = Some(PathBuf::from(workspace_root));
        }

        // STATIC_DIR / LOG_VIEWER_STATIC_DIR override config file
        if let Ok(static_dir) = env::var("STATIC_DIR")
            .or_else(|_| env::var("LOG_VIEWER_STATIC_DIR"))
        {
            self.static_dir = Some(PathBuf::from(static_dir));
        }

        // FRONTEND_DIR / LOG_VIEWER_FRONTEND_DIR override config file
        if let Ok(frontend_dir) = env::var("FRONTEND_DIR")
            .or_else(|_| env::var("LOG_VIEWER_FRONTEND_DIR"))
        {
            self.frontend_dir = Some(PathBuf::from(frontend_dir));
        }

        // LOG_LEVEL overrides config file
        if let Ok(level) = env::var("LOG_LEVEL") {
            self.logging.level = level;
        }

        // LOG_FILE enables file logging
        if env::var("LOG_FILE").is_ok() {
            self.logging.file_logging = true;
        }
    }

    /// Resolve a path that may be relative to the config file's directory.
    fn resolve_path(
        &self,
        p: &PathBuf,
    ) -> PathBuf {
        if p.is_relative() {
            if let Some(base) = &self.config_dir {
                return base.join(p);
            }
        }
        p.clone()
    }

    /// Resolve log_dir with fallback logic
    pub fn resolve_log_dir(&self) -> PathBuf {
        if let Some(p) = &self.log_dir {
            return self.resolve_path(p);
        }
        // Default to target/test-logs in workspace root
        let mut path =
            env::current_dir().expect("Failed to get current directory");
        while !path.join("Cargo.toml").exists() && path.parent().is_some() {
            path = path.parent().unwrap().to_path_buf();
        }
        path.join("target").join("test-logs")
    }

    /// Resolve workspace_root with fallback logic
    pub fn resolve_workspace_root(&self) -> PathBuf {
        if let Some(p) = &self.workspace_root {
            return self.resolve_path(p);
        }
        let mut path =
            env::current_dir().expect("Failed to get current directory");
        while !path.join("Cargo.toml").exists() && path.parent().is_some() {
            path = path.parent().unwrap().to_path_buf();
        }
        path
    }

    /// Resolve signatures_dir.
    /// Defaults to `<log_dir>/../debug_signatures`.
    pub fn resolve_signatures_dir(&self) -> PathBuf {
        if let Some(p) = &self.signatures_dir {
            return self.resolve_path(p);
        }
        let log_dir = self.resolve_log_dir();
        log_dir
            .parent()
            .unwrap_or(&log_dir)
            .join("debug_signatures")
    }

    /// Resolve static_dir (pre-built frontend assets for production).
    /// Defaults to `<CARGO_MANIFEST_DIR>/static`.
    pub fn resolve_static_dir(&self) -> PathBuf {
        if let Some(p) = &self.static_dir {
            return self.resolve_path(p);
        }
        PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("static")
    }

    /// Resolve frontend_dir (Vite project root for dev mode).
    /// Defaults to `<CARGO_MANIFEST_DIR>/frontend`.
    pub fn resolve_frontend_dir(&self) -> PathBuf {
        if let Some(p) = &self.frontend_dir {
            return self.resolve_path(p);
        }
        PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("frontend")
    }

    /// Resolve server_log_dir (where the server writes its own logs).
    /// Defaults to `<CARGO_MANIFEST_DIR>/logs`.
    pub fn resolve_server_log_dir(&self) -> PathBuf {
        if let Some(p) = &self.server_log_dir {
            return self.resolve_path(p);
        }
        PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("logs")
    }
}

/// Get home directory path (cross-platform)
fn dirs_path() -> Option<PathBuf> {
    #[cfg(target_os = "windows")]
    {
        env::var("USERPROFILE").map(PathBuf::from).ok()
    }
    #[cfg(not(target_os = "windows"))]
    {
        env::var("HOME").map(PathBuf::from).ok()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_config() {
        let config = Config::default();
        assert_eq!(config.server.port, 3000);
        assert_eq!(config.server.host, "127.0.0.1");
        assert_eq!(config.logging.level, "info");
        assert!(!config.logging.file_logging);
        assert!(config.repository.repo_url.is_none());
        assert!(config.repository.commit_hash.is_none());
    }

    #[test]
    fn test_parse_config() {
        let toml_content = r#"
            log_dir = "/path/to/logs"
            workspace_root = "/path/to/workspace"
            
            [server]
            host = "0.0.0.0"
            port = 8080
            
            [logging]
            level = "debug"
            file_logging = true
        "#;

        let config: Config = toml::from_str(toml_content).unwrap();
        assert_eq!(config.log_dir, Some(PathBuf::from("/path/to/logs")));
        assert_eq!(config.server.port, 8080);
        assert_eq!(config.logging.level, "debug");
    }

    #[test]
    fn test_parse_repository_config() {
        let toml_content = r#"
            [repository]
            repo_url = "https://github.com/myorg/myrepo"
            commit_hash = "abc1234"
            source_tree_path = "crates/my-crate"
        "#;

        let config: Config = toml::from_str(toml_content).unwrap();
        assert_eq!(
            config.repository.repo_url.as_deref(),
            Some("https://github.com/myorg/myrepo")
        );
        assert_eq!(config.repository.commit_hash.as_deref(), Some("abc1234"));
        assert_eq!(
            config.repository.source_tree_path.as_deref(),
            Some("crates/my-crate")
        );
    }
}
