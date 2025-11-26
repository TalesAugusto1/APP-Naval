import { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Box,
  VStack,
  Heading,
  Text,
  Pressable,
  HStack,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { goBack } from '@/navigation';
import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import { Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login, isLoading } = useAuthStore();
  const { showToast } = useUIStore();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#0a0a0a' : '#fafafa';
  const textColor = isDark ? '$textDark50' : '$textLight900';
  const textSecondaryColor = isDark ? '$textDark400' : '$textLight500';

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await login({ email: email.trim(), password });
      showToast('Login realizado com sucesso!', 'success');
      goBack();
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Erro ao fazer login', 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: bgColor }}
        contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top }}
        keyboardShouldPersistTaps="handled"
      >
        <Box flex={1} p="$6" justifyContent="center">
          <VStack space="2xl" maxWidth={400} width="$full" alignSelf="center">
            <VStack space="md">
              <Heading size="3xl" color={textColor}>
                Bem-vindo
              </Heading>
              <Text size="lg" color={textSecondaryColor}>
                Faça login para gerenciar escolas e turmas
              </Text>
            </VStack>

            <VStack space="xl">
              <AuthInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={() => validate()}
                placeholder="seu@email.com"
                error={errors.email}
                icon={Mail}
                keyboardType="email-address"
                autoFocus={true}
                accessibilityLabel="Email"
                accessibilityHint="Digite seu email para fazer login"
              />

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
                accessibilityHint="Digite sua senha"
              />

              <HStack justifyContent="space-between" alignItems="center">
                <Checkbox
                  value="remember"
                  isChecked={rememberMe}
                  onChange={setRememberMe}
                  accessible={true}
                  accessibilityLabel="Lembrar de mim"
                  accessibilityRole="checkbox"
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Lembrar de mim</CheckboxLabel>
                </Checkbox>

                <Pressable
                  onPress={() => router.push('/auth/forgot-password' as any)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Esqueceu sua senha?"
                >
                  <Text size="sm" color="$primary500" fontWeight="$semibold">
                    Esqueceu a senha?
                  </Text>
                </Pressable>
              </HStack>

              <AuthButton
                text="Entrar"
                onPress={handleLogin}
                isLoading={isLoading}
                isDisabled={!email || !password}
                accessibilityLabel="Entrar"
                accessibilityHint="Toque para fazer login com as credenciais informadas"
              />

              <HStack justifyContent="center" space="xs">
                <Text size="sm" color={textSecondaryColor}>
                  Não tem uma conta?
                </Text>
                <Pressable
                  onPress={() => router.push('/auth/register' as any)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Criar conta"
                >
                  <Text size="sm" color="$primary500" fontWeight="$bold">
                    Cadastre-se
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
