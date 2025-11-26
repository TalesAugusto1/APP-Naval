import { Pressable } from 'react-native';
import { Box, Heading, Text, Badge, HStack, VStack } from '@gluestack-ui/themed';
import { School } from '@/types';
import { navigateToSchoolDetail } from '@/navigation';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Pressable onPress={() => navigateToSchoolDetail(school.id)}>
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
                {school.name}
              </Heading>
              <Text size="sm" color="$textLight600" numberOfLines={2}>
                {school.address}
              </Text>
            </VStack>
            <Badge variant="solid" action="info" ml="$3" borderRadius="$full" px="$3" py="$1">
              <Text color="$white" size="xs" fontWeight="$semibold">
                {school.classCount} {school.classCount === 1 ? 'turma' : 'turmas'}
              </Text>
            </Badge>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
