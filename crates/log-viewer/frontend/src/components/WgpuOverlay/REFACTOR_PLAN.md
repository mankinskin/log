# WgpuOverlay Refactoring Plan

## Current State Analysis

### File sizes
| File | Lines | Responsibility |
|------|-------|---------------|
| `WgpuOverlay.tsx` | 828 | Everything: selectors, scanning, constants, GPU init, buffer management, render loop, thumbnail capture, hover/selected logic, uniform upload, teardown, JSX |
| `background.wgsl` | 775 | Smoke, borders, shadows, CRT, scene compositing |
| `compute.wgsl` | 264 | Particle physics for 4 types |
| `particles.wgsl` | 118 | Particle quad rendering |
| `types.wgsl` | 79 | Shared structs + constants |
| `noise.wgsl` | 53 | Noise functions |

**Total: ~2,100 lines in a single component directory.**

### Current problems

1. **Hard-coded `MAX_ELEMENTS = 128`** — Elements beyond 128 are silently dropped. Priority scanning was added as a workaround, but real log lists with thousands of entries can easily exceed this. The GPU storage buffer is allocated once at init with a fixed size.

2. **Full re-scan on any mutation** — A single class change anywhere in `<body>` triggers `_scanDirty`, causing a full `querySelectorAll` for all 16 selectors on the next frame. Even unchanged elements get re-queried and their rects re-measured.

3. **Monolithic 828-line TSX file** — Element scanning, GPU initialization, buffer management, render loop, hover detection, uniform packing, thumbnail capture, and UI rendering are all in one function with deeply nested closures.

4. **Bind groups are static** — Because buffers are created once and bind groups reference them, dynamically resizing the element buffer requires recreating bind groups.

5. **No element identity tracking** — Elements are anonymous float tuples `[x, y, w, h, hue, kind]`. There's no stable identity, so we can't diff, cache, or skip unchanged elements.

---

## Proposed Architecture

### Module split

```
src/components/WgpuOverlay/
├── WgpuOverlay.tsx          # ~80 lines  — JSX component, canvas ref, effect hooks
├── gpu-init.ts              # ~180 lines — device/pipeline/shader creation
├── gpu-buffers.ts           # ~120 lines — dynamic buffer manager (elem, particle, uniform, palette)
├── gpu-render-loop.ts       # ~200 lines — rAF loop, uniform upload, encode/submit
├── element-scanner.ts       # ~200 lines — reactive DOM scanner with identity + caching
├── element-types.ts         # ~60 lines  — selectors, kind constants, metadata
├── overlay-api.ts           # ~40 lines  — signals, register/unregister, capture API
├── thumbnail-capture.ts     # ~80 lines  — one-shot JPEG capture logic
├── types.wgsl               # (unchanged)
├── noise.wgsl               # (unchanged)
├── background.wgsl          # (unchanged)
├── particles.wgsl           # (unchanged)
├── compute.wgsl             # (unchanged)
```

### Module responsibilities

#### `element-types.ts` — Selector registry & constants
- `ELEMENT_SELECTORS` array
- `ElementKind` enum (STRUCTURAL, ERROR, WARN, INFO, DEBUG, SPAN_HL, SELECTED, PANIC)
- `SELECTOR_META` precomputed table
- `ELEM_FLOATS`, `ELEM_BYTES` constants
- `selectorKind()` mapping function
- No DOM access, no GPU dependency — pure data

#### `element-scanner.ts` — Reactive DOM → GPU element bridge
This is the core refactoring target. Replace the current "full re-scan on dirty flag" with a **tracked element system**:

```typescript
/** Each tracked DOM element gets a stable identity. */
interface TrackedElement {
    id: number;                // Stable index for GPU buffer slot
    el: Element;               // Weak reference to DOM node
    kind: ElementKind;         // Shader kind
    hue: number;               // Color hue
    selectorIdx: number;       // Which selector matched
    rect: DOMRect | null;      // Last measured rect (null = needs measure)
    visible: boolean;          // Was on-screen last frame?
    generation: number;        // Incremented on rect change (for dirty detection)
}
```

**Key design decisions:**

1. **No MAX_ELEMENTS limit.** The `TrackedElement[]` array grows dynamically. The Float32Array upload buffer is reallocated (doubled) when capacity is exceeded. The GPU storage buffer is recreated when it needs to grow (see `gpu-buffers.ts`).

2. **Incremental scanning via MutationObserver records.** Instead of setting a single dirty flag and re-querying everything:
   - `childList` mutations → check added/removed nodes against selectors, add/remove from tracked set
   - `attributes` (class) mutations → re-classify the mutated element only (check if it matches any selector, update its `kind`)
   - `attributes` (style) mutations → mark that element's rect as stale
   - Scroll/resize → mark all visible elements' rects as stale (but don't re-query selectors)

3. **Rect measurement batching.** On each frame, only measure rects for elements marked stale. Use `IntersectionObserver` to cheaply track visibility (on-screen vs. off-screen) instead of checking `r.bottom < 0 || r.top > vh` per-element.

4. **Deferred selector re-query.** A full selector re-query only happens on:
   - Initial mount
   - Tab change (view content replaced)
   - Large childList mutations (>50 nodes added/removed in one tick — batch threshold)

**API:**
```typescript
export class ElementScanner {
    /** Current element data ready for GPU upload. */
    readonly data: Float32Array;
    readonly count: number;
    /** Capacity of the current Float32Array (in elements). */
    readonly capacity: number;

    constructor();
    /** Start observing. Call once after DOM is ready. */
    start(): void;
    /** Stop observing and release resources. */
    destroy(): void;
    /** Force a full re-scan (tab change, etc.). */
    invalidateAll(): void;
    /** Update rects for stale elements. Returns true if data changed. */
    updateFrame(): boolean;

    /** Find element index by kind (for hover/selected detection). */
    findByKind(kind: ElementKind): number;
    /** Hit-test: find element at screen coordinates. */
    hitTest(x: number, y: number): number;
}
```

#### `gpu-buffers.ts` — Dynamic buffer management
Separates buffer lifecycle from pipeline creation:

```typescript
export class GpuBufferManager {
    private device: GPUDevice;
    
    // Uniform buffer (fixed 128 bytes)
    readonly uniformBuffer: GPUBuffer;
    readonly uniformF32: Float32Array;
    
    // Element buffer (dynamically resizable)
    private _elemBuffer: GPUBuffer;
    private _elemCapacity: number;  // current allocation in elements
    get elemBuffer(): GPUBuffer;
    
    // Particle buffer (fixed)
    readonly particleBuffer: GPUBuffer;
    
    // Palette buffer (fixed)
    readonly paletteBuffer: GPUBuffer;

    constructor(device: GPUDevice);
    
    /** Ensure element buffer can hold `count` elements. 
     *  Returns true if buffer was reallocated (bind groups need rebuild). */
    ensureElemCapacity(count: number): boolean;
    
    /** Upload element data. Calls ensureElemCapacity internally. */
    uploadElements(data: Float32Array, count: number): boolean;
    
    /** Upload uniforms. */
    uploadUniforms(): void;
    
    /** Upload palette. */
    uploadPalette(colors: ThemeColors): void;
    
    destroy(): void;
}
```

**Growth strategy:** Start at 128 elements. When exceeded, double capacity (128 → 256 → 512 → 1024). Destroy old buffer, create new, rebuild bind groups. This amortizes allocation cost. Shrinking only happens on `invalidateAll()` when the actual count drops below 25% of capacity.

#### `gpu-init.ts` — Device & pipeline factory
```typescript
export interface GpuPipelines {
    device: GPUDevice;
    format: GPUTextureFormat;
    context: GPUCanvasContext;
    renderPipeline: GPURenderPipeline;
    particlePipeline: GPURenderPipeline;
    computePipeline: GPUComputePipeline;
    computeBGL: GPUBindGroupLayout;
    renderBGL: GPUBindGroupLayout;
}

export async function initGpu(canvas: HTMLCanvasElement): Promise<GpuPipelines | null>;
```

Owns:
- Adapter/device request
- Shader module creation (concatenation of .wgsl imports)
- Pipeline creation (render, particle, compute)
- Bind group layout creation
- Does NOT create buffers or bind groups (those belong to `GpuBufferManager`)

#### `gpu-render-loop.ts` — Frame orchestration
```typescript
export class RenderLoop {
    constructor(
        pipelines: GpuPipelines,
        buffers: GpuBufferManager,
        scanner: ElementScanner,
        canvas: HTMLCanvasElement,
    );
    
    start(): void;
    stop(): void;
    
    /** Called by component to update mouse position. */
    setMouse(x: number, y: number): void;
}
```

Owns:
- `requestAnimationFrame` loop
- Scanner `updateFrame()` call per frame
- Buffer re-upload when scanner reports changes
- Bind group rebuild when buffer manager reallocates
- Uniform packing (hover detection, selected detection, effect settings)
- Command encoder: compute pass → render pass → overlay callbacks → submit
- Does NOT own DOM observation (that's the scanner)
- Does NOT own buffer allocation (that's the buffer manager)

#### `overlay-api.ts` — Public API surface
Extracted from the top of current WgpuOverlay.tsx:
- `gpuOverlayEnabled` signal
- `overlayGpu` signal
- `registerOverlayRenderer` / `unregisterOverlayRenderer`
- `captureOverlayThumbnail` (trigger only; capture logic in `thumbnail-capture.ts`)
- `markOverlayScanDirty` (delegates to scanner's `invalidateAll`)

#### `thumbnail-capture.ts` — Separated capture logic
The ~80-line TreeWalker + canvas compositing code, extracted as:
```typescript
export function captureFrame(
    gpuCanvas: HTMLCanvasElement,
    width?: number,
    quality?: number,
): string;
```

#### `WgpuOverlay.tsx` — Thin component shell
```tsx
export function WgpuOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Mouse tracking effect
    // GPU-active class effect
    // Custom cursor class effect
    // Canvas resize effect
    // Main init/teardown effect: creates GpuPipelines → GpuBufferManager → ElementScanner → RenderLoop
    // Thumbnail capture hook
    return <canvas ref={canvasRef} ... />;
}
```

---

## Reactive Element Scanning — Detailed Design

### Current flow (problems marked with ⚠️)
```
MutationObserver fires → _scanDirty = true
                         ⚠️ No info about WHAT changed
Next rAF →
  scanElements() runs:
    ⚠️ _elemData.fill(0)               — wipes everything
    ⚠️ querySelectorAll × 16 selectors — full DOM traversal
    ⚠️ getBoundingClientRect × N       — forces layout for ALL elements
    ⚠️ Capped at MAX_ELEMENTS=128      — silently drops elements
    Writes to flat Float32Array
```

### New flow
```
MutationObserver fires → processMutations(records):
  For each MutationRecord:
    - childList: diffTrackedSet(added, removed)
    - attribute(class): reclassifyElement(target)
    - attribute(style): markRectStale(target)
  If large batch (>50 nodes): scheduleFullRescan()

Scroll/resize → markAllRectsStale()

IntersectionObserver → updateVisibility(entries)
  Track which elements are on-screen without getBoundingClientRect

Next rAF → scanner.updateFrame():
  1. If fullRescanPending: queryAllSelectors(), rebuild tracked set
  2. For each tracked element with staleRect && visible:
       measure getBoundingClientRect()
       if rect changed: update Float32Array slot, increment generation
  3. Compact: remove dead elements (DOM node garbage-collected)
  4. Return true if any data changed (so render loop knows to re-upload)
```

### Performance characteristics

| Scenario | Current | Proposed |
|----------|---------|----------|
| Idle (no changes) | 0 work | 0 work |
| Mouse move (no DOM change) | 0 work (good) | 0 work |
| Scroll | Full re-scan (16 qSA + N rects) | Stale rects only for visible elements |
| Select entry (1 class change) | Full re-scan | Reclassify 1 element |
| Expand entry (children added) | Full re-scan | Diff added nodes |
| Tab switch (view replaced) | Full re-scan | Full re-scan (correct) |
| 500 log entries visible | Capped at 128, dropped rest | All 500 tracked |

### IntersectionObserver for visibility

Instead of per-frame `r.bottom < 0 || r.top > vh` checks:

```typescript
private _io = new IntersectionObserver(
    (entries) => {
        for (const e of entries) {
            const tracked = this._elementMap.get(e.target);
            if (tracked) {
                tracked.visible = e.isIntersecting;
                if (e.isIntersecting) tracked.rectStale = true;
            }
        }
    },
    { threshold: 0 }
);
```

Elements entering the viewport get their rect measured on the next frame. Elements leaving the viewport are marked invisible and skip rect measurement (but stay in the tracked set with their last-known rect for reference — or zeroed so the shader ignores them).

### WeakRef for DOM element tracking

Use `WeakRef<Element>` to avoid memory leaks when DOM elements are removed without going through MutationObserver:

```typescript
interface TrackedElement {
    ref: WeakRef<Element>;
    // ...
}
```

On each frame update, dereference the WeakRef. If `null`, the element was GC'd — remove from tracked set and free its buffer slot.

---

## Dynamic Buffer Resizing — Detailed Design

### GPU buffer reallocation

WebGPU buffers cannot be resized. When element count exceeds capacity:

1. Create new `GPUBuffer` with doubled size
2. Copy existing data to new buffer via `device.queue.writeBuffer`
3. Destroy old buffer
4. **Rebuild bind groups** — bind groups reference specific buffer objects

This is the key constraint: bind groups must be recreated when any referenced buffer changes. The `GpuBufferManager` returns a `generation` counter that the render loop checks each frame. If generation changed, rebuild bind groups.

```typescript
class GpuBufferManager {
    private _generation = 0;
    get generation(): number { return this._generation; }
    
    ensureElemCapacity(count: number): boolean {
        if (count <= this._elemCapacity) return false;
        const newCap = Math.max(count, this._elemCapacity * 2);
        const oldBuf = this._elemBuffer;
        this._elemBuffer = this.device.createBuffer({
            size: newCap * ELEM_BYTES,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        });
        this._elemCapacity = newCap;
        this._generation++;
        oldBuf.destroy();
        return true;
    }
}
```

### Bind group rebuilding in render loop

```typescript
// In RenderLoop.frame():
if (this.buffers.generation !== this._lastGeneration) {
    this._computeBindGroup = this.rebuildComputeBindGroup();
    this._renderBindGroup = this.rebuildRenderBindGroup();
    this._lastGeneration = this.buffers.generation;
}
```

---

## Migration Strategy

### Phase 1: Extract without behavior change
1. Extract `element-types.ts` (pure data, no behavior change)
2. Extract `overlay-api.ts` (move signals and callbacks)
3. Extract `thumbnail-capture.ts` (pure function extraction)
4. Extract `gpu-init.ts` (factory function)
5. `WgpuOverlay.tsx` shrinks to ~450 lines, still has scanning + render loop inline

### Phase 2: Extract buffer management
6. Extract `gpu-buffers.ts` with `GpuBufferManager`
7. Replace inline buffer creation in `gpu-init.ts` / `WgpuOverlay.tsx`
8. `WgpuOverlay.tsx` shrinks to ~350 lines

### Phase 3: Extract render loop
9. Extract `gpu-render-loop.ts` with `RenderLoop` class
10. `WgpuOverlay.tsx` shrinks to ~80 lines (component shell only)

### Phase 4: Reactive scanner
11. Create `element-scanner.ts` with `ElementScanner` class
12. Replace `scanElements()` + `_scanDirty` + `MutationObserver` setup
13. Remove `MAX_ELEMENTS` limit
14. Dynamic buffer resizing via `GpuBufferManager.ensureElemCapacity()`

Each phase produces a working build. No big-bang refactor.

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| IntersectionObserver overhead for 1000+ elements | Batch observations, use a single observer with `threshold: 0` |
| WeakRef deref cost per frame | Only deref elements with stale rects (not all tracked) |
| Bind group rebuild cost | Only happens on capacity doubling (~log₂(N) times ever) |
| MutationRecord processing cost for large DOM changes | Batch threshold → fall back to full rescan |
| Shader `element_count` is f32 (max precise int = 16M) | Not a concern for realistic UI element counts |
| Memory: Float32Array doubles | Max realistic: 2048 elements × 32 bytes = 64 KB (trivial) |
