import { useState } from 'react';
import {
  Button,
  ButtonText,
  VStack,
  HStack,
  Heading,
  Text,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Icon,
  CloseIcon,
  Badge,
  Pressable,
} from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Shift } from '@/types';
import { SlidersHorizontal } from 'lucide-react-native';

const SHIFT_LABELS = {
  [Shift.MORNING]: 'Manhã',
  [Shift.AFTERNOON]: 'Tarde',
  [Shift.EVENING]: 'Noite',
};

interface ClassFiltersProps {
  selectedShifts: Shift[];
  selectedYears: number[];
  availableYears: number[];
  onShiftsChange: (shifts: Shift[]) => void;
  onYearsChange: (years: number[]) => void;
  onClearFilters: () => void;
}

export function ClassFilters({
  selectedShifts,
  selectedYears,
  availableYears,
  onShiftsChange,
  onYearsChange,
  onClearFilters,
}: ClassFiltersProps) {
  const [showModal, setShowModal] = useState(false);

  const toggleShift = (shift: Shift) => {
    if (selectedShifts.includes(shift)) {
      onShiftsChange(selectedShifts.filter((s) => s !== shift));
    } else {
      onShiftsChange([...selectedShifts, shift]);
    }
  };

  const toggleYear = (year: number) => {
    if (selectedYears.includes(year)) {
      onYearsChange(selectedYears.filter((y) => y !== year));
    } else {
      onYearsChange([...selectedYears, year]);
    }
  };

  const activeFilterCount = selectedShifts.length + selectedYears.length;

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <HStack
          alignItems="center"
          space="xs"
          bg="$white"
          p="$3"
          borderRadius="$lg"
          borderWidth={1}
          borderColor="$borderLight300"
        >
          <SlidersHorizontal size={16} color="#2196F3" />
          <Text>Filtros</Text>
          {activeFilterCount > 0 && (
            <Badge variant="solid" action="info" borderRadius="$full" size="sm">
              <Text color="$white" fontSize={10}>
                {activeFilterCount}
              </Text>
            </Badge>
          )}
        </HStack>
      </Pressable>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Filtros</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="xl">
              <VStack space="md">
                <Heading size="sm">Turno</Heading>
                {Object.values(Shift).map((shift) => (
                  <Checkbox
                    key={shift}
                    value={shift}
                    isChecked={selectedShifts.includes(shift)}
                    onChange={() => toggleShift(shift)}
                  >
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon />
                    </CheckboxIndicator>
                    <CheckboxLabel>{SHIFT_LABELS[shift]}</CheckboxLabel>
                  </Checkbox>
                ))}
              </VStack>

              {availableYears.length > 0 && (
                <VStack space="md">
                  <Heading size="sm">Ano Letivo</Heading>
                  {availableYears.map((year) => (
                    <Checkbox
                      key={year}
                      value={year.toString()}
                      isChecked={selectedYears.includes(year)}
                      onChange={() => toggleYear(year)}
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon />
                      </CheckboxIndicator>
                      <CheckboxLabel>{year}</CheckboxLabel>
                    </Checkbox>
                  ))}
                </VStack>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              onPress={() => {
                onClearFilters();
                setShowModal(false);
              }}
            >
              <ButtonText>Limpar Filtros</ButtonText>
            </Button>
            <Button onPress={() => setShowModal(false)} ml="$3">
              <ButtonText>Aplicar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
