import { Badge, Text } from '@gluestack-ui/themed';

interface StatusBadgeProps {
  label: string;
  variant?: 'active' | 'inactive';
}

export function StatusBadge({ label, variant = 'active' }: StatusBadgeProps) {
  const bgColor = variant === 'active' ? '$green100' : '$gray200';
  const textColor = variant === 'active' ? '$green700' : '$gray600';

  return (
    <Badge variant="solid" action="muted" borderRadius="$full" px="$3" py="$1" bg={bgColor}>
      <Text size="xs" color={textColor} fontWeight="$medium">
        {label}
      </Text>
    </Badge>
  );
}
