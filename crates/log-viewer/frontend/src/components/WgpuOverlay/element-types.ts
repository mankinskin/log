/**
 * Element selector registry, kind constants, and precomputed metadata.
 * Pure data — no DOM access, no GPU dependency.
 */

// ---------------------------------------------------------------------------
// CSS selectors for UI regions to shade.
// ---------------------------------------------------------------------------

/**
 * Each selector gets its own stable hue (index / length).
 *
 * Entries are grouped:
 *   0-7  : structural UI regions  (low-intensity border glow)
 *   8-12 : log entry levels       (colour-coded per severity)
 *   13   : highlighted span group (bright shimmer)
 *   14   : selected log entry     (intense focus glow)
 *   15   : panic entries          (alarm pulse)
 *   16-19: effect preview containers (theme settings)
 */
export const ELEMENT_SELECTORS = [
    // --- structural regions (hue 0.00 – 0.53) ---
    '.header',
    '.sidebar',
    '.tab-bar',
    '.filter-panel',
    '.view-container',
    '.log-list',
    '.code-viewer',
    // --- per-level log entries (hue 0.53 – 0.82) ---
    '.log-entry.level-error',
    '.log-entry.level-warn',
    '.log-entry.level-info',
    '.log-entry.level-debug',
    '.log-entry.level-trace',
    // --- interactive states ---
    '.log-entry.span-highlighted',
    '.log-entry.selected',
    '.log-entry.panic-entry',
    // --- effect preview containers (theme settings) ---
    '.effect-preview-sparks',
    '.effect-preview-embers',
    '.effect-preview-beams',
    '.effect-preview-glitter',
] as const;

// ---------------------------------------------------------------------------
// Element kind constants — passed to the shader so it can vary the glow
// style per element category.
// ---------------------------------------------------------------------------

export const KIND_STRUCTURAL = 0;
export const KIND_ERROR      = 1;
export const KIND_WARN       = 2;
export const KIND_INFO       = 3;
export const KIND_DEBUG      = 4;
export const KIND_SPAN_HL    = 5;
export const KIND_SELECTED   = 6;
export const KIND_PANIC      = 7;
export const KIND_FX_SPARK = 8;
export const KIND_FX_EMBER = 9;
export const KIND_FX_BEAM = 10;
export const KIND_FX_GLITTER = 11;

/** f32 values per element in the storage buffer: [x, y, w, h, hue, kind, depth, _p2] */
export const ELEM_FLOATS = 8;
export const ELEM_BYTES  = ELEM_FLOATS * 4;  // 32 bytes, 16-byte aligned

/** Number of particles simulated by the compute shader. */
export const NUM_PARTICLES = 640;
/**
 * Floats per particle (48 bytes total).
 * Layout: [pos.x, pos.y, pos.z, life, vel.x, vel.y, vel.z, max_life,
 *          hue, size, kind_view, spawn_t]
 * Note: vec3f has alignment 16 in storage; life/max_life fill the padding.
 */
export const PARTICLE_FLOATS  = 12;
export const PARTICLE_BYTES   = PARTICLE_FLOATS * 4;  // 48 bytes
export const PARTICLE_BUF_SIZE = NUM_PARTICLES * PARTICLE_BYTES;
export const COMPUTE_WORKGROUP = 64;

/** Particle index ranges per type (must match WGSL constants). */
export const SPARK_START = 0;
export const SPARK_END = 96;
export const EMBER_START = SPARK_END;
export const EMBER_END = 288;
export const RAY_START = EMBER_END;
export const RAY_END = 544;
export const GLITTER_START = RAY_END;
export const GLITTER_END = 640;

/** Map selector index → element kind for the shader. */
export function selectorKind(selectorIndex: number): number {
    if (selectorIndex < 8)  return KIND_STRUCTURAL; // 0-7: header, sidebar, etc.
    if (selectorIndex === 8)  return KIND_ERROR;
    if (selectorIndex === 9)  return KIND_WARN;
    if (selectorIndex === 10) return KIND_INFO;
    if (selectorIndex === 11) return KIND_DEBUG;
    if (selectorIndex === 12) return KIND_DEBUG; // trace → same as debug
    if (selectorIndex === 13) return KIND_SPAN_HL;
    if (selectorIndex === 14) return KIND_SELECTED;
    if (selectorIndex === 15) return KIND_PANIC;
    if (selectorIndex === 16) return KIND_FX_SPARK;
    if (selectorIndex === 17) return KIND_FX_EMBER;
    if (selectorIndex === 18) return KIND_FX_BEAM;
    if (selectorIndex === 19) return KIND_FX_GLITTER;
    return KIND_STRUCTURAL;
}

// ---------------------------------------------------------------------------
// Pre-computed selector metadata (avoids per-element `matches()` calls)
// ---------------------------------------------------------------------------

export const SELECTOR_META: ReadonlyArray<{ sel: string; hue: number; kind: number }> =
    ELEMENT_SELECTORS.map((sel, i) => ({
        sel,
        hue: i < 16 ? i / 16 : 0.5,  // stable hues for original 16; previews use neutral
        kind: selectorKind(i),
    }));

/** Selector indices that MUST be included even when the buffer is nearly full.
 *  These are small-cardinality interactive-state selectors that drive particle
 *  effects (beams, glitter, glow).  We scan them first so they always get
 *  slots in the element buffer. */
export const PRIORITY_SELECTOR_INDICES = new Set([13, 14, 15, 16, 17, 18, 19]);

/**
 * Pre-computed selector scan order: priority selectors first, then the rest.
 * Ensures interactive-state selectors (selected, span-highlighted, panic)
 * win over level selectors when an element matches both.
 */
export const SELECTOR_SCAN_ORDER: readonly number[] = (() => {
    const order: number[] = [];
    for (const si of PRIORITY_SELECTOR_INDICES) order.push(si);
    for (let i = 0; i < ELEMENT_SELECTORS.length; i++) {
        if (!PRIORITY_SELECTOR_INDICES.has(i)) order.push(i);
    }
    return order;
})();

// ---------------------------------------------------------------------------
// View/tab ID mapping for per-view particle filtering.
// Must match types.wgsl current_view values.
// ---------------------------------------------------------------------------

import type { ViewTab } from '../../types';

/** Map View tab names to numeric IDs for GPU uniforms. */
export const VIEW_ID: Record<ViewTab, number> = {
    logs: 0,
    code: 1,
    debug: 2,
    scene3d: 3,
    hypergraph: 4,
    settings: 5,
};
