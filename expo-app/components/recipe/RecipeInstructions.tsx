import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyledText } from '../ui/StyledText';

interface Instruction {
  step_number: number;
  description: string;
}

interface RecipeInstructionsProps {
  instructions: Instruction[];
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  const { t } = useTranslation();

  if (!instructions || instructions.length === 0) {
    return null;
  }

  return (
    <View className="mb-4">
      <StyledText variant="display-sm" className="mb-6">
        {t('recipe.instructions')}
      </StyledText>
      <View className="flex-col gap-6">
        {instructions.map((instruction) => (
          <View key={instruction.step_number} className="flex-row items-start gap-4">
            <View className="flex-shrink-0 w-8 h-8 rounded-full bg-tint-green/10 dark:bg-tint-green/20 text-tint-green dark:text-tint-green-light flex items-center justify-center mt-0.5">
              <StyledText className="font-display font-bold text-sm text-tint-green dark:text-tint-green-light">
                {instruction.step_number}
              </StyledText>
            </View>
            <StyledText className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium pt-1 flex-1">
              {instruction.description}
            </StyledText>
          </View>
        ))}
      </View>
    </View>
  );
}
