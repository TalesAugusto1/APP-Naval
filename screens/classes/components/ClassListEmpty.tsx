import { VStack, Heading, Text, Button, ButtonText, ButtonIcon, Box } from '@gluestack-ui/themed';
import { navigateToCreateClass } from '@/navigation';
import { BookOpen, Plus } from 'lucide-react-native';

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
      <Box
        width={80}
        height={80}
        bg="$gray50"
        borderRadius="$full"
        justifyContent="center"
        alignItems="center"
      >
        <BookOpen size={40} color="#9ca3af" />
      </Box>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center" color="$gray900">
          {message}
        </Heading>
        <Text size="md" color="$gray500" textAlign="center">
          {subtitle}
        </Text>
      </VStack>
      <Button action="primary" onPress={() => navigateToCreateClass(schoolId || '')} size="lg">
        <ButtonIcon mr="$1" as={() => <Plus size={20} color="white" />} />
        <ButtonText>Adicionar Turma</ButtonText>
      </Button>
    </VStack>
  );
}
