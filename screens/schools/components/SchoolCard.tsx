import { Pressable } from 'react-native';
import { Box, Heading, Text, HStack, VStack, Divider } from '@gluestack-ui/themed';
import { School } from '@/types';
import { useThemeColors } from '@/hooks/useThemeColors';
import { navigateToSchoolDetail } from '@/navigation';
import { Building, MapPin, Users } from 'lucide-react-native';
import { IconContainer } from '@/components/IconContainer';
import { StatusBadge } from '@/components/StatusBadge';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={() => navigateToSchoolDetail(school.id)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Escola ${school.name}`}
      accessibilityHint={`Toque para ver detalhes da escola ${school.name} com ${school.classCount} ${school.classCount === 1 ? 'turma' : 'turmas'}`}
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
            <IconContainer icon={Building} variant="blue" />
            <VStack flex={1} space="xs">
              <Heading size="md" numberOfLines={1} color={colors.textColor}>
                {school.name}
              </Heading>
              <HStack space="xs" alignItems="center">
                <MapPin size={14} color={colors.iconSecondary} />
                <Text size="sm" color={colors.textSecondary} numberOfLines={2} flex={1}>
                  {school.address}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <Divider bg={colors.dividerColor} />

          <HStack mt="$3" alignItems="center" justifyContent="space-between">
            <HStack space="xs" alignItems="center">
              <Users size={16} color={colors.iconTertiary} />
              <Text size="sm" color={colors.textSecondary}>
                {school.classCount} {school.classCount === 1 ? 'turma' : 'turmas'}
              </Text>
            </HStack>
            <StatusBadge
              label={school.status === 'active' ? 'Ativo' : 'Inativo'}
              variant={school.status}
            />
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
