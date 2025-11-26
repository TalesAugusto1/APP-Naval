import { Badge, Text } from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';

interface StatusBadgeProps {
  label: string;
  variant?: 'active' | 'inactive';
}

export function StatusBadge({ label, variant = 'active' }: StatusBadgeProps) {
  const colors = useThemeColors();

  return (
    <Badge
      variant="solid"
      action="muted"
      borderRadius="$full"
      px="$3"
      py="$1"
      bg={colors.surfaceBg}
    >
      <Text size="xs" color={colors.textSecondary} fontWeight="$medium">
        {label}
      </Text>
    </Badge>
  );
}
