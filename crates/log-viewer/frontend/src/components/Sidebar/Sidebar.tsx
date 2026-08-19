import { logFiles, currentFile, loadLogFile, isLoading } from '../../store';
import { signal } from '@preact/signals';
import { FileTree, type TreeNode, type FilterOption } from '@context-engine/viewer-api-frontend';
import { buildFileTree, CATEGORIES } from '../../store/fileTree';
import type { LogFile } from '../../types';
import { useMemo, useCallback, useState } from 'preact/hooks';

// Filter state
const activeFilter = signal<string | null>(null);

/**
 * Sidebar content for the log-viewer.
 *
 * Renders the file tree with category filter buttons.  Does NOT render
 * the sidebar shell, header, or resize handle — those come from the
 * shared `Sidebar` component in viewer-api used by App.tsx.
 */
export function SidebarContent({ onFileSelect }: { onFileSelect?: () => void }) {
  const filter = activeFilter.value;
  const allFiles = logFiles.value;

  // Build filter options from CATEGORIES
  const filterOpts = useMemo<FilterOption[]>(() =>
    CATEGORIES.map(cat => ({
      key: cat.id,
      label: cat.label,
      icon: cat.icon,
      count: allFiles.filter(cat.filter).length,
      activeColor: cat.color,
    })),
    [allFiles],
  );

  const handleFilterChange = useCallback((key: string | null) => {
    activeFilter.value = key;
  }, []);

  // Filter files by active category, then build the directory tree
  const filteredFiles = useMemo(() => {
    if (!filter) return allFiles;
    const cat = CATEGORIES.find(c => c.id === filter);
    return cat ? allFiles.filter(cat.filter) : allFiles;
  }, [allFiles, filter]);

  const treeNodes = useMemo(() => buildFileTree(filteredFiles), [filteredFiles]);

  // Controlled expansion
  const [expandedSet, setExpandedSet] = useState<Set<string>>(() => new Set<string>());

  const handleToggle = useCallback((id: string) => {
    setExpandedSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectedId = useMemo(() => {
    if (!currentFile.value) return undefined;
    return `file-${currentFile.value}`;
  }, [currentFile.value]);

  const handleSelect = useCallback((node: TreeNode<LogFile>) => {
    if (node.data) {
      loadLogFile(node.data.name);
      onFileSelect?.();
    }
  }, [onFileSelect]);

  // Map filter key back to human label for empty message
  const filterLabel = filter
    ? CATEGORIES.find(c => c.id === filter)?.label?.toLowerCase() ?? filter
    : null;

  return (
    <FileTree<LogFile>
      nodes={treeNodes}
      selectedId={selectedId}
      onSelect={handleSelect}
      expanded={expandedSet}
      onToggle={handleToggle}
      loading={isLoading.value && allFiles.length === 0}
      emptyMessage={
        filterLabel
          ? `No logs with ${filterLabel} data`
          : 'No log files found'
      }
      filterOptions={filterOpts}
      activeFilter={filter}
      onFilterChange={handleFilterChange}
    />
  );
}
