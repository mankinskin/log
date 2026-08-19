/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STATIC_MODE?: string;
  /** GitHub repository in "owner/repo" format, injected at build time for GitHub Pages. */
  readonly VITE_GITHUB_REPO?: string;
  /** Full commit SHA, injected at build time for GitHub Pages. */
  readonly VITE_GITHUB_SHA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
