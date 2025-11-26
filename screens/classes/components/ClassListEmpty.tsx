import { VStack, Heading, Text, Button, ButtonText, ButtonIcon, Box } from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';
import { navigateToCreateClass } from '@/navigation';
import { BookOpen, Plus } from 'lucide-react-native';

interface ClassListEmptyProps {
  schoolId?: string;
}

export function ClassListEmpty({ schoolId }: ClassListEmptyProps) {
  const colors = useThemeColors();
  const message = schoolId ? 'Esta escola não tem turmas cadastradas' : 'Nenhuma turma cadastrada';

  const subtitle = schoolId
    ? 'Comece adicionando a primeira turma desta escola'
    : 'Comece adicionando sua primeira turma';

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Box
        width={80}
        height={80}
        bg={colors.surfaceBg}
        borderRadius="$full"
        justifyContent="center"
        alignItems="center"
      >
        <BookOpen size={40} color={colors.iconTertiary} />
      </Box>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center" color={colors.textColor}>
          {message}
        </Heading>
        <Text size="md" color={colors.textSecondary} textAlign="center">
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
