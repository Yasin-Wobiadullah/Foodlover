import React, { useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getRecipeThumbnailUrl, getFullImageUrl } from '../../lib/imageUtils';

interface RecipeHeroImageProps {
  imageUrl: string | null;
  thumbnailUrl?: string | null; // Optional cached thumbnail from card
}

export function RecipeHeroImage({ imageUrl, thumbnailUrl }: RecipeHeroImageProps) {
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const thumbUrl = thumbnailUrl || getRecipeThumbnailUrl(imageUrl);
  const fullUrl = getFullImageUrl(imageUrl);

  return (
    <View className="relative px-2">
      <View 
        style={{ aspectRatio: 1 }} 
        className="w-full rounded-[2.5rem] overflow-hidden shadow-soft relative bg-gray-100 dark:bg-gray-800"
      >
        {/* Thumbnail - loads first (cached from card) */}
        <Image
          source={{ uri: thumbUrl }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          blurRadius={isFullImageLoaded ? 0 : 0.5}
          onLoadEnd={() => setIsLoading(false)}
        />

        {/* Full resolution image - loads in background */}
        <Image
          source={{ uri: fullUrl }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          style={{ opacity: isFullImageLoaded ? 1 : 0 }}
          onLoadEnd={() => setIsFullImageLoaded(true)}
        />

        {/* Loading indicator */}
        {isLoading && (
          <View className="absolute inset-0 flex items-center justify-center">
            <ActivityIndicator size="large" color="#16A34A" />
          </View>
        )}

        {/* Gradient Overlays */}
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.1)']}
          locations={[0, 0.5, 1]}
          className="absolute inset-0"
          pointerEvents="none"
        />
      </View>
    </View>
  );
}
