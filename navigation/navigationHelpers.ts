import { router } from 'expo-router';
import { RouteParams, RouteName } from './types';

export function navigate<T extends RouteName>(route: T, params?: RouteParams[T]) {
  if (params && typeof params === 'object') {
    const routeWithParams = Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(`[${key}]`, String(value)),
      route as string
    );
    router.push(routeWithParams as any);
  } else {
    router.push(route as any);
  }
}

export function goBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/(tabs)/' as any);
  }
}

export function replace<T extends RouteName>(route: T, params?: RouteParams[T]) {
  if (params && typeof params === 'object') {
    const routeWithParams = Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(`[${key}]`, String(value)),
      route as string
    );
    router.replace(routeWithParams as any);
  } else {
    router.replace(route as any);
  }
}

export function navigateToSchoolDetail(schoolId: string) {
  router.push(`/schools/${schoolId}` as any);
}

export function navigateToCreateSchool() {
  router.push('/schools/create' as any);
}

export function navigateToEditSchool(schoolId: string) {
  router.push(`/schools/edit/${schoolId}` as any);
}

export function navigateToSchoolClasses(schoolId: string) {
  router.push(`/classes?schoolId=${schoolId}` as any);
}

export function navigateToCreateClass(schoolId: string) {
  router.push(`/classes/create?schoolId=${schoolId}` as any);
}

export function navigateToEditClass(classId: string, schoolId: string) {
  router.push(`/classes/edit/${classId}?schoolId=${schoolId}` as any);
}

export function dismissModal() {
  if (router.canDismiss()) {
    router.dismiss();
  } else {
    goBack();
  }
}
