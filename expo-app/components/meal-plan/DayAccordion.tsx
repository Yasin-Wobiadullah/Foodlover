import React, { useState } from 'react';
import { View, Pressable, UIManager, LayoutAnimation, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface DayAccordionProps {
  day: string;
  mealCount?: number;
  children: React.ReactNode;
}

export function DayAccordion({ day, mealCount, children }: DayAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const rotation = useSharedValue(0);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    rotation.value = withTiming(isOpen ? -180 : 0, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View className="border-b border-gray-100 dark:border-white/5">
        <Pressable
            onPress={toggleOpen}
            className="w-full px-6 py-5 flex-row items-center justify-between group"
        >
            <View className="flex-row items-center gap-2">
                <StyledText className="text-sm font-bold tracking-widest uppercase text-primary dark:text-white">
                    {day}
                </StyledText>
                {mealCount && (
                    <StyledText className="text-xs font-medium text-tint-green bg-tint-green/10 px-2 py-0.5 rounded-full">
                        {mealCount} meals
                    </StyledText>
                )}
            </View>
             <Animated.View style={animatedStyle}>
                <Icon name={isOpen ? "remove" : "add"} weight={600} className="text-gray-400 group-hover:text-tint-green" />
            </Animated.View>
        </Pressable>
        {isOpen && <View className="pb-6">{children}</View>}
    </View>
  );
}
