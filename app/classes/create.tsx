import { Stack } from 'expo-router';
import { ClassFormScreen } from '@/screens/classes/ClassFormScreen';

export default function CreateClassScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'Nova Turma',
        }}
      />
      <ClassFormScreen />
    </>
  );
}
