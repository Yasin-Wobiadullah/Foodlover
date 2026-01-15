import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../ui/Avatar';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { useAuth } from '../../context/AuthContext';
import { Pressable } from 'react-native';

export function ShoppingListHeader() {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      className="px-6 flex flex-col gap-6 bg-background-light dark:bg-background-dark"
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-full bg-primary dark:bg-white flex items-center justify-center text-white dark:text-primary shadow-sm">
            <Icon name="local_dining" size={18} className="text-white dark:text-primary" />
          </View>
          <StyledText variant="body-lg" className="font-display tracking-tight">FoodLover</StyledText>
        </View>
        <Avatar source={{ uri: session?.user?.user_metadata?.avatar_url }} />
      </View>
      <View className="flex-row justify-between items-end">
        <View>
          <StyledText variant="display-lg">Shopping List</StyledText>
          <StyledText variant="muted" className="mt-1">12 items to buy</StyledText>
        </View>
        <Pressable className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-card text-primary dark:text-white hover:text-tint-green transition-colors">
            <Icon name="more_horiz" />
        </Pressable>
      </View>
    </View>
  );
}
