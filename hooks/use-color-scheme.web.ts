import { useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { useSettingsStore } from '@/store/useSettingsStore';

/**
 * Custom hook that returns the effective color scheme based on user settings
 * - If theme is 'system', returns the system's color scheme
 * - If theme is 'light' or 'dark', returns that explicitly
 *
 * To support static rendering on web, this value needs to be re-calculated on the client side
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const systemColorScheme = useSystemColorScheme();
  const { theme } = useSettingsStore();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return 'light';
  }

  if (theme === 'system') {
    return systemColorScheme ?? 'light';
  }

  return theme;
}
