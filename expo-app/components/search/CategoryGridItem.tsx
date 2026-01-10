import React from 'react';
import { View, Pressable } from 'react-native';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

interface Category {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface CategoryGridItemProps {
  category: Category;
}

export function CategoryGridItem({ category }: CategoryGridItemProps) {
  const { name, icon, color, bgColor } = category;

  return (
    <Pressable className="group">
      <View
        className={cn(
          'p-5 rounded-3xl bg-white dark:bg-surface-dark shadow-card flex flex-col items-center justify-center gap-3 border border-white/50 dark:border-white/5',
          'group-hover:shadow-soft transition-shadow'
        )}
      >
        <View
          style={{ backgroundColor: bgColor }}
          className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
        >
          <Icon name={icon} size={30} style={{ color }} isFilled />
        </View>
        <StyledText variant="body-md">{name}</StyledText>
      </View>
    </Pressable>
  );
}
