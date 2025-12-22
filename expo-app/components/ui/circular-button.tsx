import React from 'react';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CircularButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  size?: number;
}

export default function CircularButton({ icon, onPress, size = 48 }: CircularButtonProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <Pressable
      onPress={onPress}
      className="rounded-full items-center justify-center bg-background"
      style={{ width: size, height: size }}
    >
      <MaterialIcons
        name={icon}
        size={size * 0.6}
        className="text-foreground"
      />
    </Pressable>
  );
}
