import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '../../../components/navigation/TabBar';

export default function TabLayout() {
  return (
<Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="meal-plan" />
      <Tabs.Screen name="shopping-list" />
    </Tabs>
  );
}
