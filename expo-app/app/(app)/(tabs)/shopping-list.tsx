import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShoppingListHeader } from '../../../components/shopping-list/ShoppingListHeader';
import { ActiveMealsCard } from '../../../components/shopping-list/ActiveMealsCard';
import { IngredientGroup } from '../../../components/shopping-list/IngredientGroup';
import { IngredientRow } from '../../../components/shopping-list/IngredientRow';
import { ActiveMealsModal } from '../../../components/shopping-list/ActiveMealsModal';
import { SearchInput } from '../../../components/ui/SearchInput';

const produce = [
  { name: 'Avocados', notes: '2 ripe ones' },
  { name: 'Baby Spinach', notes: '1 large bag' },
  { name: 'Fresh Basil', notes: 'For garnish', isChecked: true },
];

const pantry = [
  { name: 'Spaghetti', notes: 'De Cecco brand' },
  { name: 'Olive Oil', notes: '750ml, Extra Virgin' },
];

const dairy = [
    { name: 'Free-Range Eggs', notes: 'Pack of 12, Large' },
    { name: 'Parmesan', notes: 'Wedge, not grated' },
]

export default function ShoppingListScreen() {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <ShoppingListHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <View className="px-4 pt-4">
            <View className="space-y-3 mb-8">
                <SearchInput placeholder="Search ingredients..." />
                <ActiveMealsCard onPress={() => setModalVisible(true)} />
            </View>

            <View className="flex-col gap-4">
                <IngredientGroup title="Produce" count={produce.length} isTinted>
                    {produce.map((item) => <IngredientRow key={item.name} ingredient={item} />)}
                </IngredientGroup>
                <IngredientGroup title="Pantry" count={pantry.length}>
                    {pantry.map((item) => <IngredientRow key={item.name} ingredient={item} />)}
                </IngredientGroup>
                 <IngredientGroup title="Dairy & Eggs" count={dairy.length}>
                    {dairy.map((item) => <IngredientRow key={item.name} ingredient={item} />)}
                </IngredientGroup>
            </View>
        </View>
      </ScrollView>
      <ActiveMealsModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}
