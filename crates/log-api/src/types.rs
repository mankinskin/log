//! Log entry API types, moved here from context-stack's `context-api` so
//! `log-viewer` no longer needs a `context-api`/`context-stack` dependency.

use serde::{
    Deserialize,
    Serialize,
};

/// A parsed log entry — the simplified API view of a full `LogEntry`.
#[derive(Debug, Clone, Serialize, Deserialize, schemars::JsonSchema)]
pub struct LogEntryInfo {
    /// Entry number (1-based).
    pub entry_number: usize,
    /// Log level (TRACE, DEBUG, INFO, WARN, ERROR).
    pub level: String,
    /// Timestamp string (if present).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub timestamp: Option<String>,
    /// The log message.
    pub message: String,
    /// Event type (event, span_enter, span_exit, span_new, span_close).
    pub event_type: String,
    /// Span name (if this is a span event).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub span_name: Option<String>,
    /// Indentation depth (number of parent spans).
    pub depth: usize,
    /// Additional fields as a JSON value.
    #[schemars(with = "serde_json::Value")]
    pub fields: serde_json::Value,
    /// Source file location.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_file: Option<String>,
    /// Source line number.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_line: Option<u32>,
}
