import { Stack } from 'expo-router';
import { ClassFormScreen } from '@/screens/classes/ClassFormScreen';

export default function EditClassScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'Editar Turma',
        }}
      />
      <ClassFormScreen />
    </>
  );
}
