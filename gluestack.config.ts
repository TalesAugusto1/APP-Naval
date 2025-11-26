import { config as defaultConfig } from '@gluestack-ui/config';

export const config = {
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      primary: '#2196F3',
      secondary: '#4CAF50',
      blue50: '#eff6ff',
      blue600: '#2563eb',
      green50: '#f0fdf4',
      green600: '#16a34a',
      amber50: '#fffbeb',
      amber700: '#b45309',
      orange50: '#fff7ed',
      orange700: '#c2410c',
      indigo50: '#eef2ff',
      indigo700: '#4338ca',
      gray50: '#f9fafb',
      gray100: '#f3f4f6',
      gray400: '#9ca3af',
      gray500: '#6b7280',
      gray600: '#4b5563',
      gray900: '#111827',
    },
  },
};

export type Config = typeof config;
