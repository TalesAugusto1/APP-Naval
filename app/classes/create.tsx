import { Stack } from 'expo-router';
import { ClassFormScreen } from '@/screens/classes/ClassFormScreen';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function CreateClassScreen() {
  const colors = useThemeColors();

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'Nova Turma',
          headerStyle: {
            backgroundColor: colors.bgColor,
          },
          headerTintColor: colors.textColor,
          headerShadowVisible: false,
        }}
      />
      <ClassFormScreen />
    </>
  );
}
