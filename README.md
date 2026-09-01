Back to [workflow-tools](..).

# log

Tracing log capture and retrieval: parse structured log output and make it queryable and viewable instead of grepping raw files.

## Primary Use Case

Capture tracing/log output from a validation run or a long session, then browse and search it through a viewer instead of re-running the command to see more output.

## Usage

Build the viewer from the `workflow-tools` workspace root:

```bash
cargo run -p log-viewer --bin log-viewer
```

`log-viewer` serves an HTTP UI and an MCP server for viewing and querying tracing logs.

## Related Crates

- [crates/log-api](crates/log-api): core library (log capture/retrieval identities, log parsing).
- [crates/log-viewer](crates/log-viewer): HTTP + MCP viewer application (binary `log-viewer`).
