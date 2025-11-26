import { Box, VStack, HStack } from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';
import { SkeletonBox } from './Skeleton';

export function SchoolCardSkeleton() {
  const colors = useThemeColors();

  return (
    <Box
      bg={colors.cardBg}
      borderRadius="$lg"
      p="$4"
      mb="$3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack flex={1} space="xs">
          <SkeletonBox height={24} width="70%" borderRadius="$sm" />
          <SkeletonBox height={16} width="90%" borderRadius="$sm" />
        </VStack>
        <SkeletonBox height={24} width={60} borderRadius="$full" />
      </HStack>
    </Box>
  );
}

export function ClassCardSkeleton() {
  const colors = useThemeColors();

  return (
    <Box
      bg={colors.cardBg}
      borderRadius="$lg"
      p="$4"
      mb="$3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack flex={1} space="xs">
          <SkeletonBox height={24} width="60%" borderRadius="$sm" />
          <SkeletonBox height={14} width="50%" borderRadius="$sm" />
        </VStack>
        <SkeletonBox height={24} width={60} borderRadius="$full" />
      </HStack>
    </Box>
  );
}
