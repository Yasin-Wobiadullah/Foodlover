import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';

interface RecipeStatsProps {
  difficulty: string | null;
  timeMinutes: number | null;
  calories: number | null;
}

export function RecipeStats({ difficulty, timeMinutes, calories }: RecipeStatsProps) {
  const { t } = useTranslation();

  // Map difficulty colors
  const getDifficultyColor = (diff: string | null) => {
    if (!diff) return 'text-gray-500';
    const lower = diff.toLowerCase();
    if (lower === 'easy') return 'text-tint-green dark:text-tint-green-light';
    if (lower === 'medium') return 'text-orange-500';
    if (lower === 'hard') return 'text-red-500';
    return 'text-gray-500';
  };

  const formatTime = (minutes: number | null) => {
    if (!minutes) return '--';
    return `${Math.round(minutes)} min`;
  };

  const formatCalories = (calories: number | null) => {
    if (!calories) return '--';
    return Math.round(calories).toString();
  };

  return (
    <View className="flex-row items-center justify-between mt-8">
      {/* Difficulty */}
      <View className="flex-row items-center gap-3 bg-background-light dark:bg-surface-dark p-3 pr-5 rounded-full">
        <View className={`w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center ${getDifficultyColor(difficulty)}`}>
          <Icon 
            name="signal_cellular_alt" 
            size={20}
            weight={600}
            style={{ fontVariationSettings: "'FILL' 1" }}
          />
        </View>
        <View>
          <StyledText className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {t('recipe.level')}
          </StyledText>
          <StyledText className="text-sm font-bold text-primary dark:text-white">
            {difficulty || 'Medium'}
          </StyledText>
        </View>
      </View>

      {/* Time */}
      <View className="flex-row items-center gap-3 bg-background-light dark:bg-surface-dark p-3 pr-5 rounded-full">
        <View className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-tint-green dark:text-tint-green-light">
          <Icon 
            name="schedule" 
            size={20}
            weight={600}
            className="text-tint-green dark:text-tint-green-light"
            style={{ fontVariationSettings: "'FILL' 1" }}
          />
        </View>
        <View>
          <StyledText className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {t('recipe.time')}
          </StyledText>
          <StyledText className="text-sm font-bold text-primary dark:text-white">
            {formatTime(timeMinutes)}
          </StyledText>
        </View>
      </View>

      {/* Calories */}
      <View className="flex-row items-center gap-3 bg-background-light dark:bg-surface-dark p-3 pr-5 rounded-full">
        <View className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-red-500">
          <Icon 
            name="local_fire_department" 
            size={20}
            weight={600}
            className="text-red-500"
            style={{ fontVariationSettings: "'FILL' 1" }}
          />
        </View>
        <View>
          <StyledText className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {t('recipe.energy')}
          </StyledText>
          <StyledText className="text-sm font-bold text-primary dark:text-white">
            {formatCalories(calories)}
          </StyledText>
        </View>
      </View>
    </View>
  );
}
