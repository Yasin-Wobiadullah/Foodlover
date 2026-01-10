import React, { useState } from 'react';
import { View, Modal, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// This would come from your data source
const mealsByDay = [
  {
    day: 'Monday',
    meals: [{ name: 'Mushroom Risotto', details: 'Dinner • 4 servings', checked: true }],
  },
  {
    day: 'Tuesday',
    meals: [{ name: 'Caprese Salad', details: 'Lunch • 2 servings', checked: true }],
  },
  {
    day: 'Wednesday',
    meals: [{ name: 'Vegetable Stir-fry', details: 'Dinner • 3 servings', checked: false }],
  },
];

interface ActiveMealsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ActiveMealsModal({ isVisible, onClose }: ActiveMealsModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-end justify-end bg-black/40 backdrop-blur-sm">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View
          style={{ paddingBottom: insets.bottom }}
          className="bg-surface-light dark:bg-surface-dark w-full rounded-t-3xl p-6 shadow-2xl max-h-[85vh]"
        >
          <View className="flex-row justify-between items-center mb-6">
            <StyledText variant="display-md">Active Meals</StyledText>
            <Pressable onPress={onClose} className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <Icon name="close" weight={600} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 space-y-6">
            {mealsByDay.map(({ day, meals }) => (
              <View key={day}>
                <StyledText variant="caption" className="uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1">
                  {day}
                </StyledText>
                {meals.map((meal) => (
                  <MealCheckbox key={meal.name} meal={meal} />
                ))}
              </View>
            ))}
          </ScrollView>

          <View className="pt-6 mt-4 border-t border-gray-100 dark:border-white/5">
            <Button
              onPress={onClose}
              label="Update List"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function MealCheckbox({ meal }: { meal: { name: string, details: string, checked: boolean }}) {
    const [isChecked, setIsChecked] = useState(meal.checked);

    return (
        <Pressable 
            onPress={() => setIsChecked(!isChecked)}
            className={cn(
                "flex-row items-start gap-4 p-4 rounded-2xl bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 transition-all shadow-sm",
                isChecked && "border-tint-green/30 bg-tint-green/5"
            )}
        >
            <View className={cn(
                "mt-1 w-5 h-5 rounded border-2 bg-gray-50 dark:bg-white/10 dark:border-white/20 transition-colors",
                isChecked ? "bg-tint-green border-tint-green" : "border-gray-300"
            )}>
               {isChecked && <Icon name="check" size={12} weight={700} color="white" className="self-center" />}
            </View>
            <View className={cn("flex-1 transition-opacity", !isChecked && "opacity-70")}>
                <StyledText variant="body-lg" className="leading-tight">{meal.name}</StyledText>
                <StyledText variant="muted" className="text-xs mt-1">{meal.details}</StyledText>
            </View>
        </Pressable>
    )
}
