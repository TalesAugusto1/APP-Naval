import { VStack, Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';

interface NetworkErrorStateProps {
  onRetry: () => void;
}

export function NetworkErrorState({ onRetry }: NetworkErrorStateProps) {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Text fontSize={80}>📡</Text>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center">
          Sem conexão
        </Heading>
        <Text size="md" color="$textLight600" textAlign="center">
          Verifique sua conexão com a internet e tente novamente
        </Text>
      </VStack>
      <Button action="primary" size="lg" onPress={onRetry}>
        <ButtonText>Tentar Novamente</ButtonText>
      </Button>
    </VStack>
  );
}
