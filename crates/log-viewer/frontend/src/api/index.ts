// API client for the log viewer backend
//
// When VITE_STATIC_MODE is set (GitHub Pages build), all exports are
// re-exported from ./static.ts which reads pre-parsed JSON bundles
// instead of hitting a live Rust server.

// Log-viewer specific session config (extends base with source_request_count)
export interface SessionConfig {
  session_id: string;
  verbose: boolean;
  source_request_count: number;
}

export interface SessionConfigUpdate {
  verbose?: boolean;
}

// ── Mode selection ──

export const STATIC_MODE = !!import.meta.env.VITE_STATIC_MODE;

if (STATIC_MODE) {
  console.info('[log-viewer] Running in static demo mode');
}

import * as staticApi from './static';
import * as liveApi from './live';

const impl = STATIC_MODE ? staticApi : liveApi;

export const getSessionConfig = impl.getSessionConfig;
export const updateSessionConfig = impl.updateSessionConfig;
export const fetchLogFiles = impl.fetchLogFiles;
export const fetchLogContent = impl.fetchLogContent;
export const searchLogs = impl.searchLogs;
export const queryLogs = impl.queryLogs;
export const fetchSourceFile = impl.fetchSourceFile;
export const fetchSourceSnippet = impl.fetchSourceSnippet;
export const fetchSignatures = impl.fetchSignatures;

