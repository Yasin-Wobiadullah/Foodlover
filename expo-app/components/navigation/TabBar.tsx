import React from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';
import { StyledText } from '../ui/StyledText';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const tabConfig: Record<string, { icon: string; label: string }> = {
    home: { icon: 'home', label: 'Home' },
    'meal-plan': { icon: 'restaurant_menu', label: 'Meal Plan' },
    'shopping-list': { icon: 'shopping_bag', label: 'List' },
    search: { icon: 'search', label: 'Search' },
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const handleScannerPress = () => console.log("Scanner pressed!");

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 pt-2 shadow-nav"
    >
      <View className="flex-row justify-around items-center px-2 h-16">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = tabConfig[route.name];

          if (!config) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 flex-col items-center justify-center gap-1 h-full"
            >
              <Icon
                name={config.icon}
                isFilled={isFocused}
                className={isFocused ? 'text-tint-green dark:text-white' : 'text-gray-400 dark:text-gray-500'}
                weight={isFocused ? 700 : 400}
                size={28}
              />
              {isFocused && <StyledText className="text-[11px] font-bold text-tint-green dark:text-white leading-none">{config.label}</StyledText>}
            </Pressable>
          );
        })}
        <Pressable
            onPress={handleScannerPress}
            className="flex-1 flex-col items-center justify-center gap-1 h-full"
        >
            <View className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white shadow-lg shadow-black/20">
                <Icon name="qr_code_scanner" isFilled size={22} className="text-white" />
            </View>
        </Pressable>
      </View>
    </View>
  );
}
