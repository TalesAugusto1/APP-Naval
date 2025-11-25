export const ROUTES = {
  HOME: '/(tabs)/' as const,
  SCHOOLS_LIST: '/(tabs)/schools' as const,
  SCHOOL_DETAIL: '/(tabs)/schools/[id]' as const,
  SCHOOL_CREATE: '/(tabs)/schools/create' as const,
  SCHOOL_EDIT: '/(tabs)/schools/edit/[id]' as const,
  CLASSES_LIST: '/(tabs)/classes' as const,
  CLASS_CREATE: '/(tabs)/classes/create' as const,
  CLASS_EDIT: '/(tabs)/classes/edit/[id]' as const,
  SETTINGS: '/(tabs)/settings' as const,
} as const;

export type RouteParams = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SCHOOLS_LIST]: undefined;
  [ROUTES.SCHOOL_DETAIL]: { id: string };
  [ROUTES.SCHOOL_CREATE]: undefined;
  [ROUTES.SCHOOL_EDIT]: { id: string };
  [ROUTES.CLASSES_LIST]: { schoolId?: string };
  [ROUTES.CLASS_CREATE]: { schoolId: string };
  [ROUTES.CLASS_EDIT]: { id: string; schoolId: string };
  [ROUTES.SETTINGS]: undefined;
};

export type RouteName = keyof RouteParams;
