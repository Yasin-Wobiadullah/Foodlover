import { ThemedText } from '@/components/ui/themed-text';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { RecipeListItem } from './RecipeListItem';

type Recipe = Database['public']['Tables']['recipes']['Row'] & { title: string };

type SearchResultsListProps = {
  searchQuery: string;
};

export function SearchResultsList({ searchQuery }: SearchResultsListProps) {
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.length > 2) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const performSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*, recipe_translations!inner(title, description)')
        .ilike('recipe_translations.title', `%${searchQuery}%`)
        .limit(10);

      if (error) {
        throw error;
      }
      
      const mappedData = data?.map(item => ({
        ...item,
        // @ts-ignore
        title: item.recipe_translations[0]?.title || 'No title'
      })) as Recipe[];

      setResults(mappedData || []);
    } catch (error) {
      console.error('Error performing search:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RecipeListItem item={item} />}
      ListEmptyComponent={() =>
        searchQuery.length > 2 && !loading ? (
          <View style={styles.centered}>
            <ThemedText>No results found.</ThemedText>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
