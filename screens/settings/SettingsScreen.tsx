import { ScrollView, useColorScheme as useSystemColorScheme } from 'react-native';
import {
  Box,
  VStack,
  Heading,
  Text,
  Divider,
  HStack,
  Pressable,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { Sun, Moon, Monitor, Check, User, LogOut, LogIn } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettingsStore } from '@/store';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

type ThemeMode = 'light' | 'dark' | 'system';

const THEME_OPTIONS: {
  value: ThemeMode;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  { value: 'light', label: 'Claro', description: 'Sempre usar tema claro', icon: Sun },
  { value: 'dark', label: 'Escuro', description: 'Sempre usar tema escuro', icon: Moon },
  {
    value: 'system',
    label: 'Automático',
    description: 'Seguir configuração do sistema',
    icon: Monitor,
  },
];

export function SettingsScreen() {
  const { theme, setTheme } = useSettingsStore();
  const { user, isAuthenticated, logout, isLoading } = useAuthStore();
  const { showToast } = useUIStore();
  const systemTheme = useSystemColorScheme();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#0a0a0a' : '#fafafa';
  const cardBgColor = isDark ? '$backgroundDark900' : '$white';
  const borderColor = isDark ? '$borderDark800' : '$borderLight100';
  const textColor = isDark ? '$textDark50' : '$textLight900';
  const textSecondaryColor = isDark ? '$textDark400' : '$textLight500';

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logout realizado com sucesso', 'success');
    } catch (error) {
      showToast('Erro ao fazer logout', 'error');
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bgColor }}
      contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
    >
      <VStack flex={1} px="$6" pt="$6" space="xl" style={{ paddingTop: insets.top + 24 }}>
        <Heading size="2xl" color={textColor}>
          Configurações
        </Heading>

        <VStack space="md">
          <Heading size="lg" color={textColor}>
            Conta
          </Heading>
          {isAuthenticated && user ? (
            <Box
              bg={cardBgColor}
              p="$4"
              borderRadius="$2xl"
              borderWidth={1}
              borderColor={borderColor}
            >
              <VStack space="lg">
                <HStack space="md" alignItems="center">
                  <Box
                    width={56}
                    height={56}
                    bg="$primary50"
                    borderRadius="$full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <User size={28} color="#2196F3" />
                  </Box>
                  <VStack flex={1}>
                    <Text size="lg" fontWeight="$bold" color={textColor}>
                      {user.name}
                    </Text>
                    <Text size="sm" color={textSecondaryColor}>
                      {user.email}
                    </Text>
                  </VStack>
                </HStack>
                <Divider bg={borderColor} />
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={handleLogout}
                  isDisabled={isLoading}
                  accessible={true}
                  accessibilityLabel="Sair da conta"
                  accessibilityRole="button"
                >
                  <HStack space="sm" alignItems="center">
                    <LogOut size={18} color="#ef4444" />
                    <ButtonText color="$error500">Sair</ButtonText>
                  </HStack>
                </Button>
              </VStack>
            </Box>
          ) : (
            <Box
              bg={cardBgColor}
              p="$4"
              borderRadius="$2xl"
              borderWidth={1}
              borderColor={borderColor}
            >
              <VStack space="md">
                <Text size="sm" color={textSecondaryColor}>
                  Faça login para gerenciar escolas e turmas
                </Text>
                <Button
                  action="primary"
                  onPress={() => router.push('/auth/login' as any)}
                  accessible={true}
                  accessibilityLabel="Fazer login"
                  accessibilityRole="button"
                >
                  <HStack space="sm" alignItems="center">
                    <LogIn size={18} color="white" />
                    <ButtonText>Entrar</ButtonText>
                  </HStack>
                </Button>
              </VStack>
            </Box>
          )}
        </VStack>

        <Divider />

        <VStack space="md">
          <Heading size="lg" color={textColor}>
            Aparência
          </Heading>
          <Text size="sm" color={textSecondaryColor}>
            Escolha o tema do aplicativo
          </Text>

          <VStack space="xs">
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.value;
              return (
                <Pressable key={option.value} onPress={() => setTheme(option.value)}>
                  {({ pressed }) => (
                    <Box
                      bg={cardBgColor}
                      p="$4"
                      borderRadius="$2xl"
                      borderWidth={2}
                      borderColor={isSelected ? '$primary500' : borderColor}
                      style={{
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                      }}
                    >
                      <HStack space="md" alignItems="center">
                        <Box
                          width={48}
                          height={48}
                          bg={
                            isSelected
                              ? '$primary500'
                              : isDark
                                ? '$backgroundDark800'
                                : '$backgroundLight100'
                          }
                          borderRadius="$xl"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Icon size={24} color={isSelected ? '#ffffff' : '#6b7280'} />
                        </Box>
                        <VStack flex={1}>
                          <Text size="md" fontWeight="$bold" color={textColor}>
                            {option.label}
                          </Text>
                          <Text size="sm" color={textSecondaryColor}>
                            {option.description}
                          </Text>
                        </VStack>
                        {isSelected && <Check size={24} color="#2196F3" />}
                      </HStack>
                    </Box>
                  )}
                </Pressable>
              );
            })}
          </VStack>

          {theme === 'system' && (
            <Box bg="$info100" p="$3" borderRadius="$md" borderWidth={1} borderColor="$info300">
              <Text size="sm" color="$info700">
                Tema atual do sistema: {systemTheme === 'dark' ? 'Escuro' : 'Claro'}
              </Text>
            </Box>
          )}
        </VStack>

        <Divider />

        <VStack space="md">
          <Heading size="lg" color={textColor}>
            Sobre
          </Heading>
          <Box
            bg={cardBgColor}
            p="$4"
            borderRadius="$2xl"
            borderWidth={1}
            borderColor={borderColor}
          >
            <VStack space="md">
              <HStack justifyContent="space-between">
                <Text size="md" color={textSecondaryColor}>
                  Versão do app
                </Text>
                <Text size="md" fontWeight="$semibold" color={textColor}>
                  1.0.0
                </Text>
              </HStack>
              <Divider bg={borderColor} />
              <HStack justifyContent="space-between">
                <Text size="md" color={textSecondaryColor}>
                  Desenvolvido com
                </Text>
                <Text size="md" fontWeight="$semibold" color={textColor}>
                  React Native + Expo
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
