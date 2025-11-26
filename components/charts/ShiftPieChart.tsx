import { VStack, Text, HStack, Box } from '@gluestack-ui/themed';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Class, Shift } from '@/types';

interface ShiftPieChartProps {
  classes: Class[];
}

const SHIFT_LABELS = {
  [Shift.MORNING]: 'Manhã',
  [Shift.AFTERNOON]: 'Tarde',
  [Shift.EVENING]: 'Noite',
};

const SHIFT_COLORS = {
  [Shift.MORNING]: '#fbbf24',
  [Shift.AFTERNOON]: '#fb923c',
  [Shift.EVENING]: '#818cf8',
};

export function ShiftPieChart({ classes }: ShiftPieChartProps) {
  const colors = useThemeColors();
  const shiftCounts = classes.reduce(
    (acc, classItem) => {
      acc[classItem.shift] = (acc[classItem.shift] || 0) + 1;
      return acc;
    },
    {} as Record<Shift, number>
  );

  const chartData = Object.entries(shiftCounts).map(([shift, count]) => ({
    name: SHIFT_LABELS[shift as Shift],
    population: count,
    color: SHIFT_COLORS[shift as Shift],
    legendFontColor: '#6b7280',
    legendFontSize: 14,
  }));

  if (classes.length === 0) {
    return (
      <VStack p="$6" alignItems="center">
        <Text color={colors.textSecondary}>Nenhuma turma cadastrada</Text>
      </VStack>
    );
  }

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.min(screenWidth - 48, 350);

  return (
    <VStack space="md" alignItems="center">
      <PieChart
        data={chartData}
        width={chartWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <VStack space="xs" width="$full">
        {chartData.map((item) => (
          <HStack key={item.name} justifyContent="space-between" alignItems="center">
            <HStack space="sm" alignItems="center">
              <Box width={16} height={16} bg={item.color} borderRadius="$sm" />
              <Text size="sm" color={colors.textSecondary}>
                {item.name}
              </Text>
            </HStack>
            <Text size="sm" fontWeight="$bold" color={colors.textColor}>
              {item.population} {item.population === 1 ? 'turma' : 'turmas'}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
