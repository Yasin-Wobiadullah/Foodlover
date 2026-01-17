import React from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';

interface RecipeActionBarProps {
  onSave?: () => void;
  onAddToList?: () => void;
  isSaved?: boolean;
}

export function RecipeActionBar({ onSave, onAddToList, isSaved = false }: RecipeActionBarProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 px-6 pt-6 z-50 shadow-float"
      style={{ paddingBottom: insets.bottom + 24 }}
    >
      <View className="flex-row gap-3">
        {/* Save Button */}
        <Pressable
          onPress={onSave}
          className="flex-1 py-4 rounded-2xl bg-background-light dark:bg-surface-dark flex-row items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Icon 
            name="bookmark" 
            size={24} 
            weight={isSaved ? 700 : 600}
            className={isSaved ? 'text-tint-green dark:text-tint-green-light' : 'text-primary dark:text-white'}
            style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
          />
          <StyledText className="font-bold text-primary dark:text-white">
            {t('recipe.save')}
          </StyledText>
        </Pressable>

        {/* Add to List Button */}
        <Pressable
          onPress={onAddToList}
          className="flex-[2] py-4 rounded-2xl bg-primary dark:bg-white flex-row items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl"
          style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20 }}
        >
          <Icon 
            name="shopping_bag" 
            size={24} 
            weight={600}
            className="text-white dark:text-primary"
          />
          <StyledText className="font-bold text-white dark:text-primary">
            {t('recipe.addToList')}
          </StyledText>
        </Pressable>
      </View>
    </View>
  );
}
