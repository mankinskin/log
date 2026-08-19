/**
 * ThemeSettings — thin adapter delegating to the shared viewer-api component.
 *
 * Creates a ThemeSettingsStore from log-viewer's signals/functions and passes
 * it to the shared ThemeSettings component from @context-engine/viewer-api-frontend.
 */
import {
  ThemeSettings as SharedThemeSettings,
  type ThemeSettingsStore,
  type SavedTheme as ApiSavedTheme,
} from '@context-engine/viewer-api-frontend';
import type { Signal } from '@preact/signals';
import {
  themeColors,
  updateThemeColor,
  applyFullPreset,
  resetTheme,
  randomizeTheme,
  THEME_PRESETS,
  DEFAULT_THEME,
  savedThemes,
  saveCurrentTheme,
  deleteSavedTheme,
  applySavedTheme,
  updateSavedTheme,
  renameSavedTheme,
  effectSettings,
  updateEffectSetting,
  exportTheme,
  importAndApplyTheme,
} from '../../store/theme';

export function ThemeSettings() {
  const store: ThemeSettingsStore = {
    themeColors,
    effectSettings,
    presets: THEME_PRESETS,
    defaultTheme: DEFAULT_THEME,
    updateColor: updateThemeColor,
    applyPreset: applyFullPreset,
    resetTheme,
    randomizeTheme,
    savedThemes: savedThemes as unknown as Signal<ApiSavedTheme[]>,
    saveTheme: saveCurrentTheme,
    deleteTheme: deleteSavedTheme,
    applySavedTheme,
    updateSavedTheme,
    renameSavedTheme,
    updateEffect: updateEffectSetting,
    exportTheme,
    importTheme: importAndApplyTheme,
  };
  return <SharedThemeSettings store={store} />;
}
