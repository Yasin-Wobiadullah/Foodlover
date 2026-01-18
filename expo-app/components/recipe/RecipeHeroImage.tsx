import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getRecipeThumbnailUrl, getFullImageUrl } from '../../lib/imageUtils';

interface RecipeHeroImageProps {
  imageUrl: string | null;
  thumbnailUrl?: string | null; // Optional cached thumbnail from card
}

export function RecipeHeroImage({ imageUrl, thumbnailUrl }: RecipeHeroImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const fullImageOpacity = useRef(new Animated.Value(0)).current;

  const thumbUrl = thumbnailUrl || getRecipeThumbnailUrl(imageUrl);
  const fullUrl = getFullImageUrl(imageUrl);

  const handleFullImageLoad = () => {
    setIsLoading(false);
    // Faster, snappier animation (200ms instead of default ~300ms)
    Animated.timing(fullImageOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

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
          onLoadEnd={() => setIsLoading(false)}
        />

        {/* Full resolution image - loads in background with animated opacity */}
        <Animated.Image
          source={{ uri: fullUrl }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          style={{ opacity: fullImageOpacity }}
          onLoadEnd={handleFullImageLoad}
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
