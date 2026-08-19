//! MCP Server for log viewing and debugging
//!
//! Provides tools for agents to query and analyze tracing logs.

use rmcp::{
    handler::server::{
        tool::ToolRouter,
        wrapper::Parameters,
    },
    model::*,
    schemars,
    schemars::JsonSchema,
    tool,
    tool_handler,
    tool_router,
    transport::stdio,
    ErrorData as McpError,
    ServerHandler,
    ServiceExt,
};
use serde::{
    Deserialize,
    Serialize,
};
use std::{
    path::PathBuf,
    sync::Arc,
};

use crate::{
    log_parser::{
        LogEntry,
        LogParser,
    },
    query::JqFilter,
    to_unix_path,
};

/// MCP Server for log debugging
#[derive(Clone)]
pub struct LogServer {
    log_dir: PathBuf,
    workspace_root: PathBuf,
    parser: Arc<LogParser>,
    tool_router: ToolRouter<Self>,
}

impl LogServer {
    pub fn new(
        log_dir: PathBuf,
        workspace_root: PathBuf,
    ) -> Self {
        Self {
            log_dir,
            workspace_root,
            parser: Arc::new(LogParser::new()),
            tool_router: Self::tool_router(),
        }
    }
}

// === Tool Input Types ===

/// List available log files
#[derive(Debug, Deserialize, JsonSchema)]
pub struct ListLogsInput {
    /// Filter by filename pattern (glob-style, optional)
    #[serde(default)]
    pattern: Option<String>,
}

/// Get log file content with optional filtering
#[derive(Debug, Deserialize, JsonSchema)]
pub struct GetLogInput {
    /// Name of the log file (e.g., "test_name.log")
    filename: String,
    /// JQ filter expression to apply (e.g., "select(.level == \"ERROR\")")
    #[serde(default)]
    filter: Option<String>,
    /// Maximum number of entries to return (default: 100)
    #[serde(default = "default_limit")]
    limit: usize,
    /// Skip this many entries (for pagination)
    #[serde(default)]
    offset: usize,
}

fn default_limit() -> usize {
    100
}

/// Query logs using jq syntax
#[derive(Debug, Deserialize, JsonSchema)]
pub struct QueryLogsInput {
    /// Name of the log file
    filename: String,
    /// JQ filter expression (e.g., "select(.level == \"ERROR\" and .message | contains(\"panic\"))")
    query: String,
    /// Maximum results (default: 50)
    #[serde(default = "default_query_limit")]
    limit: usize,
}

fn default_query_limit() -> usize {
    50
}

/// Get source code snippet
#[derive(Debug, Deserialize, JsonSchema)]
pub struct GetSourceInput {
    /// Path to source file (relative to workspace root)
    path: String,
    /// Line number to center on (optional)
    #[serde(default)]
    line: Option<usize>,
    /// Number of context lines around the target line (default: 5)
    #[serde(default = "default_context")]
    context: usize,
}

fn default_context() -> usize {
    5
}

/// Analyze log for common patterns
#[derive(Debug, Deserialize, JsonSchema)]
pub struct AnalyzeLogInput {
    /// Name of the log file
    filename: String,
}

/// Search across all logs
#[derive(Debug, Deserialize, JsonSchema)]
pub struct SearchAllLogsInput {
    /// JQ filter expression to apply to all logs
    query: String,
    /// Maximum results per file (default: 10)
    #[serde(default = "default_search_limit")]
    limit_per_file: usize,
}

fn default_search_limit() -> usize {
    10
}

// === Response Types ===

#[derive(Serialize)]
struct LogFileInfo {
    name: String,
    size: u64,
    modified: Option<String>,
}

#[derive(Serialize)]
struct LogAnalysis {
    total_entries: usize,
    by_level: std::collections::HashMap<String, usize>,
    by_event_type: std::collections::HashMap<String, usize>,
    error_entries: Vec<LogEntry>,
    span_summary: Vec<SpanSummary>,
}

#[derive(Serialize)]
struct SpanSummary {
    name: String,
    count: usize,
    has_errors: bool,
}

// === Tool Implementations ===

#[tool_router]
impl LogServer {
    /// List all available log files
    #[tool(
        description = "List all log files in the configured log directory. Returns filename, size, and modification time."
    )]
    async fn list_logs(
        &self,
        Parameters(input): Parameters<ListLogsInput>,
    ) -> Result<CallToolResult, McpError> {
        if !self.log_dir.exists() {
            return Ok(CallToolResult::success(vec![Content::text(
                "Log directory does not exist or is empty",
            )]));
        }

        let entries = std::fs::read_dir(&self.log_dir).map_err(|e| {
            McpError::internal_error(
                format!("Failed to read log directory: {}", e),
                None,
            )
        })?;

        let pattern = input.pattern.as_deref();
        let mut logs: Vec<LogFileInfo> = Vec::new();

        for entry in entries.flatten() {
            let path = entry.path();
            if path.extension().map_or(false, |ext| ext == "log") {
                let name =
                    path.file_name().unwrap().to_string_lossy().to_string();

                // Apply pattern filter if specified
                if let Some(pat) = pattern {
                    if !name.contains(pat) {
                        continue;
                    }
                }

                let metadata = entry.metadata().ok();
                logs.push(LogFileInfo {
                    name,
                    size: metadata.as_ref().map(|m| m.len()).unwrap_or(0),
                    modified: metadata.and_then(|m| {
                        m.modified().ok().map(|t| {
                            chrono::DateTime::<chrono::Utc>::from(t)
                                .format("%Y-%m-%d %H:%M:%S")
                                .to_string()
                        })
                    }),
                });
            }
        }

        logs.sort_by(|a, b| a.name.cmp(&b.name));
        let json = serde_json::to_string_pretty(&logs).unwrap_or_default();
        Ok(CallToolResult::success(vec![Content::text(json)]))
    }

    /// Get log file content with optional JQ filtering
    #[tool(
        description = "Read a log file and optionally filter entries using JQ syntax. Supports pagination with offset/limit."
    )]
    async fn get_log(
        &self,
        Parameters(input): Parameters<GetLogInput>,
    ) -> Result<CallToolResult, McpError> {
        // Validate filename
        if input.filename.contains("..")
            || input.filename.contains('/')
            || input.filename.contains('\\')
        {
            return Ok(CallToolResult::error(vec![Content::text(
                "Invalid filename",
            )]));
        }

        let path = self.log_dir.join(&input.filename);
        let content = std::fs::read_to_string(&path).map_err(|e| {
            McpError::invalid_params(
                format!("Failed to read log file: {}", e),
                None,
            )
        })?;

        let mut entries = self.parser.parse(&content);

        // Apply JQ filter if specified
        if let Some(filter_str) = &input.filter {
            let filter = JqFilter::compile(filter_str).map_err(|e| {
                McpError::invalid_params(format!("Invalid filter: {}", e), None)
            })?;

            entries = entries
                .into_iter()
                .filter(|entry| {
                    let json = serde_json::to_value(entry).unwrap_or_default();
                    filter.matches(&json)
                })
                .collect();
        }

        // Apply pagination
        let total = entries.len();
        let entries: Vec<_> = entries
            .into_iter()
            .skip(input.offset)
            .take(input.limit)
            .collect();

        let result = serde_json::json!({
            "filename": input.filename,
            "total": total,
            "offset": input.offset,
            "limit": input.limit,
            "returned": entries.len(),
            "entries": entries,
        });

        Ok(CallToolResult::success(vec![Content::text(
            serde_json::to_string_pretty(&result).unwrap_or_default(),
        )]))
    }

    /// Query logs using JQ filter expressions
    #[tool(
        description = "Filter log entries using JQ query syntax. Examples:\n- select(.level == \"ERROR\")\n- select(.message | contains(\"panic\"))\n- select(.span_name == \"my_function\")\n- select(.level == \"ERROR\" and .fields.some_key != null)"
    )]
    async fn query_logs(
        &self,
        Parameters(input): Parameters<QueryLogsInput>,
    ) -> Result<CallToolResult, McpError> {
        // Validate filename
        if input.filename.contains("..")
            || input.filename.contains('/')
            || input.filename.contains('\\')
        {
            return Ok(CallToolResult::error(vec![Content::text(
                "Invalid filename",
            )]));
        }

        let path = self.log_dir.join(&input.filename);
        let content = std::fs::read_to_string(&path).map_err(|e| {
            McpError::invalid_params(
                format!("Failed to read log file: {}", e),
                None,
            )
        })?;

        let entries = self.parser.parse(&content);

        let filter = JqFilter::compile(&input.query).map_err(|e| {
            McpError::invalid_params(format!("Invalid JQ query: {}", e), None)
        })?;

        let matches: Vec<_> = entries
            .into_iter()
            .filter(|entry| {
                let json = serde_json::to_value(entry).unwrap_or_default();
                filter.matches(&json)
            })
            .take(input.limit)
            .collect();

        let result = serde_json::json!({
            "query": input.query,
            "matches": matches.len(),
            "entries": matches,
        });

        Ok(CallToolResult::success(vec![Content::text(
            serde_json::to_string_pretty(&result).unwrap_or_default(),
        )]))
    }

    /// Get source code snippet for a file location
    #[tool(
        description = "Read source code from a file, optionally centered on a specific line with context."
    )]
    async fn get_source(
        &self,
        Parameters(input): Parameters<GetSourceInput>,
    ) -> Result<CallToolResult, McpError> {
        // Normalize and validate path
        let normalized = input.path.replace('\\', "/");
        if normalized.contains("..") {
            return Ok(CallToolResult::error(vec![Content::text(
                "Path traversal not allowed",
            )]));
        }

        let full_path = self.workspace_root.join(&normalized);
        let content = std::fs::read_to_string(&full_path).map_err(|e| {
            McpError::invalid_params(
                format!("Failed to read source file: {}", e),
                None,
            )
        })?;

        let lines: Vec<&str> = content.lines().collect();

        let (start, end, highlight) = if let Some(line) = input.line {
            let ctx = input.context;
            let start = line.saturating_sub(ctx + 1);
            let end = (line + ctx).min(lines.len());
            (start, end, Some(line))
        } else {
            (0, lines.len(), None)
        };

        let snippet: String = lines[start..end]
            .iter()
            .enumerate()
            .map(|(i, line)| {
                let line_num = start + i + 1;
                let marker = if highlight == Some(line_num) {
                    ">"
                } else {
                    " "
                };
                format!("{} {:4} | {}", marker, line_num, line)
            })
            .collect::<Vec<_>>()
            .join("\n");

        let result = serde_json::json!({
            "path": input.path,
            "start_line": start + 1,
            "end_line": end,
            "highlight_line": highlight,
            "content": snippet,
        });

        Ok(CallToolResult::success(vec![Content::text(
            serde_json::to_string_pretty(&result).unwrap_or_default(),
        )]))
    }

    /// Analyze a log file for patterns and issues
    #[tool(
        description = "Analyze a log file to get statistics, error summary, and span information. Useful for getting an overview before detailed debugging."
    )]
    async fn analyze_log(
        &self,
        Parameters(input): Parameters<AnalyzeLogInput>,
    ) -> Result<CallToolResult, McpError> {
        // Validate filename
        if input.filename.contains("..")
            || input.filename.contains('/')
            || input.filename.contains('\\')
        {
            return Ok(CallToolResult::error(vec![Content::text(
                "Invalid filename",
            )]));
        }

        let path = self.log_dir.join(&input.filename);
        let content = std::fs::read_to_string(&path).map_err(|e| {
            McpError::invalid_params(
                format!("Failed to read log file: {}", e),
                None,
            )
        })?;

        let entries = self.parser.parse(&content);

        // Count by level
        let mut by_level: std::collections::HashMap<String, usize> =
            std::collections::HashMap::new();
        let mut by_event_type: std::collections::HashMap<String, usize> =
            std::collections::HashMap::new();
        let mut span_info: std::collections::HashMap<String, (usize, bool)> =
            std::collections::HashMap::new();
        let mut error_entries = Vec::new();

        for entry in &entries {
            *by_level.entry(entry.level.clone()).or_insert(0) += 1;
            *by_event_type.entry(entry.event_type.clone()).or_insert(0) += 1;

            if let Some(span_name) = &entry.span_name {
                let (count, has_error) =
                    span_info.entry(span_name.clone()).or_insert((0, false));
                *count += 1;
                if entry.level == "ERROR" {
                    *has_error = true;
                }
            }

            if entry.level == "ERROR" || entry.level == "WARN" {
                if error_entries.len() < 20 {
                    error_entries.push(entry.clone());
                }
            }
        }

        let span_summary: Vec<_> = span_info
            .into_iter()
            .map(|(name, (count, has_errors))| SpanSummary {
                name,
                count,
                has_errors,
            })
            .collect();

        let analysis = LogAnalysis {
            total_entries: entries.len(),
            by_level,
            by_event_type,
            error_entries,
            span_summary,
        };

        Ok(CallToolResult::success(vec![Content::text(
            serde_json::to_string_pretty(&analysis).unwrap_or_default(),
        )]))
    }

    /// Search across all log files
    #[tool(
        description = "Search across all log files using a JQ query. Returns matches from each file up to the limit."
    )]
    async fn search_all_logs(
        &self,
        Parameters(input): Parameters<SearchAllLogsInput>,
    ) -> Result<CallToolResult, McpError> {
        if !self.log_dir.exists() {
            return Ok(CallToolResult::success(vec![Content::text(
                "Log directory does not exist",
            )]));
        }

        let filter = JqFilter::compile(&input.query).map_err(|e| {
            McpError::invalid_params(format!("Invalid JQ query: {}", e), None)
        })?;

        let entries = std::fs::read_dir(&self.log_dir).map_err(|e| {
            McpError::internal_error(
                format!("Failed to read log directory: {}", e),
                None,
            )
        })?;

        let mut all_results: Vec<serde_json::Value> = Vec::new();

        for entry in entries.flatten() {
            let path = entry.path();
            if path.extension().map_or(false, |ext| ext == "log") {
                let filename =
                    path.file_name().unwrap().to_string_lossy().to_string();

                if let Ok(content) = std::fs::read_to_string(&path) {
                    let log_entries = self.parser.parse(&content);

                    let matches: Vec<_> = log_entries
                        .into_iter()
                        .filter(|e| {
                            let json =
                                serde_json::to_value(e).unwrap_or_default();
                            filter.matches(&json)
                        })
                        .take(input.limit_per_file)
                        .collect();

                    if !matches.is_empty() {
                        all_results.push(serde_json::json!({
                            "file": filename,
                            "matches": matches.len(),
                            "entries": matches,
                        }));
                    }
                }
            }
        }

        let result = serde_json::json!({
            "query": input.query,
            "files_with_matches": all_results.len(),
            "results": all_results,
        });

        Ok(CallToolResult::success(vec![Content::text(
            serde_json::to_string_pretty(&result).unwrap_or_default(),
        )]))
    }
}
#[tool_handler]
impl ServerHandler for LogServer {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            server_info: Implementation {
                name: env!("CARGO_PKG_NAME").to_string(),
                version: env!("CARGO_PKG_VERSION").to_string(),
                ..Default::default()
            },
            instructions: Some(
                "Log Viewer MCP Server for querying and debugging tracing logs.\n\n\
                 Tools available:\n\
                 - list_logs: List available log files\n\
                 - get_log: Read log file with optional JQ filtering\n\
                 - query_logs: Filter logs using JQ expressions\n\
                 - get_source: Get source code snippets\n\
                 - analyze_log: Get statistics and error summary\n\
                 - search_all_logs: Search across all log files\n\n\
                 JQ Query Examples:\n\
                 - select(.level == \"ERROR\")\n\
                 - select(.message | contains(\"panic\"))\n\
                 - select(.span_name == \"my_function\")"
                    .into(),
            ),
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            ..Default::default()
        }
    }
}
/// Run the MCP server
pub async fn run_mcp_server(
    log_dir: PathBuf,
    workspace_root: PathBuf,
) -> Result<(), Box<dyn std::error::Error>> {
    eprintln!("Log Viewer MCP Server starting...");
    eprintln!("Log directory: {}", to_unix_path(&log_dir));
    eprintln!("Workspace root: {}", to_unix_path(&workspace_root));

    let server = LogServer::new(log_dir, workspace_root);

    let service = server.serve(stdio()).await.inspect_err(|e| {
        eprintln!("Server error: {:?}", e);
    })?;

    service.waiting().await?;

    Ok(())
}
