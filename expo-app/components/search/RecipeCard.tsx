import React from 'react';
import { View, Pressable, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';
import { SearchRecipe } from '../../lib/searchService';

interface RecipeCardProps {
  recipe: SearchRecipe;
  onPress?: () => void;
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-2xl overflow-hidden bg-white dark:bg-surface-dark shadow-card"
    >
      {/* Recipe Image with Gradient Overlay */}
      <View className="relative">
        <ImageBackground
          source={{ uri: recipe.image_url || 'https://via.placeholder.com/400x250' }}
          className="w-full h-48"
          resizeMode="cover"
        >
          {/* Gradient overlay for better text readability */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            locations={[0, 0.5, 1]}
            className="absolute inset-0"
          />

          {/* Rating Badge */}
          <View className="absolute top-3 right-3">
            <View className="flex-row items-center gap-1 bg-white/90 dark:bg-black/80 rounded-full px-2.5 py-1.5 backdrop-blur-sm">
              <Icon name="star" size={14} className="text-yellow-500" />
              <StyledText className="text-xs font-semibold text-gray-900 dark:text-white">
                {recipe.rating_average?.toFixed(1) || '0.0'}
              </StyledText>
            </View>
          </View>

          {/* Title at bottom */}
          <View className="absolute bottom-0 left-0 right-0 p-4">
            <StyledText variant="display-sm" className="text-white font-bold leading-tight">
              {recipe.title}
            </StyledText>
          </View>
        </ImageBackground>
      </View>

      {/* Recipe Info */}
      <View className="p-4 gap-3">
        {recipe.description && (
          <StyledText className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {recipe.description}
          </StyledText>
        )}

        {/* Stats Row */}
        <View className="flex-row items-center gap-4">
          {recipe.servings && (
            <View className="flex-row items-center gap-1.5">
              <Icon name="group" size={18} className="text-gray-500 dark:text-gray-400" />
              <StyledText className="text-xs text-gray-600 dark:text-gray-400">
                {recipe.servings} servings
              </StyledText>
            </View>
          )}

          {recipe.calories_per_serving && (
            <View className="flex-row items-center gap-1.5">
              <Icon name="local_fire_department" size={18} className="text-orange-500" />
              <StyledText className="text-xs text-gray-600 dark:text-gray-400">
                {Math.round(recipe.calories_per_serving)} kcal
              </StyledText>
            </View>
          )}
        </View>

        {/* Nutrition Row (if available) */}
        {(!!recipe.protein_per_serving || !!recipe.carbs_per_serving || !!recipe.fat_per_serving) && (
          <View className="flex-row items-center justify-between pt-2 border-t border-gray-100 dark:border-white/5">
            {!!recipe.protein_per_serving && (
              <View className="flex-1 items-center">
                <StyledText className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {Math.round(recipe.protein_per_serving)}g
                </StyledText>
                <StyledText className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">
                  Protein
                </StyledText>
              </View>
            )}
            {!!recipe.carbs_per_serving && (
              <View className="flex-1 items-center">
                <StyledText className="text-xs font-semibold text-green-600 dark:text-green-400">
                  {Math.round(recipe.carbs_per_serving)}g
                </StyledText>
                <StyledText className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">
                  Carbs
                </StyledText>
              </View>
            )}
            {!!recipe.fat_per_serving && (
              <View className="flex-1 items-center">
                <StyledText className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                  {Math.round(recipe.fat_per_serving)}g
                </StyledText>
                <StyledText className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">
                  Fat
                </StyledText>
              </View>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
