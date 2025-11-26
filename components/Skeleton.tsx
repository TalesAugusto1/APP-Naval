import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box } from '@gluestack-ui/themed';

interface SkeletonBoxProps {
  width?: number | string;
  height: number;
  borderRadius?: string;
}

export function SkeletonBox({ width = '$full', height, borderRadius = '$sm' }: SkeletonBoxProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity, width: typeof width === 'number' ? width : undefined }}>
      <Box
        width={typeof width === 'string' ? width : width}
        height={height}
        bg="$backgroundLight200"
        borderRadius={borderRadius}
      />
    </Animated.View>
  );
}

interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string;
}

export function SkeletonText({ lines = 1, lastLineWidth = '70%' }: SkeletonTextProps) {
  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBox
          key={index}
          height={16}
          width={index === lines - 1 ? lastLineWidth : '$full'}
          borderRadius="$sm"
        />
      ))}
    </>
  );
}

interface SkeletonCircleProps {
  size: number;
}

export function SkeletonCircle({ size }: SkeletonCircleProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <Box width={size} height={size} bg="$backgroundLight200" borderRadius={size / 2} />
    </Animated.View>
  );
}
