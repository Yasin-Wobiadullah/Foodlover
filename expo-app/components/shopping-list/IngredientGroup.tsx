import React, { useState } from 'react';
import { View, Pressable, UIManager, LayoutAnimation, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Card } from '../ui/Card';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface IngredientGroupProps {
  title: string;
  count: number;
  isTinted?: boolean;
  children: React.ReactNode;
}

export function IngredientGroup({ title, count, isTinted, children }: IngredientGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const rotation = useSharedValue(0);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    rotation.value = withTiming(isOpen ? 180 : 0, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Card variant="flat" className="p-5">
      <Pressable onPress={toggleOpen} className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <StyledText variant="display-sm" className="font-black">{title}</StyledText>
          <View
            className={cn(
              'px-2.5 py-1 rounded-lg',
              isTinted ? 'bg-tint-green-light dark:bg-tint-green/20' : 'bg-gray-100 dark:bg-gray-800'
            )}
          >
            <StyledText
              className={cn(
                'text-xs font-extrabold',
                isTinted ? 'text-tint-green dark:text-tint-green-light' : 'text-gray-500'
              )}
            >
              {count}
            </StyledText>
          </View>
        </View>
        <Animated.View style={animatedStyle}>
          <Icon name="keyboard_arrow_down" weight={600} className="text-gray-400" />
        </Animated.View>
      </Pressable>

      {isOpen && (
        <View className="mt-4 pt-2 border-t border-gray-100 dark:border-white/5">
          {children}
        </View>
      )}
    </Card>
  );
}
