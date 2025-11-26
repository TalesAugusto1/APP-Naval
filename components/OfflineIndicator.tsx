import { Box, HStack, Text } from '@gluestack-ui/themed';
import { WifiOff } from 'lucide-react-native';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export function OfflineIndicator() {
  const { isOffline } = useNetworkStatus();

  if (!isOffline) return null;

  return (
    <Box
      bg="$warning500"
      py="$2"
      px="$4"
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel="Modo offline: Você está sem conexão com a internet"
      accessibilityLiveRegion="polite"
    >
      <HStack space="sm" alignItems="center" justifyContent="center">
        <WifiOff size={16} color="white" />
        <Text color="$white" size="sm" fontWeight="$semibold">
          Modo Offline
        </Text>
      </HStack>
    </Box>
  );
}
