import React from 'react';
import { View, FlatList } from 'react-native';
import { RecipeGridCard } from './RecipeGridCard';
import { SearchResultsHeader } from './SearchResultsHeader';
import { SearchSkeleton } from './SearchSkeleton';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { SearchRecipe } from '../../lib/searchService';
import { getRecipeThumbnailUrl } from '../../lib/imageUtils';

interface SearchResultsProps {
  results: SearchRecipe[];
  isLoading: boolean;
  error: string | null;
  query: string;
  onRecipePress?: (recipeId: string, thumbnailUrl?: string) => void;
  onFilterPress?: () => void;
}

export function SearchResults({ 
  results, 
  isLoading, 
  error, 
  query, 
  onRecipePress,
  onFilterPress 
}: SearchResultsProps) {
  // Loading state
  if (isLoading) {
    return <SearchSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <View className="items-center gap-3">
          <View className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <Icon name="error_outline" size={32} className="text-red-500 dark:text-red-400" />
          </View>
          <StyledText variant="display-sm" className="text-center">
            Something went wrong
          </StyledText>
          <StyledText variant="muted" className="text-center max-w-xs">
            {error}
          </StyledText>
        </View>
      </View>
    );
  }

  // Empty state - no results
  if (query && results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <View className="items-center gap-3">
          <View className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Icon name="search_off" size={32} className="text-gray-400 dark:text-gray-500" />
          </View>
          <StyledText variant="display-sm" className="text-center">
            No recipes found
          </StyledText>
          <StyledText variant="muted" className="text-center max-w-xs">
            Try searching with different keywords or browse our categories
          </StyledText>
        </View>
      </View>
    );
  }

  // Empty state - no search yet
  if (!query) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <View className="items-center gap-3">
          <View className="w-16 h-16 rounded-full bg-tint-green/10 dark:bg-tint-green/20 flex items-center justify-center">
            <Icon name="search" size={32} className="text-tint-green dark:text-tint-green-light" />
          </View>
          <StyledText variant="display-sm" className="text-center">
            Start searching
          </StyledText>
          <StyledText variant="muted" className="text-center max-w-xs">
            Search for recipes by name, ingredients, or browse categories below
          </StyledText>
        </View>
      </View>
    );
  }

  // Results - 2 column grid
  return (
    <View>
      <SearchResultsHeader 
        resultCount={results.length} 
        onFilterPress={onFilterPress}
      />
      <FlatList
        data={results}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ gap: 32 }}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1, maxWidth: index === results.length - 1 && results.length % 2 !== 0 ? '48%' : undefined }}>
            <RecipeGridCard
              recipe={item}
              onPress={() => onRecipePress?.(item.id, getRecipeThumbnailUrl(item.image_url))}
            />
          </View>
        )}
      />
    </View>
  );
}
