import { VStack, Heading, Box } from '@gluestack-ui/themed';
import { useClassStore } from '@/store';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useEffect } from 'react';
import { ShiftPieChart } from '@/components/charts/ShiftPieChart';
import { YearBarChart } from '@/components/charts/YearBarChart';

interface SchoolDashboardProps {
  schoolId: string;
}

export function SchoolDashboard({ schoolId }: SchoolDashboardProps) {
  const { classes, fetchClasses } = useClassStore();
  const colors = useThemeColors();

  useEffect(() => {
    fetchClasses(schoolId);
  }, [schoolId, fetchClasses]);

  const schoolClasses = classes.filter((c) => c.schoolId === schoolId);

  return (
    <VStack space="xl" p="$6">
      <VStack space="md">
        <Heading size="lg" color={colors.textColor}>
          Turmas por Turno
        </Heading>
        <Box
          bg={colors.cardBg}
          borderRadius="$2xl"
          p="$4"
          borderWidth={1}
          borderColor={colors.borderColor}
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
        <Heading size="lg" color={colors.textColor}>
          Turmas por Ano Letivo
        </Heading>
        <Box
          bg={colors.cardBg}
          borderRadius="$2xl"
          p="$4"
          borderWidth={1}
          borderColor={colors.borderColor}
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
