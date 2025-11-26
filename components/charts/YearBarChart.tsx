import { VStack, Text } from '@gluestack-ui/themed';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Class } from '@/types';

interface YearBarChartProps {
  classes: Class[];
}

export function YearBarChart({ classes }: YearBarChartProps) {
  const yearCounts = classes.reduce(
    (acc, classItem) => {
      const year = classItem.schoolYear.toString();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const years = Object.keys(yearCounts).sort();
  const counts = years.map((year) => yearCounts[year]);

  if (classes.length === 0) {
    return (
      <VStack p="$6" alignItems="center">
        <Text color="$gray500">Nenhuma turma cadastrada</Text>
      </VStack>
    );
  }

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.min(screenWidth - 48, 350);

  return (
    <VStack space="md" alignItems="center">
      <BarChart
        data={{
          labels: years,
          datasets: [
            {
              data: counts,
            },
          ],
        }}
        width={chartWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.5,
        }}
        style={{
          borderRadius: 16,
        }}
        fromZero
        showBarTops={false}
        withInnerLines={false}
      />
    </VStack>
  );
}
