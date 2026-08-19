import { useState } from 'preact/hooks';

interface JsonViewerProps {
  value: string;
  defaultExpanded?: boolean;
  maxInitialDepth?: number;
}

interface JsonNodeProps {
  data: unknown;
  keyName?: string;
  depth: number;
  maxInitialDepth: number;
  isLast: boolean;
}

/**
 * Try to parse a string as JSON
 */
function tryParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * Check if value is an object (not null, not array)
 */
function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

/**
 * Check if value is an array
 */
function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val);
}

/**
 * Check if value is a primitive (string, number, boolean, null)
 */
function isPrimitive(val: unknown): val is string | number | boolean | null {
  return val === null || typeof val !== 'object';
}

/**
 * Render a primitive value with appropriate styling
 */
function PrimitiveValue({ value }: { value: string | number | boolean | null }) {
  if (value === null) {
    return <span class="json-null">null</span>;
  }
  if (typeof value === 'boolean') {
    return <span class="json-boolean">{value.toString()}</span>;
  }
  if (typeof value === 'number') {
    return <span class="json-number">{value}</span>;
  }
  if (typeof value === 'string') {
    return <span class="json-string">"{value}"</span>;
  }
  return <span class="json-unknown">{String(value)}</span>;
}

/**
 * Recursive JSON node renderer
 */
function JsonNode({ data, keyName, depth, maxInitialDepth, isLast }: JsonNodeProps) {
  const [isExpanded, setIsExpanded] = useState(depth < maxInitialDepth);

  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const comma = isLast ? '' : ',';
  const indent = depth * 16;

  // Handle primitives
  if (isPrimitive(data)) {
    return (
      <div class="json-line" style={{ paddingLeft: `${indent}px` }}>
        {keyName !== undefined && (
          <>
            <span class="json-key">"{keyName}"</span>
            <span class="json-colon">: </span>
          </>
        )}
        <PrimitiveValue value={data} />
        {comma}
      </div>
    );
  }

  // Handle arrays
  if (isArray(data)) {
    const isEmpty = data.length === 0;
    
    if (isEmpty) {
      return (
        <div class="json-line" style={{ paddingLeft: `${indent}px` }}>
          {keyName !== undefined && (
            <>
              <span class="json-key">"{keyName}"</span>
              <span class="json-colon">: </span>
            </>
          )}
          <span class="json-bracket">[]</span>
          {comma}
        </div>
      );
    }

    return (
      <div class="json-node">
        <div 
          class="json-line json-collapsible" 
          style={{ paddingLeft: `${indent}px` }}
          onClick={toggle}
        >
          <span class="json-toggle">{isExpanded ? '▼' : '▶'}</span>
          {keyName !== undefined && (
            <>
              <span class="json-key">"{keyName}"</span>
              <span class="json-colon">: </span>
            </>
          )}
          <span class="json-bracket">[</span>
          {!isExpanded && (
            <>
              <span class="json-collapsed-preview">{data.length} items</span>
              <span class="json-bracket">]</span>
              {comma}
            </>
          )}
        </div>
        {isExpanded && (
          <>
            {data.map((item, index) => (
              <JsonNode
                key={index}
                data={item}
                depth={depth + 1}
                maxInitialDepth={maxInitialDepth}
                isLast={index === data.length - 1}
              />
            ))}
            <div class="json-line" style={{ paddingLeft: `${indent}px` }}>
              <span class="json-bracket">]</span>
              {comma}
            </div>
          </>
        )}
      </div>
    );
  }

  // Handle objects
  if (isObject(data)) {
    const entries = Object.entries(data);
    const isEmpty = entries.length === 0;
    
    if (isEmpty) {
      return (
        <div class="json-line" style={{ paddingLeft: `${indent}px` }}>
          {keyName !== undefined && (
            <>
              <span class="json-key">"{keyName}"</span>
              <span class="json-colon">: </span>
            </>
          )}
          <span class="json-brace">{'{}'}</span>
          {comma}
        </div>
      );
    }

    return (
      <div class="json-node">
        <div 
          class="json-line json-collapsible" 
          style={{ paddingLeft: `${indent}px` }}
          onClick={toggle}
        >
          <span class="json-toggle">{isExpanded ? '▼' : '▶'}</span>
          {keyName !== undefined && (
            <>
              <span class="json-key">"{keyName}"</span>
              <span class="json-colon">: </span>
            </>
          )}
          <span class="json-brace">{'{'}</span>
          {!isExpanded && (
            <>
              <span class="json-collapsed-preview">{entries.length} keys</span>
              <span class="json-brace">{'}'}</span>
              {comma}
            </>
          )}
        </div>
        {isExpanded && (
          <>
            {entries.map(([key, value], index) => (
              <JsonNode
                key={key}
                data={value}
                keyName={key}
                depth={depth + 1}
                maxInitialDepth={maxInitialDepth}
                isLast={index === entries.length - 1}
              />
            ))}
            <div class="json-line" style={{ paddingLeft: `${indent}px` }}>
              <span class="json-brace">{'}'}</span>
              {comma}
            </div>
          </>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div class="json-line" style={{ paddingLeft: `${indent}px` }}>
      {keyName !== undefined && (
        <>
          <span class="json-key">"{keyName}"</span>
          <span class="json-colon">: </span>
        </>
      )}
      <span class="json-unknown">{String(data)}</span>
      {comma}
    </div>
  );
}

/**
 * JsonViewer component - renders a JSON string as a collapsible tree
 */
export function JsonViewer({ value, defaultExpanded = true, maxInitialDepth = 2 }: JsonViewerProps) {
  const parsed = tryParseJson(value);
  
  // If it's a simple string (not JSON), just return it plainly
  if (typeof parsed === 'string' && parsed === value) {
    // Check if it looks like it could have been JSON but failed to parse
    const trimmed = value.trim();
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
      return <span class="json-plain-value">{value}</span>;
    }
  }
  
  return (
    <div class="json-viewer">
      <JsonNode 
        data={parsed} 
        depth={0} 
        maxInitialDepth={defaultExpanded ? maxInitialDepth : 0} 
        isLast={true}
      />
    </div>
  );
}

/**
 * Compact JSON viewer - shows value inline with expand option for complex types
 */
export function CompactJsonViewer({ value }: { value: string }) {
  const parsed = tryParseJson(value);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Simple primitive - show inline
  if (isPrimitive(parsed)) {
    return <PrimitiveValue value={parsed} />;
  }
  
  // For simple strings that didn't parse as JSON
  if (typeof parsed === 'string') {
    return <span class="json-plain-value">{parsed}</span>;
  }
  
  // Complex type - show preview with expand option
  const isArr = isArray(parsed);
  const preview = isArr 
    ? `[${(parsed as unknown[]).length} items]`
    : `{${Object.keys(parsed as Record<string, unknown>).length} keys}`;
  
  if (!isExpanded) {
    return (
      <span class="json-compact">
        <button class="json-expand-btn" onClick={() => setIsExpanded(true)} title="Expand">
          ▶
        </button>
        <span class="json-preview">{preview}</span>
      </span>
    );
  }
  
  return (
    <div class="json-expanded-container">
      <button class="json-collapse-btn" onClick={() => setIsExpanded(false)} title="Collapse">
        ▼
      </button>
      <JsonViewer value={value} defaultExpanded={true} maxInitialDepth={3} />
    </div>
  );
}
