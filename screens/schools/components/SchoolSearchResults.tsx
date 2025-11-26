import { Text, HStack } from '@gluestack-ui/themed';
import { useSchoolStore } from '@/store';
import { useThemeColors } from '@/hooks/useThemeColors';

export function SchoolSearchResults() {
  const { schools, searchQuery, isLoading } = useSchoolStore();
  const colors = useThemeColors();

  if (isLoading || !searchQuery) {
    return null;
  }

  const count = schools.length;

  return (
    <HStack p="$2" justifyContent="center">
      <Text size="sm" color={colors.textTertiary}>
        {count === 0
          ? `Nenhum resultado para "${searchQuery}"`
          : count === 1
            ? '1 escola encontrada'
            : `${count} escolas encontradas`}
      </Text>
    </HStack>
  );
}
