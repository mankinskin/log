use chrono::TimeZone;
use pretty_assertions::assert_eq;
use tempfile::TempDir;
use test_api::ValidationExecution;

use super::*;
use crate::{
    OperationJournalQuery, RuntimeLogFormat, RuntimeLogLinks, RuntimeLogSession, RuntimeLogStatus,
    RuntimeLogTransport, ValidationLogCapture, ValidationLogKind,
};
use memory_kernel::OperationJournal;

fn at(secs: u32) -> chrono::DateTime<chrono::Utc> {
    chrono::Utc
        .with_ymd_and_hms(2026, 6, 28, 12, 0, secs)
        .single()
        .unwrap()
}

fn config(dir: &TempDir) -> LogStoreConfig {
    LogStoreConfig::new(dir.path().join(".log"), "default")
}

fn capture(id: &str, exec_id: &str, secs: u32) -> ValidationLogCapture {
    let execution = ValidationExecution::passed(exec_id, "vt-a", at(secs));
    ValidationLogCapture::from_execution(
        id,
        &execution,
        ValidationLogKind::CombinedOutput,
        at(secs),
        "text/plain",
        format!("target/test-logs/{id}.log"),
    )
}

fn runtime_session(id: &str, secs: u32) -> RuntimeLogSession {
    let mut session = RuntimeLogSession::new(
        id,
        at(secs),
        RuntimeLogStatus::Active,
        "ticket-api",
        RuntimeLogTransport::Mcp,
        format!("target/test-logs/{id}.jsonl"),
        "application/json",
        RuntimeLogFormat::JsonLines,
    );
    session.operation = Some("scan".to_string());
    session.run_id = Some("run-1".to_string());
    session.links = RuntimeLogLinks {
        spec_ids: vec!["spec-1".to_string()],
        ticket_ids: vec!["ticket-1".to_string()],
        doc_evidence_ids: vec!["doc-1".to_string()],
        validation_execution_ids: vec!["exec-1".to_string()],
        benchmark_ids: vec!["bench-1".to_string()],
        agent_session_ids: vec!["agent-1".to_string()],
        journal_ids: vec!["journal-1".to_string()],
        graph_operation_ids: vec!["graph-op-1".to_string()],
    };
    session
}

fn operation_journal() -> OperationJournal {
    serde_json::from_value(serde_json::json!({
        "journal_id": "11111111-1111-4111-8111-111111111111",
        "operation_id": "22222222-2222-4222-8222-222222222222",
        "run_id": "33333333-3333-4333-8333-333333333333",
        "schema_version": "operation-journal/v1",
        "operation_kind": "move",
        "component": "memory-kernel",
        "preflight": {"inputs": {}, "ready": true},
        "steps": [],
        "phases": [],
        "reversibility": "rollbackable",
        "recovery": {
            "resume_guidance": "resume",
            "rollback_guidance": "rollback"
        },
        "links": {},
        "domain_data": {}
    }))
    .unwrap()
}

fn move_journal() -> memory_kernel::storage::move_kernel::MoveJournal {
    serde_json::from_value(serde_json::json!({
        "id": "11111111-1111-4111-8111-111111111111",
        "entity_id": "22222222-2222-4222-8222-222222222222",
        "source_store_root": "/stores/source",
        "target_store_root": "/stores/target",
        "source_entity_path": "/stores/source/entity",
        "destination_entity_path": "/stores/target/entity",
        "phase": "Moved",
        "created_at": "2026-06-28T12:00:00Z",
        "updated_at": "2026-06-28T12:00:01Z",
        "steps": ["moved entity"],
        "rollback_steps": ["restore source entity"],
        "lock_paths": ["/stores/source/move.lock"],
        "migrated_board_entries": [],
        "rewritten_path_files": [],
        "manual_followups": [],
        "phase_timings_ms": {"rename_entity_ms": 1},
        "failure": null,
        "next_recovery_step": null
    }))
    .unwrap()
}

#[test]
fn records_and_reads_capture() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    let cap = capture("cap-1", "exec-1", 0);

    let path = cfg.record_capture(&cap).unwrap();
    assert!(path.exists());
    assert_eq!(cfg.get_capture("cap-1").unwrap(), cap);
}

#[test]
fn record_capture_rejects_missing_execution_back_link() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    let mut cap = capture("cap-interop", "exec-1", 0);
    cap.links.validation_execution_ids.clear();

    assert!(matches!(
        cfg.record_capture(&cap),
        Err(LogError::InteroperabilityContract { .. })
    ));
}

#[test]
fn missing_capture_reports_not_found() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    assert!(matches!(
        cfg.get_capture("nope"),
        Err(LogError::CaptureNotFound(_))
    ));
}

#[test]
fn lists_captures_filtered_by_execution() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);

    cfg.record_capture(&capture("cap-a", "exec-1", 1)).unwrap();
    cfg.record_capture(&capture("cap-b", "exec-1", 2)).unwrap();
    cfg.record_capture(&capture("cap-c", "exec-2", 3)).unwrap();

    let by_exec = cfg
        .list_captures(&LogCaptureQuery {
            execution_id: Some("exec-1".to_string()),
            ..Default::default()
        })
        .unwrap();
    assert_eq!(by_exec.len(), 2);
    assert_eq!(by_exec[0].id, "cap-b");

    let all = cfg.list_captures(&LogCaptureQuery::default()).unwrap();
    assert_eq!(all.len(), 3);
}

#[test]
fn rejects_path_traversal_ids() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    let cap = capture("../escape", "exec-1", 0);
    assert!(matches!(
        cfg.record_capture(&cap),
        Err(LogError::InvalidId(_))
    ));
}

#[test]
fn records_and_reads_runtime_session() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    let session = runtime_session("session-1", 1);

    let path = cfg.record_runtime_session(&session).unwrap();
    assert!(path.exists());
    assert_eq!(cfg.get_runtime_session("session-1").unwrap(), session);
}

#[test]
fn record_runtime_session_rejects_missing_interoperability_links() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    let mut session = runtime_session("session-interop", 1);
    session.links = RuntimeLogLinks::default();

    assert!(matches!(
        cfg.record_runtime_session(&session),
        Err(LogError::InteroperabilityContract { .. })
    ));
    assert!(matches!(
        cfg.get_runtime_session("session-interop"),
        Err(LogError::RuntimeSessionNotFound(_))
    ));
}

#[test]
fn missing_runtime_session_reports_not_found() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    assert!(matches!(
        cfg.get_runtime_session("nope"),
        Err(LogError::RuntimeSessionNotFound(_))
    ));
}

#[test]
fn records_and_queries_operation_journal_by_kind() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    let journal = operation_journal();
    let journal_id = journal.journal_id.to_string();

    let path = cfg.record_operation_journal(&journal).unwrap();
    assert!(path.ends_with(format!("journals/{journal_id}.json")));
    assert_eq!(cfg.get_operation_journal(&journal_id).unwrap(), journal);

    let journals = cfg
        .list_operation_journals(&OperationJournalQuery {
            operation_kind: Some("move".to_string()),
            ..Default::default()
        })
        .unwrap();
    assert_eq!(journals, vec![journal]);
}

#[test]
fn projects_and_persists_move_journal_as_operation_journal() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);
    let move_journal = move_journal();
    let journal_id = move_journal.id.to_string();

    let path = cfg.record_move_journal(&move_journal).unwrap();

    assert!(path.ends_with(format!("journals/{journal_id}.json")));
    let persisted = cfg.get_operation_journal(&journal_id).unwrap();
    assert_eq!(
        serde_json::to_value(persisted.into_move_journal().unwrap()).unwrap(),
        serde_json::to_value(move_journal).unwrap()
    );
}

#[test]
fn lists_runtime_sessions_with_filters() {
    let dir = TempDir::new().unwrap();
    let cfg = config(&dir);

    let mut a = runtime_session("session-a", 1);
    a.run_id = Some("run-a".to_string());
    let mut b = runtime_session("session-b", 2);
    b.transport = RuntimeLogTransport::Http;
    b.status = RuntimeLogStatus::Completed;
    b.run_id = Some("run-b".to_string());
    b.links.ticket_ids = vec!["ticket-2".to_string()];
    let c = runtime_session("session-c", 3);

    cfg.record_runtime_session(&a).unwrap();
    cfg.record_runtime_session(&b).unwrap();
    cfg.record_runtime_session(&c).unwrap();

    let all = cfg
        .list_runtime_sessions(&RuntimeLogSessionQuery::default())
        .unwrap();
    assert_eq!(all.len(), 3);
    assert_eq!(all[0].id, "session-c");

    let only_http_completed = cfg
        .list_runtime_sessions(&RuntimeLogSessionQuery {
            transport: Some(RuntimeLogTransport::Http),
            status: Some(RuntimeLogStatus::Completed),
            ..Default::default()
        })
        .unwrap();
    assert_eq!(only_http_completed.len(), 1);
    assert_eq!(only_http_completed[0].id, "session-b");

    let ticket_2 = cfg
        .list_runtime_sessions(&RuntimeLogSessionQuery {
            ticket_id: Some("ticket-2".to_string()),
            ..Default::default()
        })
        .unwrap();
    assert_eq!(ticket_2.len(), 1);
    assert_eq!(ticket_2[0].id, "session-b");

    let run_a = cfg
        .list_runtime_sessions(&RuntimeLogSessionQuery {
            run_id: Some("run-a".to_string()),
            ..Default::default()
        })
        .unwrap();
    assert_eq!(run_a.len(), 1);
    assert_eq!(run_a[0].id, "session-a");
}
