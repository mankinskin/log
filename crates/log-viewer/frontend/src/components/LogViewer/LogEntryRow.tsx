import { useState } from 'preact/hooks';
import type { LogEntry } from '../../types';
import { openSourceFile } from '../../store';
import { FieldsRenderer } from './RustValueRenderer';
import { Flame, LocationPin, ChevronDown, ChevronRight } from '../Icons';
import { CodeSnippet } from './CodeSnippet';
import { PanicMessageRenderer } from './PanicMessageRenderer';
import { useSourceSnippet } from '../../hooks';
import { 
  highlightMatch, 
  formatTimestamp, 
  parseBacktrace, 
  getRelevantFrames,
  spanNameToColor,
  depthToColor,
  formatSignature
} from './utils';

interface Props {
  entry: LogEntry;
  showRaw: boolean;
  searchQuery: string;
  isSelected: boolean;
  onSelect: () => void;
  expandAll: boolean;
  isExpanded?: boolean; // Shared expand state from parent
  onToggleExpand?: () => void; // Toggle expand callback
  headerCellRef?: (el: HTMLDivElement | null) => void; // Ref callback for header scroll sync
  headerScrollLeft?: number; // Current horizontal scroll position
  headerColWidth?: number; // Header column width
  onHeaderWheel?: (e: WheelEvent) => void; // Wheel scroll handler for header column
  hoveredSpanName?: string | null; // Currently hovered span name for highlighting
  onSpanHover?: (spanName: string | null) => void; // Callback when span is hovered
  signatures?: Record<string, unknown>; // Function signatures indexed by function name
}

export function LogEntryRow({ entry, showRaw, searchQuery, isSelected, onSelect, expandAll, isExpanded, onToggleExpand, headerCellRef, headerScrollLeft = 0, headerColWidth = 500, onHeaderWheel, hoveredSpanName, onSpanHover, signatures }: Props) {
  // Local state for legacy mode
  const [localExpanded, setLocalExpanded] = useState(false);
  
  // Use shared state if available, otherwise local
  const expanded = isExpanded !== undefined ? isExpanded : localExpanded;
  
  // Ref for measuring content width
  const headerContentRef = { current: null as HTMLDivElement | null };

  const hasLocation = entry.file && entry.source_line;
  const hasPanicLocation = entry.panic_file && entry.panic_line;
  const levelClass = entry.level.toLowerCase();
  const typeClass = entry.event_type.replace('_', '-');
  
  // Calculate indentation for spans
  const indentLevel = Math.min(entry.depth, 10);

  // Use hooks for snippet fetching
  const { snippet, error: snippetError } = useSourceSnippet(entry.file, entry.source_line);
  const { snippet: panicSnippet } = useSourceSnippet(entry.panic_file, entry.panic_line);

  const handleLocationClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (entry.file) {
      openSourceFile(entry.file, entry.source_line ?? undefined);
    }
  };

  // Check if we have fields to display (exclude 'message' from count)
  const fieldEntries = Object.entries(entry.fields).filter(([k]) => k !== 'message');
  const hasFields = fieldEntries.length > 0;
  
  // Check if this is a panic entry
  const isPanic = entry.message.startsWith('PANIC:');
  // Parse backtrace for relevant frames
  const backtraceFrames = entry.backtrace ? getRelevantFrames(parseBacktrace(entry.backtrace)) : [];

  // Unified expanded state
  const showDetails = expandAll || expanded;

  // Has expandable header content? (fields or backtrace for non-panics)
  const hasHeaderExpand = hasFields || (entry.backtrace && !isPanic);
  // Has expandable viewport content? (snippets, panic info, raw)
  const hasViewportExpand = (hasLocation && snippet) || (isPanic && (panicSnippet || entry.assertion_diff || backtraceFrames.length > 0)) || showRaw;
  
  // Any expandable content at all?
  const hasAnyExpandable = hasHeaderExpand || hasViewportExpand;

  // Click handler: expand all expandables + select
  const handleEntryClick = () => {
    onSelect();
    if (hasAnyExpandable) {
      if (onToggleExpand) {
        onToggleExpand();
      } else {
        setLocalExpanded(!localExpanded);
      }
    }
  };
  
  // Toggle handler for expand buttons
  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setLocalExpanded(!localExpanded);
    }
  };

  // Determine if this entry's span is currently highlighted
  const isSpanHighlighted = entry.span_name && hoveredSpanName === entry.span_name;
  const isSpanEnter = entry.event_type === 'span_enter';
  const isSpanExit = entry.event_type === 'span_exit';
  
  // Generate span color from name
  const spanColor = spanNameToColor(entry.span_name, 60, 45);
  const spanColorMuted = spanNameToColor(entry.span_name, 30, 30);

  // Mouse handlers for span highlighting
  const handleMouseEnter = () => {
    if (entry.span_name && onSpanHover) {
      onSpanHover(entry.span_name);
    }
  };

  // Look up fn_sig from the signatures map for the current span name
  const fnSig = entry.span_name && signatures ? signatures[entry.span_name] as { name?: string; self_type?: string; params?: Array<Record<string, string>>; return_type?: string } | undefined : undefined;
  
  // Format signature as a compact string for tooltip
  const sigTooltip = fnSig ? formatSignature(fnSig) : undefined;

  // Render as flex row with both columns
  return (
    <div 
      class={`log-entry ${isSelected ? 'selected' : ''} level-${levelClass} type-${typeClass} ${isPanic ? 'panic-entry' : ''} ${hasAnyExpandable ? 'expandable' : ''} ${showDetails ? 'expanded' : ''} ${isSpanHighlighted ? 'span-highlighted' : ''} ${isSpanEnter ? 'span-enter' : ''} ${isSpanExit ? 'span-exit' : ''} ${indentLevel > 0 ? 'in-span' : ''}`}
      onClick={handleEntryClick}
      onMouseEnter={handleMouseEnter}
      style={indentLevel > 0 ? { '--span-color': spanColor, '--span-color-muted': spanColorMuted } as any : undefined}
    >
      {/* Header Column - entry metadata and message */}
      {(() => {
        const gutterLineCount = isSpanExit ? indentLevel + 1 : indentLevel;
        const gutterWidth = gutterLineCount * 12;
        return (
          <div class="entry-header-cell" style={{ width: `${headerColWidth}px`, maxWidth: `${headerColWidth}px`, '--gutter-width': `${gutterWidth}px` } as any} onWheel={onHeaderWheel as any}>
            {/* Span depth gutter - positioned absolutely to fill full row height */}
            {gutterLineCount > 0 && (
              <div class="depth-gutter">
                {Array.from({ length: gutterLineCount }).map((_, i) => {
                  const isLastLevel = i === gutterLineCount - 1;
                  const lineColor = depthToColor(i);
                  let lineType = 'pass';
                  if (isLastLevel) {
                    if (isSpanEnter) lineType = 'top-corner';
                    else if (isSpanExit) lineType = 'bottom-corner';
                  }
                  return (
                    <span 
                      key={i} 
                      class={`depth-line ${lineType}`}
                      style={{ '--line-color': lineColor } as any}
                    ></span>
                  );
                })}
              </div>
            )}
            <div 
              class="entry-header-content"
              ref={(el) => {
                headerContentRef.current = el;
                if (headerCellRef) headerCellRef(el);
              }}
              style={{ transform: `translateX(-${headerScrollLeft}px)` }}
            >
              <div class="entry-header-col">
                <div class="header-content">
              <div class="header-row1">
                <span class={`level-badge ${levelClass}`}>{entry.level}</span>
                <span class={`type-badge ${typeClass}`}>{entry.event_type === 'span_enter' ? 'ENTER' : entry.event_type === 'span_exit' ? 'EXIT' : 'EVENT'}</span>
                {isPanic && <span class="panic-badge"><Flame size={8} /></span>}
                <span class="entry-meta">#{entry.line_number}</span>
                {entry.timestamp && <span class="entry-meta">{formatTimestamp(entry.timestamp)}</span>}
                {entry.span_name && <span class="span-name" title={sigTooltip}>{entry.span_name}{fnSig?.return_type && <span class="sig-return-type"> → {fnSig.return_type}</span>}</span>}
                {isPanic ? (
                  <span class="entry-message panic-msg" dangerouslySetInnerHTML={{ __html: highlightMatch(entry.message, searchQuery) }} />
                ) : (
                  <span class="entry-message" dangerouslySetInnerHTML={{ __html: highlightMatch(entry.message, searchQuery) }} />
                )}
              </div>
              {(hasFields || hasLocation) && (
                <div class="header-row2">
                  {hasFields && <span class="content-meta">{fieldEntries.length} {fieldEntries.length === 1 ? 'field' : 'fields'}</span>}
                  {hasLocation && (
                    <button class="header-location" onClick={handleLocationClick} title={`${entry.file}:${entry.source_line}`}>
                      <LocationPin size={8} />{entry.file?.split(/[/\\]/).pop()}:{entry.source_line}
                    </button>
                  )}
                </div>
              )}
              {showDetails && (
                <div class="header-details" onClick={(e) => e.stopPropagation()}>
                  {/* Fields */}
                  {hasFields && (
                    <div class="fields-rust-container">
                      <FieldsRenderer fields={entry.fields} defaultExpanded={true} />
                    </div>
                  )}
                  {/* Backtrace in header for non-panics */}
                  {entry.backtrace && !isPanic && (
                    <pre class="backtrace-content">{entry.backtrace}</pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
            {/* Expand toggle - positioned outside scrolling content to stick at right */}
            {hasAnyExpandable && (
              <button class="header-expand-toggle" onClick={handleToggle}>
                {showDetails ? <ChevronDown size={8} /> : <ChevronRight size={8} />}
              </button>
            )}
          </div>
        );
      })()}
      
      {/* Viewport Column - source code and visualizations */}
      <div class="entry-viewport-cell">
        <div class="entry-viewport-col">
          {/* Collapsed view - just the source line */}
          {!showDetails && hasLocation && snippet && (
            <div class="viewport-collapsed">
              <code class="source-line-preview">
                {snippet.content.split('\n')[snippet.highlight_line - snippet.start_line]?.trim() || ''}
              </code>
            </div>
          )}
          {hasViewportExpand && (
            <div class="viewport-header">
              <span class="viewport-label">Source</span>
              <button class="col-toggle" onClick={handleToggle}>
                {showDetails ? <ChevronDown size={8} /> : <ChevronRight size={8} />}
              </button>
            </div>
          )}
          {showDetails && (
            <div class="viewport-content" onClick={(e) => e.stopPropagation()}>
              {/* Panic assertion diff */}
              {isPanic && entry.assertion_diff && (
                <PanicMessageRenderer 
                  message={entry.message} 
                  assertionDiff={entry.assertion_diff}
                  searchQuery={searchQuery} 
                />
              )}
              
              {/* Panic source snippet */}
              {isPanic && hasPanicLocation && panicSnippet && (
                <div class="panic-source">
                  <div class="panic-location">
                    <LocationPin size={8} /> {entry.panic_file}:{entry.panic_line}
                  </div>
                  <CodeSnippet snippet={panicSnippet} file={entry.panic_file!} isPanic />
                </div>
              )}
              
              {/* Panic call stack */}
              {isPanic && backtraceFrames.length > 0 && (
                <div class="callers-list">
                  {backtraceFrames.map((frame, i) => (
                    <div key={i} class="caller-frame">
                      <span class="frame-index">{frame.index}</span>
                      <span class="frame-function">{frame.function}</span>
                      {frame.location && <span class="frame-location">at {frame.location}</span>}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Source snippet */}
              {hasLocation && snippet && (
                <CodeSnippet snippet={snippet} file={entry.file!} />
              )}
              {hasLocation && snippetError && <span class="snippet-error">{snippetError}</span>}
              
              {/* Raw */}
              {showRaw && <pre class="entry-raw">{entry.raw}</pre>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
