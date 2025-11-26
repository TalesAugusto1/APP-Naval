import { useColorScheme } from './use-color-scheme';

/**
 * Theme color tokens for consistent theming across the app
 * Follows WCAG AA accessibility standards for contrast ratios
 */
export interface ThemeColors {
  // Backgrounds
  bgColor: string;
  bgColorHex: string;
  cardBg: string;
  surfaceBg: string;

  // Borders
  borderColor: string;
  dividerColor: string;

  // Text
  textColor: string;
  textSecondary: string;
  textTertiary: string;

  // Icons (hex values for non-gluestack components)
  iconPrimary: string;
  iconSecondary: string;
  iconTertiary: string;

  // Interactive states
  pressedBg: string;
  hoverBg: string;

  // Semantic
  isDark: boolean;
}

/**
 * Custom hook that provides theme-aware color tokens
 * Centralizes color management and ensures consistency
 *
 * @returns ThemeColors object with all necessary color tokens
 *
 * @example
 * ```tsx
 * const colors = useThemeColors();
 * <Box bg={colors.cardBg} borderColor={colors.borderColor}>
 *   <Text color={colors.textColor}>Hello</Text>
 * </Box>
 * ```
 */
export function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    // Backgrounds
    bgColor: isDark ? '$backgroundDark950' : '$backgroundLight50',
    bgColorHex: isDark ? '#0a0a0a' : '#fafafa',
    cardBg: isDark ? '$backgroundDark900' : '$white',
    surfaceBg: isDark ? '$backgroundDark800' : '$backgroundLight100',

    // Borders
    borderColor: isDark ? '$borderDark800' : '$borderLight100',
    dividerColor: isDark ? '$borderDark800' : '$gray100',

    // Text
    textColor: isDark ? '$textDark50' : '$textLight900',
    textSecondary: isDark ? '$textDark400' : '$textLight500',
    textTertiary: isDark ? '$textDark500' : '$textLight600',

    // Icons (hex values for lucide-react-native)
    iconPrimary: isDark ? '#e5e7eb' : '#111827',
    iconSecondary: isDark ? '#9ca3af' : '#6b7280',
    iconTertiary: isDark ? '#6b7280' : '#9ca3af',

    // Interactive states
    pressedBg: isDark ? '#1f1f1f' : '#f3f4f6',
    hoverBg: isDark ? '#2a2a2a' : '#f9fafb',

    // Semantic
    isDark,
  };
}
