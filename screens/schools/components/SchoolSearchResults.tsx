import { Text, HStack } from '@gluestack-ui/themed';
import { useSchoolStore } from '@/store';

export function SchoolSearchResults() {
  const { schools, searchQuery, isLoading } = useSchoolStore();

  if (isLoading || !searchQuery) {
    return null;
  }

  const count = schools.length;

  return (
    <HStack p="$2" justifyContent="center">
      <Text size="sm" color="$textLight600">
        {count === 0
          ? `Nenhum resultado para "${searchQuery}"`
          : count === 1
            ? '1 escola encontrada'
            : `${count} escolas encontradas`}
      </Text>
    </HStack>
  );
}
