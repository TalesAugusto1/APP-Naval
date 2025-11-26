import { VStack, Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, message, actionText, onAction }: EmptyStateProps) {
  const colors = useThemeColors();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Text fontSize={80}>{icon}</Text>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center" color={colors.textColor}>
          {title}
        </Heading>
        <Text size="md" color={colors.textTertiary} textAlign="center">
          {message}
        </Text>
      </VStack>
      {actionText && onAction && (
        <Button action="primary" size="lg" onPress={onAction}>
          <ButtonText>{actionText}</ButtonText>
        </Button>
      )}
    </VStack>
  );
}
