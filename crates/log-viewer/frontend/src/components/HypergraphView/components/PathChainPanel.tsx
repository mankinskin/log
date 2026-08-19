/**
 * PathChainPanel — Shows the current search path chain as a visual breadcrumb.
 *
 * Displays: start_node → start_path... → root → end_path...
 * Each node is clickable to focus the camera.
 * Edges between nodes show direction (↑ for start path, ↓ for end path).
 */
import { activeSearchPath } from "../../../store";
import type { VizPathGraph, PathNode } from "@context-engine/types";

interface PathChainPanelProps {
    onFocusNode: (nodeIndex: number) => void;
}

/** Badge for a node in the chain. */
function ChainNode({
    node,
    role,
    onClick,
}: {
    node: PathNode;
    role: "start" | "start-path" | "root" | "end-path";
    onClick: () => void;
}) {
    const roleClass = `pc-node-${role}`;
    return (
        <button
            class={`pc-node ${roleClass}`}
            onClick={onClick}
            title={`Node #${node.index} (width ${node.width})`}
        >
            <span class="pc-node-idx">#{node.index}</span>
            {node.width > 1 && <span class="pc-node-width">w{node.width}</span>}
        </button>
    );
}

/** Arrow between chain nodes showing traversal direction. */
function ChainArrow({ direction }: { direction: "up" | "down" | "root" }) {
    const symbol = direction === "up" ? "↑" : direction === "down" ? "↓" : "◆";
    const cls = `pc-arrow pc-arrow-${direction}`;
    return <span class={cls}>{symbol}</span>;
}

/** Format cursor position and match status. */
function StatusBadge({ graph }: { graph: VizPathGraph }) {
    if (!graph.done) {
        return (
            <span class="pc-status pc-status-active">
                pos {graph.cursor_pos}
            </span>
        );
    }
    return (
        <span
            class={`pc-status ${graph.success ? "pc-status-match" : "pc-status-mismatch"}`}
        >
            {graph.success ? "✓ match" : "✗ mismatch"} @ {graph.cursor_pos}
        </span>
    );
}

export function PathChainPanel({ onFocusNode }: PathChainPanelProps) {
    const graph = activeSearchPath.value;
    if (!graph || !graph.start_node) return null;

    // Build the chain: start_node → start_path (bottom-up) → root → end_path (top-down)
    const startNode = graph.start_node;
    const startPath = graph.start_path; // ordered: closest parent first, furthest last
    const root = graph.root;
    const endPath = graph.end_path; // ordered: closest to root first, furthest last

    return (
        <div class="path-chain-panel">
            <div class="pc-header">
                <span class="pc-title">Search Path</span>
                <StatusBadge graph={graph} />
            </div>
            <div class="pc-chain">
                {/* Start node */}
                <ChainNode
                    node={startNode}
                    role="start"
                    onClick={() => onFocusNode(startNode.index)}
                />

                {/* Start path (upward: each arrow points up) */}
                {startPath.map((node, i) => (
                    <span key={`sp-${i}`} class="pc-segment">
                        <ChainArrow direction="up" />
                        <ChainNode
                            node={node}
                            role="start-path"
                            onClick={() => onFocusNode(node.index)}
                        />
                    </span>
                ))}

                {/* Root */}
                {root && (
                    <span class="pc-segment">
                        <ChainArrow direction="root" />
                        <ChainNode
                            node={root}
                            role="root"
                            onClick={() => onFocusNode(root.index)}
                        />
                    </span>
                )}

                {/* End path (downward: each arrow points down) */}
                {endPath.map((node, i) => (
                    <span key={`ep-${i}`} class="pc-segment">
                        <ChainArrow direction="down" />
                        <ChainNode
                            node={node}
                            role="end-path"
                            onClick={() => onFocusNode(node.index)}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}
