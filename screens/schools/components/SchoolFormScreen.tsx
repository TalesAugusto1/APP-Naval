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
import { useSchoolStore, useUIStore } from '@/store';
import { validateCreateSchool } from '@/services';
import { goBack } from '@/navigation';
import { SchoolFormFields } from './SchoolFormFields';

type FormMode = 'create' | 'edit';

export function SchoolFormScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const mode: FormMode = params.id ? 'edit' : 'create';

  const { selectedSchool, fetchSchoolById, createSchool, updateSchool, deleteSchool, isLoading } =
    useSchoolStore();
  const { showToast } = useUIStore();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && params.id) {
      fetchSchoolById(params.id);
    }
  }, [mode, params.id, fetchSchoolById]);

  useEffect(() => {
    if (mode === 'edit' && selectedSchool) {
      setName(selectedSchool.name);
      setAddress(selectedSchool.address);
    }
  }, [selectedSchool, mode]);

  const validateField = (field: 'name' | 'address') => {
    const validationErrors = validateCreateSchool({ name, address });
    const fieldError = validationErrors.find((e) => e.field === field);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldError?.message,
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateCreateSchool({ name, address });
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
        await createSchool({ name, address });
        showToast('Escola criada com sucesso!', 'success');
      } else if (params.id) {
        await updateSchool({ id: params.id, name, address });
        showToast('Escola atualizada com sucesso!', 'success');
      }
      goBack();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Erro ao salvar escola', 'error');
    }
  };

  const handleDelete = async () => {
    if (!params.id) return;

    try {
      await deleteSchool(params.id);
      showToast('Escola excluída com sucesso!', 'success');
      setShowDeleteDialog(false);
      goBack();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Erro ao excluir escola', 'error');
    }
  };

  const isValid = name.trim().length >= 3 && address.trim().length >= 5;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
        <Box flex={1} p="$6" bg="$backgroundLight50">
          <VStack space="xl">
            <Heading size="xl">{mode === 'create' ? 'Nova Escola' : 'Editar Escola'}</Heading>

            <SchoolFormFields
              name={name}
              address={address}
              errors={errors}
              onChangeName={setName}
              onChangeAddress={setAddress}
              onBlurName={() => validateField('name')}
              onBlurAddress={() => validateField('address')}
            />

            <Button
              action="primary"
              size="lg"
              onPress={handleSubmit}
              isDisabled={!isValid || isLoading}
            >
              <ButtonText>{isLoading ? 'Salvando...' : 'Salvar'}</ButtonText>
            </Button>

            {mode === 'edit' && (
              <Button
                action="negative"
                variant="outline"
                onPress={() => setShowDeleteDialog(true)}
                isDisabled={isLoading}
              >
                <ButtonText>Excluir Escola</ButtonText>
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
            <Text>
              Tem certeza que deseja excluir esta escola? Esta ação não pode ser desfeita e todas as
              turmas associadas também serão excluídas.
            </Text>
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
