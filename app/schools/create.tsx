import { Stack } from 'expo-router';
import { SchoolFormScreen } from '@/screens/schools/components/SchoolFormScreen';

export default function CreateSchoolScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'Nova Escola',
        }}
      />
      <SchoolFormScreen />
    </>
  );
}
