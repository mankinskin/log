import { useState, useEffect } from 'preact/hooks';
import type { SourceSnippet } from '../types';
import * as api from '../api';

interface UseSourceSnippetResult {
  snippet: SourceSnippet | null;
  error: string | null;
  loading: boolean;
}

/**
 * Hook to fetch a source code snippet for a given file and line.
 * Automatically fetches on mount when file and line are provided.
 */
export function useSourceSnippet(
  file?: string | null,
  line?: number | null,
  context: number = 3
): UseSourceSnippetResult {
  const [snippet, setSnippet] = useState<SourceSnippet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file || !line) {
      return;
    }

    // Don't refetch if we already have the snippet for this location
    if (snippet && snippet.highlight_line === line) {
      return;
    }

    setLoading(true);
    setError(null);

    api.fetchSourceSnippet(file, line, context)
      .then(result => {
        setSnippet(result);
        setLoading(false);
      })
      .catch(e => {
        setError(String(e));
        setLoading(false);
      });
  }, [file, line, context]);

  return { snippet, error, loading };
}
