import type { ComponentChildren } from 'preact';
import { h } from 'preact';
import type { TreeNode } from '@context-engine/viewer-api-frontend';
import type { LogFile } from '../types';

/** Category definition for virtual top-level folders */
interface Category {
  id: string;
  label: string;
  filter: (f: LogFile) => boolean;
  icon: ComponentChildren;
  color: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'cat-search',
    label: 'Search',
    filter: (f) => f.has_search_ops,
    icon: h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
      h('circle', { cx: 11, cy: 11, r: 8 }), h('path', { d: 'm21 21-4.35-4.35' }),
    ),
    color: 'var(--accent-blue)',
  },
  {
    id: 'cat-insert',
    label: 'Insert',
    filter: (f) => f.has_insert_ops,
    icon: h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
      h('path', { d: 'M12 5v14M5 12h14' }),
    ),
    color: 'var(--accent-green)',
  },
  {
    id: 'cat-graph',
    label: 'Graph',
    filter: (f) => f.has_graph_snapshot,
    icon: h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
      h('circle', { cx: 6, cy: 6, r: 3 }), h('circle', { cx: 18, cy: 6, r: 3 }),
      h('circle', { cx: 6, cy: 18, r: 3 }), h('circle', { cx: 18, cy: 18, r: 3 }),
      h('line', { x1: 9, y1: 6, x2: 15, y2: 6 }), h('line', { x1: 6, y1: 9, x2: 6, y2: 15 }),
      h('line', { x1: 18, y1: 9, x2: 18, y2: 15 }), h('line', { x1: 9, y1: 18, x2: 15, y2: 18 }),
    ),
    color: 'var(--accent-purple)',
  },
  {
    id: 'cat-paths',
    label: 'Paths',
    filter: (f) => f.has_search_paths,
    icon: h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
      h('polyline', { points: '4 7 4 4 20 4 20 7' }),
      h('line', { x1: 12, y1: 21, x2: 12, y2: 8 }),
      h('polyline', { points: '8 12 12 8 16 12' }),
    ),
    color: 'var(--accent-cyan, #22d3ee)',
  },
];

export { CATEGORIES };

/** Format byte size to human-readable string */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Build a tooltip element for a log file */
function buildTooltip(file: LogFile): ComponentChildren {
  const badges: string[] = [];
  if (file.has_graph_snapshot) badges.push('Graph');
  if (file.has_search_ops) badges.push('Search');
  if (file.has_insert_ops) badges.push('Insert');
  if (file.has_search_paths) badges.push('Paths');

  return h('div', { class: 'file-tooltip' },
    h('div', { class: 'file-tooltip-name' }, file.name),
    h('div', { class: 'file-tooltip-meta' },
      `Size: ${formatSize(Number(file.size))}`,
      file.modified ? ` · ${file.modified}` : '',
    ),
    badges.length > 0 && h('div', { class: 'file-tooltip-badges' }, badges.join(', ')),
  );
}

/**
 * Build TreeNode array from flat log file list as a properly nested
 * directory tree (like a real filesystem explorer).  Category filtering
 * is handled by the filter buttons in FileTree, so no virtual category
 * folders are created here.
 */
export function buildFileTree(files: LogFile[]): TreeNode<LogFile>[] {
  return buildDirectoryTree(files);
}

/**
 * Recursively build a nested directory tree from flat file paths.
 *
 * Given `["a/b/x.json", "a/b/y.json", "a/c.json", "root.json"]` produces:
 *   a/
 *     b/
 *       x.json
 *       y.json
 *     c.json
 *   root.json
 */
function buildDirectoryTree(files: LogFile[], prefix = ''): TreeNode<LogFile>[] {
// Separate files at this level from files in subdirectories
  const rootFiles: LogFile[] = [];
  // Map from top-level dir segment → files whose name starts with that segment
  const subdirs = new Map<string, LogFile[]>();

  for (const file of files) {
    // Find the relative portion of the name after the current prefix
    const rel = prefix ? file.name.slice(prefix.length) : file.name;
    const slashIdx = rel.indexOf('/');
    if (slashIdx === -1) {
      rootFiles.push(file);
    } else {
      const topDir = rel.slice(0, slashIdx);
      const list = subdirs.get(topDir);
      if (list) {
        list.push(file);
      } else {
        subdirs.set(topDir, [file]);
      }
    }
  }

  const result: TreeNode<LogFile>[] = [];

  // Subdirectories first, sorted alphabetically
  const sortedDirs = [...subdirs.keys()].sort();
  for (const dir of sortedDirs) {
    const childPrefix = prefix ? `${prefix}${dir}/` : `${dir}/`;
    const children = buildDirectoryTree(subdirs.get(dir)!, childPrefix);
    result.push({
      id: `dir-${prefix}${dir}`,
      label: dir,
      icon: 'folder' as const,
      badge: countLeaves(children),
      children,
    });
  }

  // Then root-level files, sorted by name
  const sortedFiles = [...rootFiles].sort((a, b) => a.name.localeCompare(b.name));
  for (const file of sortedFiles) {
    result.push(fileToNode(file));
  }

  return result;
}

/** Count leaf (file) nodes in a tree for badge display */
function countLeaves(nodes: TreeNode<LogFile>[]): number {
  let count = 0;
  for (const n of nodes) {
    if (n.children) {
      count += countLeaves(n.children);
    } else {
      count++;
    }
  }
  return count;
}

function fileToNode(file: LogFile): TreeNode<LogFile> {
  const basename = file.name.includes('/') ? file.name.slice(file.name.lastIndexOf('/') + 1) : file.name;
  return {
    id: `file-${file.name}`,
    label: basename,
    icon: 'file' as const,
    data: file,
    tooltip: buildTooltip(file),
  };
}
