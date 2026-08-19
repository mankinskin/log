/**
 * Shared WCAG contrast utilities.
 *
 * These run inside the browser via `page.evaluate`, so they must be
 * self-contained (no imports from outside the browser context).
 */

/**
 * Parse any CSS color string the browser resolves for an element into an
 * [r,g,b] triplet in the 0–255 range.
 *
 * Strategy: ask the browser to parse it via a temporary element.
 */
export function parseColor(css: string): [number, number, number] | null {
  const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

/** WCAG relative luminance of a linear-sRGB channel value (0–255). */
function channelLuminance(c255: number): number {
  const c = c255 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** WCAG relative luminance (0–1) from an [r,g,b] triplet. */
export function relativeLuminance([r, g, b]: [number, number, number]): number {
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

/** WCAG contrast ratio (≥1). */
export function contrastRatio(
  fg: [number, number, number],
  bg: [number, number, number],
): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
