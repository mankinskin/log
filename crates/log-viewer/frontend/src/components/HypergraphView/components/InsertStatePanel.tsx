/**
 * InsertStatePanel — Floating panel showing insert operation details.
 *
 * When the active event is an insert operation (split/join/create), this panel
 * displays:
 * - Current insert phase (split → join → create)
 * - Graph delta operations (what changed at this step)
 * - Before/after summary for nodes and edges
 *
 * Sits alongside the SearchStatePanel (which handles step navigation).
 */
import { useMemo } from "preact/hooks";
import { activePathEvent, activeSearchState } from "../../../store";
import type {
    GraphOpEvent,
    GraphMutation,
    DeltaOp,
} from "@context-engine/types";

// ── Phase identification ──

type InsertPhase = "split" | "join" | "create" | "done" | "other";

function getInsertPhase(event: GraphOpEvent): InsertPhase {
    const kind = event.transition?.kind;
    if (!kind) return "other";
    if (kind === "split_start" || kind === "split_complete") return "split";
    if (
        kind === "join_start" ||
        kind === "join_step" ||
        kind === "join_complete"
    )
        return "join";
    if (
        kind === "create_pattern" ||
        kind === "create_root" ||
        kind === "update_pattern"
    )
        return "create";
    if (kind === "done") return "done";
    return "other";
}

function phaseLabel(phase: InsertPhase): string {
    switch (phase) {
        case "split":
            return "Split Phase";
        case "join":
            return "Join Phase";
        case "create":
            return "Create Phase";
        case "done":
            return "Complete";
        default:
            return "Insert";
    }
}

function phaseColor(phase: InsertPhase): string {
    switch (phase) {
        case "split":
            return "#ff8040";
        case "join":
            return "#a0c0ff";
        case "create":
            return "#ffdc60";
        case "done":
            return "#60e080";
        default:
            return "#c0c0c0";
    }
}

// ── Delta operation display ──

function deltaOpIcon(op: DeltaOp): string {
    switch (op.op) {
        case "add_node":
            return "+🔵";
        case "remove_node":
            return "-🔵";
        case "add_edge":
            return "+🔗";
        case "remove_edge":
            return "-🔗";
        case "update_node":
            return "✏️";
    }
}

function deltaOpLabel(op: DeltaOp): string {
    switch (op.op) {
        case "add_node":
            return `Add node ${op.index} (w=${op.width})`;
        case "remove_node":
            return `Remove node ${op.index}`;
        case "add_edge":
            return `Add edge ${op.from}→${op.to} [p${op.pattern_id}]`;
        case "remove_edge":
            return `Remove edge ${op.from}→${op.to} [p${op.pattern_id}]`;
        case "update_node":
            return `Update node ${op.index}: ${op.detail}`;
    }
}

function deltaOpClass(op: DeltaOp): string {
    switch (op.op) {
        case "add_node":
        case "add_edge":
            return "isp-delta-add";
        case "remove_node":
        case "remove_edge":
            return "isp-delta-remove";
        case "update_node":
            return "isp-delta-update";
    }
}

// ── Transition detail extraction ──

function getTransitionDetail(event: GraphOpEvent): string | null {
    const t = event.transition;
    if (!t) return null;
    switch (t.kind) {
        case "split_start":
            return `Splitting node ${t.node.index} at position ${t.split_position}`;
        case "split_complete": {
            const parts: string[] = [`Original: ${t.original_node}`];
            if (t.left_fragment != null) parts.push(`Left: ${t.left_fragment}`);
            if (t.right_fragment != null)
                parts.push(`Right: ${t.right_fragment}`);
            return parts.join(" · ");
        }
        case "join_start":
            return `Joining ${t.nodes.length} nodes: [${t.nodes.join(", ")}]`;
        case "join_step":
            return `${t.left} ⊕ ${t.right} → ${t.result}`;
        case "join_complete":
            return `Result: node ${t.result_node}`;
        case "create_pattern":
            return `Parent ${t.parent}, pattern #${t.pattern_id}: [${t.children.join(", ")}]`;
        case "create_root":
            return `New root node ${t.node.index} (width ${t.node.width})`;
        case "update_pattern":
            return `Parent ${t.parent}: [${t.old_children.join(",")}] → [${t.new_children.join(",")}]`;
        default:
            return null;
    }
}

// ── Delta summary ──

interface DeltaSummary {
    addedNodes: number;
    removedNodes: number;
    addedEdges: number;
    removedEdges: number;
    updatedNodes: number;
}

function computeDeltaSummary(
    delta: GraphMutation | null | undefined,
): DeltaSummary {
    const summary: DeltaSummary = {
        addedNodes: 0,
        removedNodes: 0,
        addedEdges: 0,
        removedEdges: 0,
        updatedNodes: 0,
    };
    if (!delta?.ops) return summary;
    for (const op of delta.ops) {
        switch (op.op) {
            case "add_node":
                summary.addedNodes++;
                break;
            case "remove_node":
                summary.removedNodes++;
                break;
            case "add_edge":
                summary.addedEdges++;
                break;
            case "remove_edge":
                summary.removedEdges++;
                break;
            case "update_node":
                summary.updatedNodes++;
                break;
        }
    }
    return summary;
}

// ── Component ──

function DeltaOpRow({ op }: { op: DeltaOp }) {
    return (
        <div class={`isp-delta-row ${deltaOpClass(op)}`}>
            <span class="isp-delta-icon">{deltaOpIcon(op)}</span>
            <span class="isp-delta-label">{deltaOpLabel(op)}</span>
        </div>
    );
}

function DeltaSection({ delta }: { delta: GraphMutation }) {
    const summary = useMemo(() => computeDeltaSummary(delta), [delta]);
    const hasOps = delta.ops.length > 0;

    if (!hasOps) return null;

    return (
        <div class="isp-delta-section">
            <div class="isp-delta-header">
                <span class="isp-delta-title">Graph Changes</span>
                <span class="isp-delta-summary">
                    {summary.addedNodes > 0 && (
                        <span class="isp-delta-badge isp-badge-add">
                            +{summary.addedNodes} nodes
                        </span>
                    )}
                    {summary.removedNodes > 0 && (
                        <span class="isp-delta-badge isp-badge-remove">
                            -{summary.removedNodes} nodes
                        </span>
                    )}
                    {summary.addedEdges > 0 && (
                        <span class="isp-delta-badge isp-badge-add">
                            +{summary.addedEdges} edges
                        </span>
                    )}
                    {summary.removedEdges > 0 && (
                        <span class="isp-delta-badge isp-badge-remove">
                            -{summary.removedEdges} edges
                        </span>
                    )}
                    {summary.updatedNodes > 0 && (
                        <span class="isp-delta-badge isp-badge-update">
                            {summary.updatedNodes} updated
                        </span>
                    )}
                </span>
            </div>
            <div class="isp-delta-ops">
                {delta.ops.map((op, i) => (
                    <DeltaOpRow key={i} op={op} />
                ))}
            </div>
        </div>
    );
}

export function InsertStatePanel() {
    // Prefer path-group event, fall back to global step
    const event = activePathEvent.value ?? activeSearchState.value;

    // Only show for insert operations
    if (!event || event.op_type !== "insert") return null;

    const phase = getInsertPhase(event);
    const detail = getTransitionDetail(event);
    const delta = event.graph_mutation;

    return (
        <div class="insert-state-panel">
            <div class="isp-header">
                <span class="isp-badge" style={{ color: phaseColor(phase) }}>
                    {phaseLabel(phase)}
                </span>
                <span class="isp-step">Step {event.step}</span>
            </div>

            {detail && <div class="isp-detail">{detail}</div>}

            <div class="isp-description">{event.description}</div>

            {delta && <DeltaSection delta={delta} />}
        </div>
    );
}
