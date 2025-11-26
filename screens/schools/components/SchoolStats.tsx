import { HStack, Box, Heading, Text } from '@gluestack-ui/themed';

interface SchoolStatsProps {
  classCount: number;
}

export function SchoolStats({ classCount }: SchoolStatsProps) {
  return (
    <HStack space="md" p="$6">
      <Box
        flex={1}
        bg="$white"
        p="$6"
        borderRadius="$lg"
        alignItems="center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Text fontSize={40}>🎓</Text>
        <Heading size="2xl" mt="$2">
          {classCount}
        </Heading>
        <Text size="sm" color="$textLight600">
          {classCount === 1 ? 'Turma' : 'Turmas'}
        </Text>
      </Box>
    </HStack>
  );
}
