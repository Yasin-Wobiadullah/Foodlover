import React from 'react';
import { View, Image } from 'react-native';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

interface Meal {
  name: string;
  description: string;
  servings: number;
  imageUrl: string;
  icon: string;
  iconColor: string;
}

interface PlannedMealCardProps {
  meal: Meal;
}

export function PlannedMealCard({ meal }: PlannedMealCardProps) {
  const { name, description, servings, imageUrl, icon, iconColor } = meal;

  return (
    <View className="px-6 mb-4">
      <View className="flex-row items-start gap-4 group">
        <View className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden relative shadow-md">
          <Image source={{ uri: imageUrl }} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </View>
        <View className="flex-1 pt-1 min-w-0">
          <View className="flex-row justify-between items-start">
            <View>
              <StyledText variant="body-lg" className="leading-tight truncate pr-2">{name}</StyledText>
              <StyledText variant="muted" className="flex-row items-center gap-1 mt-0.5">
                <Icon name={icon} size={16} style={{ color: iconColor }} /> {description}
              </StyledText>
            </View>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Icon name="drag_handle" className="text-gray-300" />
            </Button>
          </View>
          <View className="flex-row items-center gap-2 mt-3">
            <View className="h-8 px-3 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/10 flex-row items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 shadow-sm">
                <StyledText className="text-xs font-bold text-gray-500 dark:text-gray-400">{servings} people</StyledText>
                <Icon name="lock" size={14} />
            </View>
            <Button variant="secondary" size="icon" className="w-8 h-8">
              <Icon name="more_horiz" weight={600} />
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
