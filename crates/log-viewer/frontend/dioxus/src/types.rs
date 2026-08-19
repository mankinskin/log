use std::collections::HashMap;

use serde::{
    Deserialize,
    Serialize,
};

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
pub struct LogFileInfo {
    pub name: String,
    pub size: u64,
    pub modified: Option<String>,
    pub has_graph_snapshot: bool,
    pub has_search_ops: bool,
    pub has_insert_ops: bool,
    pub has_search_paths: bool,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
pub struct LogEntry {
    pub line_number: usize,
    pub level: String,
    pub timestamp: Option<String>,
    pub message: String,
    pub event_type: String,
    pub span_name: Option<String>,
    pub depth: usize,
    #[serde(default)]
    pub fields: HashMap<String, serde_json::Value>,
    pub file: Option<String>,
    pub source_line: Option<u32>,
    pub panic_file: Option<String>,
    pub panic_line: Option<u32>,
    pub assertion_diff: Option<serde_json::Value>,
    pub backtrace: Option<String>,
    pub raw: String,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
pub struct LogContentResponse {
    pub name: String,
    #[serde(default)]
    pub entries: Vec<LogEntry>,
    pub total_lines: usize,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
pub struct SearchResponse {
    pub query: String,
    #[serde(default)]
    pub matches: Vec<LogEntry>,
    pub total_matches: usize,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
pub struct JqQueryResponse {
    pub query: String,
    #[serde(default)]
    pub matches: Vec<LogEntry>,
    pub total_matches: usize,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
pub struct SourceFileResponse {
    pub path: String,
    pub content: String,
    pub language: String,
    pub total_lines: usize,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
#[allow(dead_code)]
pub struct SourceSnippet {
    pub path: String,
    pub content: String,
    pub start_line: usize,
    pub end_line: usize,
    pub highlight_line: usize,
    pub language: String,
}

pub type Signatures = HashMap<String, serde_json::Value>;

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
#[allow(dead_code)]
pub struct SessionConfig {
    pub session_id: String,
    pub verbose: bool,
    pub source_request_count: usize,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
#[allow(dead_code)]
pub struct SessionConfigUpdate {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub verbose: Option<bool>,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
#[allow(dead_code)]
pub struct SpanSummary {
    pub name: String,
    pub count: usize,
    pub has_errors: bool,
}

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
#[allow(dead_code)]
pub struct LogAnalysis {
    pub total_entries: usize,
    #[serde(default)]
    pub by_level: HashMap<String, usize>,
    #[serde(default)]
    pub by_event_type: HashMap<String, usize>,
    #[serde(default)]
    pub error_entries: Vec<LogEntry>,
    #[serde(default)]
    pub span_summary: Vec<SpanSummary>,
}
