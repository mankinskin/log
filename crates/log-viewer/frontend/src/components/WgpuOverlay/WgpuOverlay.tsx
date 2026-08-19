/**
 * Re-export barrel — all WgpuOverlay API symbols now live in viewer-api.
 * Existing consumers (Header, ThemeSettings, HypergraphView, Scene3D) can
 * continue importing from this path without modification.
 */
export {
    gpuOverlayEnabled,
    fxEnabled,
    overlayGpu,
    captureOverlayThumbnail,
    registerOverlayRenderer,
    unregisterOverlayRenderer,
    markOverlayScanDirty,
    resetOverlayParticles,
    setOverlayParticleVP,
    setOverlayParticleViewport,
    setOverlayRefDepth,
    setOverlayWorldScale,
    setOverlayCameraPos,
    type OverlayRenderCallback,
} from '@context-engine/viewer-api-frontend';

