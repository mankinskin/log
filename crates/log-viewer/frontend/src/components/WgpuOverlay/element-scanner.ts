/**
 * Reactive DOM → GPU element bridge.
 *
 * Replaces the old full-re-scan-on-dirty-flag approach with:
 *   - Incremental MutationObserver processing (reclassify single elements)
 *   - IntersectionObserver for cheap visibility tracking
 *   - Dynamic Float32Array growth (no MAX_ELEMENTS limit)
 *   - Rect measurement batching (only measure stale + visible elements)
 *   - Full re-scan only on large DOM changes or explicit invalidation
 */

import {
    ELEM_FLOATS,
    SELECTOR_META,
    PRIORITY_SELECTOR_INDICES,
    SELECTOR_SCAN_ORDER,
} from './element-types';

// ---------------------------------------------------------------------------
// Tracked element
// ---------------------------------------------------------------------------

interface TrackedElement {
    /** Weak reference to DOM node (allows GC detection). */
    ref: WeakRef<Element>;
    /** Which selector matched (index into SELECTOR_META). */
    selectorIdx: number;
    /** Shader kind. */
    kind: number;
    /** Colour hue (0..1). */
    hue: number;
    /** Last measured rect (null = needs initial measurement). */
    rect: DOMRect | null;
    /** Whether element is in the viewport. */
    visible: boolean;
    /** Whether rect needs re-measurement. */
    rectStale: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Initial Float32Array capacity (in number of elements). */
const INITIAL_CAPACITY = 128;

/**
 * If a single MutationObserver callback delivers more than this many added
 * nodes, fall back to a full re-scan instead of per-node diffing.
 */
const BATCH_THRESHOLD = 50;

// ---------------------------------------------------------------------------
// ElementScanner
// ---------------------------------------------------------------------------

export class ElementScanner {
    /** Current element data ready for GPU upload. */
    private _data: Float32Array;
    /** Number of elements currently packed. */
    private _count = 0;
    /** Capacity of the current Float32Array (in elements). */
    private _capacity: number;

    /** Identity-tracked elements. */
    private _tracked: TrackedElement[] = [];
    /** Quick lookup: DOM element → tracked entry. */
    private _elementMap = new Map<Element, TrackedElement>();

    /** IntersectionObserver for viewport visibility. */
    private _io: IntersectionObserver | null = null;
    /** ResizeObserver for per-element size change detection. */
    private _ro: ResizeObserver | null = null;
    /** MutationObserver for incremental DOM tracking. */
    private _mo: MutationObserver | null = null;

    /** Dirty flags. */
    private _fullRescanPending = true;
    private _rectsStale = false;
    /**
     * Set when element classification (kind/hue) changes without a rect
     * change.  Forces `_rebuildData()` even if no rects moved.
     */
    private _dataStale = false;

    /** Accumulated scroll deltas since last frame (pixels, screen-space). */
    private _scrollDx = 0;
    private _scrollDy = 0;
    /** True when a full re-scan was just performed (view change). */
    private _justDidFullRescan = false;

    /** Event listeners (stored for cleanup). */
    private readonly _onScroll = (e: Event) => {
        this._markAllRectsStale();
        // Accumulate the scroll delta from the target element.
        // getBoundingClientRect on tracked elements will reflect the new
        // scroll offset, but live particles need to be shifted to match.
        const tgt = e.target as Element | Document;
        const el = (tgt === document || tgt === document.documentElement)
            ? document.documentElement : tgt as Element;
        // We can't easily get "delta" from a scroll event, so we store
        // the last known scrollTop/scrollLeft per element and diff.
        const key = el;
        const prev = this._scrollPositions.get(key);
        const sx = el.scrollLeft;
        const sy = el.scrollTop;
        if (prev) {
            // Scroll delta in screen space: elements move opposite to scroll direction
            this._scrollDx -= sx - prev.x;
            this._scrollDy -= sy - prev.y;
            prev.x = sx;
            prev.y = sy;
        } else {
            this._scrollPositions.set(key, { x: sx, y: sy });
        }
    };
    private readonly _onResize = () => { this._markAllRectsStale(); };

    /** Tracked scroll positions per scrollable container. */
    private _scrollPositions = new Map<Element, { x: number; y: number }>();

    constructor() {
        this._capacity = INITIAL_CAPACITY;
        this._data = new Float32Array(INITIAL_CAPACITY * ELEM_FLOATS);
    }

    // --- Public getters ----------------------------------------------------

    /** Float32Array ready for GPU upload. */
    get data(): Float32Array { return this._data; }

    /** Number of elements currently written to `data`. */
    get count(): number { return this._count; }

    /** Capacity of the internal buffer (in elements). */
    get capacity(): number { return this._capacity; }

    /** Reusable scroll delta object (avoids per-frame allocation). */
    private readonly _scrollDeltaResult = { dx: 0, dy: 0 };

    /** Consume accumulated scroll deltas (resets to 0 after reading). */
    consumeScrollDelta(): { dx: number; dy: number } {
        this._scrollDeltaResult.dx = this._scrollDx;
        this._scrollDeltaResult.dy = this._scrollDy;
        this._scrollDx = 0;
        this._scrollDy = 0;
        return this._scrollDeltaResult;
    }

    /** True if a full re-scan just completed (view change / invalidateAll). */
    get didFullRescan(): boolean { return this._justDidFullRescan; }

    // --- Lifecycle ----------------------------------------------------------

    /** Start observing DOM. Call once after DOM is ready. */
    start(): void {
        // IntersectionObserver for cheap visibility tracking
        this._io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    const tracked = this._elementMap.get(e.target);
                    if (tracked) {
                        tracked.visible = e.isIntersecting;
                        if (e.isIntersecting) {
                            tracked.rectStale = true;
                            this._rectsStale = true;
                        }
                    }
                }
            },
            { threshold: 0 },
        );

        // ResizeObserver — fires per-element when its border box changes.
        // Catches expanding/collapsing entries, CSS transitions/animations,
        // and any layout change the browser detects on a tracked element.
        this._ro = new ResizeObserver((entries) => {
            for (const e of entries) {
                const tracked = this._elementMap.get(e.target);
                if (tracked) {
                    tracked.rectStale = true;
                    this._rectsStale = true;
                }
            }
        });

        // MutationObserver for incremental DOM changes
        this._mo = new MutationObserver((records) => {
            this._processMutations(records);
        });
        this._mo.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style'],
        });

        // Scroll + resize → mark rects stale (not a full re-scan)
        window.addEventListener('scroll', this._onScroll, true);
        window.addEventListener('resize', this._onResize);

        // Initial full scan
        this._fullRescanPending = true;
    }

    /** Stop observing and release resources. */
    destroy(): void {
        this._io?.disconnect();
        this._io = null;
        this._ro?.disconnect();
        this._ro = null;
        this._mo?.disconnect();
        this._mo = null;
        window.removeEventListener('scroll', this._onScroll, true);
        window.removeEventListener('resize', this._onResize);
        this._tracked = [];
        this._elementMap.clear();
        this._scrollPositions.clear();
        this._count = 0;
    }

    /** Force a full re-scan (tab change, etc.). */
    invalidateAll(): void {
        this._fullRescanPending = true;
    }

    /**
     * Per-frame update: measure stale rects, compact dead elements,
     * and rebuild the Float32Array.  Returns `true` if data changed.
     */
    updateFrame(): boolean {
        let changed = false;
        this._justDidFullRescan = false;

        // 1. Full re-scan if pending
        if (this._fullRescanPending) {
            this._fullRescan();
            this._fullRescanPending = false;
            this._justDidFullRescan = true;
            // Reset scroll tracking — old positions are meaningless after view change
            this._scrollPositions.clear();
            this._scrollDx = 0;
            this._scrollDy = 0;
            changed = true;
        }

        // 2. Compact: remove GC'd elements
        const compacted = this._compactDead();
        if (compacted) changed = true;

        // 3. Measure stale rects for visible elements
        if (this._rectsStale || changed) {
            const measured = this._measureStaleRects();
            if (measured) changed = true;
            this._rectsStale = false;
        }

        // 4. Rebuild Float32Array if anything changed
        if (this._dataStale) {
            changed = true;
            this._dataStale = false;
        }
        if (changed) {
            this._rebuildData();
        }

        return changed;
    }

    // --- Internal: mutation processing -------------------------------------

    private _processMutations(records: MutationRecord[]): void {
        let totalAdded = 0;
        let hasChildListMutation = false;

        for (const rec of records) {
            if (rec.type === 'childList') {
                hasChildListMutation = true;
                // Remove tracked elements whose DOM nodes were removed
                for (let i = 0; i < rec.removedNodes.length; i++) {
                    const node = rec.removedNodes[i]!;
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this._removeTrackedTree(node as Element);
                    }
                }
                // Count added nodes for batch threshold
                totalAdded += rec.addedNodes.length;
            } else if (rec.type === 'attributes') {
                const target = rec.target;
                if (target.nodeType === Node.ELEMENT_NODE) {
                    if (rec.attributeName === 'class') {
                        this._reclassifyElement(target as Element);
                    }
                    // For class/style changes, mark only the target element
                    // stale.  ResizeObserver will reactively catch any
                    // cascading size changes on other tracked elements.
                    const tracked = this._elementMap.get(target as Element);
                    if (tracked) {
                        tracked.rectStale = true;
                        this._rectsStale = true;
                    }
                }
            }
        }

        // If many nodes were added, do a full re-scan instead of per-node diff
        if (totalAdded > BATCH_THRESHOLD) {
            this._fullRescanPending = true;
        } else if (totalAdded > 0) {
            // Scan added nodes individually
            for (const rec of records) {
                if (rec.type === 'childList') {
                    for (let i = 0; i < rec.addedNodes.length; i++) {
                        const node = rec.addedNodes[i]!;
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this._addTrackedTree(node as Element);
                        }
                    }
                }
            }
        }

        // childList mutations (add/remove nodes) shift sibling positions
        // without resizing them, which ResizeObserver won't catch.
        // Mark all rects stale so positions are re-measured.
        // For attribute-only mutations (class/style), we rely on
        // ResizeObserver to reactively mark affected elements.
        if (hasChildListMutation) {
            this._markAllRectsStale();
        }
    }

    /** Recursively add an element and its descendants to the tracked set. */
    private _addTrackedTree(root: Element): void {
        this._tryTrackElement(root);
        // Also check children
        const children = root.querySelectorAll('*');
        for (let i = 0; i < children.length; i++) {
            this._tryTrackElement(children[i]!);
        }
    }

    /** Try to match an element against selectors and track it if matched. */
    private _tryTrackElement(el: Element): void {
        if (this._elementMap.has(el)) return; // already tracked

        for (const si of SELECTOR_SCAN_ORDER) {
            const meta = SELECTOR_META[si]!;
            try {
                if (el.matches(meta.sel)) {
                    const tracked: TrackedElement = {
                        ref: new WeakRef(el),
                        selectorIdx: si,
                        kind: meta.kind,
                        hue: meta.hue,
                        rect: null,
                        visible: true, // assume visible initially; IO will correct
                        rectStale: true,
                    };
                    this._tracked.push(tracked);
                    this._elementMap.set(el, tracked);
                    this._io?.observe(el);
                    this._ro?.observe(el);
                    this._rectsStale = true;
                    break; // first match wins (priority selectors checked first)
                }
            } catch {
                // Invalid selector (shouldn't happen with our known selectors)
            }
        }
    }

    /** Recursively remove an element and its descendants from tracked set. */
    private _removeTrackedTree(root: Element): void {
        this._untrackElement(root);
        const children = root.querySelectorAll('*');
        for (let i = 0; i < children.length; i++) {
            this._untrackElement(children[i]!);
        }
    }

    private _untrackElement(el: Element): void {
        const tracked = this._elementMap.get(el);
        if (tracked) {
            this._elementMap.delete(el);
            this._io?.unobserve(el);
            this._ro?.unobserve(el);
        }
    }

    /** Reclassify an element after a class change. */
    private _reclassifyElement(el: Element): void {
        const existing = this._elementMap.get(el);

        // Check if element now matches any selector — priority selectors
        // first so that .selected / .span-highlighted / .panic-entry win
        // over level selectors when both match.
        let matched = false;
        for (const si of SELECTOR_SCAN_ORDER) {
            const meta = SELECTOR_META[si]!;
            try {
                if (el.matches(meta.sel)) {
                    if (existing) {
                        // Already tracked — just update classification
                        if (existing.kind !== meta.kind || existing.hue !== meta.hue) {
                            this._dataStale = true;
                        }
                        existing.selectorIdx = si;
                        existing.kind = meta.kind;
                        existing.hue = meta.hue;
                        existing.rectStale = true;
                    } else {
                        // Newly matches — start tracking
                        const tracked: TrackedElement = {
                            ref: new WeakRef(el),
                            selectorIdx: si,
                            kind: meta.kind,
                            hue: meta.hue,
                            rect: null,
                            visible: true,
                            rectStale: true,
                        };
                        this._tracked.push(tracked);
                        this._elementMap.set(el, tracked);
                        this._io?.observe(el);
                        this._ro?.observe(el);
                    }
                    this._rectsStale = true;
                    matched = true;
                    break;
                }
            } catch {
                // skip
            }
        }

        if (!matched && existing) {
            // Element no longer matches any selector — untrack
            this._elementMap.delete(el);
            this._io?.unobserve(el);
            this._ro?.unobserve(el);
        }
    }

    // --- Internal: full re-scan --------------------------------------------

    private _fullRescan(): void {
        // Disconnect observers for old elements
        for (const tracked of this._tracked) {
            const el = tracked.ref.deref();
            if (el) {
                this._io?.unobserve(el);
                this._ro?.unobserve(el);
            }
        }
        this._tracked = [];
        this._elementMap.clear();

        // Query all selectors — priority selectors first
        for (const si of PRIORITY_SELECTOR_INDICES) {
            const meta = SELECTOR_META[si];
            if (!meta) continue;
            this._queryAndTrack(si, meta);
        }

        for (let si = 0; si < SELECTOR_META.length; si++) {
            if (PRIORITY_SELECTOR_INDICES.has(si)) continue;
            const meta = SELECTOR_META[si]!;
            this._queryAndTrack(si, meta);
        }
    }

    private _queryAndTrack(si: number, meta: { sel: string; hue: number; kind: number }): void {
        const elems = document.querySelectorAll(meta.sel);
        for (let j = 0; j < elems.length; j++) {
            const el = elems[j]!;
            if (this._elementMap.has(el)) continue; // already tracked by a higher-priority selector

            const tracked: TrackedElement = {
                ref: new WeakRef(el),
                selectorIdx: si,
                kind: meta.kind,
                hue: meta.hue,
                rect: null,
                visible: true,
                rectStale: true,
            };
            this._tracked.push(tracked);
            this._elementMap.set(el, tracked);
            this._io?.observe(el);
            this._ro?.observe(el);
        }
    }

    // --- Internal: maintenance ---------------------------------------------

    /** Remove GC'd or untracked elements. Returns true if any were removed. */
    private _compactDead(): boolean {
        const before = this._tracked.length;
        this._tracked = this._tracked.filter(t => {
            const el = t.ref.deref();
            if (!el) return false;
            // Also remove if no longer in our map (was untracked)
            return this._elementMap.has(el);
        });
        return this._tracked.length !== before;
    }

    private _markAllRectsStale(): void {
        for (const t of this._tracked) {
            t.rectStale = true;
        }
        this._rectsStale = true;
    }

    /** Measure rects for stale + visible elements. Returns true if any changed. */
    private _measureStaleRects(): boolean {
        let changed = false;
        const vh = window.innerHeight;

        for (const t of this._tracked) {
            if (!t.rectStale) continue;
            // Only measure non-visible elements if they've never been measured
            if (!t.visible && t.rect) continue;

            const el = t.ref.deref();
            if (!el) continue;

            const r = el.getBoundingClientRect();
            t.rectStale = false;

            // Skip zero-size or fully off-screen
            if (r.width === 0 || r.height === 0) {
                if (t.rect) { t.rect = null; changed = true; }
                continue;
            }
            if (r.bottom < 0 || r.top > vh) {
                if (t.rect) { t.rect = null; changed = true; }
                continue;
            }

            // Check if rect actually changed
            const prev = t.rect;
            if (!prev ||
                prev.left !== r.left || prev.top !== r.top ||
                prev.width !== r.width || prev.height !== r.height) {
                t.rect = r;
                changed = true;
            }
        }

        return changed;
    }

    // --- Internal: rebuild Float32Array ------------------------------------

    private _rebuildData(): void {
        // Count visible elements with valid rects
        let count = 0;
        for (const t of this._tracked) {
            if (t.rect) count++;
        }

        // Grow buffer if needed
        if (count > this._capacity) {
            this._capacity = Math.max(count, this._capacity * 2);
            this._data = new Float32Array(this._capacity * ELEM_FLOATS);
        }

        // Pack data — priority elements first for consistent ordering
        this._data.fill(0);
        let idx = 0;

        // Priority selectors first
        for (const t of this._tracked) {
            if (!t.rect) continue;
            if (!PRIORITY_SELECTOR_INDICES.has(t.selectorIdx)) continue;
            const base = idx * ELEM_FLOATS;
            this._data[base    ] = t.rect.left;
            this._data[base + 1] = t.rect.top;
            this._data[base + 2] = t.rect.width;
            this._data[base + 3] = t.rect.height;
            this._data[base + 4] = t.hue;
            this._data[base + 5] = t.kind;
            // Per-element NDC depth (set by 3D views via data-depth attribute)
            const el = t.ref.deref();
            this._data[base + 6] = el ? parseFloat(el.getAttribute('data-depth') ?? '0') || 0 : 0;
            idx++;
        }

        // Then non-priority
        for (const t of this._tracked) {
            if (!t.rect) continue;
            if (PRIORITY_SELECTOR_INDICES.has(t.selectorIdx)) continue;
            const base = idx * ELEM_FLOATS;
            this._data[base    ] = t.rect.left;
            this._data[base + 1] = t.rect.top;
            this._data[base + 2] = t.rect.width;
            this._data[base + 3] = t.rect.height;
            this._data[base + 4] = t.hue;
            this._data[base + 5] = t.kind;
            const el2 = t.ref.deref();
            this._data[base + 6] = el2 ? parseFloat(el2.getAttribute('data-depth') ?? '0') || 0 : 0;
            idx++;
        }

        this._count = idx;
    }
}
