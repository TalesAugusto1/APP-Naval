import { config as defaultConfig } from '@gluestack-ui/config';

export const config = {
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      primary: '#2196F3',
      secondary: '#4CAF50',
    },
  },
};

export type Config = typeof config;
