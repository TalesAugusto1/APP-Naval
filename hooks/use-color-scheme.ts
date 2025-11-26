import { useColorScheme as useSystemColorScheme } from 'react-native';
import { useSettingsStore } from '@/store/useSettingsStore';

/**
 * Custom hook that returns the effective color scheme based on user settings
 * - If theme is 'system', returns the system's color scheme
 * - If theme is 'light' or 'dark', returns that explicitly
 */
export function useColorScheme() {
  const systemColorScheme = useSystemColorScheme();
  const { theme } = useSettingsStore();

  if (theme === 'system') {
    return systemColorScheme ?? 'light';
  }

  return theme;
}
