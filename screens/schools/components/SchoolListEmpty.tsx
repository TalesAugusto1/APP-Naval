import { VStack, Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { navigateToCreateSchool } from '@/navigation';

export function SchoolListEmpty() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Text fontSize={80}>🏫</Text>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center">
          Nenhuma escola cadastrada
        </Heading>
        <Text size="md" color="$textLight600" textAlign="center">
          Comece adicionando sua primeira escola
        </Text>
      </VStack>
      <Button action="primary" onPress={navigateToCreateSchool} size="lg">
        <ButtonText>+ Adicionar Escola</ButtonText>
      </Button>
    </VStack>
  );
}
