import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../ui/Avatar';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { useAuth } from '../../context/AuthContext';

export function MealPlanHeader() {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      className="px-6 flex flex-col gap-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-white/5"
    >
      <View className="flex-row justify-between items-center w-full">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
            <Icon name="local_dining" size={20} className="text-white dark:text-black" />
          </View>
          <StyledText variant="body-lg" className="font-display tracking-tight">FoodLover</StyledText>
        </View>
        <Avatar source={{ uri: session?.user?.user_metadata?.avatar_url }} />
      </View>
      <View>
        <StyledText variant="display-lg">Meal Plan</StyledText>
      </View>
    </View>
  );
}
