import { ThemedText } from '@/components/ui/themed-text';
import { Database } from '@/types/supabase';
import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

type Recipe = Database['public']['Tables']['recipes']['Row'] & { title: string };

type RecipeListItemProps = {
  item: Recipe;
};

export function RecipeListItem({ item }: RecipeListItemProps) {
  return (
    <Link href={{ pathname: '/(app)/recipe/[id]', params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.resultItem}>
        <ThemedText variant="h4">{item.title}</ThemedText>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
