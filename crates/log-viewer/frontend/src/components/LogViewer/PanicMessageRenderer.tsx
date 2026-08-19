import type { AssertionDiff } from '../../types';
import { highlightMatch } from './utils';

interface PanicMessageRendererProps {
  message: string;
  assertionDiff: AssertionDiff | null;
  searchQuery: string;
}

/**
 * Render a panic message with assertion diff from backend
 */
export function PanicMessageRenderer({ 
  message, 
  assertionDiff,
  searchQuery 
}: PanicMessageRendererProps) {
  if (!assertionDiff) {
    // Fallback to simple display for non-assertion panics
    return (
      <div class="panic-message" dangerouslySetInnerHTML={{ __html: highlightMatch(message, searchQuery) }} />
    );
  }
  
  return (
    <div class="panic-message-formatted">
      <div class="panic-title">{assertionDiff.title}</div>
      <div class="panic-diff">
        <div class="diff-header">
          <span class="diff-label diff-left">← {assertionDiff.left_label}</span>
          <span class="diff-vs">vs</span>
          <span class="diff-label diff-right">{assertionDiff.right_label} →</span>
        </div>
        <div class="diff-content">
          <div class="diff-column diff-left-column">
            {assertionDiff.left_value ? (
              <pre class="diff-value">{assertionDiff.left_value}</pre>
            ) : (
              <div class="diff-empty">(empty)</div>
            )}
          </div>
          <div class="diff-column diff-right-column">
            {assertionDiff.right_value ? (
              <pre class="diff-value">{assertionDiff.right_value}</pre>
            ) : (
              <div class="diff-empty">(empty)</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
