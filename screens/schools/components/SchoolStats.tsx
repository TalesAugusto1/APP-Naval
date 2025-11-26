import { HStack, Box, Heading, Text } from '@gluestack-ui/themed';
import { GraduationCap } from 'lucide-react-native';

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
        borderRadius="$2xl"
        borderWidth={1}
        borderColor="$gray100"
        alignItems="center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Box
          width={64}
          height={64}
          bg="$green50"
          borderRadius="$full"
          justifyContent="center"
          alignItems="center"
        >
          <GraduationCap size={32} color="#16a34a" />
        </Box>
        <Heading size="2xl" mt="$3" color="$gray900">
          {classCount}
        </Heading>
        <Text size="sm" color="$gray500">
          {classCount === 1 ? 'Turma' : 'Turmas'}
        </Text>
      </Box>
    </HStack>
  );
}
