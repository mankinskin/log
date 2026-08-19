//! Request and response types for the log viewer HTTP API.

use serde::{
    Deserialize,
    Serialize,
};
use ts_rs::TS;

use crate::log_parser::LogEntry;

// ts-rs export_to path: see context_api::TS_EXPORT_DIR for the convention.

/// Response for listing log files
#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export, export_to = "../../packages/context-types/src/generated/")]
pub struct LogFileInfo {
    pub name: String,
    pub size: u64,
    pub modified: Option<String>,
    /// Whether this log file contains a hypergraph snapshot event
    pub has_graph_snapshot: bool,
    /// Whether this log file contains search operation events
    pub has_search_ops: bool,
    /// Whether this log file contains insert operation events
    pub has_insert_ops: bool,
    /// Whether this log file contains search path transitions (path_transition field)
    pub has_search_paths: bool,
}

/// Response for log content
#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export, export_to = "../../packages/context-types/src/generated/")]
pub struct LogContentResponse {
    pub name: String,
    pub entries: Vec<LogEntry>,
    pub total_lines: usize,
}

/// Query params for source
#[derive(Deserialize, Debug)]
pub struct SourceQuery {
    #[serde(default)]
    pub line: Option<usize>,
    #[serde(default = "default_context")]
    pub context: usize,
}

fn default_context() -> usize {
    5
}

/// Search query parameters
#[derive(Deserialize, Debug)]
pub struct SearchQuery {
    pub q: String,
    #[serde(default)]
    pub level: Option<String>,
    #[serde(default)]
    pub limit: Option<usize>,
}

/// Search result response
#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export, export_to = "../../packages/context-types/src/generated/")]
pub struct SearchResponse {
    pub query: String,
    pub matches: Vec<LogEntry>,
    pub total_matches: usize,
}

/// JQ query parameters
#[derive(Deserialize, Debug)]
pub struct JqQuery {
    /// The jq filter expression
    pub jq: String,
    #[serde(default)]
    pub limit: Option<usize>,
}

/// JQ query result response
#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export, export_to = "../../packages/context-types/src/generated/")]
pub struct JqQueryResponse {
    pub query: String,
    pub matches: Vec<LogEntry>,
    pub total_matches: usize,
}

/// Error response
#[derive(Serialize, Deserialize, Debug)]
pub struct ErrorResponse {
    pub error: String,
}

/// Request body for session configuration updates
#[derive(Deserialize, Debug)]
pub struct SessionConfigUpdate {
    /// Whether to enable verbose logging
    pub verbose: Option<bool>,
}
