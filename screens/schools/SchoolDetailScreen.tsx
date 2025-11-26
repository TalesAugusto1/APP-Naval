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
import { useThemeColors } from '@/hooks/useThemeColors';
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
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
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
        bg={colors.bgColor}
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
        bg={colors.bgColor}
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
    <Box flex={1} style={{ backgroundColor: colors.bgColorHex, paddingTop: insets.top }}>
      {/* Header Section */}
      <Box
        bg={colors.cardBg}
        borderBottomWidth={1}
        borderBottomColor={colors.borderColor}
        px="$6"
        pt="$6"
        pb="$4"
      >
        <SchoolHeader school={selectedSchool} />

        <HStack space="xs" alignItems="flex-start" mb="$4">
          <MapPin size={16} color={colors.iconSecondary} style={{ marginTop: 2 }} />
          <Text color={colors.textSecondary}>{selectedSchool.address}</Text>
        </HStack>

        <SchoolStats classCount={selectedSchool.classCount} />

        {/* Tabs */}
        <HStack space="sm">
          <Pressable flex={1} onPress={() => setActiveTab('overview')}>
            {({ pressed }) => (
              <Box
                py="$2"
                px="$4"
                borderRadius="$full"
                bg={activeTab === 'overview' ? '#2563eb' : colors.surfaceBg}
                opacity={pressed ? 0.85 : 1}
              >
                <Text
                  textAlign="center"
                  fontWeight="$medium"
                  color={activeTab === 'overview' ? 'white' : colors.textSecondary}
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
                borderRadius="$full"
                bg={activeTab === 'classes' ? '#2563eb' : colors.surfaceBg}
                opacity={pressed ? 0.85 : 1}
              >
                <Text
                  textAlign="center"
                  fontWeight="$medium"
                  color={activeTab === 'classes' ? 'white' : colors.textSecondary}
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
            <Box bg={colors.cardBg} borderRadius="$2xl" p="$6">
              <VStack space="md">
                <VStack>
                  <Text color={colors.textSecondary} mb="$1">
                    Nome da Escola
                  </Text>
                  <Text color={colors.textColor}>{selectedSchool.name}</Text>
                </VStack>
                <Divider bg={colors.dividerColor} />
                <VStack>
                  <Text color={colors.textSecondary} mb="$1">
                    Endereço
                  </Text>
                  <Text color={colors.textColor}>{selectedSchool.address}</Text>
                </VStack>
                <Divider bg={colors.dividerColor} />
                <VStack>
                  <Text color={colors.textSecondary} mb="$1">
                    Número de Turmas
                  </Text>
                  <Text color={colors.textColor}>
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
