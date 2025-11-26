import { useState } from 'react';
import {
  Button,
  ButtonText,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  VStack,
  Heading,
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
  CircleIcon,
} from '@gluestack-ui/themed';

type SortOption = 'name' | 'newest' | 'classes';

interface SchoolFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SchoolFilters({ sortBy, onSortChange }: SchoolFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSort, setTempSort] = useState(sortBy);

  const handleApply = () => {
    onSortChange(tempSort);
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" size="sm" onPress={() => setIsOpen(true)}>
        <ButtonText>🎯 Filtros</ButtonText>
      </Button>

      <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack w="$full" p="$6" space="lg">
            <Heading size="lg">Ordenar por</Heading>

            <RadioGroup value={tempSort} onChange={setTempSort}>
              <VStack space="md">
                <Radio value="name">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Nome (A-Z)</RadioLabel>
                </Radio>
                <Radio value="newest">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Mais Recentes</RadioLabel>
                </Radio>
                <Radio value="classes">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Mais Turmas</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>

            <Button onPress={handleApply} mt="$4">
              <ButtonText>Aplicar Filtros</ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
