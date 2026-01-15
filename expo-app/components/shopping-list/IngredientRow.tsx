import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

interface Ingredient {
  name: string;
  notes?: string;
  isChecked?: boolean;
}

interface IngredientRowProps {
  ingredient: Ingredient;
}

export function IngredientRow({ ingredient }: IngredientRowProps) {
  const [isChecked, setIsChecked] = useState(ingredient.isChecked || false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Pressable
      onPress={toggleCheckbox}
      className="group/item flex-row items-center gap-4 py-2 transition-opacity hover:opacity-80"
    >
      <View
        className={cn(
          'w-6 h-6 rounded-lg border-[2.5px] border-gray-200 dark:border-gray-600 flex items-center justify-center transition-colors flex-shrink-0',
          isChecked && 'bg-tint-green border-tint-green'
        )}
      >
        <Icon
          name="check"
          size={16}
          style={{fontVariationSettings: "'wght' 600"}}
          className={cn('text-white transition-all', isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-50')}
        />
      </View>
      <View
        className={cn(
          'flex-1 transition-colors',
          isChecked && 'opacity-50'
        )}
      >
        <StyledText
          variant="body-lg"
          className={cn('leading-snug', isChecked && 'line-through text-gray-text-light')}
        >
          {ingredient.name}
        </StyledText>
        {ingredient.notes && (
          <StyledText variant="muted" className="text-xs">
            {ingredient.notes}
          </StyledText>
        )}
      </View>
    </Pressable>
  );
}
