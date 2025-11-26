import { Pressable } from 'react-native';
import { Box, Heading, Text, HStack, VStack, Divider } from '@gluestack-ui/themed';
import { School } from '@/types';
import { navigateToSchoolDetail } from '@/navigation';
import { Building, MapPin, Users } from 'lucide-react-native';
import { IconContainer } from '@/components/IconContainer';
import { StatusBadge } from '@/components/StatusBadge';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Pressable onPress={() => navigateToSchoolDetail(school.id)}>
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
            <IconContainer icon={Building} variant="blue" />
            <VStack flex={1} space="xs">
              <Heading size="md" numberOfLines={1} color="$gray900">
                {school.name}
              </Heading>
              <HStack space="xs" alignItems="center">
                <MapPin size={14} color="#6b7280" />
                <Text size="sm" color="$gray500" numberOfLines={2} flex={1}>
                  {school.address}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <Divider bg="$gray100" />

          <HStack mt="$3" alignItems="center" justifyContent="space-between">
            <HStack space="xs" alignItems="center">
              <Users size={16} color="#9ca3af" />
              <Text size="sm" color="$gray600">
                {school.classCount} {school.classCount === 1 ? 'turma' : 'turmas'}
              </Text>
            </HStack>
            {school.classCount > 0 && <StatusBadge label="Ativo" />}
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
