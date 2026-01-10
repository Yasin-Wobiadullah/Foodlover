import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { StyledText } from '../ui/StyledText';
import { cn } from '../../lib/utils';

interface Collection {
  name: string;
  recipeCount: number;
  images: (string | null)[];
}

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const { name, recipeCount, images } = collection;

  return (
    <Pressable className="flex-shrink-0 w-40 group">
      <View
        className={cn(
          'aspect-square rounded-[2rem] bg-[#F7F7F7] dark:bg-surface-dark mb-3 overflow-hidden',
          'border-2 border-transparent group-hover:border-tint-green/30 transition-colors'
        )}
      >
        {images.length > 1 ? (
          <View className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1.5 p-2">
            {images.slice(0, 3).map((img, index) => (
              img ? <Image key={index} source={{ uri: img }} className="w-full h-full object-cover rounded-xl" /> : <View key={index} className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
            ))}
            {images.length > 3 && (
              <View className="bg-tint-green text-white rounded-xl flex items-center justify-center">
                <StyledText className="text-sm font-extrabold text-white">
                  +{images.length - 3}
                </StyledText>
              </View>
            )}
          </View>
        ) : (
          <View className="flex items-center justify-center h-full">
            {images[0] && <Image source={{ uri: images[0] }} className="w-28 h-28 object-cover rounded-full shadow-lg" />}
          </View>
        )}
      </View>
      <StyledText variant="body-lg" className="leading-tight">{name}</StyledText>
      <StyledText variant="muted" className="text-sm">{recipeCount} recipes</StyledText>
    </Pressable>
  );
}
