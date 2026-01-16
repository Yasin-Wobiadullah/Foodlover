import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabHeader } from '../../../components/navigation/TabHeader';
import { DayAccordion } from '../../../components/meal-plan/DayAccordion';
import { PlannedMealCard } from '../../../components/meal-plan/PlannedMealCard';

const meals = [
  {
    name: 'Tortellini Soup',
    description: 'Aromatics basics',
    servings: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSnhg2K84nYp1hYrsvSHdfx-exVcf3Lw68CMALr_AG0A5EKvCrGWq7rZYTu0d1pCRNnm-oMWj_FapiQ6-9ZE4VR0pS001tv4rHuuFvWCATrMYSfwQ-0RqUR7dVZDk18GGscDGFcOJYvrG7VfOLqU4EStrE8Ry6DCaj_JY_qXg2gA3znbQseUVSBDude_Kjs0fR8lcc9s7hTt46p-7xyqMaM16EBh4cg6HNR23gu7VX4bOb2WDuxOfKz-p6LG3S57OLm5m72aEUjj4',
    icon: 'local_fire_department',
    iconColor: '#FFA500',
  },
  {
    name: 'Avocado Toast',
    description: 'Quick Breakfast',
    servings: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcJ0uNgfTWGUC-zj0DpXKWnSD7NDJk8ZUPKXQE4IccLpw60eTPe-B8r1QMJv8E1VI44c7-0kAH3MJFb5Aos0qR8ZdhjAQY34xr1UjL8OHMc5xm2U4Os6MVcVCVD-HkUpx49ltl3b4cJxGwnZXNZAbEi0zVYE654MEsMJ6pDRWKRsrgkwm28dDq2VdaQEBVEk4ME5Tg0IhJHhUdjBTaUPBlEUlBYzDWx_XxgYNmxQzHhKakBfO5mqKa2UDjlXSt4wK4SL4_kYhE8x8',
    icon: 'eco',
    iconColor: '#16A34A',
  },
];

const days = ['Today', 'Tomorrow', 'Friday', 'Saturday', 'Sunday', 'Monday'];

export default function MealPlanScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-background-dark">
      <TabHeader title="Meal Plan" showBorder />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <View className="flex-col">
          <DayAccordion day="Any Day">
            <></>
          </DayAccordion>
          <DayAccordion day="Today" mealCount={2}>
            {meals.map((meal) => (
              <PlannedMealCard key={meal.name} meal={meal} />
            ))}
          </DayAccordion>
          {days.slice(1).map((day) => (
            <DayAccordion key={day} day={day}>
               <></>
            </DayAccordion>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
