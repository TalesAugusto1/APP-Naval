import { VStack, Text, Button, ButtonText, ButtonIcon, Box, HStack } from '@gluestack-ui/themed';
import { useEffect } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useClassStore } from '@/store';
import { navigateToCreateClass, navigateToEditClass, navigateToSchoolClasses } from '@/navigation';
import { Shift } from '@/types';
import { Plus, BookOpen, Clock, Calendar } from 'lucide-react-native';

interface SchoolClassesListProps {
  schoolId: string;
}

const SHIFT_CONFIG = {
  [Shift.MORNING]: {
    label: 'Manhã',
    bgColor: '#fef3c7',
    textColor: '#b45309',
    borderColor: '#fde68a',
  },
  [Shift.AFTERNOON]: {
    label: 'Tarde',
    bgColor: '#ffedd5',
    textColor: '#c2410c',
    borderColor: '#fed7aa',
  },
  [Shift.EVENING]: {
    label: 'Noite',
    bgColor: '#e0e7ff',
    textColor: '#4338ca',
    borderColor: '#c7d2fe',
  },
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
          <ButtonIcon mr="$1" as={() => <Plus size={20} color="white" />} />
          <ButtonText>Adicionar Primeira Turma</ButtonText>
        </Button>
      </VStack>
    );
  }

  return (
    <VStack space="md" w="$full">
      <HStack justifyContent="space-between" alignItems="center" mb="$2">
        <Text color="$gray600">
          {schoolClasses.length} turma{schoolClasses.length !== 1 ? 's' : ''}
        </Text>
        <Button
          size="sm"
          onPress={() => navigateToCreateClass(schoolId)}
          borderRadius="$xl"
          bg="#2563eb"
        >
          <ButtonIcon mr="$1" as={() => <Plus size={16} color="white" />} />
          <ButtonText>Adicionar</ButtonText>
        </Button>
      </HStack>

      <FlatList
        data={schoolClasses}
        renderItem={({ item }) => {
          const shiftInfo = SHIFT_CONFIG[item.shift];
          return (
            <Pressable
              onPress={() => navigateToEditClass(item.id, schoolId)}
              style={{ width: '100%' }}
            >
              {({ pressed }) => (
                <Box
                  bg="$white"
                  p="$4"
                  borderRadius="$2xl"
                  mb="$3"
                  borderWidth={1}
                  borderColor="$gray100"
                  w="$full"
                  style={{
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  <HStack space="md" alignItems="flex-start" mb="$3">
                    <Box
                      width={48}
                      height={48}
                      bg="#f0fdf4"
                      borderRadius="$xl"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <BookOpen size={24} color="#16a34a" />
                    </Box>
                    <VStack flex={1}>
                      <Text fontSize="$lg" fontWeight="$semibold" color="$gray900" mb="$1">
                        {item.name}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack
                    space="md"
                    mt="$3"
                    pt="$3"
                    borderTopWidth={1}
                    borderTopColor="$gray100"
                    flexWrap="wrap"
                  >
                    <HStack space="xs" alignItems="center">
                      <Clock size={16} color="#9ca3af" />
                      <Box
                        bg={shiftInfo.bgColor}
                        borderRadius="$full"
                        px="$3"
                        py="$1"
                        borderWidth={1}
                        borderColor={shiftInfo.borderColor}
                      >
                        <Text fontSize="$xs" color={shiftInfo.textColor} fontWeight="$medium">
                          {shiftInfo.label}
                        </Text>
                      </Box>
                    </HStack>
                    <HStack space="xs" alignItems="center">
                      <Calendar size={16} color="#9ca3af" />
                      <Text fontSize="$sm" color="$gray600">
                        {item.schoolYear}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
              )}
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        style={{ width: '100%' }}
      />
    </VStack>
  );
}
