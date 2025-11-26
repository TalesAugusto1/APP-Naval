import { VStack, Heading, Text, Button, ButtonText, HStack } from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';

type ErrorType = 'network' | '404' | '500' | 'generic';

interface ErrorDisplayProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  showRetry?: boolean;
  showBack?: boolean;
}

const ERROR_CONFIG = {
  network: {
    icon: '📡',
    title: 'Sem conexão',
    message: 'Verifique sua conexão com a internet e tente novamente',
  },
  '404': {
    icon: '🔍',
    title: 'Não encontrado',
    message: 'O recurso que você está procurando não foi encontrado',
  },
  '500': {
    icon: '⚠️',
    title: 'Erro no servidor',
    message: 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde',
  },
  generic: {
    icon: '😞',
    title: 'Algo deu errado',
    message: 'Ocorreu um erro inesperado. Por favor, tente novamente',
  },
};

export function ErrorDisplay({
  type = 'generic',
  title,
  message,
  onRetry,
  onBack,
  showRetry = true,
  showBack = false,
}: ErrorDisplayProps) {
  const colors = useThemeColors();
  const config = ERROR_CONFIG[type];
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" p="$8" space="lg">
      <Text fontSize={80}>{config.icon}</Text>
      <VStack space="sm" alignItems="center">
        <Heading size="lg" textAlign="center" color={colors.textColor}>
          {displayTitle}
        </Heading>
        <Text size="md" color={colors.textTertiary} textAlign="center">
          {displayMessage}
        </Text>
      </VStack>
      <HStack space="md">
        {showBack && onBack && (
          <Button variant="outline" size="lg" onPress={onBack}>
            <ButtonText>Voltar</ButtonText>
          </Button>
        )}
        {showRetry && onRetry && (
          <Button action="primary" size="lg" onPress={onRetry}>
            <ButtonText>Tentar Novamente</ButtonText>
          </Button>
        )}
      </HStack>
    </VStack>
  );
}
