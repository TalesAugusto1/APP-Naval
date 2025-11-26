import { Box } from '@gluestack-ui/themed';
import { LucideIcon } from 'lucide-react-native';

type IconVariant = 'blue' | 'green' | 'amber' | 'orange' | 'indigo' | 'gray';

interface IconContainerProps {
  icon: LucideIcon;
  variant?: IconVariant;
  size?: number;
}

const VARIANT_STYLES = {
  blue: { bg: '$blue50', iconColor: '#2563eb' },
  green: { bg: '$green50', iconColor: '#16a34a' },
  amber: { bg: '$amber50', iconColor: '#d97706' },
  orange: { bg: '$orange50', iconColor: '#ea580c' },
  indigo: { bg: '$indigo50', iconColor: '#4f46e5' },
  gray: { bg: '$backgroundLight200', iconColor: '#6b7280' },
};

export function IconContainer({ icon: Icon, variant = 'blue', size = 48 }: IconContainerProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <Box
      width={size}
      height={size}
      bg={styles.bg}
      borderRadius="$xl"
      justifyContent="center"
      alignItems="center"
    >
      <Icon size={size === 48 ? 24 : size / 2} color={styles.iconColor} />
    </Box>
  );
}
