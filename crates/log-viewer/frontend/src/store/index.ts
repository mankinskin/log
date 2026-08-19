// Reactive state store using Preact Signals
// Supports per-file state for tabs, code viewer, etc.

import { signal, computed } from '@preact/signals';
import { createUrlStateManager } from '@context-engine/viewer-api-frontend';
import type { GraphReplayEnvelope, LogFile, LogEntry, ViewTab, LogLevel, EventType, LogStats, HypergraphSnapshot, SearchStateEvent, VizPathGraph } from '../types';
import * as api from '../api';

// Per-file state interface
interface FileState {
    entries: LogEntry[];
    searchQuery: string;
  jqFilter: string;
    levelFilter: LogLevel | '';
    typeFilter: EventType | '';
    selectedEntry: LogEntry | null;
    codeViewerFile: string | null;
    codeViewerContent: string;
    codeViewerLine: number | null;
  activeTab: ViewTab;
  activeSearchStep: number;
  /** Currently selected path_id (null = show flat list) */
  activePathId: string | null;
  /** Step index within the active path group */
  activePathStep: number;
  /** Function signatures indexed by function name (loaded from debug_signatures/) */
  signatures: Record<string, unknown>;
}

// Create default file state
function createFileState(): FileState {
    return {
        entries: [],
        searchQuery: '',
      jqFilter: '',
        levelFilter: '',
        typeFilter: '',
        selectedEntry: null,
        codeViewerFile: null,
        codeViewerContent: '',
        codeViewerLine: null,
      activeTab: 'hypergraph',
      activeSearchStep: -1,
      activePathId: null,
      activePathStep: -1,
      signatures: {},
    };
}

// Global state
export const logFiles = signal<LogFile[]>([]);
export const currentFile = signal<string | null>(null);
export const isLoading = signal(false);
export const error = signal<string | null>(null);
export const statusMessage = signal('Ready');

// View state (shared across files)
export const activeTab = signal<ViewTab>('hypergraph');
export const showRaw = signal(false);

/** When true, selecting a node triggers automatic layout around it.
 *  When false, nodes can be freely dragged and clicking only pans the camera. */
export const autoLayoutEnabled = signal(false);

// Per-file state storage
const fileStates = signal<Map<string, FileState>>(new Map());

// Get or create state for a file
function getFileState(filename: string | null): FileState {
    if (!filename) return createFileState();

    const states = fileStates.value;
    if (!states.has(filename)) {
        const newStates = new Map(states);
        newStates.set(filename, createFileState());
        fileStates.value = newStates;
    }
    return fileStates.value.get(filename)!;
}

// Update state for current file
function updateCurrentFileState(updates: Partial<FileState>) {
    const filename = currentFile.value;
    if (!filename) return;

    const states = new Map(fileStates.value);
    const current = states.get(filename) || createFileState();
    states.set(filename, { ...current, ...updates });
    fileStates.value = states;
}

// Computed: current file's state
const currentFileState = computed(() => getFileState(currentFile.value));

// Computed accessors for current file's state
export const entries = computed(() => currentFileState.value.entries);
export const searchQuery = computed(() => currentFileState.value.searchQuery);
export const jqFilter = computed(() => currentFileState.value.jqFilter);
export const levelFilter = computed(() => currentFileState.value.levelFilter);
export const typeFilter = computed(() => currentFileState.value.typeFilter);
export const selectedEntry = computed(() => currentFileState.value.selectedEntry);
export const codeViewerFile = computed(() => currentFileState.value.codeViewerFile);
export const codeViewerContent = computed(() => currentFileState.value.codeViewerContent);
export const codeViewerLine = computed(() => currentFileState.value.codeViewerLine);

/** Function signatures indexed by function name, for the current file */
export const signatures = computed(() => currentFileState.value.signatures);

// Computed values
export const filteredEntries = computed(() => {
  let result = entries.value;
    const level = levelFilter.value;
    const type = typeFilter.value;
  
    if (level) {
        result = result.filter(e => e.level.toUpperCase() === level.toUpperCase());
  }
  
    if (type) {
        result = result.filter(e => e.event_type === type);
  }
  
  return result;
});

// Computed: extract hypergraph snapshot from log entries (first graph_snapshot event)
export const hypergraphSnapshot = computed((): HypergraphSnapshot | null => {
  const allEntries = entries.value;
  for (const entry of allEntries) {
    if (entry.message === 'graph_snapshot' && entry.fields?.graph_data) {
      try {
        const data = typeof entry.fields.graph_data === 'string'
          ? JSON.parse(entry.fields.graph_data)
          : entry.fields.graph_data;
        if (data && Array.isArray(data.nodes) && Array.isArray(data.edges)) {
          return data as HypergraphSnapshot;
        }
      } catch {
        // skip invalid JSON
      }
    }
  }
  return null;
});

// ── Graph Operation Visualization ──

// Internal: graph op events paired with their log entry index for
// chronological association with search path events.
interface IndexedGraphOp {
  entryIdx: number;
  event: SearchStateEvent;
}

export function replayEnvelopeToGraphOp(data: GraphReplayEnvelope): SearchStateEvent | null {
  if (data.schema_version !== 'graph-replay/v1' || !data.step) {
    return null;
  }

  return {
    step: data.step.step,
    op_type: data.op_type,
    transition: data.step.transition,
    location: data.step.location,
    query: data.step.query,
    description: data.step.description,
    path_id: data.path_id,
    path_graph: data.step.path_graph,
    graph_mutation: data.step.graph_mutation,
  } as SearchStateEvent;
}

const _graphOpEventsIndexed = computed((): IndexedGraphOp[] => {
  const allEntries = entries.value;
  const events: IndexedGraphOp[] = [];
  for (let i = 0; i < allEntries.length; i++) {
    const entry = allEntries[i]!;
    // graph_op is legacy/default event format.
    // graph_replay/v1 is normalized into SearchStateEvent for UI playback.
    if (entry.fields?.graph_op || entry.fields?.graph_replay) {
      try {
        if (entry.fields?.graph_op) {
          const data = typeof entry.fields.graph_op === 'string'
            ? JSON.parse(entry.fields.graph_op)
            : entry.fields.graph_op;
          if (data && typeof data.step === 'number') {
            events.push({ entryIdx: i, event: data as SearchStateEvent });
            continue;
          }
        }

        if (entry.fields?.graph_replay) {
          const replay = typeof entry.fields.graph_replay === 'string'
            ? JSON.parse(entry.fields.graph_replay)
            : entry.fields.graph_replay;
          const normalized = replayEnvelopeToGraphOp(replay as GraphReplayEnvelope);
          if (normalized && typeof normalized.step === 'number') {
            events.push({ entryIdx: i, event: normalized });
          }
        }
      } catch {
        // skip invalid JSON
      }
    }
  }
  return events.sort((a, b) => a.event.step - b.event.step);
});

// Computed: extract all graph_op events from log entries (sorted by step)
export const graphOpEvents = computed((): SearchStateEvent[] => {
  return _graphOpEventsIndexed.value.map(e => e.event);
});

// Alias for backwards compatibility
export const searchStates = graphOpEvents;

// Currently active step (per-file, controlled by slider/playback)
export const activeSearchStep = computed(() => currentFileState.value.activeSearchStep);

// The active graph op event
export const activeSearchState = computed((): SearchStateEvent | null => {
  const step = activeSearchStep.value;
  const events = graphOpEvents.value;
  if (step < 0 || step >= events.length) return null;
  return events[step] ?? null;
});

// Action to set the active step (cached per-file)
export function setActiveSearchStep(step: number) {
  updateCurrentFileState({ activeSearchStep: step });
}

// ── Path Group Navigation ──

/** A group of events sharing the same path_id. */
export interface PathGroup {
  pathId: string;
  events: SearchStateEvent[];
  /** Global indices into graphOpEvents for each event in this group */
  globalIndices: number[];
}

// Computed: all distinct path groups, ordered by first appearance
export const pathGroups = computed((): PathGroup[] => {
  const all = graphOpEvents.value;
  const groupMap = new Map<string, { events: SearchStateEvent[]; globalIndices: number[] }>();
  const order: string[] = [];

  for (let i = 0; i < all.length; i++) {
    const ev = all[i]!;
    const pid = ev.path_id;
    let group = groupMap.get(pid);
    if (!group) {
      group = { events: [], globalIndices: [] };
      groupMap.set(pid, group);
      order.push(pid);
    }
    group.events.push(ev);
    group.globalIndices.push(i);
  }

  return order.map(pid => {
    const g = groupMap.get(pid)!;
    return { pathId: pid, events: g.events, globalIndices: g.globalIndices };
  });
});

// Per-file: currently selected path_id
export const activePathId = computed(() => currentFileState.value.activePathId);

// Per-file: step within active path group
export const activePathStep = computed(() => currentFileState.value.activePathStep);

// The active path group (if any)
export const activePathGroup = computed((): PathGroup | null => {
  const pid = activePathId.value;
  if (!pid) return null;
  return pathGroups.value.find(g => g.pathId === pid) ?? null;
});

// The active event from the active path group
export const activePathEvent = computed((): SearchStateEvent | null => {
  const group = activePathGroup.value;
  const step = activePathStep.value;
  if (!group || step < 0 || step >= group.events.length) return null;
  return group.events[step] ?? null;
});

// Actions for path navigation
export function setActivePathId(pathId: string | null) {
  updateCurrentFileState({ activePathId: pathId, activePathStep: pathId ? 0 : -1 });
}

export function setActivePathStep(step: number) {
  updateCurrentFileState({ activePathStep: step });
}

// ── Search Path Visualization (unified in GraphOpEvent) ──

/**
 * Get the accumulated VizPathGraph from the current path step event.
 * Each GraphOpEvent already carries the full path_graph snapshot
 * (accumulated on the Rust side via apply_transition), so we just
 * read it directly from the active event.
 */
export const activeSearchPath = computed((): VizPathGraph | null => {
  const group = activePathGroup.value;
  const step = activePathStep.value;
  if (!group || step < 0) return null;

  const event = group.events[Math.min(step, group.events.length - 1)];
  if (!event) return null;

  // path_graph is the accumulated snapshot after all transitions up to this step
  const pg = event.path_graph;
  if (!pg || (!pg.start_node && !pg.root)) return null;
  return pg;
});

export const logStats = computed((): LogStats => {
  const allEntries = entries.value;
  
  const levelCounts = { TRACE: 0, DEBUG: 0, INFO: 0, WARN: 0, ERROR: 0 } as Record<LogLevel, number>;
  const typeCounts = { event: 0, span_enter: 0, span_exit: 0, unknown: 0 } as Record<EventType, number>;
  const spanDurations: Record<string, { count: number; totalDuration: number }> = {};
  
  for (const entry of allEntries) {
    const level = entry.level.toUpperCase() as LogLevel;
    if (level in levelCounts) levelCounts[level]++;
    
    const type = entry.event_type as EventType;
    if (type in typeCounts) typeCounts[type]++;
    
    // Track span durations
    if (entry.event_type === 'span_exit' && entry.span_name) {
      const busyField = entry.fields['busy'];
      if (typeof busyField === 'string') {
        const durationMatch = busyField.match(/([\d.]+)(µs|ms|s)/);
        if (durationMatch) {
          const durationStr = durationMatch[1];
          const unit = durationMatch[2];
          if (!durationStr || !unit) continue;
          
          let duration = parseFloat(durationStr);
          if (unit === 'µs') duration /= 1000000;
          else if (unit === 'ms') duration /= 1000;
          
          if (!spanDurations[entry.span_name]) {
            spanDurations[entry.span_name] = { count: 0, totalDuration: 0 };
          }
          const spanData = spanDurations[entry.span_name];
          if (spanData) {
            spanData.count++;
            spanData.totalDuration += duration;
          }
        }
      }
    }
  }
  
  // Build timeline data
  const timelineMap = new Map<number, number>();
  for (const entry of allEntries) {
    if (entry.timestamp) {
      const ts = parseFloat(entry.timestamp);
      const bucket = Math.floor(ts * 10) / 10; // 100ms buckets
      timelineMap.set(bucket, (timelineMap.get(bucket) || 0) + 1);
    }
  }
  const timelineData = Array.from(timelineMap.entries())
    .map(([timestamp, count]) => ({ timestamp, count }))
    .sort((a, b) => a.timestamp - b.timestamp);
  
  // Top spans by count
  const topSpans = Object.entries(spanDurations)
    .map(([name, data]) => ({
      name,
      count: data.count,
      avgDuration: data.totalDuration / data.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return { levelCounts, typeCounts, timelineData, topSpans };
});

// Actions
export async function loadLogFiles() {
  isLoading.value = true;
  error.value = null;
  
  try {
    logFiles.value = await api.fetchLogFiles();
    statusMessage.value = `Found ${logFiles.value.length} log files`;
  } catch (e) {
    error.value = String(e);
    statusMessage.value = 'Error loading files';
  } finally {
    isLoading.value = false;
  }
}

export async function loadLogFile(name: string) {
    // Check if we already have entries for this file
    const existingState = fileStates.value.get(name);
    if (existingState && existingState.entries.length > 0) {
      // Just switch to the file, keep the currently active tab
      currentFile.value = name;
        updateUrlHash();
        statusMessage.value = `Loaded ${name} (${existingState.entries.length} entries)`;
        return;
    }

  isLoading.value = true;
  error.value = null;
  statusMessage.value = `Loading ${name}...`;
  
  try {
    const data = await api.fetchLogContent(name);

    // Fetch signatures in parallel (non-blocking — empty object on failure)
    const sigs = await api.fetchSignatures(name).catch(() => ({}));

    // Find the best source location to pre-load in the code viewer:
    // Priority:
    //   1. The outermost span (depth=0 span_enter) – typically the test function wrapper.
    //   2. The "test started" event emitted by init_test_tracing! at the call site –
    //      this reliably captures the test file and line.
    //   3. Any other entry with a file reference.
    const testEntry =
      data.entries.find(e => e.event_type === 'span_enter' && e.depth === 0 && e.file !== null) ??
      data.entries.find(e => e.message === 'test started' && e.file !== null) ??
      data.entries.find(e => e.file !== null);

    // Fetch source file in parallel if a location was found (non-blocking)
    let initialCodeFile: string | null = null;
    let initialCodeContent = '';
    let initialCodeLine: number | null = null;
    if (testEntry?.file) {
      try {
        const src = await api.fetchSourceFile(testEntry.file);
        initialCodeFile = testEntry.file;
        initialCodeContent = src.content;
        initialCodeLine = testEntry.source_line ?? null;
      } catch {
        // Source file unavailable — leave code viewer empty
      }
    }

    // Create state for this file, inheriting the currently active tab
    const states = new Map(fileStates.value);
    states.set(name, {
      ...createFileState(),
      entries: data.entries,
      activeTab: activeTab.value,
      signatures: sigs,
      codeViewerFile: initialCodeFile,
      codeViewerContent: initialCodeContent,
      codeViewerLine: initialCodeLine,
    });
    fileStates.value = states;

    currentFile.value = name;
    updateUrlHash();
    // Keep the currently active tab type when opening a new file
    statusMessage.value = `Loaded ${name} (${data.entries.length} entries)`;
  } catch (e) {
    error.value = String(e);
    statusMessage.value = 'Error loading file';
  } finally {
    isLoading.value = false;
  }
}

export async function performSearch(query: string) {
  if (!query || !currentFile.value) {
      updateCurrentFileState({ searchQuery: '' });
    return;
  }
  
  isLoading.value = true;
  statusMessage.value = `Searching for "${query}"...`;
  
  try {
    const data = await api.searchLogs(
      currentFile.value,
      query,
      levelFilter.value || undefined
    );
      updateCurrentFileState({
          entries: data.matches,
          searchQuery: query,
      });
    statusMessage.value = `Found ${data.total_matches} matches`;
  } catch (e) {
    error.value = String(e);
    statusMessage.value = `Search error: ${e}`;
  } finally {
    isLoading.value = false;
  }
}

export async function performJqQuery(filter: string) {
  if (!filter || !currentFile.value) {
    updateCurrentFileState({ jqFilter: '' });
    return;
  }

  isLoading.value = true;
  statusMessage.value = `Applying JQ filter...`;

  try {
    const data = await api.queryLogs(
      currentFile.value,
      filter
    );
    updateCurrentFileState({
      entries: data.matches,
      jqFilter: filter,
      searchQuery: '', // Clear text search when using JQ
    });
    statusMessage.value = `JQ filter matched ${data.total_matches} entries`;
  } catch (e) {
    error.value = String(e);
    statusMessage.value = `JQ error: ${e}`;
  } finally {
    isLoading.value = false;
  }
}

export async function openSourceFile(path: string, line?: number) {
  try {
    const data = await api.fetchSourceFile(path);
      updateCurrentFileState({
          codeViewerFile: path,
          codeViewerContent: data.content,
          codeViewerLine: line ?? null,
      });
  } catch (e) {
    error.value = `Failed to load source: ${e}`;
  }
}

export function selectEntry(entry: LogEntry | null) {
    updateCurrentFileState({ selectedEntry: entry });
}

// ── URL Hash Routing ──

interface LogViewerUrlState {
  file: string;
  tab: ViewTab;
}

const VALID_TABS: Set<string> = new Set(['logs', 'stats', 'code', 'debug', 'scene3d', 'hypergraph', 'settings']);

const urlState = createUrlStateManager<LogViewerUrlState>({
  stateToHash(state) {
    // /file/<name> for default tab, /file/<name>/<tab> for non-default
    const base = '/file/' + encodeURIComponent(state.file);
    return state.tab === 'logs' ? base : base + '/' + state.tab;
  },
  hashToState(hash) {
    // Expected: /file/<name> or /file/<name>/<tab>
    const path = hash.startsWith('/') ? hash.slice(1) : hash;
    if (!path.startsWith('file/')) return null;
    const rest = path.slice(5); // after "file/"
    if (!rest) return null;

    // Find the last segment that could be a tab name
    const lastSlash = rest.lastIndexOf('/');
    if (lastSlash >= 0) {
      const possibleTab = rest.slice(lastSlash + 1);
      if (VALID_TABS.has(possibleTab)) {
        const file = decodeURIComponent(rest.slice(0, lastSlash));
        return file ? { file, tab: possibleTab as ViewTab } : null;
      }
    }
    // No tab segment — default to logs
    const file = decodeURIComponent(rest);
    return file ? { file, tab: 'logs' } : null;
  },
  async onNavigate(state) {
    await loadLogFile(state.file);
    setTab(state.tab);
  },
  getCurrentState() {
    const file = currentFile.value;
    if (!file) return null;
    return { file, tab: activeTab.value };
  },
  statesEqual(a, b) {
    return a.file === b.file && a.tab === b.tab;
  },
});

function updateUrlHash(): void {
  const file = currentFile.value;
  if (!file) return;
  urlState.updateHash({ file, tab: activeTab.value });
}

export function getStateFromUrl() {
  return urlState.getStateFromUrl();
}

export function initUrlListener(): void {
  urlState.initListener();
}

export function setTab(tab: ViewTab) {
  activeTab.value = tab;
  updateCurrentFileState({ activeTab: tab });
  updateUrlHash();
}

export function setLevelFilter(level: LogLevel | '') {
    updateCurrentFileState({ levelFilter: level });
}

export function setTypeFilter(type: EventType | '') {
    updateCurrentFileState({ typeFilter: type });
}

export function clearSearch() {
    // Reload original entries for current file
    const filename = currentFile.value;
    if (!filename) return;

    // Force reload
    const states = new Map(fileStates.value);
    states.delete(filename);
    fileStates.value = states;
    loadLogFile(filename);
}
