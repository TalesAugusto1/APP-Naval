import { useState, useMemo } from 'react';
import {
  Button,
  ButtonText,
  ButtonIcon,
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Pressable,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
  Input,
  InputField,
  Badge,
  BadgeText,
  Divider,
  ScrollView,
} from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Calendar,
  Hash,
  CheckCircle2,
  XCircle,
} from 'lucide-react-native';
import { BottomSheet } from '@/components/ui/BottomSheet';

type SortOption = 'name' | 'newest' | 'classes';
type DateFilterOption = 'all' | 'last7days' | 'last30days' | 'last90days';
type StatusFilterOption = 'active' | 'inactive';

export interface SchoolFilterState {
  sortBy: SortOption;
  statuses: StatusFilterOption[];
  dateRange: DateFilterOption;
  classCountRange: { min: number | null; max: number | null };
}

interface SchoolFiltersProps {
  filters: SchoolFilterState;
  onFiltersChange: (filters: SchoolFilterState) => void;
}

export function SchoolFilters({ filters, onFiltersChange }: SchoolFiltersProps) {
  const colors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<SchoolFilterState>(filters);
  const [minClassCount, setMinClassCount] = useState(filters.classCountRange.min?.toString() || '');
  const [maxClassCount, setMaxClassCount] = useState(filters.classCountRange.max?.toString() || '');

  const activeFilterCount = useMemo(() => {
    let count = 0;
    // Sort is always active, don't count it
    if (tempFilters.statuses.length > 0) count++;
    if (tempFilters.dateRange !== 'all') count++;
    if (tempFilters.classCountRange.min !== null || tempFilters.classCountRange.max !== null)
      count++;
    return count;
  }, [tempFilters]);

  const handleApply = () => {
    const min = minClassCount ? parseInt(minClassCount, 10) : null;
    const max = maxClassCount ? parseInt(maxClassCount, 10) : null;

    onFiltersChange({
      ...tempFilters,
      classCountRange: { min, max },
    });
    setIsOpen(false);
  };

  const handleClearAll = () => {
    const clearedFilters: SchoolFilterState = {
      sortBy: 'name',
      statuses: [],
      dateRange: 'all',
      classCountRange: { min: null, max: null },
    };
    setTempFilters(clearedFilters);
    setMinClassCount('');
    setMaxClassCount('');
  };

  const handleStatusToggle = (status: StatusFilterOption) => {
    const newStatuses = tempFilters.statuses.includes(status)
      ? tempFilters.statuses.filter((s) => s !== status)
      : [...tempFilters.statuses, status];
    setTempFilters({ ...tempFilters, statuses: newStatuses });
  };

  const handleOpen = () => {
    setTempFilters(filters);
    setMinClassCount(filters.classCountRange.min?.toString() || '');
    setMaxClassCount(filters.classCountRange.max?.toString() || '');
    setIsOpen(true);
  };

  return (
    <>
      <Button variant="outline" size="sm" onPress={handleOpen} position="relative">
        <ButtonIcon mr="$1" as={() => <SlidersHorizontal size={16} color="#2196F3" />} />
        <ButtonText>Filtros</ButtonText>
        {activeFilterCount > 0 && (
          <Badge
            size="sm"
            variant="solid"
            action="info"
            position="absolute"
            top={-8}
            right={-8}
            borderRadius="$full"
            minWidth={20}
            height={20}
            justifyContent="center"
            alignItems="center"
          >
            <BadgeText fontSize={11} fontWeight="$bold">
              {activeFilterCount}
            </BadgeText>
          </Badge>
        )}
      </Button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} snapPoint={0.9}>
        <ScrollView flex={1} width="$full">
          <VStack px="$4" pb="$12" space="lg" w="$full">
            {/* Header */}
            <Box position="relative" alignItems="center" w="$full">
              <Heading size="xl" color={colors.textColor} textAlign="center" w="$full">
                Filtros e Ordenação
              </Heading>
              {activeFilterCount > 0 && (
                <Pressable
                  onPress={handleClearAll}
                  position="absolute"
                  right={0}
                  top={0}
                  accessibilityLabel="Limpar filtros"
                  hitSlop={12}
                >
                  <XCircle size={24} color="#ef4444" />
                </Pressable>
              )}
            </Box>

            {/* Sort Section - Card Grid */}
            <VStack space="md">
              <HStack space="sm" alignItems="center">
                <ArrowUpDown size={18} color={colors.textColor} />
                <Heading size="sm" color={colors.textColor}>
                  Ordenar por
                </Heading>
              </HStack>
              <VStack space="sm" w="$full">
                <Pressable
                  onPress={() => setTempFilters({ ...tempFilters, sortBy: 'name' })}
                  w="$full"
                >
                  <Box
                    borderWidth={1}
                    borderRadius="$lg"
                    p="$4"
                    height={80}
                    justifyContent="center"
                    w="$full"
                    borderColor={tempFilters.sortBy === 'name' ? '$primary500' : colors.borderColor}
                    bg={tempFilters.sortBy === 'name' ? '$primary500' : colors.surfaceBg}
                  >
                    <HStack space="sm" alignItems="center">
                      <ArrowUpDown
                        size={16}
                        color={tempFilters.sortBy === 'name' ? '#fff' : colors.textColor}
                      />
                      <Text
                        color={tempFilters.sortBy === 'name' ? '$white' : colors.textColor}
                        fontWeight="$medium"
                      >
                        Nome (A-Z)
                      </Text>
                    </HStack>
                  </Box>
                </Pressable>
                <Pressable
                  onPress={() => setTempFilters({ ...tempFilters, sortBy: 'newest' })}
                  w="$full"
                >
                  <Box
                    borderWidth={1}
                    borderRadius="$lg"
                    p="$4"
                    height={80}
                    justifyContent="center"
                    w="$full"
                    borderColor={
                      tempFilters.sortBy === 'newest' ? '$primary500' : colors.borderColor
                    }
                    bg={tempFilters.sortBy === 'newest' ? '$primary500' : colors.surfaceBg}
                  >
                    <HStack space="sm" alignItems="center">
                      <Calendar
                        size={16}
                        color={tempFilters.sortBy === 'newest' ? '#fff' : colors.textColor}
                      />
                      <Text
                        color={tempFilters.sortBy === 'newest' ? '$white' : colors.textColor}
                        fontWeight="$medium"
                      >
                        Mais Recentes
                      </Text>
                    </HStack>
                  </Box>
                </Pressable>
                <Pressable
                  onPress={() => setTempFilters({ ...tempFilters, sortBy: 'classes' })}
                  w="$full"
                >
                  <Box
                    borderWidth={1}
                    borderRadius="$lg"
                    p="$4"
                    height={80}
                    justifyContent="center"
                    w="$full"
                    borderColor={
                      tempFilters.sortBy === 'classes' ? '$primary500' : colors.borderColor
                    }
                    bg={tempFilters.sortBy === 'classes' ? '$primary500' : colors.surfaceBg}
                  >
                    <HStack space="sm" alignItems="center">
                      <Hash
                        size={16}
                        color={tempFilters.sortBy === 'classes' ? '#fff' : colors.textColor}
                      />
                      <Text
                        color={tempFilters.sortBy === 'classes' ? '$white' : colors.textColor}
                        fontWeight="$medium"
                      >
                        Mais Turmas
                      </Text>
                    </HStack>
                  </Box>
                </Pressable>
              </VStack>
            </VStack>

            <Divider />

            {/* Status Filter Section - Enhanced Checkboxes */}
            <VStack space="md">
              <HStack space="sm" alignItems="center">
                <CheckCircle2 size={18} color={colors.textColor} />
                <Heading size="sm" color={colors.textColor}>
                  Status
                </Heading>
              </HStack>
              <VStack space="xs" w="$full">
                <Pressable onPress={() => handleStatusToggle('active')} w="$full">
                  <Box
                    borderWidth={1}
                    borderRadius="$md"
                    p="$3"
                    w="$full"
                    borderColor={colors.borderColor}
                    bg={tempFilters.statuses.includes('active') ? colors.hoverBg : colors.surfaceBg}
                  >
                    <Checkbox
                      value="active"
                      isChecked={tempFilters.statuses.includes('active')}
                      onChange={() => handleStatusToggle('active')}
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>Ativo</CheckboxLabel>
                    </Checkbox>
                  </Box>
                </Pressable>
                <Pressable onPress={() => handleStatusToggle('inactive')} w="$full">
                  <Box
                    borderWidth={1}
                    borderRadius="$md"
                    p="$3"
                    w="$full"
                    borderColor={colors.borderColor}
                    bg={
                      tempFilters.statuses.includes('inactive') ? colors.hoverBg : colors.surfaceBg
                    }
                  >
                    <Checkbox
                      value="inactive"
                      isChecked={tempFilters.statuses.includes('inactive')}
                      onChange={() => handleStatusToggle('inactive')}
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>Inativo</CheckboxLabel>
                    </Checkbox>
                  </Box>
                </Pressable>
              </VStack>
              <Text size="xs" color={colors.textSecondary}>
                Deixe em branco para ver todos
              </Text>
            </VStack>

            <Divider />

            {/* Date Range Filter Section - Card Grid */}
            <VStack space="md">
              <HStack space="sm" alignItems="center">
                <Calendar size={18} color={colors.textColor} />
                <Heading size="sm" color={colors.textColor}>
                  Data de Criação
                </Heading>
              </HStack>
              <VStack space="sm" w="$full">
                <HStack space="sm" w="$full">
                  <Pressable
                    flex={1}
                    onPress={() => setTempFilters({ ...tempFilters, dateRange: 'all' })}
                  >
                    <Box
                      borderWidth={1}
                      borderRadius="$lg"
                      p="$4"
                      height={80}
                      justifyContent="center"
                      w="$full"
                      borderColor={
                        tempFilters.dateRange === 'all' ? '$primary500' : colors.borderColor
                      }
                      bg={tempFilters.dateRange === 'all' ? '$primary500' : colors.surfaceBg}
                      alignItems="center"
                    >
                      <Text
                        color={tempFilters.dateRange === 'all' ? '$white' : colors.textColor}
                        fontWeight="$medium"
                        textAlign="center"
                      >
                        Todas
                      </Text>
                    </Box>
                  </Pressable>
                  <Pressable
                    flex={1}
                    onPress={() => setTempFilters({ ...tempFilters, dateRange: 'last7days' })}
                  >
                    <Box
                      borderWidth={1}
                      borderRadius="$lg"
                      p="$4"
                      height={80}
                      justifyContent="center"
                      w="$full"
                      borderColor={
                        tempFilters.dateRange === 'last7days' ? '$primary500' : colors.borderColor
                      }
                      bg={tempFilters.dateRange === 'last7days' ? '$primary500' : colors.surfaceBg}
                      alignItems="center"
                    >
                      <Text
                        color={tempFilters.dateRange === 'last7days' ? '$white' : colors.textColor}
                        fontWeight="$medium"
                        textAlign="center"
                        size="sm"
                      >
                        Últimos 7 dias
                      </Text>
                    </Box>
                  </Pressable>
                </HStack>
                <HStack space="sm" w="$full">
                  <Pressable
                    flex={1}
                    onPress={() => setTempFilters({ ...tempFilters, dateRange: 'last30days' })}
                  >
                    <Box
                      borderWidth={1}
                      borderRadius="$lg"
                      p="$4"
                      height={80}
                      justifyContent="center"
                      w="$full"
                      borderColor={
                        tempFilters.dateRange === 'last30days' ? '$primary500' : colors.borderColor
                      }
                      bg={tempFilters.dateRange === 'last30days' ? '$primary500' : colors.surfaceBg}
                      alignItems="center"
                    >
                      <Text
                        color={tempFilters.dateRange === 'last30days' ? '$white' : colors.textColor}
                        fontWeight="$medium"
                        textAlign="center"
                        size="sm"
                      >
                        Últimos 30 dias
                      </Text>
                    </Box>
                  </Pressable>
                  <Pressable
                    flex={1}
                    onPress={() => setTempFilters({ ...tempFilters, dateRange: 'last90days' })}
                  >
                    <Box
                      borderWidth={1}
                      borderRadius="$lg"
                      p="$4"
                      height={80}
                      justifyContent="center"
                      w="$full"
                      borderColor={
                        tempFilters.dateRange === 'last90days' ? '$primary500' : colors.borderColor
                      }
                      bg={tempFilters.dateRange === 'last90days' ? '$primary500' : colors.surfaceBg}
                      alignItems="center"
                    >
                      <Text
                        color={tempFilters.dateRange === 'last90days' ? '$white' : colors.textColor}
                        fontWeight="$medium"
                        textAlign="center"
                        size="sm"
                      >
                        Últimos 90 dias
                      </Text>
                    </Box>
                  </Pressable>
                </HStack>
              </VStack>
            </VStack>

            <Divider />

            {/* Class Count Range Section - Full Width Inputs */}
            <VStack space="md">
              <HStack space="sm" alignItems="center">
                <Hash size={18} color={colors.textColor} />
                <Heading size="sm" color={colors.textColor}>
                  Número de Turmas
                </Heading>
              </HStack>
              <HStack space="md" alignItems="center">
                <VStack flex={1} space="xs">
                  <Text size="xs" color={colors.textSecondary} fontWeight="$medium">
                    Mínimo
                  </Text>
                  <Input size="md">
                    <InputField
                      placeholder="0"
                      keyboardType="numeric"
                      value={minClassCount}
                      onChangeText={setMinClassCount}
                    />
                  </Input>
                </VStack>
                <Text color={colors.textSecondary} mt="$6" fontWeight="$bold">
                  -
                </Text>
                <VStack flex={1} space="xs">
                  <Text size="xs" color={colors.textSecondary} fontWeight="$medium">
                    Máximo
                  </Text>
                  <Input size="md">
                    <InputField
                      placeholder="∞"
                      keyboardType="numeric"
                      value={maxClassCount}
                      onChangeText={setMaxClassCount}
                    />
                  </Input>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </ScrollView>

        {/* Apply Button */}
        <VStack px="$4" pb="$6" pt="$4">
          <Button
            onPress={handleApply}
            size="lg"
            shadowColor="$primary500"
            shadowOpacity={0.2}
            shadowRadius="$2"
            shadowOffset={{ width: 0, height: 2 }}
          >
            <ButtonText>Aplicar Filtros</ButtonText>
          </Button>
        </VStack>
      </BottomSheet>
    </>
  );
}
