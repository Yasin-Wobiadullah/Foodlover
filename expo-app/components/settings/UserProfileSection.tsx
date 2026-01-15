import React from 'react';
import { View, Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRevenueCat } from '../../context/RevenueCatContext';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';
import { Button } from '../ui/Button';

export function UserProfileSection({ onManageSubscription }: { onManageSubscription: () => Promise<void> }) {
  const { session } = useAuth();
  const { user } = useRevenueCat();

  return (
    <View>
        <View className="flex-col items-center py-6 mb-4">
            <Pressable className="relative mb-3 group">
                <Avatar 
                    source={{ uri: session?.user?.user_metadata?.avatar_url }} 
                    containerClassName="w-24 h-24 ring-2 ring-gray-100 dark:ring-surface-dark"
                />
                <View className="absolute bottom-0 right-0 bg-primary dark:bg-white text-white dark:text-primary rounded-full p-1.5 shadow-md border-2 border-white dark:border-background-dark">
                    <Icon name="edit" size={14} style={{fontVariationSettings: "'wght' 700"}} className="text-white dark:text-primary" />
                </View>
            </Pressable>
            <StyledText variant="body-lg" className="font-display">{session?.user?.email}</StyledText>
            <StyledText variant="caption" className="uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">
                {user.isPro ? 'Pro Member' : 'Free Member'}
            </StyledText>
        </View>

        <Button onPress={onManageSubscription} className="mb-10">
            <View className="flex-row items-center gap-4">
                <StyledText className="text-2xl">✨</StyledText>
                <View className="text-left">
                    <StyledText className="text-white dark:text-primary" variant="body-lg">Manage Subscription</StyledText>
                    <StyledText className="text-xs text-gray-400 dark:text-gray-500 font-medium">Upgrade options</StyledText>
                </View>
            </View>
            <Icon name="arrow_forward" className="text-white dark:text-primary group-hover:translate-x-1 transition-transform" />
        </Button>
    </View>
  );
}
