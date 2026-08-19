//! Log parser — re-exported from `context-api` via `viewer-api`.
//!
//! This module previously contained the canonical log parser. It now
//! re-exports from `viewer_api::log_parser` (which itself re-exports from
//! `context_api::log_parser`).

pub use viewer_api::log_parser::*;
