//! Router configuration for the HTTP server.

use std::path::PathBuf;
use viewer_api::{
    axum::{
        routing::get,
        Router,
    },
    dev_proxy,
    tower_http::{
        cors::{
            Any,
            CorsLayer,
        },
        services::ServeDir,
    },
};

use crate::{
    handlers::{
        get_log,
        get_session,
        get_signatures,
        list_logs,
        query_log,
        search_log,
        update_session,
    },
    source::get_source,
    state::AppState,
};

/// How the frontend is served.
pub enum FrontendMode {
    /// Serve pre-built static files from a directory.
    Static(PathBuf),
    /// Reverse-proxy to a Vite dev server on the given port.
    DevProxy(u16),
}

/// Create the router with all routes
pub fn create_router(
    state: AppState,
    frontend: FrontendMode,
) -> Router {
    let mut router = Router::new()
        .route("/api/logs", get(list_logs))
        .route("/api/logs/{name}", get(get_log))
        .route("/api/signatures/{name}", get(get_signatures))
        .route("/api/search/{name}", get(search_log))
        .route("/api/query/{name}", get(query_log))
        .route("/api/source/{*path}", get(get_source))
        .route("/api/session", get(get_session).post(update_session))
        .layer(CorsLayer::new().allow_origin(Any).allow_methods(Any))
        .with_state(state);

    match frontend {
        FrontendMode::Static(dir) =>
            if dir.exists() {
                router = router.fallback_service(ServeDir::new(&dir));
            },
        FrontendMode::DevProxy(port) => {
            router = router.merge(dev_proxy::dev_proxy_fallback(port));
        },
    }

    router
}
