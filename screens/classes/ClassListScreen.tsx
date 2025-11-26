import { useEffect, useState, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box, VStack, HStack, Text, Button, ButtonText, Heading } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClassStore, useSchoolStore } from '@/store';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useThemeColors } from '@/hooks/useThemeColors';
import { navigateToCreateClass, navigateToLogin } from '@/navigation';
import { ClassCard } from './components/ClassCard';
import { ClassListEmpty } from './components/ClassListEmpty';
import { ClassSearchBar } from './components/ClassSearchBar';
import { ClassFilters } from './components/ClassFilters';
import { Shift } from '@/types';
import { ClassCardSkeleton } from '@/components/SkeletonCard';
import { AnimatedFAB } from '@/components/AnimatedFAB';

export function ClassListScreen() {
  const { schoolId } = useLocalSearchParams<{ schoolId?: string }>();
  const { classes, isLoading, error, fetchClasses } = useClassStore();
  const { schools } = useSchoolStore();
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useUIStore();
  const colors = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShifts, setSelectedShifts] = useState<Shift[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const insets = useSafeAreaInsets();

  const handleCreateClass = () => {
    if (!isAuthenticated) {
      showToast('Você precisa fazer login para criar uma turma', 'warning');
      navigateToLogin();
      return;
    }
    navigateToCreateClass(schoolId || '');
  };

  useEffect(() => {
    fetchClasses(schoolId);
  }, [schoolId, fetchClasses]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchClasses(schoolId);
    setRefreshing(false);
  };

  const getSchoolName = (schoolIdParam: string) => {
    return schools.find((s) => s.id === schoolIdParam)?.name;
  };

  const availableYears = useMemo(() => {
    const years = [...new Set(classes.map((c) => c.schoolYear))];
    return years.sort((a, b) => b - a);
  }, [classes]);

  const filteredClasses = useMemo(() => {
    let filtered = schoolId ? classes.filter((c) => c.schoolId === schoolId) : classes;

    if (searchQuery) {
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedShifts.length > 0) {
      filtered = filtered.filter((c) => selectedShifts.includes(c.shift));
    }

    if (selectedYears.length > 0) {
      filtered = filtered.filter((c) => selectedYears.includes(c.schoolYear));
    }

    return filtered;
  }, [classes, schoolId, searchQuery, selectedShifts, selectedYears]);

  const handleClearFilters = () => {
    setSelectedShifts([]);
    setSelectedYears([]);
  };

  const schoolName = schoolId ? getSchoolName(schoolId) : null;
  const activeFilterCount = selectedShifts.length + selectedYears.length;

  if (error && classes.length === 0) {
    return (
      <Box flex={1} bg={colors.bgColor}>
        <VStack flex={1} justifyContent="center" alignItems="center" p="$8">
          <Text size="lg" color="$error500" textAlign="center" mb="$4">
            {error}
          </Text>
          <Button onPress={() => fetchClasses(schoolId)}>
            <ButtonText>Tentar Novamente</ButtonText>
          </Button>
        </VStack>
      </Box>
    );
  }

  if (isLoading && classes.length === 0) {
    return (
      <Box flex={1} bg={colors.bgColor} style={{ paddingTop: insets.top }}>
        <VStack flex={1} px="$4" pt="$4" space="md">
          {schoolName && (
            <Heading size="lg" color={colors.textColor} mb="$2">
              Turmas - {schoolName}
            </Heading>
          )}
          <HStack space="sm">
            <Box flex={1}>
              <ClassSearchBar value={searchQuery} onChangeText={setSearchQuery} />
            </Box>
            <ClassFilters
              selectedShifts={selectedShifts}
              selectedYears={selectedYears}
              availableYears={availableYears}
              onShiftsChange={setSelectedShifts}
              onYearsChange={setSelectedYears}
              onClearFilters={handleClearFilters}
            />
          </HStack>
          {[...Array(5)].map((_, index) => (
            <ClassCardSkeleton key={index} />
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg={colors.bgColor} position="relative" style={{ paddingTop: insets.top }}>
      <VStack flex={1} px="$4" pt="$4" space="md">
        {schoolName && (
          <Heading size="lg" color={colors.textColor} mb="$2">
            Turmas - {schoolName}
          </Heading>
        )}

        <HStack space="sm">
          <Box flex={1}>
            <ClassSearchBar value={searchQuery} onChangeText={setSearchQuery} />
          </Box>
          <ClassFilters
            selectedShifts={selectedShifts}
            selectedYears={selectedYears}
            availableYears={availableYears}
            onShiftsChange={setSelectedShifts}
            onYearsChange={setSelectedYears}
            onClearFilters={handleClearFilters}
          />
        </HStack>

        {filteredClasses.length > 0 && (searchQuery || activeFilterCount > 0) && (
          <Text size="sm" color={colors.textTertiary}>
            {filteredClasses.length}{' '}
            {filteredClasses.length === 1 ? 'turma encontrada' : 'turmas encontradas'}
          </Text>
        )}

        {filteredClasses.length === 0 && !isLoading ? (
          searchQuery || activeFilterCount > 0 ? (
            <VStack flex={1} justifyContent="center" alignItems="center" p="$8">
              <Text size="lg" color={colors.textColor} textAlign="center" mb="$4">
                {searchQuery
                  ? `Nenhuma turma encontrada para "${searchQuery}"`
                  : 'Nenhuma turma encontrada com os filtros selecionados'}
              </Text>
              <Button
                onPress={() => {
                  setSearchQuery('');
                  handleClearFilters();
                }}
              >
                <ButtonText>{searchQuery ? 'Limpar Busca' : 'Limpar Filtros'}</ButtonText>
              </Button>
            </VStack>
          ) : (
            <ClassListEmpty schoolId={schoolId} />
          )
        ) : (
          <FlatList
            data={filteredClasses}
            renderItem={({ item }) => (
              <ClassCard
                classItem={item}
                schoolName={!schoolId ? getSchoolName(item.schoolId) : undefined}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          />
        )}
      </VStack>

      <AnimatedFAB
        icon={Plus}
        onPress={handleCreateClass}
        accessibilityLabel="Adicionar nova turma"
        accessibilityHint="Toque para abrir o formulário de cadastro de turma"
        bottomOffset={insets.bottom + 90}
      />
    </Box>
  );
}
