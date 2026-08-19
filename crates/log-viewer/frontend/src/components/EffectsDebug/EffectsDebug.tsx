/**
 * EffectsDebug — Showcase page for all GPU overlay visual effects.
 *
 * Renders a grid of styled elements matching the CSS selectors that the
 * WgpuOverlay shader scans for, so you can see every effect in action
 * without needing real log data.
 */
import { useState } from 'preact/hooks';

export function EffectsDebug() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

    return (
        <div class="effects-debug">
            <h2 class="effects-debug-title">GPU Effects Showcase</h2>
            <p class="effects-debug-subtitle">
                Hover, click, and move your mouse over the elements below to see all shader effects.
            </p>

            {/* ---- Section: Log Entry Levels ---- */}
            <section class="effects-section">
                <h3>Log Entry Levels</h3>
                <p class="effects-hint">Each level has a unique ember border colour when hovered.</p>
                <div class="effects-grid">
                    <div
                        class={`log-entry level-error ${selectedIdx === 0 ? 'selected' : ''}`}
                        onClick={() => setSelectedIdx(selectedIdx === 0 ? null : 0)}
                    >
                        <span class="effects-label">ERROR</span>
                        <span class="effects-desc">Hot red pulse border</span>
                    </div>
                    <div
                        class={`log-entry level-warn ${selectedIdx === 1 ? 'selected' : ''}`}
                        onClick={() => setSelectedIdx(selectedIdx === 1 ? null : 1)}
                    >
                        <span class="effects-label">WARN</span>
                        <span class="effects-desc">Amber shimmer border</span>
                    </div>
                    <div
                        class={`log-entry level-info ${selectedIdx === 2 ? 'selected' : ''}`}
                        onClick={() => setSelectedIdx(selectedIdx === 2 ? null : 2)}
                    >
                        <span class="effects-label">INFO</span>
                        <span class="effects-desc">Calm blue glow</span>
                    </div>
                    <div
                        class={`log-entry level-debug ${selectedIdx === 3 ? 'selected' : ''}`}
                        onClick={() => setSelectedIdx(selectedIdx === 3 ? null : 3)}
                    >
                        <span class="effects-label">DEBUG</span>
                        <span class="effects-desc">Dim ambient</span>
                    </div>
                    <div
                        class={`log-entry level-trace ${selectedIdx === 4 ? 'selected' : ''}`}
                        onClick={() => setSelectedIdx(selectedIdx === 4 ? null : 4)}
                    >
                        <span class="effects-label">TRACE</span>
                        <span class="effects-desc">Faint trace</span>
                    </div>
                </div>
            </section>

            {/* ---- Section: Interactive States ---- */}
            <section class="effects-section">
                <h3>Interactive States</h3>
                <p class="effects-hint">
                    Click entries to toggle "selected" (angelic shards rise from the selected element).
                    Hover to see metal sparks at cursor, embers from borders, and glitter along the edge.
                </p>
                <div class="effects-grid">
                    <div
                        class={`log-entry span-highlighted ${selectedIdx === 5 ? 'selected' : ''}`}
                        onClick={() => setSelectedIdx(selectedIdx === 5 ? null : 5)}
                    >
                        <span class="effects-label">SPAN HIGHLIGHTED</span>
                        <span class="effects-desc">Bright shimmer wave</span>
                    </div>
                    <div class="log-entry selected">
                        <span class="effects-label">SELECTED (always on)</span>
                        <span class="effects-desc">Intense focus ring + angelic shards</span>
                    </div>
                    <div
                        class={`log-entry panic-entry ${selectedIdx === 6 ? 'selected' : ''}`}
                        onClick={() => setSelectedIdx(selectedIdx === 6 ? null : 6)}
                    >
                        <span class="effects-label">PANIC</span>
                        <span class="effects-desc">Alarm strobe pulse</span>
                    </div>
                </div>
            </section>

            {/* ---- Section: Particle Effects ---- */}
            <section class="effects-section">
                <h3>Particle Effects</h3>
                <p class="effects-hint">
                    Move your mouse over elements to see all four particle types simultaneously.
                </p>
                <div class="effects-particle-info">
                    <div class="effects-particle-card">
                        <div class="effects-particle-swatch metal-spark" />
                        <div>
                            <strong>Metal Sparks</strong>
                            <p>Spawn at mouse cursor when hovering. Burst on impact, continuous trickle while moving. Subtle trailing dots with gravity.</p>
                        </div>
                    </div>
                    <div class="effects-particle-card">
                        <div class="effects-particle-swatch ember" />
                        <div>
                            <strong>Embers / Ash</strong>
                            <p>Continuous rising particles from hovered element borders. Warm orange glow with drift and sway.</p>
                        </div>
                    </div>
                    <div class="effects-particle-card">
                        <div class="effects-particle-swatch angel-shard" />
                        <div>
                            <strong>Angelic Shards</strong>
                            <p>Pixel-thin double-pointed diamond beams rising from the selected/opened element. Golden-white crystalline look.</p>
                        </div>
                    </div>
                    <div class="effects-particle-card">
                        <div class="effects-particle-swatch glitter" />
                        <div>
                            <strong>Angelic Glitter</strong>
                            <p>Twinkling sparkles drifting along the border of the hovered element. Golden-white to cool-blue cycling.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- Section: Background & Post-Processing ---- */}
            <section class="effects-section">
                <h3>Background &amp; Post-Processing</h3>
                <p class="effects-hint">These effects are always active across the entire viewport.</p>
                <div class="effects-bg-info">
                    <ul>
                        <li><strong>Smoky Background</strong> — 4-layer animated smoke (varied speed, scale, direction) with colour-varied palette and vignette</li>
                        <li><strong>CRT Scanlines</strong> — Horizontal and vertical line dimming</li>
                        <li><strong>Pixel Grid</strong> — Screen-door opacity pattern (3px cells)</li>
                        <li><strong>Edge Shadow</strong> — Viewport edge darkening</li>
                        <li><strong>Torch Flicker</strong> — Subtle brightness oscillation</li>
                        <li><strong>Downsampled Noise</strong> — 4×4 pixel chunky texture with animated grain</li>
                    </ul>
                </div>
            </section>

            {/* ---- Section: Large hover target ---- */}
            <section class="effects-section">
                <h3>Large Hover Target</h3>
                <p class="effects-hint">A big element to easily see all hover effects at once.</p>
                <div
                    class={`log-entry level-error effects-large-target ${selectedIdx === 7 ? 'selected' : ''}`}
                    onClick={() => setSelectedIdx(selectedIdx === 7 ? null : 7)}
                >
                    <div class="effects-large-content">
                        <span class="effects-label">Hover me!</span>
                        <span class="effects-desc">
                            Move your mouse around this area. Click to toggle selected state (angelic shards).
                            You should see: metal sparks at cursor, embers rising from borders,
                            glitter along the edge, and CRT effects over everything.
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
