import { useEffect, useState, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box, VStack, HStack, Fab, FabIcon, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSchoolStore } from '@/store';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { navigateToCreateSchool, navigateToLogin } from '@/navigation';
import { SchoolCard } from './components/SchoolCard';
import { SchoolListEmpty } from './components/SchoolListEmpty';
import { SchoolSearchBar } from './components/SchoolSearchBar';
import { SchoolSearchResults } from './components/SchoolSearchResults';
import { SchoolFilters } from './components/SchoolFilters';
import { SchoolCardSkeleton } from '@/components/SkeletonCard';
import { Plus } from 'lucide-react-native';

type SortOption = 'name' | 'newest' | 'classes';

export function SchoolListScreen() {
  const { schools, isLoading, error, fetchSchools, searchQuery, setSearchQuery } = useSchoolStore();
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useUIStore();
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const insets = useSafeAreaInsets();

  const handleCreateSchool = () => {
    if (!isAuthenticated) {
      showToast('Você precisa fazer login para criar uma escola', 'warning');
      navigateToLogin();
      return;
    }
    navigateToCreateSchool();
  };

  const sortedSchools = useMemo(() => {
    const sorted = [...schools];

    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'classes':
        return sorted.sort((a, b) => b.classCount - a.classCount);
      default:
        return sorted;
    }
  }, [schools, sortBy]);

  useEffect(() => {
    fetchSchools();
  }, [searchQuery, fetchSchools]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSchools();
    setRefreshing(false);
  };

  if (error && schools.length === 0) {
    return (
      <Box flex={1} bg="$backgroundLight50">
        <VStack flex={1} justifyContent="center" alignItems="center" p="$8">
          <Text size="lg" color="$error500" textAlign="center" mb="$4">
            {error}
          </Text>
          <Button onPress={fetchSchools}>
            <ButtonText>Tentar Novamente</ButtonText>
          </Button>
        </VStack>
      </Box>
    );
  }

  if (isLoading && schools.length === 0) {
    return (
      <Box flex={1} bg="$backgroundLight50" style={{ paddingTop: insets.top }}>
        <VStack flex={1} px="$4" pt="$4" space="md">
          <HStack space="sm">
            <Box flex={1}>
              <SchoolSearchBar />
            </Box>
            <SchoolFilters sortBy={sortBy} onSortChange={setSortBy} />
          </HStack>
          {[...Array(5)].map((_, index) => (
            <SchoolCardSkeleton key={index} />
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$backgroundLight50" position="relative" style={{ paddingTop: insets.top }}>
      <VStack flex={1} px="$4" pt="$4" space="md">
        <HStack space="sm">
          <Box flex={1}>
            <SchoolSearchBar />
          </Box>
          <SchoolFilters sortBy={sortBy} onSortChange={setSortBy} />
        </HStack>

        <SchoolSearchResults />

        {sortedSchools.length === 0 && !isLoading ? (
          searchQuery ? (
            <VStack flex={1} justifyContent="center" alignItems="center" p="$8">
              <Text size="lg" textAlign="center" mb="$4">
                Nenhuma escola encontrada para &ldquo;{searchQuery}&rdquo;
              </Text>
              <Button onPress={() => setSearchQuery('')}>
                <ButtonText>Limpar Busca</ButtonText>
              </Button>
            </VStack>
          ) : (
            <SchoolListEmpty />
          )
        ) : (
          <FlatList
            data={sortedSchools}
            renderItem={({ item }) => <SchoolCard school={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          />
        )}
      </VStack>

      <Fab
        size="lg"
        placement="bottom right"
        onPress={handleCreateSchool}
        bg="$primary500"
        $hover-bg="$primary600"
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Adicionar nova escola"
        accessibilityHint="Toque para abrir o formulário de cadastro de escola"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        <FabIcon>
          <Plus size={24} color="white" />
        </FabIcon>
      </Fab>
    </Box>
  );
}
