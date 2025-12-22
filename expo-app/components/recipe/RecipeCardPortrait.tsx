import React from 'react';
import { View, Image } from 'react-native';
import { ThemedText } from '../ui/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../ui/button';
import ProfileAvatar from '../profile/ProfileAvatar';

interface RecipeCardPortraitProps {
  imageUrl: string;
  title: string;
  author: string;
  authorImageUrl: string | null;
  cookTime: string;
  likes: string;
}

export default function RecipeCardPortrait({
  imageUrl,
  title,
  author,
  authorImageUrl,
  cookTime,
  likes,
}: RecipeCardPortraitProps) {
  return (
    <View className="w-64 mr-4">
      <View className="relative">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-80 rounded-2xl"
        />
        <View className="absolute top-3 left-3 bg-black/50 px-3 py-1 rounded-full">
          <ThemedText className="text-white text-sm">{cookTime}</ThemedText>
        </View>
      </View>
      <ThemedText variant="h3" className="mt-4">{title}</ThemedText>
      <View className="flex-row items-center mt-2">
        <ProfileAvatar source={authorImageUrl} size={32} />
        <ThemedText variant="body" className="ml-2">{author}</ThemedText>
      </View>
    </View>
  );
}
