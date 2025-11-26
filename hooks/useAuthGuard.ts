import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { router } from 'expo-router';

export function useAuthGuard(redirectTo: string = '/auth/login') {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo as any);
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  return {
    isAuthenticated,
    user,
    isLoading,
  };
}
