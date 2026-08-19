import { 
  SearchIcon, 
  FilterIcon, 
  CloseIcon, 
  RefreshIcon,
  LogIcon 
} from '@context-engine/viewer-api-frontend';
import { 
  statusMessage, 
  currentFile, 
  loadLogFiles, 
  loadLogFile,
  searchQuery as searchQuerySignal,
  jqFilter as jqFilterSignal,
  performSearch,
  clearSearch,
  activeTab,
  setTab,
} from '../../store';
import { showFilterPanel, resetFilterPanel } from '../FilterPanel/FilterPanel';
import { fxEnabled } from '../WgpuOverlay/WgpuOverlay';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const handleSearch = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    performSearch(input.value);
  };

  const handleRefresh = () => {
    loadLogFiles();
    if (currentFile.value) {
      loadLogFile(currentFile.value);
    }
  };

  return (
    <header class="header">
      <div class="header-left">
        {onMenuToggle && (
          <button class="sidebar-hamburger" onClick={onMenuToggle} title="Toggle sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <LogIcon size={14} color="#8b9dc3" />
        <h1 class="header-title">Log Viewer</h1>
      </div>
      
      <form class="search-form" onSubmit={handleSearch}>
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search (regex supported)..."
          value={searchQuerySignal.value}
        />
        <button type="submit" class="btn btn-primary"><SearchIcon size={12} /> Search</button>
      </form>

      <button 
        class={`btn ${showFilterPanel.value ? 'btn-active' : ''}`}
        onClick={() => showFilterPanel.value = !showFilterPanel.value}
        title="Advanced Filters"
      >
        <FilterIcon size={12} /> Filters
      </button>
      
      <div class="header-filters">
        {(searchQuerySignal.value || jqFilterSignal.value) && (
          <button class="btn" onClick={() => { resetFilterPanel(); clearSearch(); }}><CloseIcon size={12} /> Clear</button>
        )}
      </div>
      
      <div class="header-right">
        <span class="status-text">{statusMessage.value}</span>
        <button
          class={`btn btn-gpu ${fxEnabled.value ? 'btn-active' : ''}`}
          title={fxEnabled.value ? 'Disable visual effects (particles, smoke, CRT)' : 'Enable visual effects (particles, smoke, CRT)'}
          onClick={() => fxEnabled.value = !fxEnabled.value}
        >
          {fxEnabled.value ? '✦' : '✧'} FX
        </button>
        <button
          class={`btn ${activeTab.value === 'settings' ? 'btn-active' : ''}`}
          title="Theme Settings"
          onClick={() => setTab(activeTab.value === 'settings' ? 'logs' : 'settings')}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M7 1C3.7 1 1 3.7 1 7s2.7 6 6 6c.6 0 1-.4 1-1 0-.3-.1-.5-.2-.7-.1-.2-.2-.4-.2-.7 0-.6.4-1 1-1h1.2c2.2 0 4-1.8 4-4 0-2.8-2.7-4.6-6.8-4.6z" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
            <circle cx="4.5" cy="5.5" r="1" fill="currentColor"/>
            <circle cx="7" cy="4" r="1" fill="currentColor"/>
            <circle cx="9.5" cy="5.5" r="1" fill="currentColor"/>
          </svg>
          {' '}Theme
        </button>
        <button class="btn" onClick={handleRefresh}><RefreshIcon size={12} /> Refresh</button>
      </div>
    </header>
  );
}
