import { VStack, Heading, Box } from '@gluestack-ui/themed';
import { useClassStore } from '@/store';
import { useEffect } from 'react';
import { ShiftPieChart } from '@/components/charts/ShiftPieChart';
import { YearBarChart } from '@/components/charts/YearBarChart';

interface SchoolDashboardProps {
  schoolId: string;
}

export function SchoolDashboard({ schoolId }: SchoolDashboardProps) {
  const { classes, fetchClasses } = useClassStore();

  useEffect(() => {
    fetchClasses(schoolId);
  }, [schoolId, fetchClasses]);

  const schoolClasses = classes.filter((c) => c.schoolId === schoolId);

  return (
    <VStack space="xl" p="$6">
      <VStack space="md">
        <Heading size="lg" color="$gray900">
          Turmas por Turno
        </Heading>
        <Box
          bg="$white"
          borderRadius="$2xl"
          p="$4"
          borderWidth={1}
          borderColor="$gray100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <ShiftPieChart classes={schoolClasses} />
        </Box>
      </VStack>

      <VStack space="md">
        <Heading size="lg" color="$gray900">
          Turmas por Ano Letivo
        </Heading>
        <Box
          bg="$white"
          borderRadius="$2xl"
          p="$4"
          borderWidth={1}
          borderColor="$gray100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <YearBarChart classes={schoolClasses} />
        </Box>
      </VStack>
    </VStack>
  );
}
