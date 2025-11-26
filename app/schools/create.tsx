import { Stack } from 'expo-router';
import { SchoolFormScreen } from '@/screens/schools/components/SchoolFormScreen';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function CreateSchoolScreen() {
  const colors = useThemeColors();

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'Nova Escola',
          headerStyle: {
            backgroundColor: colors.bgColor,
          },
          headerTintColor: colors.textColor,
          headerShadowVisible: false,
        }}
      />
      <SchoolFormScreen />
    </>
  );
}
