import { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Box,
  VStack,
  Button,
  ButtonText,
  Heading,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useClassStore, useSchoolStore, useUIStore } from '@/store';
import { useThemeColors } from '@/hooks/useThemeColors';
import { validateCreateClass } from '@/services';
import { goBack } from '@/navigation';
import { ClassFormFields } from './components/ClassFormFields';
import { Shift } from '@/types';

type FormMode = 'create' | 'edit';

export function ClassFormScreen() {
  const params = useLocalSearchParams<{ id?: string; schoolId?: string }>();
  const mode: FormMode = params.id ? 'edit' : 'create';

  const { selectedClass, fetchClassById, createClass, updateClass, deleteClass, isLoading } =
    useClassStore();
  const { schools, fetchSchools } = useSchoolStore();
  const { showToast } = useUIStore();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  const currentYear = new Date().getFullYear();
  const [name, setName] = useState('');
  const [shift, setShift] = useState<Shift>(Shift.MORNING);
  const [schoolYear, setSchoolYear] = useState(currentYear.toString());
  const [schoolId, setSchoolId] = useState(params.schoolId || '');
  const [errors, setErrors] = useState<{
    name?: string;
    shift?: string;
    schoolYear?: string;
    schoolId?: string;
  }>({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchSchools();
    if (mode === 'edit' && params.id) {
      fetchClassById(params.id);
    }
  }, [mode, params.id, fetchSchools, fetchClassById]);

  useEffect(() => {
    if (mode === 'edit' && selectedClass) {
      setName(selectedClass.name);
      setShift(selectedClass.shift);
      setSchoolYear(selectedClass.schoolYear.toString());
      setSchoolId(selectedClass.schoolId);
    }
  }, [selectedClass, mode]);

  const validateField = (field: 'name' | 'schoolYear') => {
    const validationErrors = validateCreateClass({
      name,
      shift,
      schoolYear: parseInt(schoolYear) || 0,
      schoolId,
    });
    const fieldError = validationErrors.find((e) => e.field === field);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldError?.message,
    }));
  };

  const handleSubmit = async () => {
    const parsedYear = parseInt(schoolYear);
    if (isNaN(parsedYear)) {
      setErrors({ ...errors, schoolYear: 'Ano letivo deve ser um número válido' });
      return;
    }

    const validationErrors = validateCreateClass({
      name,
      shift,
      schoolYear: parsedYear,
      schoolId,
    });

    if (validationErrors.length > 0) {
      const errorMap: any = {};
      validationErrors.forEach((e) => {
        errorMap[e.field] = e.message;
      });
      setErrors(errorMap);
      return;
    }

    try {
      if (mode === 'create') {
        await createClass({ name, shift, schoolYear: parsedYear, schoolId });
        showToast('Turma criada com sucesso!', 'success');
      } else if (params.id) {
        await updateClass({ id: params.id, name, shift, schoolYear: parsedYear });
        showToast('Turma atualizada com sucesso!', 'success');
      }
      goBack();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Erro ao salvar turma', 'error');
    }
  };

  const handleDelete = async () => {
    if (!params.id) return;

    try {
      await deleteClass(params.id);
      showToast('Turma excluída com sucesso!', 'success');
      setShowDeleteDialog(false);
      goBack();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Erro ao excluir turma', 'error');
    }
  };

  const isValid =
    name.trim().length >= 2 && schoolYear.trim().length > 0 && schoolId.trim().length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
        <Box flex={1} p="$6" bg={colors.bgColor}>
          <VStack space="xl">
            <ClassFormFields
              name={name}
              shift={shift}
              schoolYear={schoolYear}
              schoolId={schoolId}
              schools={schools}
              errors={errors}
              onChangeName={setName}
              onChangeShift={setShift}
              onChangeSchoolYear={setSchoolYear}
              onChangeSchoolId={setSchoolId}
              onBlurName={() => validateField('name')}
              onBlurSchoolYear={() => validateField('schoolYear')}
              showSchoolSelector={true}
            />

            <Button
              action="primary"
              size="lg"
              onPress={handleSubmit}
              isDisabled={!isValid || isLoading}
              bg="#2563eb"
              borderRadius="$xl"
              h={48}
            >
              <ButtonText>{isLoading ? 'Salvando...' : 'Salvar Turma'}</ButtonText>
            </Button>

            {mode === 'edit' && (
              <Button
                action="negative"
                variant="outline"
                onPress={() => setShowDeleteDialog(true)}
                isDisabled={isLoading}
              >
                <ButtonText>Excluir Turma</ButtonText>
              </Button>
            )}
          </VStack>
        </Box>
      </ScrollView>

      <AlertDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="md">Confirmar Exclusão</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Tem certeza que deseja excluir esta turma? Esta ação não pode ser desfeita.</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="outline" onPress={() => setShowDeleteDialog(false)}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button action="negative" onPress={handleDelete} ml="$3">
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </KeyboardAvoidingView>
  );
}
