import { useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';
import { activeTab, setTab } from '../store';
import type { ViewTab } from '../types';

/**
 * The focusable panels in the application, in Tab order.
 *
 * Each panel's container should call `usePanelFocus(panelId)` and set
 * `tabIndex={focusedPanel.value === panelId ? 0 : -1}` so only the
 * active panel is in the tab order.
 */
export type PanelId = 'sidebar' | 'tabs' | 'content';

/** The currently focused panel. */
export const focusedPanel = signal<PanelId>('sidebar');

const PANEL_ORDER: PanelId[] = ['sidebar', 'tabs', 'content'];

/** Tab order used for Left/Right global navigation. */
const TAB_ORDER: ViewTab[] = ['logs', 'hypergraph', 'code', 'debug', 'scene3d', 'settings'];

/**
 * Top-level hook — call once in `<App>` — that listens for:
 * - Tab key to cycle focus between the major panels
 * - Left/Right arrow keys to switch view tabs (when no inner list has focus)
 */
export function useGlobalKeyboard() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture keys when inside form inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Tab') {
        e.preventDefault();
        const current = PANEL_ORDER.indexOf(focusedPanel.value);
        const next = e.shiftKey
          ? (current - 1 + PANEL_ORDER.length) % PANEL_ORDER.length
          : (current + 1) % PANEL_ORDER.length;
        focusedPanel.value = PANEL_ORDER[next]!;
        return;
      }

      // Left/Right arrows switch tabs when no focused inner list captures them
      // Only act if the event wasn't already handled (not prevented)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Skip if focus is inside a scrollable/interactive child that handles arrows
        const target = e.target as HTMLElement;
          if (target.closest('.log-entries, .ssp-list, .ssp-group-list')) return;

        const idx = TAB_ORDER.indexOf(activeTab.value);
        if (idx < 0) return;
        const next = e.key === 'ArrowLeft'
          ? (idx - 1 + TAB_ORDER.length) % TAB_ORDER.length
          : (idx + 1) % TAB_ORDER.length;
        setTab(TAB_ORDER[next]!);
        e.preventDefault();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

/**
 * Panel-level hook — puts focus onto the container element whenever
 * `focusedPanel` transitions to `panelId`.
 *
 * Returns a `ref` to attach to the panel's root element.
 */
export function usePanelFocus(panelId: PanelId) {
  const ref = { current: null as HTMLElement | null };

  useEffect(() => {
    if (focusedPanel.value === panelId && ref.current) {
      ref.current.focus({ preventScroll: true });
    }
  }, [focusedPanel.value, panelId]);

  return ref;
}
