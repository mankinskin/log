//! Log parser — moved to `log-api` so log-viewer no longer needs a
//! `context-api`/`context-stack` dependency through `viewer-api`.
//!
//! This module re-exports from `log_api::log_parser`.

pub use log_api::log_parser::*;
