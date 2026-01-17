import React from 'react';
import { View, Pressable } from 'react-native';
import { Avatar } from '../ui/Avatar';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';

interface Ingredient {
  id: string;
  name: string;
  image_url?: string | null;
}

interface IngredientChipProps {
  ingredient: Ingredient;
  onRemove?: (id: string) => void;
}

export function IngredientChip({ ingredient, onRemove }: IngredientChipProps) {
  return (
    <View className="flex-col items-center gap-2">
      <View className="relative">
        {/* Ingredient Avatar */}
        <View className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-surface-dark shadow-sm">
          <Avatar
            source={{ uri: ingredient.image_url || 'https://via.placeholder.com/64' }}
            className="w-full h-full"
          />
        </View>

        {/* Remove Button */}
        {onRemove && (
          <Pressable
            onPress={() => onRemove(ingredient.id)}
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm z-10"
          >
            <Icon 
              name="close" 
              size={14} 
              weight={700}
              className="text-gray-500 dark:text-gray-400" 
            />
          </Pressable>
        )}
      </View>

      {/* Ingredient Name */}
      <StyledText className="text-sm font-semibold text-primary dark:text-white text-center">
        {ingredient.name}
      </StyledText>
    </View>
  );
}
