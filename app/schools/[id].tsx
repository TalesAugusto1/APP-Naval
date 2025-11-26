import { Stack } from 'expo-router';
import { SchoolDetailScreen } from '@/screens/schools/SchoolDetailScreen';

export default function SchoolDetail() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Detalhes da Escola',
        }}
      />
      <SchoolDetailScreen />
    </>
  );
}
