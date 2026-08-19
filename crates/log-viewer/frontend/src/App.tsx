import { useEffect, useState, useCallback } from 'preact/hooks';
import { Header } from './components/Header/Header';
import { FilterPanel } from './components/FilterPanel/FilterPanel';
import { SidebarContent } from './components/Sidebar/Sidebar';
import { TabBar } from './components/Tabs/TabBar';
import { LogViewer } from './components/LogViewer/LogViewer';
import { CodeViewer } from './components/CodeViewer/CodeViewer';
import { EffectsDebug } from './components/EffectsDebug/EffectsDebug';
import { Scene3D } from './components/Scene3D/Scene3D';
import { HypergraphView } from './components/HypergraphView/HypergraphView';
import { ThemeSettings } from './components/ThemeSettings/ThemeSettings';
import { activeTab, logFiles, loadLogFiles, initUrlListener, getStateFromUrl, loadLogFile, setTab } from './store';
import { Panel, WgpuOverlay } from '@context-engine/viewer-api-frontend';
import { LOG_VIEWER_SCHEMA } from './gpu-schema';
import { useGlobalKeyboard, usePanelFocus, focusedPanel } from './hooks';
import './store/theme';  // initialize theme effects on startup

export function App() {
  useGlobalKeyboard();
  const contentRef = usePanelFocus('content');
  const [, setMobileOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await loadLogFiles();
      // Restore state from URL after file list is loaded
      const urlState = getStateFromUrl();
      if (urlState) {
        await loadLogFile(urlState.file);
        setTab(urlState.tab);
      }
      initUrlListener();
    })();
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const renderContent = () => {
    switch (activeTab.value) {
      case 'logs':
        return <LogViewer />;
      case 'hypergraph':
        return <HypergraphView />;
      case 'debug':
        return <EffectsDebug />;
      case 'scene3d':
        return <Scene3D />;
      case 'settings':
        return <ThemeSettings />;
      default:
        return <HypergraphView />;
    }
  };

  return (
    <div class="app">
      <WgpuOverlay schema={LOG_VIEWER_SCHEMA} />
      <Header onMenuToggle={toggleMobileSidebar} />
      <FilterPanel />
      <div class="main-layout">
        <Panel
          placement="left"
          class="log-files-panel"
          initialSize={280}
          minSize={180}
        >
          <div class="panel-header">
            <h2 class="panel-title">Log Files</h2>
            <span class="panel-badge">{logFiles.value.length}</span>
          </div>
          <div class="panel-body">
            <SidebarContent onFileSelect={closeMobileSidebar} />
          </div>
        </Panel>
        <main class="content">
          <div class="center-pane">
            <TabBar />
            <div
              class={`view-container ${focusedPanel.value === 'content' ? 'focused' : ''}`}
              ref={(el: HTMLDivElement | null) => { contentRef.current = el; }}
              tabIndex={-1}
            >
              {renderContent()}
            </div>
          </div>
        </main>
        <Panel placement="right" class="code-viewer-panel" initialSize={320}>
          <CodeViewer />
        </Panel>
      </div>
    </div>
  );
}
