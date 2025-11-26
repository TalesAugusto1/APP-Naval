import { ScrollView, useColorScheme } from 'react-native';
import { Box, VStack, Heading, Text, Divider, HStack, Pressable } from '@gluestack-ui/themed';

import { useSettingsStore } from '@/store';

type ThemeMode = 'light' | 'dark' | 'system';

const THEME_OPTIONS: { value: ThemeMode; label: string; description: string }[] = [
  { value: 'light', label: 'Claro', description: 'Sempre usar tema claro' },
  { value: 'dark', label: 'Escuro', description: 'Sempre usar tema escuro' },
  { value: 'system', label: 'Automático', description: 'Seguir configuração do sistema' },
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
            {THEME_OPTIONS.map((option) => (
              <Pressable key={option.value} onPress={() => setTheme(option.value)}>
                {({ pressed }) => (
                  <Box
                    bg="$white"
                    p="$4"
                    borderRadius="$lg"
                    borderWidth={2}
                    borderColor={theme === option.value ? '$primary500' : '$borderLight200'}
                    style={{
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    }}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack flex={1}>
                        <Text size="md" fontWeight="$semibold">
                          {option.label}
                        </Text>
                        <Text size="sm" color="$textLight600">
                          {option.description}
                        </Text>
                      </VStack>
                      {theme === option.value && (
                        <Text fontSize={24} color="$primary500">
                          ✓
                        </Text>
                      )}
                    </HStack>
                  </Box>
                )}
              </Pressable>
            ))}
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
          <VStack space="sm">
            <HStack justifyContent="space-between">
              <Text size="md" color="$textLight600">
                Versão do app
              </Text>
              <Text size="md" fontWeight="$semibold">
                1.0.0
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text size="md" color="$textLight600">
                Desenvolvido com
              </Text>
              <Text size="md" fontWeight="$semibold">
                ❤️ React Native + Expo
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
