// Types for the Log Viewer application
//
// Generated types (from Rust via ts-rs) are now consumed from the shared
// @context-engine/types package.  Regenerate with:
//   cargo test --features ts-gen -p context-api -p context-trace -p log-viewer export_bindings

// ── Re-export generated types from the shared package ──
export type {
    AssertionDiff,
    EdgeRef,
    GraphOpEvent,
    GraphSnapshot,
    JqQueryResponse,
    LocationInfo,
    LogContentResponse,
    LogEntry,
    LogFileInfo,
    OperationType,
    PathNode,
    PathTransition,
    QueryInfo,
    SearchResponse,
    SnapshotEdge,
    SnapshotNode,
    Transition,
    VizPathGraph,
} from "@context-engine/types";

// ── Frontend-only types (not generated from Rust) ──

// Alias: LogFileInfo was previously called LogFile in the frontend
export type { LogFileInfo as LogFile } from "@context-engine/types";

export type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";
export type EventType = "event" | "span_enter" | "span_exit" | "unknown";

export interface SourceFileResponse {
    path: string;
    content: string;
    language: string;
    total_lines: number;
}

export interface SourceSnippet {
    path: string;
    content: string;
    start_line: number;
    end_line: number;
    highlight_line: number;
    language: string;
}

export type ViewTab =
    | "logs"
    | "code"
    | "debug"
    | "scene3d"
    | "hypergraph"
    | "settings";

// Snapshot aliases (match the old naming convention used across the frontend)
export type { GraphSnapshot as HypergraphSnapshot } from "@context-engine/types";
export type { SnapshotNode as HypergraphNode } from "@context-engine/types";
export type { SnapshotEdge as HypergraphEdge } from "@context-engine/types";

export interface FlowNode {
    id: string;
    entry: import("@context-engine/types").LogEntry;
    type: "event" | "span";
}

export interface FlowEdge {
    source: string;
    target: string;
}

// Legacy alias for backwards compatibility
export type SearchStateEvent = import("@context-engine/types").GraphOpEvent;

// Forward-compatible replay envelope emitted by context-trace.
export interface GraphReplayStep {
    step: number;
    transition: import("@context-engine/types").Transition;
    location: import("@context-engine/types").LocationInfo;
    query: import("@context-engine/types").QueryInfo;
    description: string;
    path_graph: import("@context-engine/types").VizPathGraph;
    graph_mutation?: unknown;
}

export interface GraphReplayEnvelope {
    schema_version: string;
    operation_id: string;
    path_id: string;
    op_type: import("@context-engine/types").OperationType;
    run_id?: string;
    session_id?: string;
    journal_id?: string;
    step: GraphReplayStep;
}

export interface LogStats {
    levelCounts: Record<LogLevel, number>;
    typeCounts: Record<EventType, number>;
    timelineData: { timestamp: number; count: number }[];
    topSpans: { name: string; count: number; avgDuration: number }[];
}
