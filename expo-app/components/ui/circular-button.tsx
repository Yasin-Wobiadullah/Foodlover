import React from 'react';
import { Pressable, Text } from 'react-native';

interface CircularButtonProps {
  icon: string;
  onPress: () => void;
  size?: number;
}

export default function CircularButton({ icon, onPress, size = 48 }: CircularButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-full items-center justify-center bg-background"
      style={{ width: size, height: size }}
    >
      <Text style={{ fontSize: size * 0.6 }} className="material-symbols-outlined text-foreground">{icon}</Text>
    </Pressable>
  );
}
