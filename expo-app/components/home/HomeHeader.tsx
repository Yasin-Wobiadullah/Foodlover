import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../ui/Avatar';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { useAuth } from '../../context/AuthContext';

export function HomeHeader() {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top + 16, paddingBottom: 8 }}
      className="px-6 flex flex-row justify-between items-center bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm"
    >
      <View className="flex flex-row items-center gap-3">
        <View className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white dark:bg-white dark:text-primary shadow-sm">
          <Icon name="lunch_dining" size={22} className="text-white dark:text-primary" isFilled />
        </View>
        <StyledText variant="display-md">FoodLover</StyledText>
      </View>
      <View className="flex flex-row gap-3">
        <Avatar source={{ uri: session?.user?.user_metadata?.avatar_url }} />
      </View>
    </View>
  );
}
