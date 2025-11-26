import { Stack } from 'expo-router';
import { SchoolFormScreen } from '@/screens/schools/components/SchoolFormScreen';

export default function EditSchoolScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'Editar Escola',
        }}
      />
      <SchoolFormScreen />
    </>
  );
}
