import { useState, useEffect } from 'react';
import { Input, InputField, InputSlot, Spinner, Text, Pressable } from '@gluestack-ui/themed';
import { useSchoolStore } from '@/store';

export function SchoolSearchBar() {
  const { searchQuery, setSearchQuery } = useSchoolStore();
  const [localValue, setLocalValue] = useState(searchQuery);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setSearchQuery(localValue);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [localValue, setSearchQuery]);

  const handleClear = () => {
    setLocalValue('');
    setSearchQuery('');
  };

  return (
    <Input variant="outline" size="lg">
      <InputSlot pl="$3">
        <Text fontSize={18}>🔍</Text>
      </InputSlot>
      <InputField
        placeholder="Buscar escolas…"
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
