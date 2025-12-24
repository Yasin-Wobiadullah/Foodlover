import React from 'react';
import { Pressable, Text } from 'react-native';
import { ThemedText } from '../ui/themed-text';

interface ShortcutCardProps {
  title: string;
  icon: string;
  onPress: () => void;
}

export default function ShortcutCard({ title, icon, onPress }: ShortcutCardProps) {
  return (
    <Pressable
      className="flex-1 items-center justify-center p-4 rounded-xl m-2 min-h-[120px] bg-primary/10"
      onPress={onPress}
    >
      <Text className="material-symbols-outlined text-3xl text-primary">{icon}</Text>
      <ThemedText className="mt-2 font-semibold text-primary">{title}</ThemedText>
    </Pressable>
  );
}
