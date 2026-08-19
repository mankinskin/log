//! JQ-style query language for filtering log entries.
//!
//! Re-exports the shared query engine from `viewer_api::query` and provides
//! log-viewer-specific tests.

// Re-export everything from the shared query module
pub use viewer_api::query::*;

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_compile_simple() {
        let filter = JqFilter::compile(".level").unwrap();
        let input = json!({"level": "ERROR", "message": "test"});
        let results = filter.run(&input);
        assert_eq!(results.len(), 1);
        assert_eq!(results[0].as_ref().unwrap(), &json!("ERROR"));
    }

    #[test]
    fn test_select_filter() {
        let filter = JqFilter::compile("select(.level == \"ERROR\")").unwrap();

        let error_entry = json!({"level": "ERROR", "message": "bad"});
        let info_entry = json!({"level": "INFO", "message": "ok"});

        assert!(filter.matches(&error_entry));
        assert!(!filter.matches(&info_entry));
    }

    #[test]
    fn test_contains_filter() {
        let filter =
            JqFilter::compile("select(.message | contains(\"panic\"))")
                .unwrap();

        let panic_entry =
            json!({"level": "ERROR", "message": "panic occurred!"});
        let normal_entry = json!({"level": "INFO", "message": "all good"});

        assert!(filter.matches(&panic_entry));
        assert!(!filter.matches(&normal_entry));
    }

    #[test]
    fn test_filter_values() {
        let entries = vec![
            json!({"level": "ERROR", "message": "bad"}),
            json!({"level": "INFO", "message": "ok"}),
            json!({"level": "ERROR", "message": "worse"}),
        ];

        let filtered =
            filter_values(&entries, "select(.level == \"ERROR\")").unwrap();
        assert_eq!(filtered.len(), 2);
    }

    #[test]
    fn test_invalid_query() {
        let result = JqFilter::compile("select(invalid syntax here");
        assert!(result.is_err());
    }

    // ========================================
    // Comprehensive filtering tests
    // ========================================

    /// Test filtering by type name (_type field in structured values)
    #[test]
    fn test_filter_by_type_name() {
        let filter = JqFilter::compile(
            r#"select(.fields | .. | objects | select(._type == "Pattern"))"#,
        )
        .unwrap();

        let entry_with_pattern = json!({
            "level": "DEBUG",
            "message": "search started",
            "fields": {
                "query": {
                    "_type": "Pattern",
                    "_values": ["foo.*bar"]
                }
            }
        });

        let entry_without_pattern = json!({
            "level": "DEBUG",
            "message": "other event",
            "fields": {
                "count": 42
            }
        });

        assert!(filter.matches(&entry_with_pattern));
        assert!(!filter.matches(&entry_without_pattern));
    }

    /// Test filtering by type name with nested structures
    #[test]
    fn test_filter_by_nested_type() {
        let filter = JqFilter::compile(
            r#"select(.fields | .. | objects | select(._type == "NodeId"))"#,
        )
        .unwrap();

        let entry = json!({
            "level": "DEBUG",
            "message": "processing node",
            "fields": {
                "result": {
                    "_type": "Option",
                    "_variant": "Some",
                    "_values": [{
                        "_type": "NodeId",
                        "_values": [123]
                    }]
                }
            }
        });

        assert!(filter.matches(&entry));
    }

    /// Test filtering by module/target name
    #[test]
    fn test_filter_by_target() {
        let filter = JqFilter::compile(
            r#"select(.target | contains("context_search"))"#,
        )
        .unwrap();

        let search_entry = json!({
            "level": "DEBUG",
            "message": "searching",
            "target": "context_search::matcher"
        });

        let other_entry = json!({
            "level": "DEBUG",
            "message": "other",
            "target": "context_trace::graph"
        });

        assert!(filter.matches(&search_entry));
        assert!(!filter.matches(&other_entry));
    }

    /// Test filtering by field existence (has)
    #[test]
    fn test_filter_by_field_existence() {
        let filter =
            JqFilter::compile(r#"select(.fields | has("known"))"#).unwrap();

        let entry_with_field = json!({
            "level": "DEBUG",
            "message": "has the field",
            "fields": {
                "known": true,
                "other": "value"
            }
        });

        let entry_without_field = json!({
            "level": "DEBUG",
            "message": "no field",
            "fields": {
                "other": "value"
            }
        });

        assert!(filter.matches(&entry_with_field));
        assert!(!filter.matches(&entry_without_field));
    }

    /// Test filtering by file name
    #[test]
    fn test_filter_by_file_name() {
        let filter =
            JqFilter::compile(r#"select(.file | contains("mod.rs"))"#).unwrap();

        let mod_entry = json!({
            "level": "DEBUG",
            "message": "from mod",
            "file": "src/search/mod.rs"
        });

        let other_entry = json!({
            "level": "DEBUG",
            "message": "from other",
            "file": "src/search/matcher.rs"
        });

        assert!(filter.matches(&mod_entry));
        assert!(!filter.matches(&other_entry));
    }

    /// Test filtering by file path prefix
    #[test]
    fn test_filter_by_file_path() {
        let filter = JqFilter::compile(
            r#"select(.file | startswith("crates/context-stack/context-insert"))"#,
        )
        .unwrap();

        let insert_entry = json!({
            "level": "DEBUG",
            "message": "inserting",
            "file": "crates/context-stack/context-insert/src/lib.rs"
        });

        let search_entry = json!({
            "level": "DEBUG",
            "message": "searching",
            "file": "crates/context-stack/context-search/src/lib.rs"
        });

        assert!(filter.matches(&insert_entry));
        assert!(!filter.matches(&search_entry));
    }

    /// Test filtering by span name
    #[test]
    fn test_filter_by_span_name() {
        let filter =
            JqFilter::compile(r#"select(.span_name == "search_pattern")"#)
                .unwrap();

        let search_span = json!({
            "level": "DEBUG",
            "message": "entering span",
            "span_name": "search_pattern",
            "event_type": "span_enter"
        });

        let other_span = json!({
            "level": "DEBUG",
            "message": "entering span",
            "span_name": "process_node",
            "event_type": "span_enter"
        });

        assert!(filter.matches(&search_span));
        assert!(!filter.matches(&other_span));
    }

    /// Test filtering by field value
    #[test]
    fn test_filter_by_field_value() {
        let filter = JqFilter::compile(r#"select(.fields.depth > 5)"#).unwrap();

        let deep_entry = json!({
            "level": "DEBUG",
            "message": "deep",
            "fields": { "depth": 10 }
        });

        let shallow_entry = json!({
            "level": "DEBUG",
            "message": "shallow",
            "fields": { "depth": 2 }
        });

        assert!(filter.matches(&deep_entry));
        assert!(!filter.matches(&shallow_entry));
    }

    /// Test filtering by enum variant
    #[test]
    fn test_filter_by_enum_variant() {
        let filter = JqFilter::compile(
            r#"select(.fields | .. | objects | select(._variant == "Some"))"#,
        )
        .unwrap();

        let some_entry = json!({
            "level": "DEBUG",
            "message": "has value",
            "fields": {
                "result": {
                    "_type": "Option",
                    "_variant": "Some",
                    "_values": [42]
                }
            }
        });

        let none_entry = json!({
            "level": "DEBUG",
            "message": "no value",
            "fields": {
                "result": {
                    "_type": "Option",
                    "_variant": "None"
                }
            }
        });

        assert!(filter.matches(&some_entry));
        assert!(!filter.matches(&none_entry));
    }

    /// Test filtering by values deep in nested structures
    #[test]
    fn test_filter_by_nested_value() {
        let filter = JqFilter::compile(
            r#"select(.fields | .. | numbers | select(. == 42))"#,
        )
        .unwrap();

        let entry_with_42 = json!({
            "level": "DEBUG",
            "message": "has 42",
            "fields": {
                "outer": {
                    "inner": {
                        "value": 42
                    }
                }
            }
        });

        let entry_without_42 = json!({
            "level": "DEBUG",
            "message": "no 42",
            "fields": {
                "outer": {
                    "inner": {
                        "value": 100
                    }
                }
            }
        });

        assert!(filter.matches(&entry_with_42));
        assert!(!filter.matches(&entry_without_42));
    }

    /// Test filtering with multiple conditions (AND)
    #[test]
    fn test_filter_multiple_conditions_and() {
        let filter = JqFilter::compile(
            r#"select(.level == "ERROR" and (.message | contains("panic")))"#,
        )
        .unwrap();

        let error_panic = json!({
            "level": "ERROR",
            "message": "panic in module"
        });

        let error_other = json!({
            "level": "ERROR",
            "message": "something else"
        });

        let info_panic = json!({
            "level": "INFO",
            "message": "panic recovered"
        });

        assert!(filter.matches(&error_panic));
        assert!(!filter.matches(&error_other));
        assert!(!filter.matches(&info_panic));
    }

    /// Test filtering with multiple conditions (OR)
    #[test]
    fn test_filter_multiple_conditions_or() {
        let filter = JqFilter::compile(
            r#"select(.level == "ERROR" or .level == "WARN")"#,
        )
        .unwrap();

        let error = json!({"level": "ERROR", "message": "bad"});
        let warn = json!({"level": "WARN", "message": "caution"});
        let info = json!({"level": "INFO", "message": "ok"});

        assert!(filter.matches(&error));
        assert!(filter.matches(&warn));
        assert!(!filter.matches(&info));
    }

    /// Test filtering by event type
    #[test]
    fn test_filter_by_event_type() {
        let filter =
            JqFilter::compile(r#"select(.event_type == "span_enter")"#)
                .unwrap();

        let span_enter = json!({
            "level": "DEBUG",
            "message": "entering",
            "event_type": "span_enter"
        });

        let event = json!({
            "level": "DEBUG",
            "message": "logging",
            "event_type": "event"
        });

        assert!(filter.matches(&span_enter));
        assert!(!filter.matches(&event));
    }

    /// Test filtering entries that have a backtrace (panics)
    #[test]
    fn test_filter_has_backtrace() {
        let filter =
            JqFilter::compile(r#"select(.backtrace != null)"#).unwrap();

        let panic_entry = json!({
            "level": "ERROR",
            "message": "panic",
            "backtrace": "stack trace here..."
        });

        let normal_entry = json!({
            "level": "ERROR",
            "message": "error",
            "backtrace": null
        });

        assert!(filter.matches(&panic_entry));
        assert!(!filter.matches(&normal_entry));
    }

    /// Test filtering by string in any field value (recursive search)
    #[test]
    fn test_filter_recursive_string_search() {
        let filter = JqFilter::compile(
            r#"select(.. | strings | select(contains("important")))"#,
        )
        .unwrap();

        let entry_with_match = json!({
            "level": "DEBUG",
            "message": "processing",
            "fields": {
                "nested": {
                    "deep": {
                        "label": "this is important data"
                    }
                }
            }
        });

        let entry_without_match = json!({
            "level": "DEBUG",
            "message": "processing",
            "fields": {
                "nested": {
                    "deep": {
                        "label": "nothing special"
                    }
                }
            }
        });

        assert!(filter.matches(&entry_with_match));
        assert!(!filter.matches(&entry_without_match));
    }

    /// Test negation filter
    #[test]
    fn test_filter_negation() {
        let filter = JqFilter::compile(r#"select(.level != "TRACE")"#).unwrap();

        let trace = json!({"level": "TRACE", "message": "verbose"});
        let debug = json!({"level": "DEBUG", "message": "less verbose"});

        assert!(!filter.matches(&trace));
        assert!(filter.matches(&debug));
    }

    /// Test filtering by line number range
    #[test]
    fn test_filter_by_line_range() {
        let filter = JqFilter::compile(
            r#"select(.source_line >= 100 and .source_line <= 200)"#,
        )
        .unwrap();

        let in_range = json!({
            "level": "DEBUG",
            "message": "in range",
            "source_line": 150
        });

        let out_of_range = json!({
            "level": "DEBUG",
            "message": "out of range",
            "source_line": 50
        });

        assert!(filter.matches(&in_range));
        assert!(!filter.matches(&out_of_range));
    }

    /// Test that empty results don't match
    #[test]
    fn test_no_match_empty_result() {
        let filter =
            JqFilter::compile(r#"select(.nonexistent_field == "value")"#)
                .unwrap();

        let entry = json!({
            "level": "DEBUG",
            "message": "test"
        });

        assert!(!filter.matches(&entry));
    }

    /// Test case-insensitive string matching
    #[test]
    fn test_case_insensitive_match() {
        // jq's test() function with "i" flag for case-insensitive
        let filter =
            JqFilter::compile(r#"select(.message | test("ERROR"; "i"))"#)
                .unwrap();

        let upper = json!({"level": "INFO", "message": "ERROR occurred"});
        let lower = json!({"level": "INFO", "message": "error occurred"});
        let mixed = json!({"level": "INFO", "message": "Error occurred"});
        let no_match = json!({"level": "INFO", "message": "all good"});

        assert!(filter.matches(&upper));
        assert!(filter.matches(&lower));
        assert!(filter.matches(&mixed));
        assert!(!filter.matches(&no_match));
    }

    /// Test filtering by multiple type names
    #[test]
    fn test_filter_multiple_types() {
        let filter = JqFilter::compile(
            r#"select(.fields | .. | objects | select(._type == "NodeId" or ._type == "EdgeId"))"#
        ).unwrap();

        let node_entry = json!({
            "level": "DEBUG",
            "fields": { "id": { "_type": "NodeId", "_values": [1] } }
        });

        let edge_entry = json!({
            "level": "DEBUG",
            "fields": { "id": { "_type": "EdgeId", "_values": [2] } }
        });

        let other_entry = json!({
            "level": "DEBUG",
            "fields": { "id": { "_type": "SpanId", "_values": [3] } }
        });

        assert!(filter.matches(&node_entry));
        assert!(filter.matches(&edge_entry));
        assert!(!filter.matches(&other_entry));
    }

    /// Test transform_values function
    #[test]
    fn test_transform_values() {
        let entries = vec![
            json!({"level": "ERROR", "message": "bad", "fields": {"count": 5}}),
            json!({"level": "INFO", "message": "ok", "fields": {"count": 10}}),
        ];

        // Extract just the count field
        let transformed = transform_values(&entries, ".fields.count").unwrap();
        assert_eq!(transformed.len(), 2);
        assert_eq!(transformed[0], json!(5));
        assert_eq!(transformed[1], json!(10));
    }

    /// Test complex real-world query: find all search operations on specific node types
    #[test]
    fn test_complex_real_world_query() {
        let filter = JqFilter::compile(
            r#"select(
                .span_name == "search" and 
                (.fields | .. | objects | select(._type == "Pattern"))
            )"#,
        )
        .unwrap();

        let matching_entry = json!({
            "level": "DEBUG",
            "message": "searching",
            "span_name": "search",
            "event_type": "span_enter",
            "fields": {
                "pattern": {
                    "_type": "Pattern",
                    "_values": ["test.*"]
                }
            }
        });

        let wrong_span = json!({
            "level": "DEBUG",
            "message": "other",
            "span_name": "process",
            "event_type": "span_enter",
            "fields": {
                "pattern": {
                    "_type": "Pattern",
                    "_values": ["test.*"]
                }
            }
        });

        let wrong_type = json!({
            "level": "DEBUG",
            "message": "searching",
            "span_name": "search",
            "event_type": "span_enter",
            "fields": {
                "query": "simple string"
            }
        });

        assert!(filter.matches(&matching_entry));
        assert!(!filter.matches(&wrong_span));
        assert!(!filter.matches(&wrong_type));
    }
}
