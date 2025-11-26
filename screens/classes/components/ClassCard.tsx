import { Pressable } from 'react-native';
import { Box, Heading, Text, Badge, HStack, VStack, Divider } from '@gluestack-ui/themed';
import { Class, Shift } from '@/types';
import { useThemeColors } from '@/hooks/useThemeColors';
import { navigateToEditClass } from '@/navigation';
import { BookOpen, Clock, Calendar } from 'lucide-react-native';
import { IconContainer } from '@/components/IconContainer';
import { useProtectedAction } from '@/hooks/useProtectedAction';

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
  const colors = useThemeColors();
  const shiftInfo = SHIFT_CONFIG[classItem.shift];
  const handlePress = useProtectedAction(async () => {
    navigateToEditClass(classItem.id, classItem.schoolId);
  });

  return (
    <Pressable
      onPress={handlePress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Turma ${classItem.name}${schoolName ? ` da ${schoolName}` : ''}`}
      accessibilityHint={`Toque para editar a turma ${classItem.name} do turno ${shiftInfo.label}, ano letivo ${classItem.schoolYear}`}
    >
      {({ pressed }) => (
        <Box
          bg={colors.cardBg}
          borderRadius="$2xl"
          p="$4"
          mb="$3"
          borderWidth={1}
          borderColor={colors.borderColor}
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
              <Heading size="md" numberOfLines={1} color={colors.textColor}>
                {classItem.name}
              </Heading>
              {schoolName && (
                <Text size="sm" color={colors.textSecondary} numberOfLines={1}>
                  {schoolName}
                </Text>
              )}
            </VStack>
          </HStack>

          <Divider bg={colors.dividerColor} />

          <HStack mt="$3" space="md" flexWrap="wrap">
            <HStack space="xs" alignItems="center">
              <Clock size={16} color={colors.iconTertiary} />
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
              <Calendar size={16} color={colors.iconTertiary} />
              <Text size="sm" color={colors.textSecondary}>
                {classItem.schoolYear}
              </Text>
            </HStack>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
