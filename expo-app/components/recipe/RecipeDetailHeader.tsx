import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../ui/Icon';

interface RecipeDetailHeaderProps {
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export function RecipeDetailHeader({ isFavorite = false, onFavoriteToggle }: RecipeDetailHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="absolute top-0 left-0 w-full z-20 px-6 pointer-events-none"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="flex-row justify-between items-center pointer-events-auto">
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="w-12 h-12 rounded-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md shadow-sm border border-white/20 dark:border-white/5 flex items-center justify-center active:scale-95 transition-transform"
        >
          <Icon name="arrow_back" size={24} weight={600} className="text-primary dark:text-white" />
        </Pressable>

        {/* Favorite Button */}
        <Pressable
          onPress={onFavoriteToggle}
          className="w-12 h-12 rounded-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md shadow-sm border border-white/20 dark:border-white/5 flex items-center justify-center active:scale-95 transition-transform group"
        >
          <Icon 
            name="favorite" 
            size={24} 
            weight={isFavorite ? 700 : 600}
            className={isFavorite ? 'text-red-500' : 'text-primary dark:text-white'}
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          />
        </Pressable>
      </View>
    </View>
  );
}
