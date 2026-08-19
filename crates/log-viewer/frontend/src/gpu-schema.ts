/**
 * LOG_VIEWER_SCHEMA — AppSchema for the log-viewer application.
 *
 * Bridges the viewer-api WgpuOverlay component with log-viewer's concrete
 * selector registry, theme signals, and active-view state.
 */

import type { AppSchema, SchemaSelectorEntry } from '@context-engine/viewer-api-frontend';
import { ELEMENT_SELECTORS, selectorKind, PRIORITY_SELECTOR_INDICES, VIEW_ID } from './components/WgpuOverlay/element-types';
import { effectSettings, themeColors } from './store/theme';
import { activeTab } from './store';

const SELECTORS: ReadonlyArray<SchemaSelectorEntry> = ELEMENT_SELECTORS.map((sel, i) => ({
    sel,
    hue: i < 16 ? i / 16 : 0.5,
    kind: selectorKind(i),
    priority: PRIORITY_SELECTOR_INDICES.has(i),
}));

export const LOG_VIEWER_SCHEMA: AppSchema = {
    selectors: SELECTORS,
    // The structural types are compatible even though EffectSettings is declared
    // separately in both packages — they have identical shapes.
    effectSettings: effectSettings as AppSchema['effectSettings'],
    themeColors,
    getCurrentViewId: () => VIEW_ID[activeTab.value] ?? 0,
    isActive3DView: () => activeTab.value === 'scene3d' || activeTab.value === 'hypergraph',
};
