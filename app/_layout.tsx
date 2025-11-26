import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GluestackUIProvider } from '@gluestack-ui/themed';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { config } from '../gluestack.config';
import { makeServer } from '../services/api/mock/server';
import { ToastContainer } from '@/components/ToastContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

if (__DEV__) {
  makeServer({ environment: 'development' });
  console.log('🚀 Mock API server started at /api/*');
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider config={config}>
      <ErrorBoundary>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <ToastContainer />
          <StatusBar style="auto" />
        </ThemeProvider>
      </ErrorBoundary>
    </GluestackUIProvider>
  );
}
