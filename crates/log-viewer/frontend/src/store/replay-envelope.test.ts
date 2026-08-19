import { describe, expect, it } from "vitest";

import type { GraphReplayEnvelope } from "../types";
import { emptyPathGraph } from "../search-path/reconstruction";
import { replayEnvelopeToGraphOp } from "./index";

function sampleEnvelope(
    overrides: Partial<GraphReplayEnvelope> = {},
): GraphReplayEnvelope {
    return {
        schema_version: "graph-replay/v1",
        operation_id: "search/context-search/op-1",
        path_id: "search/context-search/op-1",
        op_type: "search",
        step: {
            step: 3,
            transition: {
                kind: "done",
                final_node: 42,
                success: true,
            },
            location: {
                selected_node: null,
                root_node: null,
                trace_path: [],
                completed_nodes: [],
                pending_parents: [],
                pending_children: [],
            },
            query: {
                query_tokens: [],
                cursor_position: 0,
                query_width: 0,
                matched_positions: [],
                active_token: null,
            },
            description: "Search complete",
            path_graph: emptyPathGraph(),
        },
        ...overrides,
    };
}

describe("replayEnvelopeToGraphOp", () => {
    it("normalizes graph-replay/v1 to a search-state event", () => {
        const replay = sampleEnvelope();
        const event = replayEnvelopeToGraphOp(replay);

        expect(event).not.toBeNull();
        expect(event!.step).toBe(3);
        expect(event!.path_id).toBe(replay.path_id);
        expect(event!.description).toBe("Search complete");
        expect(event!.transition.kind).toBe("done");
    });

    it("rejects unknown schema versions", () => {
        const replay = sampleEnvelope({ schema_version: "graph-replay/v2" });
        const event = replayEnvelopeToGraphOp(replay);
        expect(event).toBeNull();
    });
});
