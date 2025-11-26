import { useState, useEffect } from 'react';
import { Input, InputField, InputSlot, Spinner, Pressable } from '@gluestack-ui/themed';
import { useSchoolStore } from '@/store';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Search, X } from 'lucide-react-native';

export function SchoolSearchBar() {
  const { searchQuery, setSearchQuery } = useSchoolStore();
  const colors = useThemeColors();
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
    <Input
      variant="outline"
      size="lg"
      borderRadius="$2xl"
      borderColor={colors.borderColor}
      bg={colors.cardBg}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <InputSlot pl="$4">
        <Search size={20} color={colors.iconSecondary} />
      </InputSlot>
      <InputField
        placeholder="Buscar escolas…"
        value={localValue}
        onChangeText={setLocalValue}
        returnKeyType="search"
        accessible={true}
        accessibilityLabel="Buscar escolas"
        accessibilityHint="Digite o nome da escola para buscar"
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
            <X size={20} color={colors.iconSecondary} />
          </InputSlot>
        </Pressable>
      )}
    </Input>
  );
}
