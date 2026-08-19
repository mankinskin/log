# Log Viewer

Web-based log viewer for tracing logs from the context-engine project.

## Overview

Log Viewer provides a web interface and API for viewing structured tracing logs. It supports:

- **HTTP Mode**: Web UI and REST API for browsing logs
- **MCP Mode**: Agent integration via Model Context Protocol

## Architecture

```
log-viewer/
├── src/
│   ├── main.rs       # Entry point, mode selection
│   ├── config.rs     # Configuration loading
│   ├── log_parser.rs # Log file parsing
│   ├── query.rs      # JQ query engine
│   ├── handlers.rs   # HTTP handlers
│   ├── router.rs     # Route configuration
│   ├── state.rs      # App state management
│   ├── source.rs     # Source file resolution
│   └── mcp_server.rs # MCP server
├── frontend/         # Preact web application
└── static/           # Built frontend assets
```

## Key Components

### LogParser

Parses structured log files (JSON-per-line format):
- Extracts timestamp, level, target, message, spans, fields
- Handles nested span hierarchies
- Supports panic message extraction

### Query Engine

JQ-based filtering for log entries:
- Filter by level, target, message content
- Complex queries on nested fields
- Transform output format

### Session Management

Per-session configuration:
- Custom log directories
- Workspace root overrides
- Persistent preferences

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/logs` | List available log files |
| `GET /api/logs/:name` | Get log file content |
| `GET /api/search/:name` | Search within a log |
| `GET /api/query/:name` | JQ query on log entries |
| `GET /api/source/*path` | Get source file content |
