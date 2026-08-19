import { useState } from 'preact/hooks';
import { ChevronDown, ChevronRight } from '../Icons';

interface RustValueRendererProps {
  value: unknown;
  name?: string;
  depth?: number;
  defaultExpanded?: boolean;
  inline?: boolean;
}

/**
 * Checks if a value is a typed Rust object (has _type field)
 */
function isTypedObject(value: unknown): value is { _type: string; [key: string]: unknown } {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_type' in value &&
    typeof (value as Record<string, unknown>)['_type'] === 'string'
  );
}

/**
 * Checks if a value is a token object (has text and index)
 */
function isToken(value: unknown): value is { text: string; index: number } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'text' in value &&
    'index' in value &&
    Object.keys(value as Record<string, unknown>).length === 2
  );
}

/**
 * Checks if the value looks simple enough to render inline
 */
function isSimpleValue(value: unknown): boolean {
  if (value === null || typeof value !== 'object') return true;
  if (Array.isArray(value)) {
    return value.length <= 3 && value.every(v => typeof v !== 'object' || v === null);
  }
  if (isToken(value)) return true;
  return false;
}

/**
 * Renders just the type name with syntax highlighting
 */
function TypeName({ name }: { name: string }) {
  // Check if it's a full path like context_trace::pattern::Pattern
  const parts = name.split('::');
  if (parts.length > 1) {
    const typeName = parts.pop()!;
    const modulePath = parts.join('::');
    return (
      <span class="rust-type">
        <span class="rust-module">{modulePath}::</span>
        <span class="rust-type-name">{typeName}</span>
      </span>
    );
  }
  return <span class="rust-type-name">{name}</span>;
}

/**
 * Renders a token in compact form: "text"(index)
 */
function TokenRenderer({ token }: { token: { text: string; index: number } }) {
  return (
    <span class="rust-token">
      <span class="rust-string">"{token.text}"</span>
      <span class="rust-paren">(</span>
      <span class="rust-number">{token.index}</span>
      <span class="rust-paren">)</span>
    </span>
  );
}

/**
 * Checks if a string represents a number
 */
function isNumericString(value: string): boolean {
  // Match integers, floats, and negative numbers
  return /^-?\d+(\.\d+)?$/.test(value);
}

/**
 * Checks if a field name suggests it contains a type (e.g., type_param, T, Type)
 */
function isTypeFieldName(name: string | undefined): boolean {
  if (!name) return false;
  // Common type-related field names
  return /^(type_param|type_name|ty|T|Type|type|generic|param)$/i.test(name);
}

/**
 * Checks if a string value looks like a Rust type path
 */
function looksLikeTypePath(value: string): boolean {
  // Type paths have :: or are PascalCase single words
  if (value.includes('::')) return true;
  // PascalCase: starts with uppercase, has lowercase, no spaces
  return /^[A-Z][a-zA-Z0-9]*$/.test(value) && !value.includes(' ');
}

/**
 * Renders a primitive value with appropriate styling
 */
function PrimitiveRenderer({ value, fieldName }: { value: unknown; fieldName?: string }) {
  if (value === null) {
    return <span class="rust-keyword">None</span>;
  }
  if (typeof value === 'boolean') {
    return <span class="rust-keyword">{String(value)}</span>;
  }
  if (typeof value === 'number') {
    return <span class="rust-number">{value}</span>;
  }
  if (typeof value === 'string') {
    // Check if this string looks like a number (from debug formatting)
    if (isNumericString(value)) {
      return <span class="rust-number">{value}</span>;
    }
    // Check if this field should be rendered as a type
    if (isTypeFieldName(fieldName) || looksLikeTypePath(value)) {
      return <TypeName name={value} />;
    }
    return <span class="rust-string">"{value}"</span>;
  }
  return <span class="rust-unknown">{String(value)}</span>;
}

/**
 * Main component that recursively renders Rust-style values
 */
export function RustValueRenderer({ 
  value, 
  name, 
  depth = 0, 
  defaultExpanded = true,
  inline = false 
}: RustValueRendererProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  
  // Handle null
  if (value === null) {
    return (
      <span class="rust-value">
        {name && <span class="rust-field-name">{name}: </span>}
        <span class="rust-keyword">None</span>
      </span>
    );
  }
  
  // Handle primitives
  if (typeof value !== 'object') {
    return (
      <span class="rust-value">
        {name && <span class="rust-field-name">{name}: </span>}
        <PrimitiveRenderer value={value} fieldName={name} />
      </span>
    );
  }
  
  // Handle tokens
  if (isToken(value)) {
    return (
      <span class="rust-value">
        {name && <span class="rust-field-name">{name}: </span>}
        <TokenRenderer token={value} />
      </span>
    );
  }
  
  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <span class="rust-value">
          {name && <span class="rust-field-name">{name}: </span>}
          <span class="rust-bracket">[]</span>
        </span>
      );
    }
    
    // Check if all items are tokens - render more compactly
    const isSimple = isSimpleValue(value);
    
    if (inline || (isSimple && depth > 0)) {
      return (
        <span class="rust-value rust-array-inline">
          {name && <span class="rust-field-name">{name}: </span>}
          <span class="rust-bracket">[</span>
          {value.map((item, i) => (
            <span key={i}>
              <RustValueRenderer value={item} depth={depth + 1} inline={true} />
              {i < value.length - 1 && <span class="rust-comma">, </span>}
            </span>
          ))}
          <span class="rust-bracket">]</span>
        </span>
      );
    }
    
    return (
      <div class="rust-value rust-array">
        <div 
          class="rust-collapsible-header"
          onClick={() => setExpanded(!expanded)}
        >
          <span class="rust-toggle">{expanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}</span>
          {name && <span class="rust-field-name">{name}: </span>}
          <span class="rust-bracket">[</span>
          {!expanded && (
            <>
              <span class="rust-preview">{value.length} items</span>
              <span class="rust-bracket">]</span>
            </>
          )}
        </div>
        {expanded && (
          <div class="rust-array-items">
            {value.map((item, i) => (
              <div key={i} class="rust-array-item">
                <RustValueRenderer 
                  value={item} 
                  depth={depth + 1}
                  defaultExpanded={depth < 2}
                />
                {i < value.length - 1 && <span class="rust-comma">,</span>}
              </div>
            ))}
            <span class="rust-bracket">]</span>
          </div>
        )}
      </div>
    );
  }
  
  // Handle typed objects (Rust enums/structs)
  if (isTypedObject(value)) {
    const typeName = value._type;
    const variantName = '_variant' in value ? (value._variant as string) : null;
    const hasValues = '_values' in value && Array.isArray(value._values);
    const fields = Object.entries(value).filter(([k]) => k !== '_type' && k !== '_values' && k !== '_variant');
    
    // Enum variants with _variant field: Option::Some(value) or Option::None
    if (variantName) {
      const values = hasValues ? (value._values as unknown[]) : [];
      const isUnit = !hasValues || values.length === 0;
      
      // Unit variant like None
      if (isUnit) {
        return (
          <span class="rust-value rust-typed-inline">
            {name && <span class="rust-field-name">{name}: </span>}
            <TypeName name={typeName} />
            <span class="rust-paren">::</span>
            <span class="rust-keyword">{variantName}</span>
          </span>
        );
      }
      
      // Simple cases inline
      if (values.length === 1 && isSimpleValue(values[0])) {
        return (
          <span class="rust-value rust-typed-inline">
            {name && <span class="rust-field-name">{name}: </span>}
            <TypeName name={typeName} />
            <span class="rust-paren">::</span>
            <span class="rust-keyword">{variantName}</span>
            <span class="rust-paren">(</span>
            {values.map((v, i) => (
              <span key={i}>
                <RustValueRenderer value={v} depth={depth + 1} inline={true} />
                {i < values.length - 1 && <span class="rust-comma">, </span>}
              </span>
            ))}
            <span class="rust-paren">)</span>
          </span>
        );
      }
      
      // Complex values - collapsible
      return (
        <div class="rust-value rust-typed">
          <div 
            class="rust-collapsible-header"
            onClick={() => setExpanded(!expanded)}
          >
            <span class="rust-toggle">{expanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}</span>
            {name && <span class="rust-field-name">{name}: </span>}
            <TypeName name={typeName} />
            <span class="rust-paren">::</span>
            <span class="rust-keyword">{variantName}</span>
            <span class="rust-paren">(</span>
            {!expanded && <span class="rust-preview">...</span>}
            {!expanded && <span class="rust-paren">)</span>}
          </div>
          {expanded && (
            <div class="rust-typed-values">
              {values.map((v, i) => (
                <div key={i} class="rust-typed-value">
                  <RustValueRenderer 
                    value={v} 
                    depth={depth + 1}
                    defaultExpanded={depth < 2}
                  />
                  {i < values.length - 1 && <span class="rust-comma">,</span>}
                </div>
              ))}
              <span class="rust-paren">)</span>
            </div>
          )}
        </div>
      );
    }
    
    // Tuple-style: TypeName(val1, val2) or TypeName([...])
    if (hasValues) {
      const values = value._values as unknown[];
      
      // Simple cases inline
      if (values.length === 0 || (values.length === 1 && isSimpleValue(values[0]))) {
        return (
          <span class="rust-value rust-typed-inline">
            {name && <span class="rust-field-name">{name}: </span>}
            <TypeName name={typeName} />
            {values.length > 0 && (
              <>
                <span class="rust-paren">(</span>
                {values.map((v, i) => (
                  <span key={i}>
                    <RustValueRenderer value={v} depth={depth + 1} inline={true} />
                    {i < values.length - 1 && <span class="rust-comma">, </span>}
                  </span>
                ))}
                <span class="rust-paren">)</span>
              </>
            )}
          </span>
        );
      }
      
      // Complex values - collapsible
      return (
        <div class="rust-value rust-typed">
          <div 
            class="rust-collapsible-header"
            onClick={() => setExpanded(!expanded)}
          >
            <span class="rust-toggle">{expanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}</span>
            {name && <span class="rust-field-name">{name}: </span>}
            <TypeName name={typeName} />
            <span class="rust-paren">(</span>
            {!expanded && <span class="rust-preview">...</span>}
            {!expanded && <span class="rust-paren">)</span>}
          </div>
          {expanded && (
            <div class="rust-typed-values">
              {values.map((v, i) => (
                <div key={i} class="rust-typed-value">
                  <RustValueRenderer 
                    value={v} 
                    depth={depth + 1}
                    defaultExpanded={depth < 2}
                  />
                  {i < values.length - 1 && <span class="rust-comma">,</span>}
                </div>
              ))}
              <span class="rust-paren">)</span>
            </div>
          )}
        </div>
      );
    }
    
    // Struct-style: TypeName { field: value, ... }
    if (fields.length === 0) {
      return (
        <span class="rust-value">
          {name && <span class="rust-field-name">{name}: </span>}
          <TypeName name={typeName} />
        </span>
      );
    }
    
    // Check if all fields are simple
    const allSimple = fields.every(([, v]) => isSimpleValue(v));
    
    if (allSimple && fields.length <= 3 && inline) {
      return (
        <span class="rust-value rust-struct-inline">
          {name && <span class="rust-field-name">{name}: </span>}
          <TypeName name={typeName} />
          <span class="rust-brace"> {'{'} </span>
          {fields.map(([k, v], i) => (
            <span key={k}>
              <span class="rust-field-name">{k}</span>
              <span class="rust-colon">: </span>
              <RustValueRenderer value={v} depth={depth + 1} inline={true} />
              {i < fields.length - 1 && <span class="rust-comma">, </span>}
            </span>
          ))}
          <span class="rust-brace"> {'}'}</span>
        </span>
      );
    }
    
    return (
      <div class="rust-value rust-struct">
        <div 
          class="rust-collapsible-header"
          onClick={() => setExpanded(!expanded)}
        >
          <span class="rust-toggle">{expanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}</span>
          {name && <span class="rust-field-name">{name}: </span>}
          <TypeName name={typeName} />
          <span class="rust-brace"> {'{'}</span>
          {!expanded && (
            <>
              <span class="rust-preview">{fields.length} fields</span>
              <span class="rust-brace">{'}'}</span>
            </>
          )}
        </div>
        {expanded && (
          <div class="rust-struct-fields">
            {fields.map(([k, v], i) => (
              <div key={k} class="rust-struct-field">
                <RustValueRenderer 
                  value={v}
                  name={k}
                  depth={depth + 1}
                  defaultExpanded={depth < 2}
                />
                {i < fields.length - 1 && <span class="rust-comma">,</span>}
              </div>
            ))}
            <span class="rust-brace">{'}'}</span>
          </div>
        )}
      </div>
    );
  }
  
  // Handle plain objects (not typed)
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return (
      <span class="rust-value">
        {name && <span class="rust-field-name">{name}: </span>}
        <span class="rust-brace">{'{}'}</span>
      </span>
    );
  }
  
  return (
    <div class="rust-value rust-object">
      <div 
        class="rust-collapsible-header"
        onClick={() => setExpanded(!expanded)}
      >
        <span class="rust-toggle">{expanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}</span>
        {name && <span class="rust-field-name">{name}: </span>}
        <span class="rust-brace">{'{'}</span>
        {!expanded && (
          <>
            <span class="rust-preview">{entries.length} fields</span>
            <span class="rust-brace">{'}'}</span>
          </>
        )}
      </div>
      {expanded && (
        <div class="rust-object-fields">
          {entries.map(([k, v], i) => (
            <div key={k} class="rust-object-field">
              <RustValueRenderer 
                value={v}
                name={k}
                depth={depth + 1}
                defaultExpanded={depth < 2}
              />
              {i < entries.length - 1 && <span class="rust-comma">,</span>}
            </div>
          ))}
          <span class="rust-brace">{'}'}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Renders all fields from a log entry's fields object
 */
interface FieldsRendererProps {
  fields: Record<string, unknown>;
  defaultExpanded?: boolean;
}

export function FieldsRenderer({ fields, defaultExpanded = true }: FieldsRendererProps) {
  const entries = Object.entries(fields).filter(([k]) => k !== 'message');
  
  if (entries.length === 0) {
    return null;
  }
  
  return (
    <div class="rust-fields-container">
      {entries.map(([key, value]) => (
        <div key={key} class="rust-field-row">
          <RustValueRenderer 
            value={value} 
            name={key}
            defaultExpanded={defaultExpanded}
          />
        </div>
      ))}
    </div>
  );
}
