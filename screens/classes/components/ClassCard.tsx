import { Pressable } from 'react-native';
import { Box, Heading, Text, Badge, HStack, VStack, Divider } from '@gluestack-ui/themed';
import { Class, Shift } from '@/types';
import { navigateToEditClass } from '@/navigation';
import { BookOpen, Clock, Calendar } from 'lucide-react-native';
import { IconContainer } from '@/components/IconContainer';

const SHIFT_CONFIG = {
  [Shift.MORNING]: {
    label: 'Manhã',
    bg: '$amber50',
    color: '#b45309',
    borderColor: '#fef3c7',
  },
  [Shift.AFTERNOON]: {
    label: 'Tarde',
    bg: '$orange50',
    color: '#c2410c',
    borderColor: '#fed7aa',
  },
  [Shift.EVENING]: {
    label: 'Noite',
    bg: '$indigo50',
    color: '#4338ca',
    borderColor: '#e0e7ff',
  },
};

interface ClassCardProps {
  classItem: Class;
  schoolName?: string;
}

export function ClassCard({ classItem, schoolName }: ClassCardProps) {
  const shiftInfo = SHIFT_CONFIG[classItem.shift];

  return (
    <Pressable onPress={() => navigateToEditClass(classItem.id, classItem.schoolId)}>
      {({ pressed }) => (
        <Box
          bg="$white"
          borderRadius="$2xl"
          p="$4"
          mb="$3"
          borderWidth={1}
          borderColor="$gray100"
          style={{
            transform: [{ scale: pressed ? 0.98 : 1 }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <HStack space="md" alignItems="flex-start" mb="$3">
            <IconContainer icon={BookOpen} variant="green" />
            <VStack flex={1} space="xs">
              <Heading size="md" numberOfLines={1} color="$gray900">
                {classItem.name}
              </Heading>
              {schoolName && (
                <Text size="sm" color="$gray500" numberOfLines={1}>
                  {schoolName}
                </Text>
              )}
            </VStack>
          </HStack>

          <Divider bg="$gray100" />

          <HStack mt="$3" space="md" flexWrap="wrap">
            <HStack space="xs" alignItems="center">
              <Clock size={16} color="#9ca3af" />
              <Badge
                variant="outline"
                borderRadius="$full"
                px="$3"
                py="$1"
                bg={shiftInfo.bg}
                borderColor={shiftInfo.borderColor}
              >
                <Text size="xs" fontWeight="$medium" style={{ color: shiftInfo.color }}>
                  {shiftInfo.label}
                </Text>
              </Badge>
            </HStack>
            <HStack space="xs" alignItems="center">
              <Calendar size={16} color="#9ca3af" />
              <Text size="sm" color="$gray600">
                {classItem.schoolYear}
              </Text>
            </HStack>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
