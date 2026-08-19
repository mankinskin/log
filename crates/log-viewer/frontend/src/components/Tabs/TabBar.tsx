import { activeTab, setTab, filteredEntries } from '../../store';
import type { ViewTab } from '../../types';
import { ListIcon } from '../Icons';
import type { JSX } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useListKeyboard, usePanelFocus, focusedPanel } from '../../hooks';
import { ResizeHandle } from '@context-engine/viewer-api-frontend';

// SVG icons for tabs

function GraphIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="3" cy="3" r="1.5" stroke={color} stroke-width="1.2"/>
      <circle cx="11" cy="3" r="1.5" stroke={color} stroke-width="1.2"/>
      <circle cx="7" cy="11" r="1.5" stroke={color} stroke-width="1.2"/>
      <path d="M4.2 4.2L6 9.5M9.8 4.2L8 9.5" stroke={color} stroke-width="1.0" stroke-linecap="round"/>
      <path d="M4 3H10" stroke={color} stroke-width="1.0" stroke-linecap="round" stroke-dasharray="1.5 1.5"/>
    </svg>
  );
}

const tabs: { id: ViewTab; label: string; icon: () => JSX.Element }[] = [
  { id: 'hypergraph', label: 'Hypergraph', icon: () => <GraphIcon size={14} /> },
  { id: 'logs', label: 'Logs', icon: () => <ListIcon size={14} /> },
];

interface TabBarProps {
  resizeBottomEdge?: boolean;
}

export function TabBar({ resizeBottomEdge = false }: TabBarProps) {
  const selectedIndex = tabs.findIndex(t => t.id === activeTab.value);
  const panelRef = usePanelFocus('tabs');
  const [height, setHeight] = useState(32);

  const onResizeBottom = useCallback((delta: number) => {
    setHeight((prev) => Math.max(0, prev + delta));
  }, []);

  const { containerRef, onKeyDown } = useListKeyboard({
    items: tabs,
    selectedIndex,
    onSelect: (i) => { const t = tabs[i]; if (t) setTab(t.id); },
    onActivate: (i) => { const t = tabs[i]; if (t) setTab(t.id); },
    orientation: 'horizontal',
  });

  const setRef = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    panelRef.current = el;
  };

  return (
    <div class="tab-bar" style={{ height: `${height}px` }}>
      <div
        class={`tabs ${focusedPanel.value === 'tabs' ? 'focused' : ''}`}
        ref={setRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => {
          focusedPanel.value = 'tabs';
          containerRef.current?.focus({ preventScroll: true });
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            class={`tab ${activeTab.value === tab.id ? 'active' : ''}`}
            data-index={i}
            onClick={() => setTab(tab.id)}
            tabIndex={-1}
          >
            <span class="tab-icon">{tab.icon()}</span>
            <span class="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div class="tab-info">
        <span class="entry-count">{filteredEntries.value.length} entries</span>
      </div>
      {resizeBottomEdge && (
        <ResizeHandle direction="vertical" edge="bottom" onResize={onResizeBottom} />
      )}
    </div>
  );
}
