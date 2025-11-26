import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, VStack, Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box flex={1} bg="$backgroundLight50" justifyContent="center" alignItems="center">
          <VStack space="lg" p="$8" alignItems="center" maxWidth={400}>
            <Text fontSize={80}>⚠️</Text>
            <Heading size="xl" textAlign="center">
              Algo deu errado
            </Heading>
            <Text size="md" color="$textLight600" textAlign="center">
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </Text>
            {__DEV__ && this.state.error && (
              <Box
                bg="$error100"
                p="$3"
                borderRadius="$md"
                width="$full"
                borderWidth={1}
                borderColor="$error300"
              >
                <Text size="xs" fontFamily="$mono" color="$error700">
                  {this.state.error.message}
                </Text>
              </Box>
            )}
            <Button action="primary" size="lg" onPress={this.handleReset}>
              <ButtonText>Tentar Novamente</ButtonText>
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
