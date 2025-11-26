import {
  VStack,
  Heading,
  Text,
  Button,
  ButtonText,
  ButtonIcon,
  Box,
  HStack,
  Badge,
} from '@gluestack-ui/themed';
import { useEffect } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useClassStore } from '@/store';
import { navigateToCreateClass, navigateToEditClass, navigateToSchoolClasses } from '@/navigation';
import { Shift } from '@/types';
import { Plus } from 'lucide-react-native';

interface SchoolClassesListProps {
  schoolId: string;
}

const SHIFT_LABELS = {
  [Shift.MORNING]: 'Manhã',
  [Shift.AFTERNOON]: 'Tarde',
  [Shift.EVENING]: 'Noite',
};

export function SchoolClassesList({ schoolId }: SchoolClassesListProps) {
  const { classes, fetchClasses, isLoading } = useClassStore();

  useEffect(() => {
    fetchClasses(schoolId);
  }, [schoolId, fetchClasses]);

  const schoolClasses = classes.filter((c) => c.schoolId === schoolId);
  const previewClasses = schoolClasses.slice(0, 5);
  const hasMore = schoolClasses.length > 5;

  if (schoolClasses.length === 0 && !isLoading) {
    return (
      <VStack space="md" p="$6" alignItems="center">
        <Text size="lg" color="$textLight600" textAlign="center">
          Esta escola não possui turmas cadastradas
        </Text>
        <Button onPress={() => navigateToCreateClass(schoolId)}>
          <ButtonIcon mr="$1" as={() => <Plus size={20} color="white" />} />
          <ButtonText>Adicionar Primeira Turma</ButtonText>
        </Button>
      </VStack>
    );
  }

  return (
    <VStack space="md" p="$6">
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="lg">Turmas ({schoolClasses.length})</Heading>
        <Button size="sm" onPress={() => navigateToCreateClass(schoolId)}>
          <ButtonIcon mr="$1" as={() => <Plus size={16} color="white" />} />
          <ButtonText>Adicionar</ButtonText>
        </Button>
      </HStack>

      <FlatList
        data={previewClasses}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigateToEditClass(item.id, schoolId)}>
            {({ pressed }) => (
              <Box
                bg="$white"
                p="$4"
                borderRadius="$md"
                mb="$2"
                style={{
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack flex={1}>
                    <Heading size="md">{item.name}</Heading>
                    <Text size="sm" color="$textLight600">
                      Ano Letivo: {item.schoolYear}
                    </Text>
                  </VStack>
                  <Badge variant="outline" borderRadius="$full" px="$3" py="$1">
                    <Text size="xs">{SHIFT_LABELS[item.shift]}</Text>
                  </Badge>
                </HStack>
              </Box>
            )}
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      {hasMore && (
        <Button variant="link" onPress={() => navigateToSchoolClasses(schoolId)}>
          <ButtonText>Ver Todas as {schoolClasses.length} Turmas →</ButtonText>
        </Button>
      )}
    </VStack>
  );
}
