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
  Input,
  InputField,
  HStack,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useClassStore, useSchoolStore, useUIStore } from '@/store';
import { useThemeColors } from '@/hooks/useThemeColors';
import { validateCreateClass } from '@/services';
import { goBack } from '@/navigation';
import { ClassFormFields } from './components/ClassFormFields';
import { Shift } from '@/types';
import { AlertTriangle } from 'lucide-react-native';

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
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

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

    if (deleteConfirmationText.trim() !== name.trim()) {
      showToast('O nome digitado não corresponde ao nome da turma', 'error');
      return;
    }

    try {
      await deleteClass(params.id);
      showToast('Turma excluída com sucesso!', 'success');
      setShowDeleteDialog(false);
      setDeleteConfirmationText('');
      goBack();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Erro ao excluir turma', 'error');
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setDeleteConfirmationText('');
  };

  const isValid =
    name.trim().length >= 2 && schoolYear.trim().length > 0 && schoolId.trim().length > 0;

  const isSchoolPreselected = mode === 'create' && params.schoolId;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
              showSchoolSelector={!isSchoolPreselected}
            />

            <Button
              action="primary"
              size="lg"
              onPress={handleSubmit}
              isDisabled={!isValid || isLoading}
              bg="#2563eb"
              borderRadius="$2xl"
              h={56}
              shadowColor="#2563eb"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
              elevation={4}
            >
              <ButtonText fontSize="$md" fontWeight="$semibold">
                {isLoading ? 'Salvando...' : 'Salvar Turma'}
              </ButtonText>
            </Button>

            {mode === 'edit' && (
              <Button
                action="negative"
                variant="outline"
                onPress={() => setShowDeleteDialog(true)}
                isDisabled={isLoading}
                borderRadius="$2xl"
                h={56}
                borderWidth={2}
                borderColor="$error500"
              >
                <HStack space="sm" alignItems="center">
                  <AlertTriangle size={20} color="#ef4444" />
                  <ButtonText fontSize="$md" fontWeight="$semibold">
                    Excluir Turma
                  </ButtonText>
                </HStack>
              </Button>
            )}
          </VStack>
        </Box>
      </ScrollView>

      <AlertDialog isOpen={showDeleteDialog} onClose={handleCloseDeleteDialog}>
        <AlertDialogBackdrop />
        <AlertDialogContent maxWidth="$full" mx="$4">
          <AlertDialogHeader>
            <HStack space="sm" alignItems="center">
              <Box bg="$error100" p="$2" borderRadius="$full">
                <AlertTriangle size={24} color="#ef4444" />
              </Box>
              <Heading size="lg" color="$error600">
                Confirmar Exclusão
              </Heading>
            </HStack>
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack space="md">
              <Text size="md" color={colors.textColor}>
                Esta ação não pode ser desfeita. A turma será permanentemente excluída.
              </Text>
              <Box
                bg={colors.isDark ? '$error900' : '$error50'}
                p="$3"
                borderRadius="$lg"
                borderWidth={1}
                borderColor="$error300"
              >
                <Text size="sm" fontWeight="$medium" color="$error700" mb="$1">
                  Para confirmar, digite o nome da turma:
                </Text>
                <Text size="md" fontWeight="$bold" color={colors.textColor}>
                  {name}
                </Text>
              </Box>
              <Input
                borderRadius="$xl"
                borderWidth={2}
                borderColor={deleteConfirmationText === name ? '$success500' : '$gray300'}
                bg="$backgroundLight50"
              >
                <InputField
                  placeholder="Digite o nome da turma aqui"
                  value={deleteConfirmationText}
                  onChangeText={setDeleteConfirmationText}
                  autoFocus={true}
                  accessible={true}
                  accessibilityLabel="Campo de confirmação de exclusão"
                  accessibilityHint="Digite o nome da turma para confirmar a exclusão"
                />
              </Input>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="outline" onPress={handleCloseDeleteDialog} flex={1} borderRadius="$xl">
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={handleDelete}
              ml="$3"
              flex={1}
              borderRadius="$xl"
              isDisabled={deleteConfirmationText.trim() !== name.trim()}
            >
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </KeyboardAvoidingView>
  );
}
