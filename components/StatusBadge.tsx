import { Badge, Text } from '@gluestack-ui/themed';

interface StatusBadgeProps {
  label: string;
  variant?: 'active' | 'inactive';
}

export function StatusBadge({ label, variant = 'active' }: StatusBadgeProps) {
  return (
    <Badge
      variant="solid"
      action="muted"
      borderRadius="$full"
      px="$3"
      py="$1"
      bg="$backgroundLight200"
    >
      <Text size="xs" color="$gray600" fontWeight="$medium">
        {label}
      </Text>
    </Badge>
  );
}
