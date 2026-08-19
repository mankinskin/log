/**
 * E2E tests: Theme colors and text readability
 *
 * Validates acceptance criteria for tickets:
 *   - ee6e2d37  GPU canvas full-page
 *   - 29897f92  Tab bar, sidebar, and resizable panels (viewer-api-leptos)
 *
 * Run with (server must already be started on port 8081):
 *   cd memory-viewers/log-viewer/e2e
 *   npx playwright test
 *
 * WCAG thresholds used:
 *   AA-normal  ≥ 4.5 : 1  (body text ≤ 18px / bold ≤ 14px)
 *   AA-large   ≥ 3.0 : 1  (text > 18px or bold > 14px)
 *   AAA-normal ≥ 7.0 : 1
 */
import { test, expect, Page } from '@playwright/test';
import { parseColor, contrastRatio } from './helpers/contrast';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Read the computed foreground and background color of a CSS selector. */
async function getColors(
  page: Page,
  selector: string,
): Promise<{ fg: [number, number, number]; bg: [number, number, number] } | null> {
  return page.evaluate((sel) => {
    function parseColor(css: string): [number, number, number] | null {
      const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : null;
    }
    const el = document.querySelector(sel);
    if (!el) return null;
    const style = window.getComputedStyle(el);
    const fg = parseColor(style.color);
    const bg = parseColor(style.backgroundColor);
    if (!fg || !bg) return null;
    return { fg, bg };
  }, selector);
}

/** Read a computed CSS property value from an element. */
async function getCssValue(page: Page, selector: string, prop: string): Promise<string | null> {
  return page.evaluate(
    ([sel, p]) => {
      const el = document.querySelector(sel);
      return el ? window.getComputedStyle(el).getPropertyValue(p) : null;
    },
    [selector, prop],
  );
}

/** Return computed pixel height of an element. */
async function getHeight(page: Page, selector: string): Promise<number | null> {
  const box = await page.locator(selector).first().boundingBox();
  return box ? box.height : null;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Wait for the Leptos WASM app to hydrate; the tab bar signals it.
  await page.waitForSelector('.lv-tab-bar', { timeout: 10_000 });
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. Page rendering
// ─────────────────────────────────────────────────────────────────────────────

test('page loads without JS console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.reload();
  await page.waitForSelector('.lv-tab-bar', { timeout: 10_000 });

  expect(
    errors.filter(
      // Filter out expected proxy/network errors when the API backend is not running.
      (e) => !e.includes('Failed to fetch') && !e.includes('net::ERR_'),
    ),
  ).toHaveLength(0);
});

test('page has correct title / heading', async ({ page }) => {
  const title = await page.locator('.lv-header-title').first().textContent();
  expect(title?.trim().length).toBeGreaterThan(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Tab bar — structure and dimensions (ticket 29897f92 AC #1)
// ─────────────────────────────────────────────────────────────────────────────

test('tab bar has correct height (32px)', async ({ page }) => {
  const height = await getHeight(page, '.lv-tab-bar');
  expect(height).not.toBeNull();
  // Allow ±2px for border/subpixel rendering differences.
  expect(height!).toBeGreaterThanOrEqual(30);
  expect(height!).toBeLessThanOrEqual(34);
});

test('all three tabs are rendered', async ({ page }) => {
  const tabs = page.locator('.lv-tab');
  await expect(tabs).toHaveCount(3);
});

test('first tab (Logs) is active by default', async ({ page }) => {
  const firstTab = page.locator('.lv-tab').first();
  await expect(firstTab).toHaveClass(/lv-tab-active/);
});

test('tab icons and labels are both present', async ({ page }) => {
  const icons = page.locator('.lv-tab-icon');
  const labels = page.locator('.lv-tab-label');
  await expect(icons).toHaveCount(3);
  await expect(labels).toHaveCount(3);

  // Each label should have non-empty text.
  for (let i = 0; i < 3; i++) {
    const text = await labels.nth(i).textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Sidebar — structure (ticket 29897f92 AC #2)
// ─────────────────────────────────────────────────────────────────────────────

test('sidebar is visible', async ({ page }) => {
  await expect(page.locator('.lv-sidebar')).toBeVisible();
});

test('sidebar has collapse button', async ({ page }) => {
  await expect(page.locator('.lv-collapse-btn')).toBeVisible();
});

test('sidebar collapses and expands on toggle', async ({ page }) => {
  const sidebar = page.locator('.lv-sidebar');
  const collapseBtn = page.locator('.lv-collapse-btn');

  const initialWidth = (await sidebar.boundingBox())!.width;
  await collapseBtn.click();
  await page.waitForTimeout(300); // CSS transition 0.2s

  const collapsedWidth = (await sidebar.boundingBox())!.width;
  expect(collapsedWidth).toBeLessThan(initialWidth);

  // Expand again.
  await collapseBtn.click();
  await page.waitForTimeout(300);

  const expandedWidth = (await sidebar.boundingBox())!.width;
  expect(expandedWidth).toBeGreaterThan(collapsedWidth);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. ResizeHandle — visible and positioned (ticket 29897f92 AC #3)
// ─────────────────────────────────────────────────────────────────────────────

test('resize handle is rendered and not clipped', async ({ page }) => {
  const handle = page.locator('.va-resize-handle');
  await expect(handle).toBeAttached();

  const box = await handle.boundingBox();
  expect(box).not.toBeNull();
  // The handle must have non-zero dimensions to be interactive.
  expect(box!.width).toBeGreaterThan(0);
  expect(box!.height).toBeGreaterThan(0);
});

test('resize handle is flush with sidebar right edge (not clipped by overflow:hidden)', async ({
  page,
}) => {
  const sidebar = page.locator('.lv-sidebar');
  const handle = page.locator('.va-resize-handle');

  const sidebarBox = await sidebar.boundingBox();
  const handleBox = await handle.boundingBox();

  expect(sidebarBox).not.toBeNull();
  expect(handleBox).not.toBeNull();

  // The handle right edge should equal the sidebar right edge (±1px).
  const sidebarRight = sidebarBox!.x + sidebarBox!.width;
  const handleRight = handleBox!.x + handleBox!.width;
  expect(Math.abs(handleRight - sidebarRight)).toBeLessThanOrEqual(1);
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Color theme validation
// ─────────────────────────────────────────────────────────────────────────────

test('page body has dark background (#0d0c0b)', async ({ page }) => {
  const bgColor = await getCssValue(page, '.lv-app', 'background-color');
  expect(bgColor).not.toBeNull();
  const parsed = parseColor(bgColor!);
  expect(parsed).not.toBeNull();
  // #0d0c0b = rgb(13, 12, 11) — allow ±2 per channel for browser rounding.
  expect(parsed![0]).toBeCloseTo(13, -1);
  expect(parsed![1]).toBeCloseTo(12, -1);
  expect(parsed![2]).toBeCloseTo(11, -1);
});

test('active tab uses accent-orange border (#c85a18)', async ({ page }) => {
  const borderColor = await getCssValue(page, '.lv-tab.lv-tab-active', 'border-bottom-color');
  expect(borderColor).not.toBeNull();
  const parsed = parseColor(borderColor!);
  expect(parsed).not.toBeNull();
  // #c85a18 = rgb(200, 90, 24)
  expect(parsed![0]).toBeGreaterThan(180); // red-dominant
  expect(parsed![0]).toBeGreaterThan(parsed![1]); // red > green
  expect(parsed![0]).toBeGreaterThan(parsed![2]); // red > blue
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. WCAG contrast ratios
// ─────────────────────────────────────────────────────────────────────────────
//
// These use computed styles from the live DOM.  The expected ratios are
// pre-calculated from the CSS custom properties:
//
//   text-primary  #c8c0b4 on bg-primary  #0d0c0b  ≈ 10.5 : 1  (AAA)
//   text-secondary #8a8478 on bg-secondary #141311 ≈  5.0 : 1  (AA)
//   text-muted     #524e46 on bg-secondary #141311 ≈  2.3 : 1  (FAILS AA)
//   accent-orange  #c85a18 on bg-secondary #141311 ≈  4.3 : 1  (AA-large)
//
// Note: text-muted is intentionally low-contrast — it is used only for
// decorative/supplementary text (badges, metadata), never for primary content.

test('primary text has WCAG AAA contrast on dark background (≥7:1)', async ({ page }) => {
  // The log viewer main text — use a visible primary-text element.
  const colors = await page.evaluate(() => {
    function parseColor(css: string): [number, number, number] | null {
      const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : null;
    }
    function channelLum(c: number): number {
      const v = c / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }
    function lum([r, g, b]: [number, number, number]): number {
      return 0.2126 * channelLum(r) + 0.7152 * channelLum(g) + 0.0722 * channelLum(b);
    }
    // Use CSS var values directly since computed style resolves them.
    // Pick the body element which has color: var(--text-primary) and background: var(--bg-primary).
    const body = document.body;
    const style = window.getComputedStyle(body);
    const fg = parseColor(style.color) ?? parseColor(getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim()) ?? null;
    const bg = parseColor(style.backgroundColor) ?? null;
    if (!fg || !bg) return null;
    const l1 = lum(fg), l2 = lum(bg);
    const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
    return { ratio: (lighter + 0.05) / (darker + 0.05), fg, bg };
  });

  expect(colors).not.toBeNull();
  // Primary text on the very dark bg should pass WCAG AAA (≥7:1).
  expect(colors!.ratio).toBeGreaterThanOrEqual(7);
});

test('tab bar text is readable — active tab passes AA-large (≥3:1)', async ({ page }) => {
  const ratio = await page.evaluate(() => {
    function parseColor(css: string): [number, number, number] | null {
      const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : null;
    }
    function channelLum(c: number): number {
      const v = c / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }
    function lum([r, g, b]: [number, number, number]): number {
      return 0.2126 * channelLum(r) + 0.7152 * channelLum(g) + 0.0722 * channelLum(b);
    }
    const tab = document.querySelector('.lv-tab.lv-tab-active') as HTMLElement | null;
    if (!tab) return null;
    const style = window.getComputedStyle(tab);
    const fg = parseColor(style.color);
    const bg = parseColor(style.backgroundColor);
    if (!fg || !bg) return null;
    // If background is transparent (all zeros), walk up to find the painted bg.
    const effectiveBg: [number, number, number] = (bg[0] + bg[1] + bg[2] === 0 && style.backgroundColor.includes('rgba(0, 0, 0, 0)'))
      ? ([20, 19, 17] as [number, number, number]) // bg-secondary #141311
      : bg;
    const l1 = lum(fg), l2 = lum(effectiveBg);
    const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  });

  expect(ratio).not.toBeNull();
  // Accent-orange on bg-secondary is ~4.3:1 — passes AA-large.
  expect(ratio!).toBeGreaterThanOrEqual(3.0);
});

test('sidebar tree items pass AA contrast for secondary text (≥4.5:1)', async ({ page }) => {
  // If no tree items: skip gracefully (API backend not running).
  const itemCount = await page.locator('.va-tree-item').count();
  if (itemCount === 0) {
    test.skip();
    return;
  }

  const ratio = await page.evaluate(() => {
    function parseColor(css: string): [number, number, number] | null {
      const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : null;
    }
    function channelLum(c: number): number {
      const v = c / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }
    function lum([r, g, b]: [number, number, number]): number {
      return 0.2126 * channelLum(r) + 0.7152 * channelLum(g) + 0.0722 * channelLum(b);
    }
    const item = document.querySelector('.va-tree-item') as HTMLElement | null;
    if (!item) return null;
    const style = window.getComputedStyle(item);
    const fg = parseColor(style.color);
    // Sidebar bg is bg-secondary.
    const bg: [number, number, number] = [20, 19, 17]; // #141311
    if (!fg) return null;
    const l1 = lum(fg), l2 = lum(bg);
    const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  });

  expect(ratio).not.toBeNull();
  expect(ratio!).toBeGreaterThanOrEqual(4.5);
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Screenshot — visual reference snapshot
// ─────────────────────────────────────────────────────────────────────────────

test('visual snapshot — full page', async ({ page }) => {
  await page.screenshot({
    path: 'playwright-report/snapshot-full-page.png',
    fullPage: false,
  });
  // Screenshot taken; no assertion — used for manual visual review.
});

test('visual snapshot — tab bar', async ({ page }) => {
  const tabBar = page.locator('.lv-tab-bar');
  await tabBar.screenshot({ path: 'playwright-report/snapshot-tab-bar.png' });
});

test('visual snapshot — sidebar', async ({ page }) => {
  const sidebar = page.locator('.lv-sidebar');
  await sidebar.screenshot({ path: 'playwright-report/snapshot-sidebar.png' });
});
