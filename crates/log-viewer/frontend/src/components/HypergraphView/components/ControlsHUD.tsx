/**
 * ControlsHUD - Mouse/keyboard controls hint overlay + nesting view toggles.
 *
 * Cascading enables: autoLayout → nesting → duplication.
 * Each setting is only shown/unlocked when its prerequisite is active.
 */
import { autoLayoutEnabled } from '../../../store';
import type { NestingSettings } from '@context-engine/viewer-api-frontend';

export interface ControlsHUDProps {
    nestingSettings?: NestingSettings;
    onNestingChange?: (update: Partial<NestingSettings>) => void;
}

export function ControlsHUD({ nestingSettings, onNestingChange }: ControlsHUDProps) {
    const autoLayout = autoLayoutEnabled.value;
    const nesting = nestingSettings;

    return (
        <div class="hypergraph-hud">
            <span>Left drag: Move nodes</span>
            <span>Right / Left empty: Orbit</span>
            <span>Middle / Shift+Left: Pan</span>
            <span>Scroll: Zoom</span>
            <span>Click node: Select &amp; Focus</span>
            <button
                class={`hg-btn hg-toggle ${autoLayout ? 'hg-toggle-on' : ''}`}
                onClick={() => { autoLayoutEnabled.value = !autoLayout; }}
                title="When enabled, clicking a node reflows the layout around it. When disabled, nodes can be freely dragged."
            >
                {autoLayout ? '📐 Layout ON' : '📐 Layout OFF'}
            </button>

            {/* Nesting toggle — only shown when autoLayout is ON */}
            {autoLayout && nesting && onNestingChange && (
                <>
                    <button
                        class={`hg-btn hg-toggle ${nesting.enabled ? 'hg-toggle-on' : ''}`}
                        onClick={() => onNestingChange({ enabled: !nesting.enabled })}
                        title="Toggle nesting view (show parents as containing shells, expand selected nodes)"
                    >
                        {nesting.enabled ? '🪆 Nesting ON' : '🪆 Nesting OFF'}
                    </button>

                    {/* Duplication + depth sliders — only shown when nesting is ON */}
                    {nesting.enabled && (
                        <>
                            <button
                                class={`hg-btn hg-toggle ${nesting.duplicateMode ? 'hg-toggle-on' : ''}`}
                                onClick={() => onNestingChange({ duplicateMode: !nesting.duplicateMode })}
                                title="Duplicate mode: show children both inside parent and at original position"
                            >
                                {nesting.duplicateMode ? 'Dup ON' : 'Dup OFF'}
                            </button>
                            <label class="hg-slider-label" title="Parent shell depth">
                                P:{nesting.parentDepth}
                                <input
                                    type="range"
                                    class="hg-slider"
                                    min={1}
                                    max={5}
                                    value={nesting.parentDepth}
                                    onInput={(e) => onNestingChange({ parentDepth: Number((e.target as HTMLInputElement).value) })}
                                />
                            </label>
                            <label class="hg-slider-label" title="Child expansion depth">
                                C:{nesting.childDepth}
                                <input
                                    type="range"
                                    class="hg-slider"
                                    min={1}
                                    max={3}
                                    value={nesting.childDepth}
                                    onInput={(e) => onNestingChange({ childDepth: Number((e.target as HTMLInputElement).value) })}
                                />
                            </label>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
