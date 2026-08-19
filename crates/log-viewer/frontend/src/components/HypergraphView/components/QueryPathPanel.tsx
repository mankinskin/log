/**
 * QueryPathPanel — Displays the input query pattern as a token strip
 * with cursor position and match/mismatch highlighting.
 *
 * Reads `query` from the active graph-op event:
 * - `query_tokens`: token indices in the pattern
 * - `cursor_position`: current atom cursor (0-based)
 * - `query_width`: total atoms in query
 * - `matched_positions`: atom positions confirmed matched
 * - `active_token`: token being compared right now
 *
 * Renders a horizontal strip of tokens. Each token shows:
 * - Token index badge
 * - Atom-width indicator
 * - Color state: idle / active / matched / mismatched
 */
import { useMemo } from "preact/hooks";
import { activePathEvent, activeSearchState } from "../../../store";
import type { QueryInfo } from "@context-engine/types";
import { hypergraphSnapshot } from "../../../store";

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Resolve a token index to its display label from the snapshot.
 * Falls back to `#idx` if not found.
 */
function tokenLabel(idx: number): string {
    const snap = hypergraphSnapshot.value;
    if (!snap) return `#${idx}`;
    const node = snap.nodes.find((n) => n.index === idx);
    return node?.label ?? `#${idx}`;
}

/**
 * Compute a cumulative atom-offset array from query tokens.
 * tokenOffset[i] = sum of widths of tokens 0..i-1.
 * Used to map atom positions → token index.
 */
function computeTokenOffsets(_query: QueryInfo, widths: number[]): number[] {
    const offsets: number[] = [0];
    for (let i = 0; i < widths.length; i++) {
        offsets.push(offsets[i]! + widths[i]!);
    }
    return offsets;
}

type TokenState =
    | "idle"
    | "matched"
    | "active-match"
    | "active-mismatch"
    | "cursor";

/**
 * Determine the visual state of each query token.
 */
function computeTokenStates(
    query: QueryInfo,
    offsets: number[],
    transitionKind: string | undefined,
): TokenState[] {
    const n = query.query_tokens.length;
    const states: TokenState[] = new Array(n).fill("idle");
    const matched = new Set(query.matched_positions ?? []);
    const cursor = query.cursor_position;

    for (let i = 0; i < n; i++) {
        const start = offsets[i]!;
        const end = offsets[i + 1]!;

        // Check if this token's atom range overlaps any matched position
        let isMatched = false;
        for (let pos = start; pos < end; pos++) {
            if (matched.has(pos)) {
                isMatched = true;
                break;
            }
        }

        // Check if cursor falls within this token's atom range
        const cursorInToken = cursor >= start && cursor < end;

        if (cursorInToken && transitionKind === "child_mismatch") {
            states[i] = "active-mismatch";
        } else if (cursorInToken && transitionKind === "child_match") {
            states[i] = "active-match";
        } else if (isMatched) {
            states[i] = "matched";
        } else if (cursorInToken) {
            states[i] = "cursor";
        }
    }

    return states;
}

// ── Component ──────────────────────────────────────────────────────────

export function QueryPathPanel() {
    const event = activePathEvent.value ?? activeSearchState.value;
    const query = event?.query;

    // Don't render if no query data or empty tokens
    if (!query || !query.query_tokens.length) return null;

    const snap = hypergraphSnapshot.value;

    // Compute token widths from the snapshot
    const widths = useMemo(() => {
        if (!snap) return query.query_tokens.map(() => 1);
        return query.query_tokens.map((idx) => {
            const node = snap.nodes.find((n) => n.index === idx);
            return node?.width ?? 1;
        });
    }, [query.query_tokens, snap]);

    const offsets = useMemo(
        () => computeTokenOffsets(query, widths),
        [query, widths],
    );

    const transitionKind = event?.transition?.kind;
    const tokenStates = useMemo(
        () => computeTokenStates(query, offsets, transitionKind),
        [query, offsets, transitionKind],
    );

    // Progress bar: fraction of query matched
    const progress =
        query.query_width > 0
            ? Math.min(query.cursor_position / query.query_width, 1)
            : 0;

    return (
        <div class="qp-panel">
            <div class="qp-header">
                <span class="qp-title">Query Pattern</span>
                <span class="qp-progress-label">
                    {query.cursor_position}/{query.query_width}
                </span>
            </div>

            {/* Progress bar */}
            <div class="qp-progress-bar">
                <div
                    class="qp-progress-fill"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            {/* Token strip */}
            <div class="qp-tokens">
                {query.query_tokens.map((tokenIdx, i) => {
                    const state = tokenStates[i] ?? "idle";
                    const width = widths[i] ?? 1;
                    const label = tokenLabel(tokenIdx);
                    const isActive = query.active_token === tokenIdx;

                    return (
                        <div
                            key={i}
                            class={`qp-token qp-token-${state} ${isActive ? "qp-token-compared" : ""}`}
                            title={`Token #${tokenIdx} (width ${width}, atoms ${offsets[i]}–${(offsets[i + 1] ?? 0) - 1})`}
                        >
                            <span class="qp-token-label">{label}</span>
                            {width > 1 && (
                                <span class="qp-token-width">w{width}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
