import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

import { HapticTab } from '@/components/ui/haptic-tab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontWeight: '700' }} className="material-symbols-outlined text-3xl">
              {focused ? 'home' : 'home'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontWeight: '700' }} className="material-symbols-outlined text-3xl">
              {focused ? 'search' : 'search'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontWeight: '700' }} className="material-symbols-outlined text-3xl">
              {focused ? 'favorite' : 'favorite'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: 'Shopping List',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontWeight: '700' }} className="material-symbols-outlined text-3xl">
              {focused ? 'shopping_cart' : 'shopping_cart'}
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
