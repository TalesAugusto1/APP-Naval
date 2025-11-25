import { VStack, Heading, Text, HStack, Button, ButtonIcon } from '@gluestack-ui/themed';
import { School } from '@/types';
import { navigateToEditSchool } from '@/navigation';

interface SchoolHeaderProps {
  school: School;
}

export function SchoolHeader({ school }: SchoolHeaderProps) {
  return (
    <VStack
      space="sm"
      p="$6"
      bg="$white"
      borderRadius="$lg"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack flex={1} space="xs">
          <Heading size="xl">{school.name}</Heading>
          <Text size="md" color="$textLight600">
            {school.address}
          </Text>
        </VStack>
        <Button variant="outline" size="sm" onPress={() => navigateToEditSchool(school.id)} ml="$3">
          <ButtonIcon>
            <Text>✏️</Text>
          </ButtonIcon>
        </Button>
      </HStack>
    </VStack>
  );
}
