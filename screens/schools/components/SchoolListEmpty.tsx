import { VStack, Heading, Text, Button, ButtonText, ButtonIcon, Box } from '@gluestack-ui/themed';
import { navigateToCreateSchool } from '@/navigation';
import { Building, Plus } from 'lucide-react-native';

export function SchoolListEmpty() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Box
        width={80}
        height={80}
        bg="$gray50"
        borderRadius="$full"
        justifyContent="center"
        alignItems="center"
      >
        <Building size={40} color="#9ca3af" />
      </Box>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center" color="$gray900">
          Nenhuma escola cadastrada
        </Heading>
        <Text size="md" color="$gray500" textAlign="center">
          Comece adicionando sua primeira escola
        </Text>
      </VStack>
      <Button action="primary" onPress={navigateToCreateSchool} size="lg">
        <ButtonIcon mr="$1" as={() => <Plus size={20} color="white" />} />
        <ButtonText>Adicionar Escola</ButtonText>
      </Button>
    </VStack>
  );
}
