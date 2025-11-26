import { useEffect } from 'react';
import { Alert, AlertIcon, AlertText, Pressable } from '@gluestack-ui/themed';
import Animated, { FadeInDown, FadeOutUp, Layout } from 'react-native-reanimated';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onDismiss: (id: string) => void;
}

export function Toast({ id, type, message, duration = 3000, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOutUp.duration(200)}
      layout={Layout}
    >
      <Pressable onPress={() => onDismiss(id)}>
        <Alert
          action={type}
          variant="solid"
          mb="$2"
          mx="$4"
          borderRadius="$lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <AlertIcon mr="$2" />
          <AlertText flex={1}>{message}</AlertText>
        </Alert>
      </Pressable>
    </Animated.View>
  );
}
