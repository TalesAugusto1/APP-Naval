import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  VStack,
  Spinner,
  Text,
  Button,
  ButtonText,
  HStack,
  Pressable,
  Divider,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useSchoolStore } from '@/store';
import { goBack } from '@/navigation';
import { SchoolHeader } from './components/SchoolHeader';
import { SchoolStats } from './components/SchoolStats';
import { SchoolClassesList } from './components/SchoolClassesList';
import { SchoolDashboard } from './components/SchoolDashboard';
import { MapPin } from 'lucide-react-native';

type TabType = 'overview' | 'classes';

export function SchoolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedSchool, fetchSchoolById, isLoading, error } = useSchoolStore();
  const [activeTab, setActiveTab] = useState<TabType>('classes');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (id) {
      fetchSchoolById(id);
    }
  }, [id, fetchSchoolById]);

  if (isLoading) {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg="$backgroundLight50"
        style={{ paddingTop: insets.top }}
      >
        <Spinner size="large" />
      </Box>
    );
  }

  if (error || !selectedSchool) {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        p="$8"
        bg="$backgroundLight50"
        style={{ paddingTop: insets.top }}
      >
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
    <Box flex={1} bg="#f9fafb" style={{ paddingTop: insets.top }}>
      {/* Header Section */}
      <Box bg="$white" borderBottomWidth={1} borderBottomColor="$gray200" px="$6" pt="$6" pb="$4">
        <SchoolHeader school={selectedSchool} />

        <HStack space="xs" alignItems="flex-start" mb="$4">
          <MapPin size={16} color="#9ca3af" style={{ marginTop: 2 }} />
          <Text color="$gray600">{selectedSchool.address}</Text>
        </HStack>

        <SchoolStats classCount={selectedSchool.classCount} />

        {/* Tabs */}
        <HStack space="sm">
          <Pressable flex={1} onPress={() => setActiveTab('overview')}>
            {({ pressed }) => (
              <Box
                py="$2"
                px="$4"
                borderRadius="$xl"
                bg={activeTab === 'overview' ? '#2563eb' : '#f3f4f6'}
                style={{
                  opacity: pressed ? 0.8 : 1,
                }}
              >
                <Text
                  textAlign="center"
                  fontWeight="$medium"
                  color={activeTab === 'overview' ? 'white' : '$gray600'}
                >
                  Visão Geral
                </Text>
              </Box>
            )}
          </Pressable>
          <Pressable flex={1} onPress={() => setActiveTab('classes')}>
            {({ pressed }) => (
              <Box
                py="$2"
                px="$4"
                borderRadius="$xl"
                bg={activeTab === 'classes' ? '#2563eb' : '#f3f4f6'}
                style={{
                  opacity: pressed ? 0.8 : 1,
                }}
              >
                <Text
                  textAlign="center"
                  fontWeight="$medium"
                  color={activeTab === 'classes' ? 'white' : '$gray600'}
                >
                  Turmas
                </Text>
              </Box>
            )}
          </Pressable>
        </HStack>
      </Box>

      {/* Content */}
      <ScrollView style={{ flex: 1 }}>
        {activeTab === 'overview' ? (
          <Box px="$6" py="$6">
            <Box bg="$white" borderRadius="$2xl" p="$6">
              <VStack space="md">
                <VStack>
                  <Text color="$gray500" mb="$1">
                    Nome da Escola
                  </Text>
                  <Text color="$gray900">{selectedSchool.name}</Text>
                </VStack>
                <Divider bg="$gray100" />
                <VStack>
                  <Text color="$gray500" mb="$1">
                    Endereço
                  </Text>
                  <Text color="$gray900">{selectedSchool.address}</Text>
                </VStack>
                <Divider bg="$gray100" />
                <VStack>
                  <Text color="$gray500" mb="$1">
                    Número de Turmas
                  </Text>
                  <Text color="$gray900">
                    {selectedSchool.classCount} turma{selectedSchool.classCount !== 1 ? 's' : ''}
                  </Text>
                </VStack>
              </VStack>
            </Box>

            {selectedSchool.classCount > 0 && <SchoolDashboard schoolId={selectedSchool.id} />}
          </Box>
        ) : (
          <Box px="$6" py="$6">
            <SchoolClassesList schoolId={selectedSchool.id} />
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}
