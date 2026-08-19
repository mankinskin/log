import { useState, useEffect, useRef } from 'preact/hooks';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import type { SourceSnippet } from '../../types';
import * as api from '../../api';

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlightCode(code: string, language: string): string {
  try {
    const grammar = Prism.languages[language];
    if (grammar) {
      return Prism.highlight(code, grammar, language);
    }
  } catch {
    // Fall back to plain text
  }
  return escapeHtml(code);
}

function getLanguage(filename: string): string {
  if (filename.endsWith('.rs')) return 'rust';
  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
  if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'javascript';
  return 'plaintext';
}

interface CodeSnippetProps {
  snippet: SourceSnippet;
  file: string;
  isPanic?: boolean;
}

/**
 * Renders a code snippet with syntax highlighting and line numbers.
 * Highlights the specified highlight_line from the snippet.
 * Click any line to expand to full file view at that line.
 */
export function CodeSnippet({ snippet, file, isPanic = false }: CodeSnippetProps) {
  const [fullFileContent, setFullFileContent] = useState<string | null>(null);
  const [fullFileLoading, setFullFileLoading] = useState(false);
  const [targetLine, setTargetLine] = useState<number | null>(null);
  const highlightLineRef = useRef<HTMLDivElement>(null);
  
  const language = getLanguage(file);
  const highlightedSnippetLines = snippet.content.split('\n').map(line => 
    highlightCode(line, language)
  );

  // Scroll to target line when full file is loaded
  useEffect(() => {
    if (fullFileContent && targetLine && highlightLineRef.current) {
      highlightLineRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, [fullFileContent, targetLine]);

  const handleLineClick = async (lineNum: number, e: MouseEvent) => {
    e.stopPropagation();
    
    if (fullFileContent) {
      // Already showing full file, just update target line
      setTargetLine(lineNum);
      return;
    }
    
    setFullFileLoading(true);
    setTargetLine(lineNum);
    try {
      const data = await api.fetchSourceFile(file);
      setFullFileContent(data.content);
    } catch (err) {
      console.error('Failed to load full file:', err);
    } finally {
      setFullFileLoading(false);
    }
  };

  const handleCollapseClick = (e: MouseEvent) => {
    e.stopPropagation();
    setFullFileContent(null);
    setTargetLine(null);
  };

  // Render full file view
  if (fullFileContent) {
    const fullLines = fullFileContent.split('\n');
    const highlightedFullLines = fullLines.map(line => highlightCode(line, language));
    
    return (
      <div class={`code-snippet full-file ${isPanic ? 'panic-snippet' : ''}`}>
        <div class="full-file-header">
          <span class="full-file-path">{file}</span>
          <span class="full-file-lines">{fullLines.length} lines</span>
          <button class="full-file-collapse" onClick={handleCollapseClick}>
            Collapse
          </button>
        </div>
        <pre class="snippet-code full-file-code">
          {highlightedFullLines.map((line, i) => {
            const lineNum = i + 1;
            const isHighlight = lineNum === targetLine;
            return (
              <div 
                key={i}
                ref={isHighlight ? highlightLineRef : undefined}
                class={`snippet-line clickable ${isHighlight ? 'highlight' : ''}`}
                onClick={(e) => handleLineClick(lineNum, e)}
              >
                <span class="line-number">{lineNum}</span>
                <code dangerouslySetInnerHTML={{ __html: line || ' ' }} />
              </div>
            );
          })}
        </pre>
      </div>
    );
  }

  // Render snippet view
  return (
    <div class={`code-snippet ${isPanic ? 'panic-snippet' : ''} ${fullFileLoading ? 'loading' : ''}`}>
      <pre class="snippet-code">
        {highlightedSnippetLines.map((line, i) => {
          const lineNum = snippet.start_line + i;
          const isHighlight = lineNum === snippet.highlight_line;
          return (
            <div 
              key={i} 
              class={`snippet-line clickable ${isHighlight ? 'highlight' : ''}`}
              onClick={(e) => handleLineClick(lineNum, e)}
              title="Click to expand full file at this line"
            >
              <span class="line-number">{lineNum}</span>
              <code dangerouslySetInnerHTML={{ __html: line || ' ' }} />
            </div>
          );
        })}
      </pre>
      {fullFileLoading && <div class="snippet-loading">Loading full file...</div>}
    </div>
  );
}
