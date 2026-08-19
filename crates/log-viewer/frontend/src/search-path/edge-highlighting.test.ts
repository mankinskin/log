/**
 * Tests for search path edge highlighting computation.
 *
 * Tests the pure functions extracted from useVisualizationState that
 * compute edge pair key sets for start-path, root, and end-path highlighting.
 *
 * The new implementation uses explicit edge refs from VizPathGraph directly
 * (no BFS/topology search needed).
 */

import { describe, it, expect } from "vitest";
import type { VizPathGraph, PathNode, EdgeRef } from "@context-engine/types";
import { edgePairKey, computeSearchEdgeKeys } from "./edge-highlighting";
import { emptyPathGraph } from "./reconstruction";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

function pn(index: number, width = 1): PathNode {
    return { index, width };
}

function er(from: number, to: number, pattern_idx = 0, sub_index = 0): EdgeRef {
    return { from, to, pattern_idx, sub_index };
}

/** Build a minimal VizPathGraph for testing. */
function makePath(overrides: Partial<VizPathGraph> = {}): VizPathGraph {
    return { ...emptyPathGraph(), ...overrides };
}

// ---------------------------------------------------------------------------
// edgePairKey
// ---------------------------------------------------------------------------

describe("edgePairKey", () => {
    it("encodes two indices into a single number", () => {
        expect(edgePairKey(10, 5)).toBe((10 << 16) | 5);
    });

    it("different orderings produce different keys", () => {
        expect(edgePairKey(10, 5)).not.toBe(edgePairKey(5, 10));
    });
});

// ---------------------------------------------------------------------------
// computeSearchEdgeKeys — start path
// ---------------------------------------------------------------------------

describe("computeSearchEdgeKeys: start path", () => {
    it("converts bottom-up start edges to parent→child pair keys", () => {
        const sp = makePath({
            start_node: pn(5),
            start_path: [pn(20), pn(50)],
            // bottom-up: from=child, to=parent
            start_edges: [er(5, 20), er(20, 50)],
        });

        const { startEdgeKeys } = computeSearchEdgeKeys(sp);

        // Layout direction (parent→child): 20→5, 50→20
        expect(startEdgeKeys.has(edgePairKey(20, 5))).toBe(true);
        expect(startEdgeKeys.has(edgePairKey(50, 20))).toBe(true);
        expect(startEdgeKeys.size).toBe(2);
    });

    it("returns empty set when no start edges", () => {
        const sp = makePath({ start_node: pn(5) });
        const { startEdgeKeys } = computeSearchEdgeKeys(sp);
        expect(startEdgeKeys.size).toBe(0);
    });

    it("handles single start edge", () => {
        const sp = makePath({
            start_node: pn(5),
            start_path: [pn(20)],
            start_edges: [er(5, 20)],
        });

        const { startEdgeKeys } = computeSearchEdgeKeys(sp);

        expect(startEdgeKeys.has(edgePairKey(20, 5))).toBe(true);
        expect(startEdgeKeys.size).toBe(1);
    });
});

// ---------------------------------------------------------------------------
// computeSearchEdgeKeys — root edges
// ---------------------------------------------------------------------------

describe("computeSearchEdgeKeys: root edges", () => {
    it("computes root entry edge (flipped to parent→child)", () => {
        const sp = makePath({
            start_node: pn(5),
            start_path: [pn(20), pn(50)],
            start_edges: [er(5, 20), er(20, 50)],
            root: pn(100),
            // bottom-up: from=child(50), to=root(100)
            root_entry_edge: er(50, 100),
        });

        const { rootEntryEdgeKeys } = computeSearchEdgeKeys(sp);

        // Layout direction: parent(100)→child(50)
        expect(rootEntryEdgeKeys.has(edgePairKey(100, 50))).toBe(true);
        expect(rootEntryEdgeKeys.size).toBe(1);
    });

    it("computes root exit edge (already parent→child)", () => {
        const sp = makePath({
            start_node: pn(5),
            root: pn(100),
            root_entry_edge: er(5, 100),
            // top-down: from=root(100), to=child(50)
            root_exit_edge: er(100, 50),
            end_path: [pn(50)],
            end_edges: [er(100, 50)],
        });

        const { rootEntryEdgeKeys, rootExitEdgeKeys } =
            computeSearchEdgeKeys(sp);

        // Entry: layout 100→5
        expect(rootEntryEdgeKeys.has(edgePairKey(100, 5))).toBe(true);
        expect(rootEntryEdgeKeys.size).toBe(1);
        // Exit: layout 100→50
        expect(rootExitEdgeKeys.has(edgePairKey(100, 50))).toBe(true);
        expect(rootExitEdgeKeys.size).toBe(1);
    });

    it("includes both entry and exit when both present", () => {
        const sp = makePath({
            start_node: pn(5),
            start_path: [pn(20)],
            start_edges: [er(5, 20)],
            root: pn(100),
            root_entry_edge: er(20, 100),
            root_exit_edge: er(100, 50),
            end_path: [pn(50)],
            end_edges: [er(100, 50)],
        });

        const { rootEntryEdgeKeys, rootExitEdgeKeys } =
            computeSearchEdgeKeys(sp);

        // Entry: layout 100→20
        expect(rootEntryEdgeKeys.has(edgePairKey(100, 20))).toBe(true);
        expect(rootEntryEdgeKeys.size).toBe(1);
        // Exit: layout 100→50
        expect(rootExitEdgeKeys.has(edgePairKey(100, 50))).toBe(true);
        expect(rootExitEdgeKeys.size).toBe(1);
    });

    it("empty when no root edges", () => {
        const sp = makePath({ start_node: pn(5) });
        const { rootEntryEdgeKeys, rootExitEdgeKeys } =
            computeSearchEdgeKeys(sp);
        expect(rootEntryEdgeKeys.size).toBe(0);
        expect(rootExitEdgeKeys.size).toBe(0);
    });

    it("entry only when no exit edge", () => {
        const sp = makePath({
            start_node: pn(5),
            root: pn(100),
            root_entry_edge: er(5, 100),
        });

        const { rootEntryEdgeKeys, rootExitEdgeKeys } =
            computeSearchEdgeKeys(sp);

        expect(rootEntryEdgeKeys.has(edgePairKey(100, 5))).toBe(true);
        expect(rootEntryEdgeKeys.size).toBe(1);
        expect(rootExitEdgeKeys.size).toBe(0);
    });
});

// ---------------------------------------------------------------------------
// computeSearchEdgeKeys — end path
// ---------------------------------------------------------------------------

describe("computeSearchEdgeKeys: end path", () => {
    it("uses end_edges directly (already parent→child)", () => {
        const sp = makePath({
            start_node: pn(5),
            root: pn(100),
            root_entry_edge: er(5, 100),
            root_exit_edge: er(100, 50),
            end_path: [pn(50), pn(20)],
            end_edges: [er(100, 50), er(50, 20)],
        });

        const { endEdgeKeys } = computeSearchEdgeKeys(sp);

        expect(endEdgeKeys.has(edgePairKey(100, 50))).toBe(true);
        expect(endEdgeKeys.has(edgePairKey(50, 20))).toBe(true);
        expect(endEdgeKeys.size).toBe(2);
    });

    it("returns empty set when no end edges", () => {
        const sp = makePath({
            start_node: pn(5),
            root: pn(100),
            root_entry_edge: er(5, 100),
        });

        const { endEdgeKeys } = computeSearchEdgeKeys(sp);
        expect(endEdgeKeys.size).toBe(0);
    });

    it("handles single end edge", () => {
        const sp = makePath({
            start_node: pn(5),
            root: pn(100),
            root_entry_edge: er(5, 100),
            root_exit_edge: er(100, 50),
            end_path: [pn(50)],
            end_edges: [er(100, 50)],
        });

        const { endEdgeKeys } = computeSearchEdgeKeys(sp);

        expect(endEdgeKeys.has(edgePairKey(100, 50))).toBe(true);
        expect(endEdgeKeys.size).toBe(1);
    });
});

// ---------------------------------------------------------------------------
// computeSearchEdgeKeys — empty / edge cases
// ---------------------------------------------------------------------------

describe("computeSearchEdgeKeys: edge cases", () => {
    it("returns empty sets for empty path graph", () => {
        const sp = emptyPathGraph();
        const {
            startEdgeKeys,
            rootEntryEdgeKeys,
            rootExitEdgeKeys,
            endEdgeKeys,
        } = computeSearchEdgeKeys(sp);
        expect(startEdgeKeys.size).toBe(0);
        expect(rootEntryEdgeKeys.size).toBe(0);
        expect(rootExitEdgeKeys.size).toBe(0);
        expect(endEdgeKeys.size).toBe(0);
    });

    it("handles start_node only (no start_path, no root)", () => {
        const sp = makePath({ start_node: pn(5) });
        const {
            startEdgeKeys,
            rootEntryEdgeKeys,
            rootExitEdgeKeys,
            endEdgeKeys,
        } = computeSearchEdgeKeys(sp);
        expect(startEdgeKeys.size).toBe(0);
        expect(rootEntryEdgeKeys.size).toBe(0);
        expect(rootExitEdgeKeys.size).toBe(0);
        expect(endEdgeKeys.size).toBe(0);
    });

    it("full path: all sections populated", () => {
        const sp = makePath({
            start_node: pn(5),
            start_path: [pn(20), pn(50)],
            start_edges: [er(5, 20), er(20, 50)],
            root: pn(100),
            root_entry_edge: er(50, 100),
            root_exit_edge: er(100, 30),
            end_path: [pn(30), pn(10)],
            end_edges: [er(100, 30), er(30, 10)],
        });

        const {
            startEdgeKeys,
            rootEntryEdgeKeys,
            rootExitEdgeKeys,
            endEdgeKeys,
        } = computeSearchEdgeKeys(sp);

        // Start: 20→5, 50→20
        expect(startEdgeKeys.size).toBe(2);
        expect(startEdgeKeys.has(edgePairKey(20, 5))).toBe(true);
        expect(startEdgeKeys.has(edgePairKey(50, 20))).toBe(true);

        // Root entry: 100→50
        expect(rootEntryEdgeKeys.size).toBe(1);
        expect(rootEntryEdgeKeys.has(edgePairKey(100, 50))).toBe(true);
        // Root exit: 100→30
        expect(rootExitEdgeKeys.size).toBe(1);
        expect(rootExitEdgeKeys.has(edgePairKey(100, 30))).toBe(true);

        // End: 100→30, 30→10
        expect(endEdgeKeys.size).toBe(2);
        expect(endEdgeKeys.has(edgePairKey(100, 30))).toBe(true);
        expect(endEdgeKeys.has(edgePairKey(30, 10))).toBe(true);
    });
});
