export const lightColors = {
  primary: '#2196F3',
  primaryAlt: '#1976D2',
  secondary: '#4CAF50',
  accent: '#FF9800',

  background: '#FFFFFF',
  backgroundAlt: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F5F5',
  border: '#E0E0E0',

  textPrimary: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',

  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const darkColors = {
  primary: '#42A5F5',
  primaryAlt: '#1E88E5',
  secondary: '#66BB6A',
  accent: '#FFA726',

  background: '#121212',
  backgroundAlt: '#1E1E1E',
  surface: '#1E1E1E',
  surfaceAlt: '#232323',
  border: 'rgba(255, 255, 255, 0.12)',

  textPrimary: 'rgba(255, 255, 255, 0.87)',
  textSecondary: 'rgba(255, 255, 255, 0.60)',
  textDisabled: 'rgba(255, 255, 255, 0.38)',

  success: '#66BB6A',
  warning: '#FFA726',
  error: '#EF5350',
  info: '#42A5F5',
};

export type ColorTheme = typeof lightColors;
