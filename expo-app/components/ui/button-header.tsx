import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './themed-text';
import CircularButton from './circular-button';
import { MaterialIcons } from '@expo/vector-icons';

interface ButtonHeaderProps {
  title?: string;
  leftButtonIcon?: keyof typeof MaterialIcons.glyphMap;
  onLeftButtonPress?: () => void;
  rightButton?: React.ReactNode;
}

export default function ButtonHeader({
  title,
  leftButtonIcon,
  onLeftButtonPress,
  rightButton,
}: ButtonHeaderProps) {
  return (
      <View className="flex-row justify-between items-center px-4 py-2 pt-6">
        <View className="w-12 h-12 justify-center items-center">
          {leftButtonIcon && onLeftButtonPress && (
            <CircularButton icon={leftButtonIcon} onPress={onLeftButtonPress} />
          )}
        </View>
        <View className="flex-1 justify-center items-center">
          {title && (
            <ThemedText variant="h3" className="text-foreground">
              {title}
            </ThemedText>
          )}
        </View>
        <View className="w-12 h-12 justify-center items-center">
          {rightButton}
        </View>
      </View>
  );
}
