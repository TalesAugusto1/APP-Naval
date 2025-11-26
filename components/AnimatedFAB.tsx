import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { LucideIcon } from 'lucide-react-native';

interface AnimatedFABProps {
  icon: LucideIcon;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityHint?: string;
  bottomOffset?: number;
  size?: number;
  iconSize?: number;
  backgroundColor?: string;
}

export function AnimatedFAB({
  icon: Icon,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  bottomOffset = 80,
  size = 64,
  iconSize = 28,
  backgroundColor,
}: AnimatedFABProps) {
  const colors = useThemeColors();
  const scale = useSharedValue(1);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const bgColor = backgroundColor || '#2563eb';

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Scale down animation
    scale.value = withSpring(0.9, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    // Scale up with bounce effect
    scale.value = withSequence(
      withSpring(1.05, {
        damping: 10,
        stiffness: 200,
      }),
      withSpring(1, {
        damping: 12,
        stiffness: 250,
      })
    );

    // Ripple effect
    rippleScale.value = 0;
    rippleOpacity.value = 0.3;

    rippleScale.value = withTiming(2, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });

    rippleOpacity.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedRippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={[
        styles.container,
        {
          bottom: bottomOffset,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bgColor,
            shadowColor: colors.isDark ? '#000' : bgColor,
          },
          animatedButtonStyle,
        ]}
      >
        {/* Ripple effect */}
        <Animated.View
          style={[
            styles.ripple,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: '#fff',
            },
            animatedRippleStyle,
          ]}
        />

        {/* Icon */}
        <Icon size={iconSize} color="white" strokeWidth={2.5} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    zIndex: 1000,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ripple: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
