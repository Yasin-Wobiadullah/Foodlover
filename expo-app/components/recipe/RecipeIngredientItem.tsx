import React from 'react';
import { View, Pressable } from 'react-native';
import { Avatar } from '../ui/Avatar';
import { StyledText } from '../ui/StyledText';
import { getIngredientImageUrl } from '../../lib/imageUtils';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  image_url?: string | null;
}

interface RecipeIngredientItemProps {
  ingredient: Ingredient;
  onPress?: () => void;
}

export function RecipeIngredientItem({ ingredient, onPress }: RecipeIngredientItemProps) {
  return (
    <Pressable 
      onPress={onPress}
      className="flex-col items-center gap-3 min-w-[80px] group"
    >
      <View className="w-20 h-20 rounded-full bg-background-light dark:bg-surface-dark flex items-center justify-center shadow-sm border border-transparent group-active:border-tint-green transition-colors overflow-hidden">
        {ingredient.image_url ? (
          <Avatar
            source={{ uri: getIngredientImageUrl(ingredient.image_url) }}
            className="w-full h-full"
          />
        ) : (
          <StyledText className="text-3xl">🥗</StyledText>
        )}
      </View>
      <View className="text-center">
        <StyledText className="font-bold text-sm text-primary dark:text-white">
          {ingredient.name}
        </StyledText>
        <StyledText className="text-xs text-gray-400 font-semibold mt-0.5">
          {ingredient.amount}
        </StyledText>
      </View>
    </Pressable>
  );
}
