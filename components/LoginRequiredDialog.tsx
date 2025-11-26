import React from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Button,
  ButtonText,
  VStack,
  Icon,
  CloseIcon,
} from '@gluestack-ui/themed';
import { Lock } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useUIStore } from '@/store';
import { navigateToLogin, navigateToRegister } from '@/navigation';

export function LoginRequiredDialog() {
  const { loginRequiredModalOpen, hideLoginRequired } = useUIStore();
  const colors = useThemeColors();

  const handleLogin = () => {
    hideLoginRequired();
    navigateToLogin();
  };

  const handleRegister = () => {
    hideLoginRequired();
    navigateToRegister();
  };

  return (
    <Modal isOpen={loginRequiredModalOpen} onClose={hideLoginRequired}>
      <ModalBackdrop />
      <ModalContent maxWidth={400}>
        <ModalHeader>
          <Heading size="lg">Autenticação Necessária</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <VStack space="md" alignItems="center" py="$4">
            <Lock size={48} color="#2196F3" />
            <Text size="md" textAlign="center" color={colors.textSecondary}>
              Você precisa estar autenticado para realizar esta ação.
            </Text>
            <Text size="sm" textAlign="center" color={colors.textTertiary}>
              Faça login ou crie uma conta para gerenciar escolas e turmas.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <VStack space="sm" w="$full">
            <Button
              onPress={handleLogin}
              bg="$primary500"
              $hover-bg="$primary600"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Fazer login"
            >
              <ButtonText>Fazer Login</ButtonText>
            </Button>
            <Button
              onPress={handleRegister}
              variant="outline"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Criar conta"
            >
              <ButtonText>Criar Conta</ButtonText>
            </Button>
            <Button
              onPress={hideLoginRequired}
              variant="link"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Continuar sem autenticar"
            >
              <ButtonText>Continuar sem autenticar</ButtonText>
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
