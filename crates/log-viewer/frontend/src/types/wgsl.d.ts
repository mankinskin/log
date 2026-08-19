// Type declarations for WGSL shader files loaded as raw strings via Vite's
// `?raw` import suffix (https://vitejs.dev/guide/assets#importing-asset-as-string).
//
// Usage:
//   import shaderCode from './my-shader.wgsl?raw';
//   // shaderCode: string

declare module '*.wgsl?raw' {
    const src: string;
    export default src;
}
