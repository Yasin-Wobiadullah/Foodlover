import React, { useState } from 'react';
import { View, Pressable, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';
import { SearchRecipe } from '../../lib/searchService';
import { getRecipeCardImageUrl } from '../../lib/imageUtils';

interface RecipeGridCardProps {
  recipe: SearchRecipe;
  onPress?: () => void;
}

export function RecipeGridCard({ recipe, onPress }: RecipeGridCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Format prep time - assuming it's in minutes
  const formatTime = (minutes?: number | null) => {
    if (!minutes) return '-- min';
    return `${minutes} min`;
  };

  return (
    <Pressable onPress={onPress} className="group">
      {/* Card Container with 3:4 aspect ratio */}
      <View style={{ aspectRatio: 3 / 4 }} className="relative rounded-3xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800 shadow-card">
        <ImageBackground
          source={{ uri: getRecipeCardImageUrl(recipe.image_url) }}
          className="w-full h-full"
          resizeMode="cover"
        >
          {/* Gradient overlay at bottom */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            locations={[0.5, 1]}
            className="absolute inset-0"
          />

          {/* Favorite Button - Top Right */}
          <Pressable
            onPress={toggleFavorite}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center active:bg-white transition-colors"
          >
            <Icon
              name="favorite"
              size={18}
              weight={isFavorite ? 700 : 400}
              className={isFavorite ? 'text-red-500' : 'text-white'}
              style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
            />
          </Pressable>

          {/* Time Badge - Bottom Left */}
          <View className="absolute bottom-0 left-0 right-0 p-3">
            <View className="flex-row items-center gap-1">
              <Icon 
                name="schedule" 
                size={14} 
                weight={600}
                className="text-white/90" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              />
              <StyledText className="text-xs font-bold text-white/90">
                {formatTime(recipe.prep_time_minutes)}
              </StyledText>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Recipe Info Below Card */}
      <View>
        <StyledText variant="body-lg" className="font-display font-bold leading-tight mb-1">
          {recipe.title}
        </StyledText>
        {(recipe.cuisine_name || recipe.diet_name) && (
          <View className="flex-row items-center gap-1">
            <StyledText className="text-xs font-medium text-gray-400">
              {recipe.cuisine_name || 'World'}
            </StyledText>
            {recipe.diet_name && (
              <>
                <StyledText className="text-xs font-medium text-gray-400"> • </StyledText>
                {recipe.diet_icon && (
                  <Icon 
                    name={recipe.diet_icon} 
                    size={12} 
                    className="text-gray-400"
                    style={{ color: recipe.diet_color || undefined }}
                  />
                )}
                <StyledText className="text-xs font-medium text-gray-400">
                  {recipe.diet_name}
                </StyledText>
              </>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
