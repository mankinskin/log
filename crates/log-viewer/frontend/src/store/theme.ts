// Theme store — reactive color palette management with localStorage persistence
//
// Core types (ThemeColors, DEFAULT_THEME, ThemePreset, color utilities) are
// imported from @context-engine/viewer-api-frontend. This file adds:
//   - Theme presets (Cinder, Moonlight Ash, etc.)
//   - Effect settings (WebGPU particle effects, CRT, cursor)
//   - Saved themes management (localStorage persistence)
//   - Log-viewer-specific theme initialization

import { signal, effect } from '@preact/signals';

// Re-export shared types so existing consumers don't need to change imports
export {
  type ThemeColors,
  type ThemePreset,
  type ThemeStore,
  DEFAULT_THEME,
  hexToVec3,
  hexLuminance,
  hexToRgba,
} from '@context-engine/viewer-api-frontend';

// Import for local use (re-export + local use requires separate import)
import {
  type ThemeColors,
  type ThemePreset,
  DEFAULT_THEME,
  createThemeStore,
  vec3ToHex,
} from '@context-engine/viewer-api-frontend';

// Re-export vec3ToHex separately (used locally and by consumers)
export { vec3ToHex } from '@context-engine/viewer-api-frontend';

// ── Default theme (Dark Souls "Cinder" theme from variables.css) ─────────────

/** The original Cinder (Dark Souls) palette, used by the Cinder preset. */
const CINDER_THEME: ThemeColors = {
  bgPrimary: '#0d0c0b',
  bgSecondary: '#141311',
  bgTertiary: '#1a1816',
  bgHover: '#24201c',
  bgActive: '#2a2218',
  textPrimary: '#c8c0b4',
  textSecondary: '#8a8478',
  textMuted: '#524e46',
  borderColor: '#2e2a24',
  borderSubtle: '#1e1c18',
  accentBlue: '#3a6a80',
  accentGreen: '#2a5a28',
  accentOrange: '#c85a18',
  accentPurple: '#5a3a6a',
  accentYellow: '#a08018',
  levelTrace: '#3a3830',
  levelDebug: '#4a5a3a',
  levelInfo: '#3a5a6a',
  levelWarn: '#a07020',
  levelError: '#8a2a18',
  levelTraceText: '#c0c0c8',
  levelDebugText: '#d8c8f0',
  levelInfoText: '#b8d8f8',
  levelWarnText: '#f8e8b8',
  levelErrorText: '#f8c8c8',
  spanEnterText: '#90d8a8',
  spanExitText: '#f0b080',
  particleSparkCore: '#ffe699',
  particleSparkEmber: '#d94d14',
  particleSparkSteel: '#9999b3',
  particleEmberHot: '#e6b366',
  particleEmberBase: '#d94d14',
  particleBeamCenter: '#ffedcc',
  particleBeamEdge: '#cc9933',
  particleGlitterWarm: '#ffdfad',
  particleGlitterCool: '#b3bfff',
  cinderEmber: '#d94d14',
  cinderGold: '#cc8c1f',
  cinderAsh: '#595247',
  cinderVine: '#2e7326',
  smokeCool: '#080914',
  smokeWarm: '#0e0906',
  smokeMoss: '#090a09',
};

// ── Extended preset type (adds optional effects to shared ThemePreset) ───────

/** Log-viewer preset that extends the shared ThemePreset with optional effect overrides. */
export interface LogViewerPreset extends ThemePreset {
  effects?: Partial<EffectSettings>;
}

// ── Per-preset effect profiles ──────────────────────────────────────────────
// Tuned to be subtle and low-resource. Only overrides vs DEFAULT_EFFECT_SETTINGS.

const CINDER_EFFECTS: Partial<EffectSettings> = {
  // Dark Souls: embers & sparks are signature; skip beams/glitter
  sparksEnabled: true, sparkCount: 50, sparkSize: 80, sparkSpeed: 80,
  embersEnabled: true, emberCount: 50, emberSize: 80, emberSpeed: 65,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 80,
  smokeEnabled: true, smokeIntensity: 45, smokeSpeed: 45,
  crtEnabled: true, crtScanlinesH: 20, crtScanlinesV: 10, crtEdgeShadow: 35, crtFlicker: 15,
  grainIntensity: 25, vignetteStrength: 50, underglowStrength: 35,
};

const FROST_EFFECTS: Partial<EffectSettings> = {
  // Icy: glitter (snowfall), subtle aurora beams; no fire
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: true, beamCount: 24, beamHeight: 40, beamSpeed: 30, beamDrift: 60,
  glitterEnabled: true, glitterCount: 55, glitterSize: 55, glitterSpeed: 35,
  cinderEnabled: true, cinderSize: 60,
  smokeEnabled: true, smokeIntensity: 30, smokeSpeed: 35,
  crtEnabled: true, crtScanlinesH: 12, crtScanlinesV: 8, crtEdgeShadow: 25, crtFlicker: 8,
  grainIntensity: 12, vignetteStrength: 35, underglowStrength: 18,
};

const BLOOD_MOON_EFFECTS: Partial<EffectSettings> = {
  // Crimson: heavy embers, some sparks, deep vignette
  sparksEnabled: true, sparkCount: 30, sparkSize: 85, sparkSpeed: 55,
  embersEnabled: true, emberCount: 55, emberSize: 85, emberSpeed: 50,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 85,
  smokeEnabled: true, smokeIntensity: 50, smokeSpeed: 35,
  crtEnabled: true, crtScanlinesH: 18, crtScanlinesV: 12, crtEdgeShadow: 45, crtFlicker: 18,
  grainIntensity: 28, vignetteStrength: 55, underglowStrength: 35,
};

const VERDANT_EFFECTS: Partial<EffectSettings> = {
  // Forest: gentle glitter (fireflies), misty smoke; no fire
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: true, glitterCount: 30, glitterSize: 45, glitterSpeed: 25,
  cinderEnabled: true, cinderSize: 55,
  smokeEnabled: true, smokeIntensity: 40, smokeSpeed: 25,
  crtEnabled: true, crtScanlinesH: 8, crtScanlinesV: 5, crtEdgeShadow: 25, crtFlicker: 8,
  grainIntensity: 18, vignetteStrength: 40, underglowStrength: 22,
};

const VOID_EFFECTS: Partial<EffectSettings> = {
  // Cosmic: starlight beams, star glitter, deep vignette
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: true, beamCount: 20, beamHeight: 50, beamSpeed: 22, beamDrift: 120,
  glitterEnabled: true, glitterCount: 45, glitterSize: 45, glitterSpeed: 25,
  cinderEnabled: true, cinderSize: 55,
  smokeEnabled: true, smokeIntensity: 35, smokeSpeed: 25,
  crtEnabled: true, crtScanlinesH: 8, crtScanlinesV: 6, crtEdgeShadow: 35, crtFlicker: 6,
  grainIntensity: 18, vignetteStrength: 50, underglowStrength: 18,
};

const AMBER_TERMINAL_EFFECTS: Partial<EffectSettings> = {
  // Vintage CRT: strong scanlines, no particles
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 45,
  smokeEnabled: true, smokeIntensity: 20, smokeSpeed: 35,
  crtEnabled: true, crtScanlinesH: 55, crtScanlinesV: 35, crtEdgeShadow: 50, crtFlicker: 30,
  grainIntensity: 30, vignetteStrength: 55, underglowStrength: 25,
};

const OCEAN_ABYSS_EFFECTS: Partial<EffectSettings> = {
  // Deep sea: light-shaft beams, bioluminescent glitter, murky smoke
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: true, beamCount: 16, beamHeight: 55, beamSpeed: 18, beamDrift: 45,
  glitterEnabled: true, glitterCount: 35, glitterSize: 40, glitterSpeed: 22,
  cinderEnabled: true, cinderSize: 55,
  smokeEnabled: true, smokeIntensity: 45, smokeSpeed: 22,
  crtEnabled: true, crtScanlinesH: 8, crtScanlinesV: 5, crtEdgeShadow: 30, crtFlicker: 6,
  grainIntensity: 12, vignetteStrength: 45, underglowStrength: 18,
};

const ELYSIUM_EFFECTS: Partial<EffectSettings> = {
  // Angelic light: beams dominant, gentle glitter
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: true, beamCount: 32, beamHeight: 40, beamSpeed: 30, beamDrift: 85,
  glitterEnabled: true, glitterCount: 30, glitterSize: 50, glitterSpeed: 30,
  cinderEnabled: true, cinderSize: 65,
  smokeEnabled: true, smokeIntensity: 0, smokeSpeed: 30,
  crtEnabled: true, crtScanlinesH: 30, crtScanlinesV: 30, crtEdgeShadow: 0, crtFlicker: 6,
  grainIntensity: 12, vignetteStrength: 30, underglowStrength: 20,
};

const SAKURA_EFFECTS: Partial<EffectSettings> = {
  // Soft twilight: gentle glitter (petals), very subtle
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: true, glitterCount: 40, glitterSize: 55, glitterSpeed: 25,
  cinderEnabled: true, cinderSize: 55,
  smokeEnabled: true, smokeIntensity: 25, smokeSpeed: 25,
  crtEnabled: true, crtScanlinesH: 6, crtScanlinesV: 4, crtEdgeShadow: 22, crtFlicker: 4,
  grainIntensity: 10, vignetteStrength: 30, underglowStrength: 18,
};

const SOLARIZED_DARK_EFFECTS: Partial<EffectSettings> = {
  // Clean professional: minimal effects
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 45,
  smokeEnabled: true, smokeIntensity: 18, smokeSpeed: 25,
  crtEnabled: true, crtScanlinesH: 6, crtScanlinesV: 4, crtEdgeShadow: 18, crtFlicker: 4,
  grainIntensity: 8, vignetteStrength: 22, underglowStrength: 12,
};

const SOLARIZED_LIGHT_EFFECTS: Partial<EffectSettings> = {
  // Light theme: very minimal
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 35,
  smokeEnabled: false,
  crtEnabled: false,
  grainIntensity: 6, vignetteStrength: 12, underglowStrength: 8,
};

const HIGH_CONTRAST_EFFECTS: Partial<EffectSettings> = {
  // Accessibility: no distractions
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 35,
  smokeEnabled: false,
  crtEnabled: false,
  grainIntensity: 0, vignetteStrength: 8, underglowStrength: 8,
};

const COPPER_DUSK_EFFECTS: Partial<EffectSettings> = {
  // Warm desert: subtle embers & sparks
  sparksEnabled: true, sparkCount: 25, sparkSize: 70, sparkSpeed: 50,
  embersEnabled: true, emberCount: 35, emberSize: 75, emberSpeed: 45,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 70,
  smokeEnabled: true, smokeIntensity: 35, smokeSpeed: 30,
  crtEnabled: true, crtScanlinesH: 14, crtScanlinesV: 8, crtEdgeShadow: 30, crtFlicker: 10,
  grainIntensity: 22, vignetteStrength: 40, underglowStrength: 30,
};

const ARCTIC_EFFECTS: Partial<EffectSettings> = {
  // Bright ice: clean, sparse glitter (snowflakes)
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: true, glitterCount: 22, glitterSize: 38, glitterSpeed: 22,
  cinderEnabled: true, cinderSize: 35,
  smokeEnabled: false,
  crtEnabled: false,
  grainIntensity: 4, vignetteStrength: 12, underglowStrength: 8,
};

const NEON_NOIR_EFFECTS: Partial<EffectSettings> = {
  // Cyberpunk: neon beams & glitter, no fire
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: true, beamCount: 24, beamHeight: 35, beamSpeed: 35, beamDrift: 65,
  glitterEnabled: true, glitterCount: 40, glitterSize: 50, glitterSpeed: 45,
  cinderEnabled: true, cinderSize: 75,
  smokeEnabled: true, smokeIntensity: 30, smokeSpeed: 35,
  crtEnabled: true, crtScanlinesH: 22, crtScanlinesV: 14, crtEdgeShadow: 35, crtFlicker: 12,
  grainIntensity: 18, vignetteStrength: 45, underglowStrength: 25,
};

const PARCHMENT_EFFECTS: Partial<EffectSettings> = {
  // Old paper: film grain only, no particles
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: false,
  cinderEnabled: true, cinderSize: 35,
  smokeEnabled: false,
  crtEnabled: false,
  grainIntensity: 28, grainCoarseness: 55, grainSize: 40,
  vignetteStrength: 35, underglowStrength: 12,
};

const EMERALD_NIGHT_EFFECTS: Partial<EffectSettings> = {
  // Matrix terminal: CRT scanlines, subtle data-rain glitter
  sparksEnabled: false,
  embersEnabled: false,
  beamsEnabled: false,
  glitterEnabled: true, glitterCount: 30, glitterSize: 38, glitterSpeed: 55,
  cinderEnabled: true, cinderSize: 45,
  smokeEnabled: true, smokeIntensity: 22, smokeSpeed: 30,
  crtEnabled: true, crtScanlinesH: 40, crtScanlinesV: 25, crtEdgeShadow: 40, crtFlicker: 18,
  grainIntensity: 18, vignetteStrength: 40, underglowStrength: 18,
};

// ── Preset themes ────────────────────────────────────────────────────────────

export const THEME_PRESETS: LogViewerPreset[] = [
  {
    name: 'Cinder',
    description: 'Dark Souls gothic stone — ember & vine',
    colors: { ...CINDER_THEME },
    effects: CINDER_EFFECTS,
  },
  {
    name: 'Frost',
    description: 'Icy blue — cold steel & aurora',
    colors: {
      ...CINDER_THEME,
        bgPrimary: '#060a12',
        bgSecondary: '#0a1020',
        bgTertiary: '#0e1628',
        bgHover: '#162438',
        bgActive: '#1c2e44',
      textPrimary: '#b8c8d8',
        textSecondary: '#687888',
      textMuted: '#384858',
      borderColor: '#1e2838',
      borderSubtle: '#141c28',
      accentBlue: '#4a8aaa',
      accentGreen: '#2a6a58',
      accentOrange: '#aa6030',
      accentPurple: '#5a4a8a',
      accentYellow: '#8a8a40',
      levelTrace: '#283038',
      levelDebug: '#2a4a48',
      levelInfo: '#2a4a6a',
      levelWarn: '#6a5a2a',
      levelError: '#6a2228',
      particleSparkCore: '#aad4ff',
      particleSparkEmber: '#4488cc',
      particleSparkSteel: '#8899bb',
      particleEmberHot: '#88bbff',
      particleEmberBase: '#4488cc',
      particleBeamCenter: '#ddeeff',
      particleBeamEdge: '#6699cc',
      particleGlitterWarm: '#aaccff',
      particleGlitterCool: '#88aadd',
      cinderEmber: '#4488bb',
      cinderGold: '#5588aa',
      cinderAsh: '#445566',
      cinderVine: '#2a6a58',
        smokeCool: '#040814',
        smokeWarm: '#060810',
        smokeMoss: '#050810',
    },
    effects: FROST_EFFECTS,
  },
  {
    name: 'Blood Moon',
    description: 'Crimson darkness — blood & shadow',
    colors: {
      ...CINDER_THEME,
        bgPrimary: '#100606',
        bgSecondary: '#1a0a0a',
        bgTertiary: '#221010',
        bgHover: '#2e1616',
        bgActive: '#381c1a',
      textPrimary: '#d0b8b0',
      textSecondary: '#8a7068',
      textMuted: '#4e3a34',
      borderColor: '#361e1a',
      borderSubtle: '#241412',
      accentBlue: '#5a4a6a',
      accentGreen: '#3a4a2a',
      accentOrange: '#cc4420',
      accentPurple: '#6a2a4a',
      accentYellow: '#aa6a20',
      levelTrace: '#382828',
      levelDebug: '#3a3828',
      levelInfo: '#3a2a4a',
      levelWarn: '#8a4a18',
      levelError: '#aa2218',
      particleSparkCore: '#ff8866',
      particleSparkEmber: '#cc2210',
      particleSparkSteel: '#8a6666',
      particleEmberHot: '#ff6644',
      particleEmberBase: '#cc2210',
      particleBeamCenter: '#ffccbb',
      particleBeamEdge: '#cc5533',
      particleGlitterWarm: '#ffaa88',
      particleGlitterCool: '#cc88aa',
      cinderEmber: '#cc2210',
      cinderGold: '#aa4422',
      cinderAsh: '#4a3030',
      cinderVine: '#443828',
        smokeCool: '#080408',
        smokeWarm: '#120606',
        smokeMoss: '#0a0606',
    },
    effects: BLOOD_MOON_EFFECTS,
  },
  {
    name: 'Verdant',
    description: 'Forest depths — moss & ancient growth',
    colors: {
      ...CINDER_THEME,
        bgPrimary: '#060c06',
        bgSecondary: '#0a140a',
        bgTertiary: '#101c10',
        bgHover: '#182818',
        bgActive: '#1e321e',
      textPrimary: '#b4c8b0',
      textSecondary: '#6a8468',
      textMuted: '#3a4e38',
      borderColor: '#1e2e1e',
      borderSubtle: '#141e14',
      accentBlue: '#3a6a5a',
      accentGreen: '#2a6a28',
      accentOrange: '#8a6a28',
      accentPurple: '#4a4a5a',
      accentYellow: '#7a8a28',
      levelTrace: '#283828',
      levelDebug: '#2a5a2a',
      levelInfo: '#2a4a4a',
      levelWarn: '#6a6a20',
      levelError: '#6a3a18',
      particleSparkCore: '#bbff99',
      particleSparkEmber: '#44aa22',
      particleSparkSteel: '#88aa88',
      particleEmberHot: '#99dd66',
      particleEmberBase: '#44aa22',
      particleBeamCenter: '#ddffcc',
      particleBeamEdge: '#66aa44',
      particleGlitterWarm: '#aaffaa',
      particleGlitterCool: '#88ccaa',
      cinderEmber: '#44aa22',
      cinderGold: '#66aa44',
      cinderAsh: '#3a4a38',
      cinderVine: '#228822',
            smokeCool: '#040a04',
            smokeWarm: '#060c04',
            smokeMoss: '#050c06',
        },
    effects: VERDANT_EFFECTS,
    },
    {
        name: 'Void',
        description: 'Cosmic abyss — deep purple & starlight',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#06040e',
            bgSecondary: '#0c081a',
            bgTertiary: '#120e24',
            bgHover: '#1c1636',
            bgActive: '#241c42',
            textPrimary: '#c4bcd8',
            textSecondary: '#7a7090',
            textMuted: '#443e56',
            borderColor: '#241e34',
            borderSubtle: '#181428',
            accentBlue: '#5a60aa',
            accentGreen: '#3a6a5a',
            accentOrange: '#aa5a6a',
            accentPurple: '#7a3aaa',
            accentYellow: '#8a7a5a',
            levelTrace: '#2a2838',
            levelDebug: '#3a2a5a',
            levelInfo: '#2a3a6a',
            levelWarn: '#7a5a3a',
            levelError: '#7a2a3a',
            particleSparkCore: '#ccaaff',
            particleSparkEmber: '#8844cc',
            particleSparkSteel: '#9988bb',
            particleEmberHot: '#bb88ff',
            particleEmberBase: '#7733bb',
            particleBeamCenter: '#eeddff',
            particleBeamEdge: '#9966cc',
            particleGlitterWarm: '#ccbbff',
            particleGlitterCool: '#aabbee',
            cinderEmber: '#8844cc',
            cinderGold: '#7766aa',
            cinderAsh: '#3a3448',
            cinderVine: '#3a5a6a',
            smokeCool: '#040314',
            smokeWarm: '#0a050e',
            smokeMoss: '#06040c',
        },
      effects: VOID_EFFECTS,
    },
    {
        name: 'Amber Terminal',
        description: 'Vintage phosphor — warm amber on black',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#0c0a02',
            bgSecondary: '#141004',
            bgTertiary: '#1c1808',
            bgHover: '#26200e',
            bgActive: '#302814',
            textPrimary: '#d4a830',
            textSecondary: '#8a7020',
            textMuted: '#4a3c14',
            borderColor: '#2e2410',
            borderSubtle: '#1e1a0a',
            accentBlue: '#6a6a28',
            accentGreen: '#5a7a18',
            accentOrange: '#cc8820',
            accentPurple: '#7a6a28',
            accentYellow: '#bba020',
            levelTrace: '#2a2810',
            levelDebug: '#3a3a10',
            levelInfo: '#4a4018',
            levelWarn: '#8a6820',
            levelError: '#8a3a10',
            particleSparkCore: '#ffd066',
            particleSparkEmber: '#cc8818',
            particleSparkSteel: '#aa9944',
            particleEmberHot: '#eebb44',
            particleEmberBase: '#bb7710',
            particleBeamCenter: '#ffe8aa',
            particleBeamEdge: '#cc9930',
            particleGlitterWarm: '#ffdd88',
            particleGlitterCool: '#ccbb66',
            cinderEmber: '#cc8818',
            cinderGold: '#bba020',
            cinderAsh: '#4a4430',
            cinderVine: '#5a6a18',
            smokeCool: '#060400',
            smokeWarm: '#0e0a04',
            smokeMoss: '#0a0802',
        },
      effects: AMBER_TERMINAL_EFFECTS,
    },
    {
        name: 'Ocean Abyss',
        description: 'Deep sea darkness — bioluminescent teal',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#04080e',
            bgSecondary: '#061018',
            bgTertiary: '#0a1822',
            bgHover: '#10222e',
            bgActive: '#162c38',
            textPrimary: '#a8c8cc',
            textSecondary: '#5a8088',
            textMuted: '#344a50',
            borderColor: '#1a2a30',
            borderSubtle: '#101c22',
            accentBlue: '#2888aa',
            accentGreen: '#18886a',
            accentOrange: '#887040',
            accentPurple: '#4a5a8a',
            accentYellow: '#6a8a50',
            levelTrace: '#1a2a30',
            levelDebug: '#1a3a3a',
            levelInfo: '#1a4a5a',
            levelWarn: '#5a5a28',
            levelError: '#5a2a2a',
            particleSparkCore: '#88eeff',
            particleSparkEmber: '#2299aa',
            particleSparkSteel: '#6699aa',
            particleEmberHot: '#66ddcc',
            particleEmberBase: '#1a8888',
            particleBeamCenter: '#ccffee',
            particleBeamEdge: '#44aaaa',
            particleGlitterWarm: '#88eedd',
            particleGlitterCool: '#66bbcc',
            cinderEmber: '#2299aa',
            cinderGold: '#44aa88',
            cinderAsh: '#344848',
            cinderVine: '#1a6a5a',
            smokeCool: '#030812',
            smokeWarm: '#050a10',
            smokeMoss: '#040c0c',
        },
      effects: OCEAN_ABYSS_EFFECTS,
    },
    {
        name: 'Elysium (Default)',
        description: 'Angelic light — marble walls, vine moss & clear sky',
        colors: { ...DEFAULT_THEME },
      effects: ELYSIUM_EFFECTS,
    },
    {
        name: 'Sakura',
        description: 'Twilight garden — soft pink & mauve',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#0e080e',
            bgSecondary: '#160c16',
            bgTertiary: '#1e1220',
            bgHover: '#281c2c',
            bgActive: '#322436',
            textPrimary: '#d0c0cc',
            textSecondary: '#887888',
            textMuted: '#4a3e4a',
            borderColor: '#2a2028',
            borderSubtle: '#1c161c',
            accentBlue: '#6a5a8a',
            accentGreen: '#5a7a68',
            accentOrange: '#bb6a5a',
            accentPurple: '#884a7a',
            accentYellow: '#aa8a5a',
            levelTrace: '#2a2228',
            levelDebug: '#3a2a3a',
            levelInfo: '#3a3a5a',
            levelWarn: '#8a5a3a',
            levelError: '#8a2a3a',
            particleSparkCore: '#ffbbcc',
            particleSparkEmber: '#cc5577',
            particleSparkSteel: '#aa88aa',
            particleEmberHot: '#ff99aa',
            particleEmberBase: '#bb4466',
            particleBeamCenter: '#ffdde6',
            particleBeamEdge: '#cc7799',
            particleGlitterWarm: '#ffccdd',
            particleGlitterCool: '#bbaacc',
            cinderEmber: '#cc5577',
            cinderGold: '#bb7788',
            cinderAsh: '#443a44',
            cinderVine: '#5a7a68',
            smokeCool: '#06040a',
            smokeWarm: '#0c060c',
            smokeMoss: '#0a060a',
        },
      effects: SAKURA_EFFECTS,
    },
    // ── Additional presets ────────────────────────────────────────────────
    {
        name: 'Solarized Dark',
        description: 'Ethan Schoonover classic — warm hues on midnight',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#002b36',
            bgSecondary: '#073642',
            bgTertiary: '#0a3d4a',
            bgHover: '#104654',
            bgActive: '#164e5e',
            textPrimary: '#839496',
            textSecondary: '#657b83',
            textMuted: '#586e75',
            borderColor: '#0e404e',
            borderSubtle: '#073a46',
            accentBlue: '#268bd2',
            accentGreen: '#859900',
            accentOrange: '#cb4b16',
            accentPurple: '#6c71c4',
            accentYellow: '#b58900',
            levelTrace: '#073642',
            levelDebug: '#2a4a28',
            levelInfo: '#1a4a6a',
            levelWarn: '#6a5a18',
            levelError: '#8a2a18',
            particleSparkCore: '#fdf6e3',
            particleSparkEmber: '#cb4b16',
            particleSparkSteel: '#93a1a1',
            particleEmberHot: '#dc322f',
            particleEmberBase: '#cb4b16',
            particleBeamCenter: '#eee8d5',
            particleBeamEdge: '#b58900',
            particleGlitterWarm: '#fdf6e3',
            particleGlitterCool: '#93a1a1',
            cinderEmber: '#cb4b16',
            cinderGold: '#b58900',
            cinderAsh: '#586e75',
            cinderVine: '#859900',
            smokeCool: '#001820',
            smokeWarm: '#021a14',
            smokeMoss: '#011c1c',
        },
      effects: SOLARIZED_DARK_EFFECTS,
    },
    {
        name: 'Solarized Light',
        description: 'Ethan Schoonover classic — warm light parchment',
        colors: {
            ...DEFAULT_THEME,
            bgPrimary: '#fdf6e3',
            bgSecondary: '#eee8d5',
            bgTertiary: '#f5f0e0',
            bgHover: '#e6dfc8',
            bgActive: '#ddd6b8',
            textPrimary: '#586e75',
            textSecondary: '#657b83',
            textMuted: '#93a1a1',
            borderColor: '#d3c9a8',
            borderSubtle: '#e6dfc8',
            accentBlue: '#268bd2',
            accentGreen: '#859900',
            accentOrange: '#cb4b16',
            accentPurple: '#6c71c4',
            accentYellow: '#b58900',
            levelTrace: '#eee8d5',
            levelDebug: '#c8d8a8',
            levelInfo: '#b8d4e8',
            levelWarn: '#e8d098',
            levelError: '#e0a8a0',
            particleSparkCore: '#fdf6e3',
            particleSparkEmber: '#cb4b16',
            particleSparkSteel: '#839496',
            particleEmberHot: '#dc322f',
            particleEmberBase: '#cb4b16',
            particleBeamCenter: '#ffffff',
            particleBeamEdge: '#b58900',
            particleGlitterWarm: '#fdf6e3',
            particleGlitterCool: '#93a1a1',
            cinderEmber: '#cb4b16',
            cinderGold: '#b58900',
            cinderAsh: '#93a1a1',
            cinderVine: '#859900',
            smokeCool: '#c8d8e8',
            smokeWarm: '#e8dcc0',
            smokeMoss: '#d8e0c8',
        },
      effects: SOLARIZED_LIGHT_EFFECTS,
    },
    {
        name: 'High Contrast',
        description: 'Maximum readability — pure black & vivid colors',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#000000',
            bgSecondary: '#0a0a0a',
            bgTertiary: '#141414',
            bgHover: '#1e1e1e',
            bgActive: '#282828',
            textPrimary: '#ffffff',
            textSecondary: '#cccccc',
            textMuted: '#888888',
            borderColor: '#444444',
            borderSubtle: '#222222',
            accentBlue: '#44bbff',
            accentGreen: '#44ff44',
            accentOrange: '#ff8844',
            accentPurple: '#cc66ff',
            accentYellow: '#ffdd00',
            levelTrace: '#1a1a1a',
            levelDebug: '#003300',
            levelInfo: '#002244',
            levelWarn: '#443300',
            levelError: '#440000',
            particleSparkCore: '#ffffff',
            particleSparkEmber: '#ff6600',
            particleSparkSteel: '#aaaaaa',
            particleEmberHot: '#ff4400',
            particleEmberBase: '#cc3300',
            particleBeamCenter: '#ffffff',
            particleBeamEdge: '#ffdd00',
            particleGlitterWarm: '#ffee88',
            particleGlitterCool: '#88ddff',
            cinderEmber: '#ff6600',
            cinderGold: '#ffcc00',
            cinderAsh: '#666666',
            cinderVine: '#44ff44',
            smokeCool: '#000408',
            smokeWarm: '#080400',
            smokeMoss: '#040804',
        },
      effects: HIGH_CONTRAST_EFFECTS,
    },
    {
        name: 'Copper Dusk',
        description: 'Warm desert sunset — terracotta & bronze',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#12090a',
            bgSecondary: '#1a0e0c',
            bgTertiary: '#221412',
            bgHover: '#2c1c18',
            bgActive: '#36241e',
            textPrimary: '#d4bcaa',
            textSecondary: '#9a8474',
            textMuted: '#5e4e42',
            borderColor: '#382a22',
            borderSubtle: '#241a14',
            accentBlue: '#6a8a8a',
            accentGreen: '#7a8a4a',
            accentOrange: '#cc7a40',
            accentPurple: '#8a5a6a',
            accentYellow: '#bba040',
            levelTrace: '#2a2018',
            levelDebug: '#3a3820',
            levelInfo: '#3a4a4a',
            levelWarn: '#8a6a28',
            levelError: '#8a3828',
            particleSparkCore: '#ffe0b8',
            particleSparkEmber: '#cc6a30',
            particleSparkSteel: '#aa9888',
            particleEmberHot: '#ee8844',
            particleEmberBase: '#bb5520',
            particleBeamCenter: '#fff0d8',
            particleBeamEdge: '#cc8840',
            particleGlitterWarm: '#ffddaa',
            particleGlitterCool: '#ccaa88',
            cinderEmber: '#cc6a30',
            cinderGold: '#bba040',
            cinderAsh: '#544a40',
            cinderVine: '#6a7a3a',
            smokeCool: '#060406',
            smokeWarm: '#0c0604',
            smokeMoss: '#080604',
        },
      effects: COPPER_DUSK_EFFECTS,
    },
    {
        name: 'Arctic',
        description: 'Bright ice — clean whites & glacier blue',
        colors: {
            ...DEFAULT_THEME,
            bgPrimary: '#f0f4f8',
            bgSecondary: '#e4eaf0',
            bgTertiary: '#f5f8fb',
            bgHover: '#d4dce6',
            bgActive: '#c4d0dc',
            textPrimary: '#1a2a3a',
            textSecondary: '#3a5060',
            textMuted: '#6a8090',
            borderColor: '#c0d0dc',
            borderSubtle: '#dce4ec',
            accentBlue: '#2a7acc',
            accentGreen: '#2a8a5a',
            accentOrange: '#cc6a2a',
            accentPurple: '#6a4aaa',
            accentYellow: '#aa8a20',
            levelTrace: '#e0e6ec',
            levelDebug: '#c0dcc8',
            levelInfo: '#b8d4ec',
            levelWarn: '#e8d8a8',
            levelError: '#e0a8a0',
            particleSparkCore: '#e8f4ff',
            particleSparkEmber: '#4a9add',
            particleSparkSteel: '#a0b8cc',
            particleEmberHot: '#88ccee',
            particleEmberBase: '#3a88cc',
            particleBeamCenter: '#ffffff',
            particleBeamEdge: '#88bbee',
            particleGlitterWarm: '#e0f0ff',
            particleGlitterCool: '#a0c8ee',
            cinderEmber: '#4a8acc',
            cinderGold: '#6aaacc',
            cinderAsh: '#a0b4c0',
            cinderVine: '#2a8a5a',
            smokeCool: '#b0c8e0',
            smokeWarm: '#c8d8ec',
            smokeMoss: '#d8e4f0',
        },
      effects: ARCTIC_EFFECTS,
    },
    {
        name: 'Neon Noir',
        description: 'Cyberpunk glow — neon pink & electric blue on black',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#08060c',
            bgSecondary: '#0e0a14',
            bgTertiary: '#14101c',
            bgHover: '#1c162a',
            bgActive: '#241c34',
            textPrimary: '#d0c8e0',
            textSecondary: '#8878a0',
            textMuted: '#504668',
            borderColor: '#2a2040',
            borderSubtle: '#1a1428',
            accentBlue: '#00ccff',
            accentGreen: '#00ff88',
            accentOrange: '#ff6644',
            accentPurple: '#cc44ff',
            accentYellow: '#ffee00',
            levelTrace: '#1a1828',
            levelDebug: '#1a2a4a',
            levelInfo: '#1a3a5a',
            levelWarn: '#5a4a18',
            levelError: '#6a1a2a',
            particleSparkCore: '#ff88cc',
            particleSparkEmber: '#cc22ff',
            particleSparkSteel: '#8888cc',
            particleEmberHot: '#ff44aa',
            particleEmberBase: '#aa00ee',
            particleBeamCenter: '#eeccff',
            particleBeamEdge: '#8844ff',
            particleGlitterWarm: '#ff88ff',
            particleGlitterCool: '#44ccff',
            cinderEmber: '#cc22ff',
            cinderGold: '#ff44aa',
            cinderAsh: '#3a3050',
            cinderVine: '#00cc88',
            smokeCool: '#040210',
            smokeWarm: '#0a0408',
            smokeMoss: '#06020c',
        },
      effects: NEON_NOIR_EFFECTS,
    },
    {
        name: 'Parchment',
        description: 'Old paper — warm sepia & ink on aged vellum',
        colors: {
            ...DEFAULT_THEME,
            bgPrimary: '#f4ece0',
            bgSecondary: '#ebe2d4',
            bgTertiary: '#f8f2e6',
            bgHover: '#e0d4c4',
            bgActive: '#d4c8b4',
            textPrimary: '#2a2218',
            textSecondary: '#5a4e40',
            textMuted: '#8a806e',
            borderColor: '#c8bca8',
            borderSubtle: '#ddd4c4',
            accentBlue: '#4a6a88',
            accentGreen: '#4a7a44',
            accentOrange: '#aa6a30',
            accentPurple: '#6a5080',
            accentYellow: '#9a8428',
            levelTrace: '#e8e0d4',
            levelDebug: '#c8d4b8',
            levelInfo: '#b8c8d8',
            levelWarn: '#dcc898',
            levelError: '#cc9a88',
            particleSparkCore: '#fff8e0',
            particleSparkEmber: '#aa7030',
            particleSparkSteel: '#b0a898',
            particleEmberHot: '#cc9040',
            particleEmberBase: '#996828',
            particleBeamCenter: '#fffaea',
            particleBeamEdge: '#ccaa60',
            particleGlitterWarm: '#ffe8c0',
            particleGlitterCool: '#d0ccc0',
            cinderEmber: '#aa7030',
            cinderGold: '#bba050',
            cinderAsh: '#a09888',
            cinderVine: '#5a8a48',
            smokeCool: '#c0b8a8',
            smokeWarm: '#d0c4a8',
            smokeMoss: '#c8c0a8',
        },
      effects: PARCHMENT_EFFECTS,
    },
    {
        name: 'Emerald Night',
        description: 'Matrix terminal — green phosphor on deep black',
        colors: {
            ...CINDER_THEME,
            bgPrimary: '#040a04',
            bgSecondary: '#081208',
            bgTertiary: '#0c1a0c',
            bgHover: '#142214',
            bgActive: '#1a2c1a',
            textPrimary: '#40cc40',
            textSecondary: '#288828',
            textMuted: '#1a5a1a',
            borderColor: '#143014',
            borderSubtle: '#0c200c',
            accentBlue: '#44aa66',
            accentGreen: '#44dd44',
            accentOrange: '#88aa44',
            accentPurple: '#44aa88',
            accentYellow: '#88cc44',
            levelTrace: '#0c1a0c',
            levelDebug: '#1a3a1a',
            levelInfo: '#1a4a2a',
            levelWarn: '#4a4a18',
            levelError: '#4a1a18',
            particleSparkCore: '#88ff88',
            particleSparkEmber: '#22aa22',
            particleSparkSteel: '#44aa66',
            particleEmberHot: '#66ee66',
            particleEmberBase: '#1a8818',
            particleBeamCenter: '#ccffcc',
            particleBeamEdge: '#44cc44',
            particleGlitterWarm: '#88ff88',
            particleGlitterCool: '#44cc88',
            cinderEmber: '#22aa22',
            cinderGold: '#44cc44',
            cinderAsh: '#1a3a1a',
            cinderVine: '#22aa22',
            smokeCool: '#020804',
            smokeWarm: '#040a02',
            smokeMoss: '#030a04',
        },
      effects: EMERALD_NIGHT_EFFECTS,
    },
];

// ── Reactive state ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'log-viewer-theme';
const SETTINGS_KEY = 'log-viewer-effect-settings';

// ── Effect settings (non-color toggles) ──────────────────────────────────────


export interface EffectSettings {
  /** Glass panel background opacity 0–100 (maps to 0.0–0.4 alpha). */
  glassOpacity: number;
  /** Glass panel backdrop blur 0–100 (maps to 0–16px). */
  glassBlur: number;
  crtEnabled: boolean;
  /** Horizontal scanlines (+ pixel grid) intensity 0–100. */
  crtScanlinesH: number;
  /** Vertical scanlines (+ pixel grid) intensity 0–100. */
  crtScanlinesV: number;
  /** Edge/border shadow intensity 0–100. */
  crtEdgeShadow: number;
  /** Torch flicker intensity 0–100. */
  crtFlicker: number;
  /** Scanline width/thickness 0–100. */
  crtLineWidth: number;
  /** Scanline tint color [R, G, B] 0–255. */
  crtColor: [number, number, number];
    /** Enable/disable background smoke. */
    smokeEnabled: boolean;
    /** Overall smoke layer brightness/amount 0–100. */
    smokeIntensity: number;
    /** Smoke animation speed 0–500 (maps to 0.0–5.0×). */
    smokeSpeed: number;
    /** UV scale for warm base smoke (layers 1+4) 0–200. */
    smokeWarmScale: number;
    /** UV scale for cool mid wisps (layer 2) 0–200. */
    smokeCoolScale: number;
    /** UV scale for fine fast wisps (layer 3) 0–200. */
  smokeMossScale: number;
    /** Grain brightness / amplitude 0–100. */
    grainIntensity: number;
    /** Grain coarseness — lower = finer, higher = chunkier 0–100 (maps to frequency scale). */
    grainCoarseness: number;
    /** Grain pixel block size 0–100 (maps to 1–8 px). */
    grainSize: number;
    /** Edge vignette darkening intensity 0–100. */
    vignetteStrength: number;
    /** Warm underglow from bottom edge intensity 0–100. */
    underglowStrength: number;
    /** Metal spark animation speed 0–300 (maps to 0.0–3.0×). */
    sparkSpeed: number;
    /** Enable/disable metal sparks. */
    sparksEnabled: boolean;
    /** Ember/ash animation speed 0–300 (maps to 0.0–3.0×). */
    emberSpeed: number;
    /** Enable/disable embers. */
    embersEnabled: boolean;
    /** Angelic beam animation speed 0–300 (maps to 0.0–3.0×). */
    beamSpeed: number;
    /** Enable/disable angelic beams. */
    beamsEnabled: boolean;
    /** Glitter animation speed 0–300 (maps to 0.0–3.0×). */
    glitterSpeed: number;
    /** Enable/disable glitter. */
    glitterEnabled: boolean;
    /** Angelic beam quad height multiplier 10–100 (maps to 10.0–100.0). Default 35. */
    beamHeight: number;
  /** Angelic beam upward drift distance 0–300 (maps to 0.0–3.0×). Default 100. */
  beamDrift: number;
    /** Maximum number of active beams 0–128 (0 = use all available slots). Default 128. */
    beamCount: number;
  /** Metal spark count 0–200 (percentage of available slots). Default 100. */
  sparkCount: number;
  /** Metal spark size multiplier 0–300 (0.0x–3.0x). Default 100. */
  sparkSize: number;
  /** Ember count 0–200 (percentage of available slots). Default 100. */
  emberCount: number;
  /** Ember size multiplier 0–300 (0.0x–3.0x). Default 100. */
  emberSize: number;
  /** Glitter count 0–200 (percentage of available slots). Default 100. */
  glitterCount: number;
  /** Glitter size multiplier 0–300 (0.0x–3.0x). Default 100. */
  glitterSize: number;
  /** Cinder border glow size multiplier 0–300 (0.0x–3.0x). Default 100. */
  cinderSize: number;
  /** Enable/disable cinder border glows. */
  cinderEnabled: boolean;
}

export const DEFAULT_EFFECT_SETTINGS: EffectSettings = {
  glassOpacity: 35,
  glassBlur: 25,
  crtEnabled: true,
  crtScanlinesH: 20,
  crtScanlinesV: 12,
  crtEdgeShadow: 35,
  crtFlicker: 12,
  crtLineWidth: 50,
  crtColor: [100, 80, 60] as [number, number, number],
  smokeEnabled: true,
  smokeIntensity: 40,
  smokeSpeed: 50,
  smokeWarmScale: 100,
  smokeCoolScale: 100,
  smokeMossScale: 100,
  grainIntensity: 20,
  grainCoarseness: 40,
  grainSize: 35,
  vignetteStrength: 40,
  underglowStrength: 25,
  sparkSpeed: 70,
  sparksEnabled: true,
  emberSpeed: 70,
  embersEnabled: true,
  beamSpeed: 50,
  beamsEnabled: true,
  glitterSpeed: 60,
  glitterEnabled: true,
  beamHeight: 35,
  beamDrift: 80,
  beamCount: 48,
  sparkCount: 40,
  sparkSize: 70,
  emberCount: 40,
  emberSize: 70,
  glitterCount: 40,
  glitterSize: 60,
  cinderSize: 70,
  cinderEnabled: true,
};


function loadEffectSettings(): EffectSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...DEFAULT_EFFECT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch { /* ignore */ }
  return { ...DEFAULT_EFFECT_SETTINGS };
}

export const effectSettings = signal<EffectSettings>(loadEffectSettings());

effect(() => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(effectSettings.value));
  } catch { /* storage full */ }
});

// Sync glass opacity/blur settings to CSS custom properties
effect(() => {
  const eff = effectSettings.value;
  const root = document.documentElement;
  if (!root.classList.contains('gpu-active')) return;
  const alpha = (eff.glassOpacity / 100) * 0.4;   // 0–100 → 0.0–0.4
  const blur = Math.round((eff.glassBlur / 100) * 16); // 0–100 → 0–16px
  root.style.setProperty('--bg-secondary', `rgba(20, 19, 17, ${alpha.toFixed(3)})`);
  root.style.setProperty('--bg-tertiary', `rgba(26, 24, 22, ${alpha.toFixed(3)})`);
  root.style.setProperty('--gpu-blur', `blur(${blur}px)`);
});

export function updateEffectSetting<K extends keyof EffectSettings>(key: K, value: EffectSettings[K]) {
  effectSettings.value = { ...effectSettings.value, [key]: value };
}

// ── Theme store (backed by shared factory from viewer-api) ──────────────────

const _themeStore = createThemeStore(STORAGE_KEY, DEFAULT_THEME, /* enableGpuOverrides */ true);

/** Reactive signal holding the current theme colors. */
export const themeColors = _themeStore.colors;

// ── Actions ─────────────────────────────────────────────────────────────────

export function updateThemeColor<K extends keyof ThemeColors>(key: K, value: string) {
  _themeStore.updateColor(key, value);
}

export function applyPreset(preset: ThemeColors) {
  _themeStore.applyPreset(preset);
}

/** Apply a full preset (colors + effect overrides). */
export function applyFullPreset(preset: LogViewerPreset) {
  _themeStore.applyPreset(preset.colors);
  if (preset.effects) {
    effectSettings.value = { ...DEFAULT_EFFECT_SETTINGS, ...preset.effects };
  }
}

export function resetTheme() {
  _themeStore.reset();
}

/** Generate a random hex colour, optionally clamping lightness to a range. */
function randHex(minL = 0, maxL = 1): string {
  // Generate in HSL then convert to hex for better perceptual distribution
  const h = Math.random() * 360;
  const s = 0.4 + Math.random() * 0.5;           // 40-90 % saturation
  const l = minL + Math.random() * (maxL - minL); // lightness in range

  // HSL → RGB (standard conversion)
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1: number, g1: number, b1: number;
  if (h < 60)       { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
  else              { r1 = c; g1 = 0; b1 = x; }
  return vec3ToHex(r1 + m, g1 + m, b1 + m);
}

/** Randomize every color in the theme. */
export function randomizeTheme() {
  themeColors.value = {
    // Backgrounds — keep dark (lightness 0.02–0.15)
    bgPrimary:   randHex(0.02, 0.08),
    bgSecondary: randHex(0.05, 0.12),
    bgTertiary:  randHex(0.07, 0.14),
    bgHover:     randHex(0.08, 0.16),
    bgActive:    randHex(0.10, 0.18),

    // Text — keep light (0.55–0.95)
    textPrimary:   randHex(0.80, 0.95),
    textSecondary: randHex(0.60, 0.78),
    textMuted:     randHex(0.40, 0.55),

    // Borders (0.15–0.30)
    borderColor:  randHex(0.15, 0.28),
    borderSubtle: randHex(0.10, 0.20),

    // Accents (0.35–0.65)
    accentBlue:   randHex(0.35, 0.60),
    accentGreen:  randHex(0.35, 0.60),
    accentOrange: randHex(0.40, 0.65),
    accentPurple: randHex(0.35, 0.55),
    accentYellow: randHex(0.45, 0.65),

    // Log levels (0.35–0.60)
    levelTrace: randHex(0.30, 0.50),
    levelDebug: randHex(0.30, 0.50),
    levelInfo:  randHex(0.40, 0.60),
    levelWarn:  randHex(0.45, 0.65),
    levelError: randHex(0.40, 0.55),
    levelTraceText: randHex(0.75, 0.95),
    levelDebugText: randHex(0.75, 0.95),
    levelInfoText: randHex(0.75, 0.95),
    levelWarnText: randHex(0.75, 0.95),
    levelErrorText: randHex(0.75, 0.95),
    spanEnterText: randHex(0.70, 0.90),
    spanExitText: randHex(0.70, 0.90),

    // Particles — vivid (0.45–0.85)
    particleSparkCore:  randHex(0.70, 0.90),
    particleSparkEmber: randHex(0.35, 0.55),
    particleSparkSteel: randHex(0.40, 0.60),
    particleEmberHot:   randHex(0.55, 0.75),
    particleEmberBase:  randHex(0.30, 0.50),
    particleBeamCenter: randHex(0.70, 0.90),
    particleBeamEdge:   randHex(0.40, 0.60),
    particleGlitterWarm: randHex(0.60, 0.80),
    particleGlitterCool: randHex(0.50, 0.70),

    // Cinder palette (0.25–0.55)
    cinderEmber: randHex(0.30, 0.50),
    cinderGold:  randHex(0.35, 0.55),
    cinderAsh:   randHex(0.20, 0.35),
    cinderVine:  randHex(0.20, 0.40),

    // Smoke tones — very dark (0.02–0.08)
    smokeCool: randHex(0.02, 0.06),
    smokeWarm: randHex(0.02, 0.06),
    smokeMoss: randHex(0.02, 0.06),
  };
}

// ── Saved themes (user-created, persisted in localStorage) ──────────────────

export interface SavedTheme {
  id: string;
  name: string;
  colors: ThemeColors;
  createdAt: number;
    /** Low-res JPEG data-URL thumbnail captured at save time. */
    thumbnail?: string;
}

const SAVED_THEMES_KEY = 'log-viewer-saved-themes';

function loadSavedThemes(): SavedTheme[] {
  try {
    const raw = localStorage.getItem(SAVED_THEMES_KEY);
    if (raw) return JSON.parse(raw) as SavedTheme[];
  } catch { /* ignore */ }
  return [];
}

function persistSavedThemes(themes: SavedTheme[]) {
  try {
    localStorage.setItem(SAVED_THEMES_KEY, JSON.stringify(themes));
  } catch { /* storage full */ }
}

export const savedThemes = signal<SavedTheme[]>(loadSavedThemes());

/** Save the current theme under the given name, with an optional thumbnail. */
export function saveCurrentTheme(name: string, thumbnail?: string) {
  const theme: SavedTheme = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    colors: { ...themeColors.value },
    createdAt: Date.now(),
      thumbnail: thumbnail || undefined,
  };
  const updated = [...savedThemes.value, theme];
  savedThemes.value = updated;
  persistSavedThemes(updated);
}

/** Delete a saved theme by id. */
export function deleteSavedTheme(id: string) {
  const updated = savedThemes.value.filter(t => t.id !== id);
  savedThemes.value = updated;
  persistSavedThemes(updated);
}

/** Apply a saved theme. */
export function applySavedTheme(theme: SavedTheme) {
  themeColors.value = { ...theme.colors };
}

/** Overwrite a saved theme's colors (and thumbnail) with the current palette. */
export function updateSavedTheme(id: string, thumbnail?: string) {
    const updated = savedThemes.value.map(t =>
        t.id === id
            ? { ...t, colors: { ...themeColors.value }, thumbnail: thumbnail || t.thumbnail }
            : t
    );
    savedThemes.value = updated;
    persistSavedThemes(updated);
}

/** Rename a saved theme. */
export function renameSavedTheme(id: string, newName: string) {
  const updated = savedThemes.value.map(t =>
    t.id === id ? { ...t, name: newName } : t
  );
  savedThemes.value = updated;
  persistSavedThemes(updated);
}

// ── Theme file import / export ──────────────────────────────────────────────

/** Theme file format — superset of ThemeColors with optional metadata. */
export interface ThemeFile {
  name?: string;
  description?: string;
  colors: ThemeColors;
}

/** Export the current theme as a JSON file download. */
export function exportTheme(name?: string) {
  const preset = THEME_PRESETS.find(p =>
    Object.keys(themeColors.value).every(
      k => themeColors.value[k as keyof ThemeColors] === p.colors[k as keyof ThemeColors]
    )
  );
  const data: ThemeFile = {
    name: name || preset?.name || 'Custom Theme',
    description: preset?.description,
    colors: { ...themeColors.value },
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.name || 'theme').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Validate that an object has all required ThemeColors keys with hex strings. */
function isValidThemeColors(obj: unknown): obj is ThemeColors {
  if (!obj || typeof obj !== 'object') return false;
  const keys = Object.keys(DEFAULT_THEME) as (keyof ThemeColors)[];
  return keys.every(k => {
    const v = (obj as Record<string, unknown>)[k];
    return typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v);
  });
}

/**
 * Import a theme from a JSON file.
 * Returns the parsed theme on success, or an error string on failure.
 */
export function importThemeFromFile(file: File): Promise<{ ok: true; theme: ThemeFile } | { ok: false; error: string }> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const json = JSON.parse(text);

        // Support both { colors: {...} } and flat color objects
        let colors: unknown;
        if (json.colors && typeof json.colors === 'object') {
          colors = { ...DEFAULT_THEME, ...json.colors };
        } else if (json.bgPrimary) {
          // Flat format — treat entire object as colors
          colors = { ...DEFAULT_THEME, ...json };
        } else {
          resolve({ ok: false, error: 'No valid color data found in file.' });
          return;
        }

        if (!isValidThemeColors(colors)) {
          resolve({ ok: false, error: 'Theme file contains invalid color values. Expected #rrggbb hex strings.' });
          return;
        }

        const theme: ThemeFile = {
          name: json.name || file.name.replace(/\.json$/i, ''),
          description: json.description,
          colors: colors as ThemeColors,
        };
        resolve({ ok: true, theme });
      } catch {
        resolve({ ok: false, error: 'Failed to parse JSON file.' });
      }
    };
    reader.onerror = () => resolve({ ok: false, error: 'Failed to read file.' });
    reader.readAsText(file);
  });
}

/** Import and immediately apply a theme file. Returns error string or null on success. */
export async function importAndApplyTheme(file: File): Promise<string | null> {
  const result = await importThemeFromFile(file);
  if (!result.ok) return result.error;
  themeColors.value = { ...result.theme.colors };
  return null;
}

// hexToVec3 and vec3ToHex are re-exported from @context-engine/viewer-api-frontend above
