import { signal, computed } from '@preact/signals';
import { useRef, useCallback } from 'preact/hooks';
import { 
  performJqQuery, 
  jqFilter,
  currentFile,
  clearSearch,
  entries,
  levelFilter,
  typeFilter,
  setLevelFilter,
  setTypeFilter
} from '../../store';
import type { LogLevel, EventType } from '../../types';
import { ChevronDown, ChevronRight } from '../Icons';

// Minimal file icon
function FileIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 2.5C3 1.95 3.45 1.5 4 1.5H8L11 4.5V11.5C11 12.05 10.55 12.5 10 12.5H4C3.45 12.5 3 12.05 3 11.5V2.5Z" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 1.5V4.5H11" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

// Minimal folder icons
function FolderIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 4C2 3.45 2.45 3 3 3H5.5L6.5 4.5H11C11.55 4.5 12 4.95 12 5.5V10.5C12 11.05 11.55 11.5 11 11.5H3C2.45 11.5 2 11.05 2 10.5V4Z" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

function FolderOpenIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 4C2 3.45 2.45 3 3 3H5.5L6.5 4.5H11C11.55 4.5 12 4.95 12 5.5V6" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1 7H10.5L12 11.5H2.5L1 7Z" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

// Filter panel visibility state (shared)
export const showFilterPanel = signal(false);

// Helper to recursively extract _type values from an object
function extractTypes(obj: unknown, types: Set<string>): void {
  if (obj === null || obj === undefined) return;
  if (typeof obj !== 'object') return;
  
  if (Array.isArray(obj)) {
    for (const item of obj) {
      extractTypes(item, types);
    }
  } else {
    const record = obj as Record<string, unknown>;
    if (typeof record._type === 'string') {
      types.add(record._type);
    }
    for (const value of Object.values(record)) {
      extractTypes(value, types);
    }
  }
}

// Computed: extract unique type names from current entries
const availableTypes = computed(() => {
  const types = new Set<string>();
  for (const entry of entries.value) {
    extractTypes(entry.fields, types);
  }
  return Array.from(types).sort();
});

// File tree node structure
interface FileTreeNode {
  name: string;
  path: string;
  children: Map<string, FileTreeNode>;
  isFile: boolean;
  count: number; // Number of log entries from this path
}

// Computed: build file tree from entries
const fileTree = computed(() => {
  const root: FileTreeNode = {
    name: '',
    path: '',
    children: new Map(),
    isFile: false,
    count: 0
  };
  
  // Count entries per file
  const fileCounts = new Map<string, number>();
  for (const entry of entries.value) {
    if (entry.file) {
      fileCounts.set(entry.file, (fileCounts.get(entry.file) || 0) + 1);
    }
  }
  
  // Build tree structure
  for (const [filePath, count] of fileCounts) {
    const parts = filePath.split('/');
    let current = root;
    let currentPath = '';
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!;
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isFile = i === parts.length - 1;
      
      if (!current.children.has(part)) {
        current.children.set(part, {
          name: part,
          path: currentPath,
          children: new Map(),
          isFile,
          count: 0
        });
      }
      
      current = current.children.get(part)!;
      if (isFile) {
        current.count = count;
      }
    }
  }
  
  return root;
});

// Computed: extract unique field names
const availableFields = computed(() => {
  const fields = new Set<string>();
  for (const entry of entries.value) {
    if (entry.fields) {
      for (const key of Object.keys(entry.fields)) {
        fields.add(key);
      }
    }
  }
  return Array.from(fields).sort();
});

// Computed: extract unique span names
const availableSpans = computed(() => {
  const spans = new Set<string>();
  for (const entry of entries.value) {
    if (entry.span_name) {
      spans.add(entry.span_name);
    }
  }
  return Array.from(spans).sort();
});

// Local state for filter inputs (exported for reset from Header)
export const typeNameFilter = signal('');
export const fileFilter = signal('');
export const fieldFilter = signal('');
export const spanFilter = signal('');

// Reset all filter panel state
export function resetFilterPanel() {
  typeNameFilter.value = '';
  fileFilter.value = '';
  fieldFilter.value = '';
  spanFilter.value = '';
  setLevelFilter('');
  setTypeFilter('');
}
const customJq = signal('');

// Track expanded tree nodes
const expandedNodes = signal<Set<string>>(new Set());

// FileTreeItem component
function FileTreeItem({ 
  node, 
  depth = 0,
  onSelect
}: { 
  node: FileTreeNode; 
  depth?: number;
  onSelect: (path: string) => void;
}) {
  const isExpanded = expandedNodes.value.has(node.path);
  const hasChildren = node.children.size > 0;
  const isSelected = fileFilter.value === node.path;
  
  const toggleExpand = (e: Event) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNodes.value);
    if (isExpanded) {
      newExpanded.delete(node.path);
    } else {
      newExpanded.add(node.path);
    }
    expandedNodes.value = newExpanded;
  };
  
  const handleSelect = () => {
    onSelect(node.path);
  };
  
  // Sort children: directories first, then files
  const sortedChildren = Array.from(node.children.values()).sort((a, b) => {
    if (a.isFile !== b.isFile) return a.isFile ? 1 : -1;
    return a.name.localeCompare(b.name);
  });
  
  return (
    <div class="file-tree-item">
      <div 
        class={`file-tree-row ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <span class="tree-toggle" onClick={toggleExpand}>
            {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          </span>
        ) : (
          <span class="tree-toggle-placeholder"></span>
        )}
        <span class={`tree-icon ${node.isFile ? 'file-icon' : 'folder-icon'}`}>
          {node.isFile ? <FileIcon size={14} /> : (isExpanded ? <FolderOpenIcon size={14} /> : <FolderIcon size={14} />)}
        </span>
        <span class="tree-name">{node.name}</span>
        {node.count > 0 && (
          <span class="tree-count">{node.count}</span>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div class="file-tree-children">
          {sortedChildren.map(child => (
            <FileTreeItem 
              key={child.path} 
              node={child} 
              depth={depth + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Persisted panel height (null = auto/default)
const panelHeight = signal<number | null>(null);

export function FilterPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const onResizeStart = useCallback((e: MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    const startY = e.clientY;
    const startHeight = panelRef.current?.offsetHeight ?? 200;

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const newHeight = Math.max(80, startHeight + (ev.clientY - startY));
      panelHeight.value = newHeight;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  if (!showFilterPanel.value) return null;

  const applyFilter = (jq: string) => {
    if (currentFile.value) {
      performJqQuery(jq);
    }
  };

  // Auto-apply filters based on current selections
  const autoApplyFilters = (newTypeName?: string, newFile?: string, newField?: string, newSpan?: string) => {
    const typeName = newTypeName ?? typeNameFilter.value;
    const file = newFile ?? fileFilter.value;
    const field = newField ?? fieldFilter.value;
    const span = newSpan ?? spanFilter.value;
    
    const conditions: string[] = [];
    
    if (typeName) {
      conditions.push(`(.fields | .. | objects | select(._type == "${typeName}"))`);
    }
    if (file) {
      conditions.push(`(.file | contains("${file}"))`);
    }
    if (field) {
      conditions.push(`(.fields | has("${field}"))`);
    }
    if (span) {
      conditions.push(`(.span_name == "${span}")`);
    }
    
    if (conditions.length === 0) {
      clearSearch();
      return;
    }
    
    const jq = `select(${conditions.join(' and ')})`;
    applyFilter(jq);
  };

  const handleCustomJq = (e: Event) => {
    e.preventDefault();
    if (customJq.value) {
      applyFilter(customJq.value);
    }
  };

  const handleFileSelect = (path: string) => {
    const newPath = path === fileFilter.value ? '' : path;
    fileFilter.value = newPath;
    autoApplyFilters(undefined, newPath, undefined, undefined);
  };

  // Expand all nodes in tree
  const expandAll = () => {
    const allPaths = new Set<string>();
    const collectPaths = (node: FileTreeNode) => {
      if (node.children.size > 0) {
        allPaths.add(node.path);
        node.children.forEach(child => collectPaths(child));
      }
    };
    collectPaths(fileTree.value);
    expandedNodes.value = allPaths;
  };

  // Collapse all nodes
  const collapseAll = () => {
    expandedNodes.value = new Set();
  };

  // Count total unique files
  const fileCount = computed(() => {
    const files = new Set<string>();
    for (const entry of entries.value) {
      if (entry.file) files.add(entry.file);
    }
    return files.size;
  });

  return (
    <div
      class="filter-panel"
      ref={panelRef}
      style={panelHeight.value != null ? { height: `${panelHeight.value}px`, maxHeight: 'none' } : undefined}
    >
      <div class="filter-panel-header">
        <h3>🔍 Advanced Filters</h3>
        <button 
          class="btn btn-small" 
          onClick={() => showFilterPanel.value = false}
        >
          ✕
        </button>
      </div>

      {/* All Filters in Columns */}
      <div class="filter-columns">
        {/* Column 1: Log Level & Event Type */}
        <div class="filter-column">
          <h4>Level & Type</h4>
          <div class="filter-field">
            <label>Log Level:</label>
            <select
              class="filter-select"
              value={levelFilter.value}
              onChange={(e) => setLevelFilter((e.target as HTMLSelectElement).value as LogLevel | '')}
            >
              <option value="">All Levels</option>
              <option value="TRACE">TRACE</option>
              <option value="DEBUG">DEBUG</option>
              <option value="INFO">INFO</option>
              <option value="WARN">WARN</option>
              <option value="ERROR">ERROR</option>
            </select>
          </div>
          <div class="filter-field">
            <label>Event Type:</label>
            <select
              class="filter-select"
              value={typeFilter.value}
              onChange={(e) => setTypeFilter((e.target as HTMLSelectElement).value as EventType | '')}
            >
              <option value="">All Types</option>
              <option value="event">Event</option>
              <option value="span_enter">Span Enter</option>
              <option value="span_exit">Span Exit</option>
            </select>
          </div>
        </div>

        {/* Column 2: Type Name */}
        <div class="filter-column">
          <h4>Type Name ({availableTypes.value.length})</h4>
          <div class="filter-field">
            <label>Select Type:</label>
            <select 
              class="filter-select"
              value={typeNameFilter.value}
              onChange={(e) => {
                const val = (e.target as HTMLSelectElement).value;
                typeNameFilter.value = val;
                autoApplyFilters(val, undefined, undefined, undefined);
              }}
            >
              <option value="">Select type...</option>
              {availableTypes.value.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div class="filter-field">
            <label>Custom Type:</label>
            <input
              type="text"
              class="filter-input"
              placeholder="Enter type..."
              value={typeNameFilter.value}
              onInput={(e) => {
                const val = (e.target as HTMLInputElement).value;
                typeNameFilter.value = val;
                autoApplyFilters(val, undefined, undefined, undefined);
              }}
            />
          </div>
        </div>

        {/* Column 3: File Path */}
        <div class="filter-column filter-column-wide">
          <div class="filter-section-header">
            <h4>File Path ({fileCount.value})</h4>
            <div class="tree-actions">
              <button class="btn btn-small" onClick={expandAll} title="Expand All">
                ⊞
              </button>
              <button class="btn btn-small" onClick={collapseAll} title="Collapse All">
                ⊟
              </button>
            </div>
          </div>
          {fileFilter.value && (
            <div class="selected-file">
              <span><code>{fileFilter.value}</code></span>
              <button class="btn btn-small" onClick={() => fileFilter.value = ''}>✕</button>
            </div>
          )}
          <div class="file-tree-container">
            {Array.from(fileTree.value.children.values())
              .sort((a, b) => {
                if (a.isFile !== b.isFile) return a.isFile ? 1 : -1;
                return a.name.localeCompare(b.name);
              })
              .map(node => (
                <FileTreeItem 
                  key={node.path} 
                  node={node} 
                  onSelect={handleFileSelect}
                />
              ))}
          </div>
        </div>

        {/* Column 4: Other Filters */}
        <div class="filter-column">
          <h4>Other Filters</h4>
          <div class="filter-field">
            <label>Has Field ({availableFields.value.length}):</label>
            <select
              class="filter-select"
              value={fieldFilter.value}
              onChange={(e) => {
                const val = (e.target as HTMLSelectElement).value;
                fieldFilter.value = val;
                autoApplyFilters(undefined, undefined, val, undefined);
              }}
            >
              <option value="">Select field...</option>
              {availableFields.value.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          <div class="filter-field">
            <label>Span Name ({availableSpans.value.length}):</label>
            <select
              class="filter-select"
              value={spanFilter.value}
              onChange={(e) => {
                const val = (e.target as HTMLSelectElement).value;
                spanFilter.value = val;
                autoApplyFilters(undefined, undefined, undefined, val);
              }}
            >
              <option value="">Select span...</option>
              {availableSpans.value.map(span => (
                <option key={span} value={span}>{span}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Custom JQ */}
      <div class="filter-section">
        <h4>Custom JQ Query</h4>
        <form class="custom-jq-form" onSubmit={handleCustomJq}>
          <input
            type="text"
            class="filter-input jq-input-large"
            placeholder='e.g., select(.level == "ERROR" and (.message | contains("panic")))'
            value={customJq.value}
            onInput={(e) => customJq.value = (e.target as HTMLInputElement).value}
          />
          <button type="submit" class="btn btn-secondary">
            ⚡ Execute
          </button>
        </form>
        {jqFilter.value && (
          <div class="current-filter">
            <span class="current-filter-label">Active filter:</span>
            <code class="current-filter-code">{jqFilter.value}</code>
          </div>
        )}
      </div>
      <div class="filter-panel-resize-handle" onMouseDown={onResizeStart} />
    </div>
  );
}
