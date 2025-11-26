import { Box, VStack, HStack, Text } from '@gluestack-ui/themed';
import { BookOpen } from 'lucide-react-native';

interface SchoolStatsProps {
  classCount: number;
}

export function SchoolStats({ classCount }: SchoolStatsProps) {
  return (
    <Box bg="#eff6ff" borderRadius="$xl" p="$4" mb="$4">
      <HStack space="sm" alignItems="center" mb="$1">
        <BookOpen size={20} color="#2563eb" />
        <Text color="#1e3a8a" fontWeight="$medium">
          Total de Turmas
        </Text>
      </HStack>
      <Text fontSize="$2xl" fontWeight="$bold" color="#2563eb">
        {classCount}
      </Text>
    </Box>
  );
}
