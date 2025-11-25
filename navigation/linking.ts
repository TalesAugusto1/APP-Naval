import * as Linking from 'expo-linking';

export const linkingConfig = {
  prefixes: [Linking.createURL('/'), 'school-manager://', 'https://school-manager.app'],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          index: '',
          schools: {
            screens: {
              index: 'schools',
              '[id]': 'schools/:id',
              create: 'schools/create',
              'edit/[id]': 'schools/edit/:id',
            },
          },
          classes: {
            screens: {
              index: 'classes',
              create: 'classes/create',
              'edit/[id]': 'classes/edit/:id',
            },
          },
          settings: 'settings',
        },
      },
      '+not-found': '*',
    },
  },
};

export function parseDeepLink(url: string) {
  return Linking.parse(url);
}

export function createDeepLink(path: string, params?: Record<string, string>) {
  const url = Linking.createURL(path);
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    return `${url}?${queryString}`;
  }
  return url;
}
