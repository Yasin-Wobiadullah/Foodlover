import React from 'react';
import { Pressable } from 'react-native';
import { ThemedText } from '../ui/themed-text';
import { MaterialIcons } from '@expo/vector-icons';

interface ShortcutCardProps {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}

export default function ShortcutCard({ title, icon, onPress }: ShortcutCardProps) {
  return (
    <Pressable
      className="flex-1 items-center justify-center p-4 rounded-xl m-2 min-h-[120px] bg-primary/10"
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={32}
        className="text-primary"
      />
      <ThemedText className="mt-2 font-semibold text-primary">{title}</ThemedText>
    </Pressable>
  );
}
