import { ScrollView, useColorScheme } from 'react-native';
import { Box, VStack, Heading, Text, Divider, HStack, Pressable } from '@gluestack-ui/themed';
import { Sun, Moon, Monitor, Check } from 'lucide-react-native';
import { useSettingsStore } from '@/store';

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
  const systemTheme = useColorScheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <VStack flex={1} p="$6" space="xl">
        <Heading size="2xl">Configurações</Heading>

        <VStack space="md">
          <Heading size="lg">Aparência</Heading>
          <Text size="sm" color="$textLight600">
            Escolha o tema do aplicativo
          </Text>

          <VStack space="xs">
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <Pressable key={option.value} onPress={() => setTheme(option.value)}>
                  {({ pressed }) => (
                    <Box
                      bg="$white"
                      p="$4"
                      borderRadius="$2xl"
                      borderWidth={2}
                      borderColor={theme === option.value ? '$primary500' : '$gray100'}
                      style={{
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                      }}
                    >
                      <HStack space="md" alignItems="center">
                        <Box
                          width={48}
                          height={48}
                          bg={theme === option.value ? '$primary500' : '$gray50'}
                          borderRadius="$xl"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Icon size={24} color={theme === option.value ? '#ffffff' : '#6b7280'} />
                        </Box>
                        <VStack flex={1}>
                          <Text size="md" fontWeight="$bold" color="$gray900">
                            {option.label}
                          </Text>
                          <Text size="sm" color="$gray500">
                            {option.description}
                          </Text>
                        </VStack>
                        {theme === option.value && <Check size={24} color="#2196F3" />}
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
          <Heading size="lg">Sobre</Heading>
          <Box bg="$white" p="$4" borderRadius="$2xl" borderWidth={1} borderColor="$gray100">
            <VStack space="md">
              <HStack justifyContent="space-between">
                <Text size="md" color="$gray500">
                  Versão do app
                </Text>
                <Text size="md" fontWeight="$semibold" color="$gray900">
                  1.0.0
                </Text>
              </HStack>
              <Divider bg="$gray100" />
              <HStack justifyContent="space-between">
                <Text size="md" color="$gray500">
                  Desenvolvido com
                </Text>
                <Text size="md" fontWeight="$semibold" color="$gray900">
                  ❤️ React Native + Expo
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
