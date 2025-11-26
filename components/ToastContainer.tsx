import { VStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUIStore } from '@/store';
import { Toast } from './Toast';

export function ToastContainer() {
  const { toasts, hideToast } = useUIStore();
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  return (
    <VStack
      position="absolute"
      top={insets.top + 8}
      left={0}
      right={0}
      zIndex={9999}
      pointerEvents="box-none"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onDismiss={hideToast}
        />
      ))}
    </VStack>
  );
}
