import { VStack, Heading, Text, HStack, Button, ButtonIcon } from '@gluestack-ui/themed';
import { School } from '@/types';
import { navigateToEditSchool } from '@/navigation';
import { MapPin, Pencil } from 'lucide-react-native';
import { useProtectedAction } from '@/hooks/useProtectedAction';

interface SchoolHeaderProps {
  school: School;
}

export function SchoolHeader({ school }: SchoolHeaderProps) {
  const handleEdit = useProtectedAction(async () => {
    navigateToEditSchool(school.id);
  });

  return (
    <VStack
      space="sm"
      p="$6"
      bg="$white"
      borderRadius="$2xl"
      borderWidth={1}
      borderColor="$gray100"
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
          <Heading size="xl" color="$gray900">
            {school.name}
          </Heading>
          <HStack space="xs" alignItems="center">
            <MapPin size={16} color="#6b7280" />
            <Text size="md" color="$gray500">
              {school.address}
            </Text>
          </HStack>
        </VStack>
        <Button variant="outline" size="sm" onPress={handleEdit} ml="$3">
          <ButtonIcon>
            <Pencil size={16} color="#2196F3" />
          </ButtonIcon>
        </Button>
      </HStack>
    </VStack>
  );
}
