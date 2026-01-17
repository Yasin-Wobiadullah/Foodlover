import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export function SearchSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  // Create pairs of skeleton cards for 2-column grid
  const skeletonPairs = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];

  return (
    <View className="gap-8">
      {skeletonPairs.map((pair, rowIndex) => (
        <View key={rowIndex} className="flex-row gap-4">
          {pair.map((key) => (
            <Animated.View
              key={key}
              style={{ opacity, flex: 1 }}
              className="flex-1"
            >
              {/* Card with 3:4 aspect ratio */}
              <View style={{ aspectRatio: 3 / 4 }} className="rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 mb-3" />
              
              {/* Title skeleton */}
              <View className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-4/5 mb-2" />
              
              {/* Subtitle skeleton */}
              <View className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/5" />
            </Animated.View>
          ))}
        </View>
      ))}
    </View>
  );
}
