import { VStack, Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { navigateToCreateClass } from '@/navigation';

interface ClassListEmptyProps {
  schoolId?: string;
}

export function ClassListEmpty({ schoolId }: ClassListEmptyProps) {
  const message = schoolId ? 'Esta escola não tem turmas cadastradas' : 'Nenhuma turma cadastrada';

  const subtitle = schoolId
    ? 'Comece adicionando a primeira turma desta escola'
    : 'Comece adicionando sua primeira turma';

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Text fontSize={80}>📚</Text>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center">
          {message}
        </Heading>
        <Text size="md" color="$textLight600" textAlign="center">
          {subtitle}
        </Text>
      </VStack>
      <Button action="primary" onPress={() => navigateToCreateClass(schoolId || '')} size="lg">
        <ButtonText>+ Adicionar Turma</ButtonText>
      </Button>
    </VStack>
  );
}
