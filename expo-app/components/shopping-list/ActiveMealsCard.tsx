import React from 'react';
import { View, Pressable } from 'react-native';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';

interface ActiveMealsCardProps {
  onPress?: () => void;
}

export function ActiveMealsCard({ onPress }: ActiveMealsCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full py-4 px-5 bg-primary dark:bg-white rounded-2xl shadow-lg flex-row items-center justify-between active:scale-[0.98] transition-transform group/btn"
    >
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center group-hover/btn:bg-tint-green/20 transition-colors">
          <Icon name="restaurant" size={22} isFilled className="text-white dark:text-primary" />
        </View>
        <View className="flex-col items-start">
          <StyledText className="text-white dark:text-primary font-bold font-display text-base leading-none">
            3 Meals Active
          </StyledText>
          <StyledText className="text-white/60 dark:text-primary/60 text-xs font-medium mt-1">
            Check to manage items
          </StyledText>
        </View>
      </View>
      <View className="w-8 h-8 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center group-hover/btn:bg-tint-green text-white dark:text-primary group-hover/btn:text-white transition-colors">
        <Icon name="edit" size={18} weight={600} />
      </View>
    </Pressable>
  );
}
