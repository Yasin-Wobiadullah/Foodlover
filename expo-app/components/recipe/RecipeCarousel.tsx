import React from 'react';
import { FlatList, View } from 'react-native';
import RecipeCardPortrait from './RecipeCardPortrait';

interface Recipe {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  authorImageUrl: string | null;
  cookTime: string;
  likes: string;
}

interface RecipeCarouselProps {
  recipes: Recipe[];
}

export default function RecipeCarousel({ recipes }: RecipeCarouselProps) {
  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => <RecipeCardPortrait {...item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
}
