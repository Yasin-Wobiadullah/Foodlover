import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../ui/Avatar';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { useAuth } from '../../context/AuthContext';

export function SearchHeader() {
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
            <Icon name="local_dining" size={18} isFilled className="text-white dark:text-primary" />
          </View>
          <StyledText variant="body-lg" className="font-display tracking-tight">FoodLover</StyledText>
        </View>
        <Avatar source={{ uri: session?.user?.user_metadata?.avatar_url }} />
      </View>
      <View>
        <StyledText variant="display-lg">Search</StyledText>
      </View>
    </View>
  );
}
