import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { RecipeDetailHeader } from '../../../../components/recipe/RecipeDetailHeader';
import { RecipeHeroImage } from '../../../../components/recipe/RecipeHeroImage';
import { RecipeStats } from '../../../../components/recipe/RecipeStats';
import { RecipeIngredientItem } from '../../../../components/recipe/RecipeIngredientItem';
import { RecipeInstructions } from '../../../../components/recipe/RecipeInstructions';
import { RecipeActionBar } from '../../../../components/recipe/RecipeActionBar';
import { RecipeDetailSkeleton } from '../../../../components/recipe/RecipeDetailSkeleton';
import { StyledText } from '../../../../components/ui/StyledText';
import { getRecipeDetails } from '../../../../lib/searchService';

export default function RecipeDetailScreen() {
  const { id, thumbnail } = useLocalSearchParams<{ id: string; thumbnail?: string }>();
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  
  const [recipe, setRecipe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Decode thumbnail URL if present
  const thumbnailUrl = thumbnail ? decodeURIComponent(thumbnail as string) : undefined;

  useEffect(() => {
    if (id) {
      loadRecipe();
    }
  }, [id]);

  const loadRecipe = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await getRecipeDetails(id as string, i18n.language);
      
      if (fetchError) {
        setError(fetchError.message);
      } else {
        setRecipe(data);
      }
    } catch (err) {
      setError('Failed to load recipe');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save functionality
  };

  const handleAddToList = () => {
    // TODO: Implement add to shopping list functionality
    console.log('Add to shopping list');
  };

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (error || !recipe) {
    return (
      <View className="flex-1 bg-white dark:bg-background-dark items-center justify-center px-6">
        <StyledText variant="display-sm" className="text-center mb-4">
          Unable to load recipe
        </StyledText>
        <StyledText variant="muted" className="text-center">
          {error || 'Recipe not found'}
        </StyledText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-background-dark">
      <RecipeDetailHeader 
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <RecipeHeroImage imageUrl={recipe.image_url} thumbnailUrl={thumbnailUrl} />
        
        <View className="px-6 mt-4">
          {/* Title and Author */}
          <View className="flex-col gap-2">
            <StyledText className="text-[2rem] font-display font-extrabold text-primary dark:text-white leading-[1.1] tracking-tight">
              {recipe.title}
            </StyledText>
            <StyledText className="text-gray-500 dark:text-gray-400 font-medium">
              {t('recipe.by')} <StyledText className="text-tint-green dark:text-tint-green-light font-bold">{recipe.author_name}</StyledText>
            </StyledText>
          </View>

          {/* Stats */}
          <RecipeStats
            difficulty={recipe.difficulty}
            timeMinutes={recipe.total_time_minutes}
            calories={recipe.calories_per_serving}
          />

          {/* Divider */}
          <View className="border-b border-gray-100 dark:border-white/5 my-8" />

          {/* Ingredients */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-5">
              <StyledText variant="display-sm">
                {t('recipe.ingredients')}
              </StyledText>
              <StyledText className="text-sm font-bold text-gray-400">
                {recipe.ingredients.length} {t('recipe.items')}
              </StyledText>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-4 pb-4"
              className="-mx-6 px-6"
            >
              {recipe.ingredients.map((ingredient: any) => (
                <RecipeIngredientItem
                  key={ingredient.id}
                  ingredient={ingredient}
                />
              ))}
            </ScrollView>
          </View>

          {/* Instructions */}
          <RecipeInstructions instructions={recipe.instructions} />
        </View>
      </ScrollView>

      <RecipeActionBar
        onSave={handleSave}
        onAddToList={handleAddToList}
        isSaved={isSaved}
      />
    </View>
  );
}
