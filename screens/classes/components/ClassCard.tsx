import { Pressable } from 'react-native';
import { Box, Heading, Text, Badge, HStack, VStack } from '@gluestack-ui/themed';
import { Class, Shift } from '@/types';
import { navigateToEditClass } from '@/navigation';

const SHIFT_COLORS = {
  [Shift.MORNING]: { bg: '$warning300', text: '$white' },
  [Shift.AFTERNOON]: { bg: '$info400', text: '$white' },
  [Shift.EVENING]: { bg: '$secondary400', text: '$white' },
};

const SHIFT_LABELS = {
  [Shift.MORNING]: 'Manhã',
  [Shift.AFTERNOON]: 'Tarde',
  [Shift.EVENING]: 'Noite',
};

interface ClassCardProps {
  classItem: Class;
  schoolName?: string;
}

export function ClassCard({ classItem, schoolName }: ClassCardProps) {
  const shiftStyle = SHIFT_COLORS[classItem.shift];

  return (
    <Pressable onPress={() => navigateToEditClass(classItem.id, classItem.schoolId)}>
      {({ pressed }) => (
        <Box
          bg="$white"
          borderRadius="$lg"
          p="$4"
          mb="$3"
          style={{
            transform: [{ scale: pressed ? 0.98 : 1 }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <HStack justifyContent="space-between" alignItems="flex-start">
            <VStack flex={1} space="xs">
              <Heading size="md" numberOfLines={1}>
                {classItem.name}
              </Heading>
              {schoolName && (
                <Text size="sm" color="$textLight600" numberOfLines={1}>
                  {schoolName}
                </Text>
              )}
              <Text size="xs" color="$textLight600">
                Ano Letivo: {classItem.schoolYear}
              </Text>
            </VStack>
            <Badge
              variant="solid"
              action="info"
              ml="$3"
              borderRadius="$full"
              px="$3"
              py="$1"
              bg={shiftStyle.bg}
            >
              <Text color={shiftStyle.text} size="xs" fontWeight="$semibold">
                {SHIFT_LABELS[classItem.shift]}
              </Text>
            </Badge>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
