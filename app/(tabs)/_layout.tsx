import { Tabs } from 'expo-router';
import React from 'react';
import { School, Settings } from 'lucide-react-native';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
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
