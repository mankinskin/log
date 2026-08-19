# Log Viewer

A web-based log viewer for tracing logs from the context-engine project.

## Structure

```
log-viewer/
├── src/              # Rust backend
│   ├── main.rs       # HTTP/MCP server entry point
│   ├── config.rs     # Configuration loading
│   ├── log_parser.rs # Log file parsing
│   ├── query.rs      # JQ query engine
│   └── mcp_server.rs # MCP server implementation
├── frontend/         # Preact web application
└── static/           # Built frontend assets
```

## Running

### Server Modes

```bash
# HTTP server (default)
cargo run

# MCP server only
cargo run -- --mcp
```

### Development Mode

```bash
# Terminal 1: Start the backend
cargo run

# Terminal 2: Start the frontend dev server
cd frontend
npm install
npm run dev
```

The frontend dev server runs on `http://localhost:5173` and proxies API requests to the backend on port 3000.

### Production Mode

```bash
# Build the frontend
cd frontend
npm install
npm run build

# Run the backend (serves built frontend from static/)
cd ..
cargo run
```

Access the app at `http://localhost:3000`.

## API Endpoints

- `GET /api/logs` - List available log files
- `GET /api/logs/:name` - Get log file content
- `GET /api/search/:name?q=query` - Search within a log file
- `GET /api/query/:name?jq=filter` - Query with JQ syntax
- `GET /api/source/*path` - Get source file content (local disk or remote repository)

## Configuration

Config file search order:
1. `LOG_VIEWER_CONFIG` environment variable
2. `./log-viewer.toml`
3. `./config/log-viewer.toml`
4. `~/.config/log-viewer/config.toml`

### Environment Variables

- `LOG_DIR` - Directory containing log files (default: target/test-logs)
- `WORKSPACE_ROOT` - Workspace root for source file resolution
- `LOG_LEVEL` - Logging level (default: info)

### Remote Source File Serving

When deployed (e.g. in GitHub Actions or GitHub Pages), the server cannot read
source files from the local disk.  Instead it fetches them from the public
GitHub repository using the raw content API.

**Automatic detection (GitHub Actions):**

The remote backend is activated automatically when all three environment
variables are present:
- `GITHUB_ACTIONS=true`
- `GITHUB_REPOSITORY=owner/repo`
- `GITHUB_SHA=<commit hash>`

**Manual configuration (`log-viewer.toml`):**

```toml
[repository]
repo_url = "https://github.com/mankinskin/context-engine"
# commit_hash defaults to $GITHUB_SHA; pin it here for reproducibility
# commit_hash = "abc1234"
# Optional: sub-directory in the repo that is the workspace root
# source_tree_path = ""
```

### Code Tab: Test File Display

Test logs created with `init_test_tracing!()` automatically contain a
`"test started"` event that records the test file and line number.  The log
viewer uses this to pre-load the correct source file in the **Code** tab
without any additional configuration.

## MCP Server

For integration with AI assistants, run in MCP mode:

```bash
cargo run -- --mcp
```

This provides tools for querying logs using JQ syntax.
