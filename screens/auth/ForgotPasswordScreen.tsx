import { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Box, VStack, Heading, Text, Pressable, HStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const { forgotPassword, isLoading } = useAuthStore();
  const { showToast } = useUIStore();
  const insets = useSafeAreaInsets();

  const validate = () => {
    if (!email.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await forgotPassword({ email: email.trim() });
      setEmailSent(true);
      showToast('Email de recuperação enviado com sucesso!', 'success');
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Erro ao enviar email', 'error');
    }
  };

  if (emailSent) {
    return (
      <Box
        flex={1}
        p="$6"
        justifyContent="center"
        bg="$backgroundLight50"
        style={{ paddingTop: insets.top }}
      >
        <VStack space="2xl" maxWidth={400} width="$full" alignSelf="center">
          <VStack space="md" alignItems="center">
            <Box
              bg="$success50"
              borderRadius="$full"
              p="$4"
              mb="$2"
              style={{
                width: 80,
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={40} color="#16a34a" />
            </Box>
            <Heading size="2xl" color="$gray900" textAlign="center">
              Email Enviado!
            </Heading>
            <Text size="md" color="$gray600" textAlign="center">
              Enviamos instruções para recuperação de senha para {email}
            </Text>
          </VStack>

          <VStack space="md">
            <AuthButton
              text="Voltar ao Login"
              onPress={() => router.back()}
              accessibilityLabel="Voltar ao login"
              accessibilityHint="Toque para retornar à tela de login"
            />
            <Pressable
              onPress={() => setEmailSent(false)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Reenviar email"
            >
              <Text size="sm" color="$primary500" textAlign="center" fontWeight="$semibold">
                Não recebeu? Reenviar email
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      </Box>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: '#fafafa' }}
        contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top }}
        keyboardShouldPersistTaps="handled"
      >
        <Box flex={1} p="$6" justifyContent="center">
          <VStack space="2xl" maxWidth={400} width="$full" alignSelf="center">
            <VStack space="md">
              <Pressable
                onPress={() => router.back()}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
              >
                <HStack space="xs" alignItems="center" mb="$2">
                  <ArrowLeft size={20} color="#6b7280" />
                  <Text size="sm" color="$gray600">
                    Voltar
                  </Text>
                </HStack>
              </Pressable>
              <Heading size="3xl" color="$gray900">
                Esqueceu a Senha?
              </Heading>
              <Text size="lg" color="$gray600">
                Digite seu email para receber instruções de recuperação
              </Text>
            </VStack>

            <VStack space="xl">
              <AuthInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={() => validate()}
                placeholder="seu@email.com"
                error={error}
                icon={Mail}
                keyboardType="email-address"
                autoFocus={true}
                accessibilityLabel="Email"
                accessibilityHint="Digite seu email cadastrado para recuperar a senha"
              />

              <AuthButton
                text="Enviar Email"
                onPress={handleSubmit}
                isLoading={isLoading}
                isDisabled={!email}
                accessibilityLabel="Enviar email de recuperação"
                accessibilityHint="Toque para receber instruções de recuperação no seu email"
              />
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
