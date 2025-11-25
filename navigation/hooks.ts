import { useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import { useMemo } from 'react';

export function useAppNavigation() {
  const router = useRouter();

  return useMemo(
    () => ({
      navigate: router.push,
      goBack: () => {
        if (router.canGoBack()) {
          router.back();
        }
      },
      replace: router.replace,
      canGoBack: router.canGoBack(),
    }),
    [router]
  );
}

export function useAppRoute<T extends Record<string, string>>() {
  const params = useLocalSearchParams<T>();
  const pathname = usePathname();

  return {
    params,
    pathname,
  };
}

export function useIsModal() {
  const pathname = usePathname();
  return pathname.includes('/create') || pathname.includes('/edit');
}
