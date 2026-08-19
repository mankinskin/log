// Static API adapter — serves pre-parsed JSON from public/data/ instead of a live backend.
// Used when building for GitHub Pages (VITE_STATIC_MODE=true).

import type { LogFile, LogContentResponse, SearchResponse, JqQueryResponse, SourceFileResponse, SourceSnippet } from '../types';
import type { SessionConfig, SessionConfigUpdate } from './index';

const DATA_BASE = import.meta.env.BASE_URL + 'data';

// ── Session (no-op in static mode) ──

export async function getSessionConfig(): Promise<SessionConfig> {
  return { session_id: 'static', verbose: false, source_request_count: 0 };
}

export async function updateSessionConfig(_update: SessionConfigUpdate): Promise<SessionConfig> {
  return getSessionConfig();
}

// ── Log listing ──

export async function fetchLogFiles(): Promise<LogFile[]> {
  const resp = await fetch(`${DATA_BASE}/manifest.json`);
  if (!resp.ok) throw new Error('Failed to load manifest.json');
  const files = await resp.json();
  // Ensure all boolean fields have defaults (for backward compatibility with older manifests)
  return files.map((f: Partial<LogFile>) => ({
    ...f,
    has_graph_snapshot: f.has_graph_snapshot ?? false,
    has_search_ops: f.has_search_ops ?? false,
    has_insert_ops: f.has_insert_ops ?? false,
    has_search_paths: f.has_search_paths ?? false,
  }));
}

// ── Log content ──

// Cache loaded log content so search/filter can reuse it
const contentCache = new Map<string, LogContentResponse>();

export async function fetchLogContent(name: string): Promise<LogContentResponse> {
  const cached = contentCache.get(name);
  if (cached) return cached;

  const jsonName = name.replace(/\.log$/, '.json');
  const resp = await fetch(`${DATA_BASE}/${encodeURIComponent(jsonName)}`);
  if (!resp.ok) throw new Error(`Failed to load ${jsonName}`);
  const data: LogContentResponse = await resp.json();
  contentCache.set(name, data);
  return data;
}

// ── Search (client-side regex on cached entries) ──

export async function searchLogs(
  name: string,
  query: string,
  level?: string,
  _limit?: number,
): Promise<SearchResponse> {
  const content = await fetchLogContent(name);
  let regex: RegExp;
  try {
    regex = new RegExp(query, 'i');
  } catch {
    throw new Error(`Invalid regex: ${query}`);
  }

  let matches = content.entries.filter(e => {
    if (level && e.level.toUpperCase() !== level.toUpperCase()) return false;
    // Search message, raw, and field values
    if (regex.test(e.message)) return true;
    if (regex.test(e.raw)) return true;
    for (const v of Object.values(e.fields)) {
      if (regex.test(typeof v === 'string' ? v : JSON.stringify(v))) return true;
    }
    return false;
  });

  return { query, matches, total_matches: matches.length };
}

// ── JQ query (not supported in static mode) ──

export async function queryLogs(
  _name: string,
  _jqFilter: string,
  _limit?: number,
): Promise<JqQueryResponse> {
  throw new Error('JQ queries are not available in static demo mode');
}

// ── Source files ──
// In static/GitHub Pages mode, files are fetched directly from the raw GitHub
// content API using the repository and commit SHA injected at build time.

/** Base URL for raw GitHub file content, e.g.
 *  `https://raw.githubusercontent.com/owner/repo/sha` */
function rawGitHubBase(): string | null {
  const repo = import.meta.env.VITE_GITHUB_REPO;
  const sha  = import.meta.env.VITE_GITHUB_SHA;
  if (repo && sha) {
    return `https://raw.githubusercontent.com/${repo}/${sha}`;
  }
  return null;
}

/** Normalise a source path: convert backslashes and strip leading slashes. */
function normalizePath(path: string): string {
  return path.replace(/\\/g, '/').replace(/^\/+/, '');
}

/** Simple client-side language detection from file extension. */
function detectLanguage(path: string): string {
  const dotIdx = path.lastIndexOf('.');
  const ext = dotIdx >= 0 ? path.slice(dotIdx + 1) : '';
  switch (ext) {
    case 'rs': return 'rust';
    case 'ts': case 'tsx': return 'typescript';
    case 'js': case 'jsx': return 'javascript';
    case 'json': return 'json';
    case 'toml': return 'toml';
    case 'yaml': case 'yml': return 'yaml';
    case 'md': return 'markdown';
    case 'html': return 'html';
    case 'css': return 'css';
    default: return 'plaintext';
  }
}

/** Extract a snippet of lines from content (1-based, inclusive). */
function extractSnippet(
  lines: string[],
  line: number,
  context: number,
): { snippet: string; startLine: number; endLine: number; highlightLine: number } {
  const total = lines.length;
  const clampedLine = Math.min(Math.max(1, line), total);
  const startLine = Math.max(1, clampedLine - context);
  const endLine = Math.min(total, clampedLine + context);
  const snippet = lines.slice(startLine - 1, endLine).join('\n');
  return { snippet, startLine, endLine, highlightLine: clampedLine };
}

export async function fetchSourceFile(path: string): Promise<SourceFileResponse> {
  const base = rawGitHubBase();
  if (!base) {
    throw new Error('Source file viewing is not available in static mode (VITE_GITHUB_REPO / VITE_GITHUB_SHA not set)');
  }
  const url = `${base}/${normalizePath(path)}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch source file ${path}: HTTP ${resp.status}`);
  }
  const content = await resp.text();
  const lines = content.split('\n');
  return {
    path,
    content,
    language: detectLanguage(path),
    total_lines: lines.length,
  };
}

export async function fetchSourceSnippet(
  path: string,
  line: number,
  context: number = 5,
): Promise<SourceSnippet> {
  const base = rawGitHubBase();
  if (!base) {
    throw new Error('Source snippets are not available in static mode (VITE_GITHUB_REPO / VITE_GITHUB_SHA not set)');
  }
  const url = `${base}/${normalizePath(path)}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch source file ${path}: HTTP ${resp.status}`);
  }
  const content = await resp.text();
  const lines = content.split('\n');
  const { snippet, startLine, endLine, highlightLine } = extractSnippet(lines, line, context);
  return {
    path,
    content: snippet,
    start_line: startLine,
    end_line: endLine,
    highlight_line: highlightLine,
    language: detectLanguage(path),
  };
}

export async function fetchSignatures(_name: string): Promise<Record<string, unknown>> {
  // Signatures are not available in static demo mode
  return {};
}
