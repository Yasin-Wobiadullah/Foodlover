import React, { useState, useRef } from 'react';
import { ScrollView, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SearchHeader } from '../../../components/search/SearchHeader';
import { SearchInput } from '../../../components/ui/SearchInput';
import { SearchResults } from '../../../components/search/SearchResults';
import { Button } from '../../../components/ui/Button';
import { CategoryGridItem } from '../../../components/search/CategoryGridItem';
import { StyledText } from '../../../components/ui/StyledText';
import { Card } from '../../../components/ui/Card';
import { Switch } from '../../../components/ui/Switch';
import { Icon } from '../../../components/ui/Icon';
import { Chip } from '../../../components/ui/Chip';
import { useSearch } from '../../../context/SearchContext';

const categories = [
  { name: 'Breakfast', icon: 'bakery_dining', color: '#F97316', bgColor: 'rgba(249, 115, 22, 0.1)' },
  { name: 'Lunch', icon: 'lunch_dining', color: '#16A34A', bgColor: 'rgba(22, 163, 74, 0.1)' },
  { name: 'Dinner', icon: 'dinner_dining', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)' },
  { name: 'Dessert', icon: 'icecream', color: '#EAB308', bgColor: 'rgba(234, 179, 8, 0.1)' },
];

const trending = ['Avocado Toast', 'Vegan Pasta', 'Smoothie Bowl', 'Keto Snacks'];
const filters = ['Nutrition', 'Diets', 'Ingredients', 'Cuisine'];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Nutrition');
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Get search context
  const { searchQuery, searchResults, isSearching, isLoadingMore, hasMore, error, performSearch, loadMore } = useSearch();

  // Handle scroll for pagination
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    
    // Calculate scroll percentage (0 to 1)
    const scrollPercentage = (layoutMeasurement.height + contentOffset.y) / contentSize.height;
    
    // Trigger load more at 80% scroll
    if (scrollPercentage >= 0.8 && hasMore && !isLoadingMore && searchQuery) {
      loadMore();
    }
  };

  const handleRecipePress = (recipeId: string, thumbnailUrl?: string) => {
    // Pass thumbnail URL as query param for faster initial load
    const params = thumbnailUrl ? `?thumbnail=${encodeURIComponent(thumbnailUrl)}` : '';
    router.push(`/(app)/(screens)/recipe/${recipeId}${params}`);
  };

  const handleTrendingPress = (query: string) => {
    performSearch(query);
  };

  const handleFilterPress = () => {
    // TODO: Implement filter modal
    console.log('Open filters modal');
  };

  // Mock ingredients for now - will be implemented with actual ingredient search later
  const activeIngredients: any[] = [];

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <SearchHeader />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View className="px-6">
          <View className="mb-6">
            <SearchInput 
              placeholder="Search recipes, ingredients..." 
              value={searchQuery}
              onChangeText={performSearch}
            />
          </View>

          {/* Show search results when there's a query */}
          {searchQuery ? (
            <SearchResults
              results={searchResults}
              isLoading={isSearching}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              error={error}
              query={searchQuery}
              onRecipePress={handleRecipePress}
              onFilterPress={handleFilterPress}
              onLoadMore={loadMore}
            />
          ) : (
            <>
              {/* Show filters, categories, and trending when not searching */}
              <View className="flex-row gap-3 mb-6 pb-2">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {filters.map((filter) => (
                    <Button
                      key={filter}
                      label={filter}
                      variant={activeFilter === filter ? 'primary' : 'secondary'}
                      size="sm"
                      onPress={() => setActiveFilter(filter)}
                      className="whitespace-nowrap"
                    />
                  ))}
                </ScrollView>
              </View>

              <Card className="mb-10 p-5 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-tint-green-light dark:bg-tint-green/20 flex items-center justify-center">
                    <Icon name="tune" style={{fontVariationSettings: "'wght' 600"}} className="text-tint-green dark:text-tint-green-light" />
                  </View>
                  <View>
                    <StyledText variant="body-lg">Food Preferences</StyledText>
                    <StyledText variant="muted" className="text-xs mt-1">Personalize results</StyledText>
                  </View>
                </View>
                <Switch />
              </Card>

              <View className="space-y-4">
                <StyledText variant="display-sm">Categories</StyledText>
                <View className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <CategoryGridItem key={cat.name} category={cat} />
                  ))}
                </View>
              </View>
              
              <View className="mt-8">
                <StyledText variant="display-sm" className="mb-4">Trending</StyledText>
                <View className="flex-wrap flex-row gap-3">
                  {trending.map((item) => (
                    <Chip 
                      key={item} 
                      label={item} 
                      iconName="trending_up"
                      onPress={() => handleTrendingPress(item)}
                    />
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
