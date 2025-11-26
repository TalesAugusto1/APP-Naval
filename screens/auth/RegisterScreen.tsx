import { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Box,
  VStack,
  Heading,
  Text,
  Pressable,
  HStack,
  Progress,
  ProgressFilledTrack,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { goBack } from '@/navigation';
import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import { User, Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const strengths: PasswordStrength[] = [
    { score: 0, label: 'Muito fraca', color: '$error500' },
    { score: 1, label: 'Fraca', color: '$warning500' },
    { score: 2, label: 'Média', color: '$warning400' },
    { score: 3, label: 'Boa', color: '$success500' },
    { score: 4, label: 'Excelente', color: '$success600' },
  ];

  return strengths[score];
}

export function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { register, isLoading } = useAuthStore();
  const { showToast } = useUIStore();
  const insets = useSafeAreaInsets();

  const passwordStrength = password ? calculatePasswordStrength(password) : null;

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 8) {
      newErrors.password = 'Senha deve ter no mínimo 8 caracteres';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await register({ name: name.trim(), email: email.trim(), password });
      showToast('Conta criada com sucesso!', 'success');
      goBack();
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Erro ao criar conta', 'error');
    }
  };

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
              <Heading size="3xl" color="$gray900">
                Criar Conta
              </Heading>
              <Text size="lg" color="$gray600">
                Preencha os dados para se cadastrar
              </Text>
            </VStack>

            <VStack space="xl">
              <AuthInput
                label="Nome Completo"
                value={name}
                onChangeText={setName}
                onBlur={() => validate()}
                placeholder="Seu nome"
                error={errors.name}
                icon={User}
                autoFocus={true}
                accessibilityLabel="Nome completo"
                accessibilityHint="Digite seu nome completo"
              />

              <AuthInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={() => validate()}
                placeholder="seu@email.com"
                error={errors.email}
                icon={Mail}
                keyboardType="email-address"
                accessibilityLabel="Email"
                accessibilityHint="Digite seu email"
              />

              <VStack space="sm">
                <AuthInput
                  label="Senha"
                  value={password}
                  onChangeText={setPassword}
                  onBlur={() => validate()}
                  placeholder="••••••••"
                  error={errors.password}
                  icon={Lock}
                  isPassword={true}
                  accessibilityLabel="Senha"
                  accessibilityHint="Digite uma senha com no mínimo 8 caracteres"
                />
                {password && passwordStrength && (
                  <VStack space="xs">
                    <Progress value={(passwordStrength.score / 4) * 100} size="sm">
                      <ProgressFilledTrack bg={passwordStrength.color} />
                    </Progress>
                    <Text size="sm" color={passwordStrength.color}>
                      Força da senha: {passwordStrength.label}
                    </Text>
                  </VStack>
                )}
              </VStack>

              <AuthInput
                label="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={() => validate()}
                placeholder="••••••••"
                error={errors.confirmPassword}
                icon={Lock}
                isPassword={true}
                accessibilityLabel="Confirmar senha"
                accessibilityHint="Digite novamente sua senha para confirmar"
              />

              <AuthButton
                text="Cadastrar"
                onPress={handleRegister}
                isLoading={isLoading}
                isDisabled={!name || !email || !password || !confirmPassword}
                accessibilityLabel="Cadastrar"
                accessibilityHint="Toque para criar sua conta"
              />

              <HStack justifyContent="center" space="xs">
                <Text size="sm" color="$gray600">
                  Já tem uma conta?
                </Text>
                <Pressable
                  onPress={() => router.back()}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Fazer login"
                >
                  <Text size="sm" color="$primary500" fontWeight="$bold">
                    Faça login
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
