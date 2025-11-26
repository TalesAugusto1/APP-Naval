import { VStack, Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';

interface NetworkErrorStateProps {
  onRetry: () => void;
}

export function NetworkErrorState({ onRetry }: NetworkErrorStateProps) {
  const colors = useThemeColors();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Text fontSize={80}>📡</Text>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center" color={colors.textColor}>
          Sem conexão
        </Heading>
        <Text size="md" color={colors.textTertiary} textAlign="center">
          Verifique sua conexão com a internet e tente novamente
        </Text>
      </VStack>
      <Button action="primary" size="lg" onPress={onRetry}>
        <ButtonText>Tentar Novamente</ButtonText>
      </Button>
    </VStack>
  );
}
