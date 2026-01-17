import React from 'react';
import { View, ScrollView } from 'react-native';
import { IngredientChip } from './IngredientChip';

interface Ingredient {
  id: string;
  name: string;
  image_url?: string | null;
}

interface ActiveIngredientsProps {
  ingredients: Ingredient[];
  onRemoveIngredient?: (id: string) => void;
}

export function ActiveIngredients({ ingredients, onRemoveIngredient }: ActiveIngredientsProps) {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <View className="mb-8">
      <View className="flex-row flex-wrap gap-5">
        {ingredients.map((ingredient, index) => (
          <View 
            key={ingredient.id}
            style={{ 
              animationDelay: `${index * 50}ms`,
            }}
          >
            <IngredientChip 
              ingredient={ingredient} 
              onRemove={onRemoveIngredient}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
