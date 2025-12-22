import React, { useState } from 'react';
import { FlatList, View, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import RecipeCardLandscape from './RecipeCardLandscape';

const { width } = Dimensions.get('window');

interface Recipe {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  authorImageUrl: string | null;
  cookTime: string;
  likes: string;
}

interface RecipeSnapCarouselProps {
  recipes: Recipe[];
}

export default function RecipeSnapCarousel({ recipes }: RecipeSnapCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <View style={{ width: width - 32 }}><RecipeCardLandscape {...item} /></View>}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
        {recipes.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: activeIndex === index ? '#888' : '#ccc',
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
}
