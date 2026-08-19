import { useEffect, useRef, useCallback } from 'preact/hooks';

/**
 * Options for the `useListKeyboard` hook.
 *
 * @template T  The item type in the list.
 */
export interface UseListKeyboardOptions<T> {
  /** The items currently displayed in the list. */
  items: T[];
  /** Index of the currently selected item (-1 for none). */
  selectedIndex: number;
  /** Called when the selection changes. */
  onSelect: (index: number) => void;
  /** Called when Enter is pressed on the selected item. */
  onActivate?: (index: number) => void;
  /**
   * Orientation of the list.
   * - `'vertical'` (default): Up/Down arrows navigate; Left/Right are ignored.
   * - `'horizontal'`: Left/Right arrows navigate; Up/Down are ignored.
   */
  orientation?: 'vertical' | 'horizontal';
  /** Whether the list currently wraps (default: true). */
  wrap?: boolean;
  /** Whether this list is the active focus target (default: true). */
  enabled?: boolean;
}

/**
 * Hook that adds keyboard navigation (arrow keys + Enter) to a list element.
 *
 * Returns a `ref` and an `onKeyDown` handler to attach to the container
 * element. The container should have `tabIndex={0}` so it can receive focus.
 *
 * Usage:
 * ```tsx
 * const { containerRef, onKeyDown } = useListKeyboard({
 *   items: files,
 *   selectedIndex,
 *   onSelect: setSelectedIndex,
 *   onActivate: (i) => loadFile(files[i]),
 * });
 * return <div ref={containerRef} tabIndex={0} onKeyDown={onKeyDown}>...</div>;
 * ```
 */
export function useListKeyboard<T>({
  items,
  selectedIndex,
  onSelect,
  onActivate,
  orientation = 'vertical',
  wrap = true,
}: UseListKeyboardOptions<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (items.length === 0) return;

      const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
      const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

      if (e.key === prevKey) {
        e.preventDefault();
        if (selectedIndex <= 0) {
          onSelect(wrap ? items.length - 1 : 0);
        } else {
          onSelect(selectedIndex - 1);
        }
      } else if (e.key === nextKey) {
        e.preventDefault();
        if (selectedIndex >= items.length - 1) {
          onSelect(wrap ? 0 : items.length - 1);
        } else {
          onSelect(selectedIndex + 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        onSelect(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        onSelect(items.length - 1);
      } else if (e.key === 'Enter' && onActivate && selectedIndex >= 0) {
        e.preventDefault();
        onActivate(selectedIndex);
      }
    },
    [items, selectedIndex, onSelect, onActivate, orientation, wrap],
  );

  return { containerRef, onKeyDown };
}

/**
 * Hook that scrolls the selected item into view when `selectedIndex` changes.
 *
 * @param containerRef  Ref to the scrollable container element.
 * @param selectedIndex Currently selected index.
 * @param selector      CSS selector for list items (default: `[data-index]`).
 */
export function useScrollIntoView(
  containerRef: { current: HTMLElement | null },
  selectedIndex: number,
  selector = '[data-index]',
) {
  useEffect(() => {
    if (selectedIndex < 0 || !containerRef.current) return;
    const items = containerRef.current.querySelectorAll(selector);
    const target = items[selectedIndex] as HTMLElement | undefined;
    target?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex, containerRef, selector]);
}
