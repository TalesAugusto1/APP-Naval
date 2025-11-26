import { useState, useEffect } from 'react';
import { Input, InputField, InputSlot, Spinner, Pressable } from '@gluestack-ui/themed';
import { Search, X } from 'lucide-react-native';

interface ClassSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function ClassSearchBar({ value, onChangeText }: ClassSearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      onChangeText(localValue);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [localValue, onChangeText]);

  const handleClear = () => {
    setLocalValue('');
    onChangeText('');
  };

  return (
    <Input
      variant="outline"
      size="lg"
      borderRadius="$2xl"
      borderColor="$gray100"
      bg="$white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <InputSlot pl="$4">
        <Search size={20} color="#6b7280" />
      </InputSlot>
      <InputField
        placeholder="Buscar turmas…"
        value={localValue}
        onChangeText={setLocalValue}
        returnKeyType="search"
        accessible={true}
        accessibilityLabel="Buscar turmas"
        accessibilityHint="Digite o nome da turma para buscar"
      />
      {isSearching && (
        <InputSlot pr="$4">
          <Spinner size="small" />
        </InputSlot>
      )}
      {localValue.length > 0 && !isSearching && (
        <Pressable
          onPress={handleClear}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Limpar busca"
          accessibilityHint="Toque para limpar o campo de busca"
        >
          <InputSlot pr="$4">
            <X size={20} color="#6b7280" />
          </InputSlot>
        </Pressable>
      )}
    </Input>
  );
}
