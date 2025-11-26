import { useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { router } from 'expo-router';

export function useProtectedAction<T extends (...args: any[]) => any>(
  action: T
): (...args: Parameters<T>) => ReturnType<T> | Promise<void> {
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useUIStore();

  return useCallback(
    (...args: Parameters<T>) => {
      if (!isAuthenticated) {
        showToast('Você precisa fazer login para realizar esta ação', 'warning');
        router.push('/auth/login' as any);
        return Promise.resolve();
      }
      return action(...args);
    },
    [isAuthenticated, action, showToast]
  );
}
