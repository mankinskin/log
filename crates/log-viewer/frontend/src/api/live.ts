// Live API client — talks to the Rust log-viewer backend over HTTP.
// Used during local development (default mode).

import type { LogFile, LogContentResponse, SearchResponse, JqQueryResponse, SourceFileResponse, SourceSnippet } from '../types';
import type { SessionConfig, SessionConfigUpdate } from './index';
import { withSession } from '@context-engine/viewer-api-frontend';

const API_BASE = '/api';

export async function getSessionConfig(): Promise<SessionConfig> {
  const response = await fetch(`${API_BASE}/session`, withSession());
  if (!response.ok) throw new Error('Failed to get session config');
  return response.json();
}

export async function updateSessionConfig(update: SessionConfigUpdate): Promise<SessionConfig> {
  const response = await fetch(`${API_BASE}/session`, withSession({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  }));
  if (!response.ok) throw new Error('Failed to update session config');
  return response.json();
}

export async function fetchLogFiles(): Promise<LogFile[]> {
  const response = await fetch(`${API_BASE}/logs`, withSession());
  if (!response.ok) throw new Error('Failed to fetch log files');
  return response.json();
}

export async function fetchLogContent(name: string): Promise<LogContentResponse> {
  const response = await fetch(`${API_BASE}/logs/${encodeURIComponent(name)}`, withSession());
  if (!response.ok) throw new Error('Failed to fetch log content');
  return response.json();
}

export async function searchLogs(
  name: string,
  query: string,
  level?: string,
  limit?: number,
): Promise<SearchResponse> {
  const url = new URL(`${API_BASE}/search/${encodeURIComponent(name)}`, window.location.origin);
  url.searchParams.set('q', query);
  if (level) url.searchParams.set('level', level);
  if (limit) url.searchParams.set('limit', limit.toString());

  const response = await fetch(url.toString(), withSession());
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Search failed');
  }
  return response.json();
}

export async function queryLogs(
  name: string,
  jqFilter: string,
  limit?: number,
): Promise<JqQueryResponse> {
  const url = new URL(`${API_BASE}/query/${encodeURIComponent(name)}`, window.location.origin);
  url.searchParams.set('jq', jqFilter);
  if (limit) url.searchParams.set('limit', limit.toString());

  const response = await fetch(url.toString(), withSession());
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Query failed');
  }
  return response.json();
}

export async function fetchSourceFile(path: string): Promise<SourceFileResponse> {
  const response = await fetch(`${API_BASE}/source/${encodeURIComponent(path)}`, withSession());
  if (!response.ok) throw new Error('Failed to fetch source file');
  return response.json();
}

export async function fetchSourceSnippet(
  path: string,
  line: number,
  context: number = 5,
): Promise<SourceSnippet> {
  const url = new URL(`${API_BASE}/source/${encodeURIComponent(path)}`, window.location.origin);
  url.searchParams.set('line', line.toString());
  url.searchParams.set('context', context.toString());

  const response = await fetch(url.toString(), withSession());
  if (!response.ok) throw new Error('Failed to fetch source snippet');
  return response.json();
}

// Cache for signatures (they are immutable for a given log file)
const signaturesCache = new Map<string, Record<string, unknown>>();

export async function fetchSignatures(name: string): Promise<Record<string, unknown>> {
  const cached = signaturesCache.get(name);
  if (cached) return cached;

  const response = await fetch(`${API_BASE}/signatures/${encodeURIComponent(name)}`, withSession());
  if (!response.ok) {
    // Return empty object if no signatures file exists
    return {};
  }
  const data = await response.json();
  signaturesCache.set(name, data);
  return data;
}
