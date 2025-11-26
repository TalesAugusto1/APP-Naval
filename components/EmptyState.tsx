import { VStack, Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, message, actionText, onAction }: EmptyStateProps) {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Text fontSize={80}>{icon}</Text>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center">
          {title}
        </Heading>
        <Text size="md" color="$textLight600" textAlign="center">
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
