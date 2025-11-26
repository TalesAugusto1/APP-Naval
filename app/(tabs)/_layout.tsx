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
          backgroundColor: colors.isDark ? '#1a1a1a' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          height: 65 + (insets.bottom > 0 ? insets.bottom : 0),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Escolas',
          tabBarIcon: ({ color, focused }) => (
            <School size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          tabBarAccessibilityLabel: 'Escolas - Lista de escolas',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, focused }) => (
            <Settings size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
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
