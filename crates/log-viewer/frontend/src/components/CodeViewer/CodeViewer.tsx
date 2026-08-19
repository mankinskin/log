import { useEffect, useRef } from 'preact/hooks';
import { codeViewerFile, codeViewerContent, codeViewerLine } from '../../store';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';

function getLanguage(filename: string | null): string {
  if (!filename) return 'plaintext';
  if (filename.endsWith('.rs')) return 'rust';
  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
  if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'javascript';
  if (filename.endsWith('.json')) return 'json';
  if (filename.endsWith('.toml')) return 'toml';
  if (filename.endsWith('.yaml') || filename.endsWith('.yml')) return 'yaml';
  return 'plaintext';
}

export function CodeViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightLineRef = useRef<HTMLDivElement>(null);
  
  const file = codeViewerFile.value;
  const content = codeViewerContent.value;
  const highlightLine = codeViewerLine.value;
  const language = getLanguage(file);
  
  useEffect(() => {
    // Scroll to highlighted line
    if (highlightLineRef.current) {
      highlightLineRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, [highlightLine, content]);

  if (!file) {
    return (
      <div class="code-viewer empty">
        <div class="placeholder-message">
          <span class="placeholder-icon">📄</span>
          <p>Click a source location to view code</p>
        </div>
      </div>
    );
  }

  const lines = content.split('\n');
  
  // Highlight code with Prism
  let highlightedCode = content;
  try {
    const grammar = Prism.languages[language];
    if (grammar) {
      highlightedCode = Prism.highlight(content, grammar, language);
    }
  } catch {
    // Fall back to plain text
  }
  
  const highlightedLines = highlightedCode.split('\n');

  return (
    <div class="code-viewer" ref={containerRef}>
      <div class="code-header">
        <span class="code-filename">{file}</span>
        <span class="code-language">{language}</span>
        <span class="code-lines">{lines.length} lines</span>
      </div>
      
      <div class="code-content">
        <pre class="code-pre">
          {highlightedLines.map((line, i) => {
            const lineNum = i + 1;
            const isHighlight = lineNum === highlightLine;
            return (
              <div 
                key={i}
                ref={isHighlight ? highlightLineRef : undefined}
                class={`code-line ${isHighlight ? 'highlight' : ''}`}
              >
                <span class="line-number">{lineNum}</span>
                <code dangerouslySetInnerHTML={{ __html: line || ' ' }} />
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
