import { useState, useEffect } from 'react';
import { Input, InputField, InputSlot, Spinner, Text, Pressable } from '@gluestack-ui/themed';

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
    <Input variant="outline" size="lg">
      <InputSlot pl="$3">
        <Text fontSize={18}>🔍</Text>
      </InputSlot>
      <InputField
        placeholder="Buscar turmas…"
        value={localValue}
        onChangeText={setLocalValue}
        returnKeyType="search"
      />
      {isSearching && (
        <InputSlot pr="$3">
          <Spinner size="small" />
        </InputSlot>
      )}
      {localValue.length > 0 && !isSearching && (
        <Pressable onPress={handleClear}>
          <InputSlot pr="$3">
            <Text fontSize={20} color="$textLight500">
              ✕
            </Text>
          </InputSlot>
        </Pressable>
      )}
    </Input>
  );
}
