import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsState {
  theme: ThemeMode;
  isFirstLaunch: boolean;
  hasCompletedOnboarding: boolean;

  setTheme: (theme: ThemeMode) => void;
  setFirstLaunch: (value: boolean) => void;
  completeOnboarding: () => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      isFirstLaunch: true,
      hasCompletedOnboarding: false,

      setTheme: (theme) => {
        set({ theme });
      },

      setFirstLaunch: (value) => {
        set({ isFirstLaunch: value });
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      resetSettings: () => {
        set({
          theme: 'system',
          isFirstLaunch: true,
          hasCompletedOnboarding: false,
        });
      },
    }),
    {
      name: 'school-manager-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
