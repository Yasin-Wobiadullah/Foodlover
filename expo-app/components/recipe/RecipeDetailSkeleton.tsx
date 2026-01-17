import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function RecipeDetailSkeleton() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-background-dark">
      {/* Header skeleton */}
      <View 
        className="absolute top-0 left-0 w-full z-20 px-6 pointer-events-none"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row justify-between items-center">
          <View className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <View className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </View>
      </View>

      {/* Hero image skeleton */}
      <View className="px-2">
        <View 
          style={{ aspectRatio: 1 }} 
          className="w-full rounded-[2.5rem] bg-gray-200 dark:bg-gray-800 animate-pulse"
        />
      </View>

      {/* Content skeleton */}
      <View className="px-6 mt-4">
        {/* Title skeleton */}
        <View className="mb-2">
          <View className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg mb-2 animate-pulse" />
          <View className="h-8 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        </View>
        
        {/* Author skeleton */}
        <View className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />

        {/* Stats skeleton */}
        <View className="flex-row justify-between mt-8 mb-8">
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-row items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 pr-5 rounded-full animate-pulse">
              <View className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
              <View>
                <View className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                <View className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              </View>
            </View>
          ))}
        </View>

        {/* Divider */}
        <View className="border-b border-gray-100 dark:border-white/5 my-8" />

        {/* Ingredients header skeleton */}
        <View className="flex-row justify-between mb-5">
          <View className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <View className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </View>

        {/* Ingredients skeleton */}
        <View className="flex-row gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <View key={i} className="items-center gap-3">
              <View className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <View className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <View className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </View>
          ))}
        </View>

        {/* Instructions header skeleton */}
        <View className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />

        {/* Instructions skeleton */}
        <View className="gap-6">
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-row gap-4">
              <View className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <View className="flex-1">
                <View className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2 animate-pulse" />
                <View className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Action bar skeleton */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 px-6 pt-6 z-50"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        <View className="flex-row gap-3">
          <View className="flex-1 h-14 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <View className="flex-[2] h-14 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </View>
      </View>
    </View>
  );
}
