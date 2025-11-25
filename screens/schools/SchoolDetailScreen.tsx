import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, Spinner, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { useSchoolStore } from '@/store';
import { goBack } from '@/navigation';
import { SchoolHeader } from './components/SchoolHeader';
import { SchoolStats } from './components/SchoolStats';
import { SchoolClassesList } from './components/SchoolClassesList';

export function SchoolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedSchool, fetchSchoolById, isLoading, error } = useSchoolStore();

  useEffect(() => {
    if (id) {
      fetchSchoolById(id);
    }
  }, [id, fetchSchoolById]);

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="$backgroundLight50">
        <Spinner size="large" />
      </Box>
    );
  }

  if (error || !selectedSchool) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" p="$8" bg="$backgroundLight50">
        <Text size="lg" color="$error500" textAlign="center" mb="$4">
          {error || 'Escola não encontrada'}
        </Text>
        <Button onPress={goBack}>
          <ButtonText>Voltar</ButtonText>
        </Button>
      </Box>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <Box flex={1}>
        <VStack space="md" pb="$8">
          <SchoolHeader school={selectedSchool} />
          <SchoolStats classCount={selectedSchool.classCount} />
          <SchoolClassesList schoolId={selectedSchool.id} />
        </VStack>
      </Box>
    </ScrollView>
  );
}
