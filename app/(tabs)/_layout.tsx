import { Tabs } from 'expo-router';
import React from 'react';
import { School, Settings } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/hooks/useThemeColors';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: colors.iconTertiary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.isDark ? '#1a1a1a' : '#ffffff',
          borderTopWidth: 0,
          borderRadius: 24,
          marginHorizontal: 16,
          marginBottom: insets.bottom > 0 ? insets.bottom + 8 : 16,
          paddingBottom: 12,
          paddingTop: 12,
          height: 70,
          shadowColor: colors.isDark ? '#000' : '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: colors.isDark ? 0.4 : 0.15,
          shadowRadius: 20,
          elevation: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Escolas',
          tabBarIcon: ({ color, focused }) => (
            <School size={26} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          tabBarAccessibilityLabel: 'Escolas - Lista de escolas',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, focused }) => (
            <Settings size={26} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          tabBarAccessibilityLabel: 'Ajustes do aplicativo',
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
