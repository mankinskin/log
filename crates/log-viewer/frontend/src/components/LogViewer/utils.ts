/**
 * Utility functions for LogViewer components
 */

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function highlightMatch(text: string, query: string): string {
  if (!query) return escapeHtml(text);
  try {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark class="highlight">$1</mark>');
  } catch {
    return escapeHtml(text);
  }
}

export function formatTimestamp(ts: string | null): string {
  if (!ts) return '';
  const num = parseFloat(ts);
  if (num < 1) return `${(num * 1000).toFixed(0)}ms`;
  return `${num.toFixed(2)}s`;
}

export interface BacktraceFrame {
  index: number;
  function: string;
  location?: string;
}

/**
 * Parse backtrace to extract frames
 */
export function parseBacktrace(backtrace: string): BacktraceFrame[] {
  const frames: BacktraceFrame[] = [];
  const lines = backtrace.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;
    // Match frame lines like "   0: rust_begin_unwind" or "   1: std::panicking::..."
    const frameMatch = line.match(/^(\d+):\s+(.+)$/);
    if (frameMatch) {
      const indexStr = frameMatch[1];
      const func = frameMatch[2];
      if (!indexStr || !func) continue;
      
      const index = parseInt(indexStr, 10);
      
      // Check next line for location
      let location: string | undefined;
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1]?.trim();
        if (nextLine?.startsWith('at ')) {
          location = nextLine.slice(3);
          i++; // Skip location line
        }
      }
      
      frames.push({ index, function: func, location });
    }
  }
  
  return frames;
}

/**
 * Filter backtrace frames to show only relevant ones (user code, not std/runtime)
 */
export function getRelevantFrames(frames: BacktraceFrame[]): BacktraceFrame[] {
  // Skip frames from std, core, rust runtime, test harness
  const skipPatterns = [
    /^rust_begin_unwind/,
    /^core::/,
    /^std::/,
    /^<.*as core::/,
    /^test::/,
    /^__rust_/,
    /^<alloc::/,
    /^alloc::/,
  ];
  
  return frames.filter(f => {
    // Skip runtime frames
    if (skipPatterns.some(p => p.test(f.function))) {
      return false;
    }
    // Keep frames with user code locations (not in rustc or stdlib)
    if (f.location && !f.location.includes('/rustc/') && !f.location.includes('\\rustc\\')) {
      return true;
    }
    // Keep frames that look like user code
    return !f.function.includes('::{{closure}}') || f.location;
  }).slice(0, 5); // Limit to first 5 relevant frames
}

/**
 * Generate a consistent hue (0-360) from a string
 * Uses simple hash function for fast, deterministic results
 */
export function stringToHue(str: string): number {
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  // Use golden ratio to spread colors well
  return Math.abs(hash * 137.508) % 360;
}

/**
 * Generate an HSL color string from a span name
 * Returns a pastel color with consistent hue per span name
 */
export function spanNameToColor(spanName: string | null | undefined, saturation = 50, lightness = 35): string {
  if (!spanName) return 'transparent';
  const hue = stringToHue(spanName);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Generate colors for depth levels (rainbow gradient)
 */
export function depthToColor(depth: number, saturation = 40, lightness = 50): string {
  // Spread colors across spectrum, offset to start at cyan
  const hue = (depth * 50 + 180) % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Format a fn_sig object into a readable function signature string for tooltips.
 * Input: { name: "foo", params: [{self: "&self"}, {name: "x", type: "Type"}], return_type: "Result" }
 * Output: "fn foo(&self, x: Type) -> Result"
 */
export function formatSignature(sig: { name?: string; self_type?: string; params?: Array<Record<string, string>>; return_type?: string }): string {
  if (!sig.name) return '';
  const params = (sig.params || []).map(p => {
    if (p.self) return p.self;
    if (p.name && p.type) return `${p.name}: ${p.type}`;
    return '';
  }).filter(Boolean).join(', ');
  const ret = sig.return_type ? ` -> ${sig.return_type}` : '';
  const selfType = sig.self_type ? `<${sig.self_type.split('::').pop()}>` : '';
  return `fn ${sig.name}${selfType}(${params})${ret}`;
}
