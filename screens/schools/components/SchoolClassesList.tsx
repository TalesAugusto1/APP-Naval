import {
  VStack,
  Heading,
  Text,
  Button,
  ButtonText,
  Box,
  HStack,
  Badge,
} from '@gluestack-ui/themed';
import { useEffect } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useClassStore } from '@/store';
import { navigateToCreateClass } from '@/navigation';
import { Shift } from '@/types';

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

  if (schoolClasses.length === 0 && !isLoading) {
    return (
      <VStack space="md" p="$6" alignItems="center">
        <Text size="lg" color="$textLight600" textAlign="center">
          Esta escola não possui turmas cadastradas
        </Text>
        <Button onPress={() => navigateToCreateClass(schoolId)}>
          <ButtonText>+ Adicionar Primeira Turma</ButtonText>
        </Button>
      </VStack>
    );
  }

  return (
    <VStack space="md" p="$6">
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="lg">Turmas</Heading>
        <Button size="sm" onPress={() => navigateToCreateClass(schoolId)}>
          <ButtonText>+ Adicionar</ButtonText>
        </Button>
      </HStack>

      <FlatList
        data={schoolClasses}
        renderItem={({ item }) => (
          <Pressable>
            <Box
              bg="$white"
              p="$4"
              borderRadius="$md"
              mb="$2"
              style={{
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
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </VStack>
  );
}
