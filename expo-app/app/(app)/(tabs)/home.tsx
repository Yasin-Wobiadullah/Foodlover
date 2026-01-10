import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeHeader } from '../../../components/home/HomeHeader';
import { DailyInspirationCard } from '../../../components/home/DailyInspirationCard';
import { CollectionCard } from '../../../components/home/CollectionCard';
import { StyledText } from '../../../components/ui/StyledText';
import { SearchInput } from '../../../components/ui/SearchInput';
import { Button } from '../../../components/ui/Button'; // This will cause an error until Button.tsx is created
import { Icon } from '../../../components/ui/Icon';

const collections = [
  {
    name: 'Favorites',
    recipeCount: 15,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcJ0uNgfTWGUC-zj0DpXKWnSD7NDJk8ZUPKXQE4IccLpw60eTPe-B8r1QMJv8E1VI44c7-0kAH3MJFb5Aos0qR8ZdhjAQY34xr1UjL8OHMc5xm2U4Os6MVcVCVD-HkUpx49ltl3b4cJxGwnZXNZAbEi0zVYE654MEsMJ6pDRWKRsrgkwm28dDq2VdaQEBVEk4ME5Tg0IhJHhUdjBTaUPBlEUlBYzDWx_XxgYNmxQzHhKakBfO5mqKa2UDjlXSt4wK4SL4_kYhE8x8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxYfhZ3e1ukO5BMjKcr0Qm8DuQVAQCimdifGxU-R14v9e6oCZUSKVxh3PtRVVi5v2i6TeFWQ1Uz_RYXDO4nqOB2TtXPlLV-ZyBEiwfBfTy7I31KyJB1G-b6NEMIpcR4hgPKFwQXOfiTa7n6biqKhGVPJlokzmiW2jVXSCezXcywjKMR8Q1yhh7IyQAVSe90HmNmQYV4XLm_lMDEpi1Er_urpBf8hY-CuSfqVCpAva7vuf91fDTQP7iombEl4m4mknV-LEI-5aq37M',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1i2rANlUfapOdr1dWamCHrtPUz5UfmQFgwUt1oy2rmwIEiXrOZatXPvKgUmSOSPZGBQRxrS50kKq-RUwyXtgobJGFJX1DTvCmqGEWoc4VfWhWtLwZP5247Br4_L9kbF6LLgph4m_ABpgMDOcF47vhaZ1wm4SEABZvBvITNB78JPysrPIncEoTZwRkt9GqKtjKtwoOHiO7yssz3rJgjiJVp4tIp0NFJwRYZRbRyrrkNenx9oj7DK6ZE2tij8jrigt20bSXMogpnME',
      'https://...some-other-image.jpg'
    ],
  },
  {
    name: 'Healthy Eats',
    recipeCount: 8,
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBxYfhZ3e1ukO5BMjKcr0Qm8DuQVAQCimdifGxU-R14v9e6oCZUSKVxh3PtRVVi5v2i6TeFWQ1Uz_RYXDO4nqOB2TtXPlLV-ZyBEiwfBfTy7I31KyJB1G-b6NEMIpcR4hgPKFwQXOfiTa7n6biqKhGVPJlokzmiW2jVXSCezXcywjKMR8Q1yhh7IyQAVSe90HmNmQYV4XLm_lMDEpi1Er_urpBf8hY-CuSfqVCpAva7vuf91fDTQP7iombEl4m4mknV-LEI-5aq37M'],
  },
  {
    name: 'Breakfast',
    recipeCount: 4,
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC1i2rANlUfapOdr1dWamCHrtPUz5UfmQFgwUt1oy2rmwIEiXrOZatXPvKgUmSOSPZGBQRxrS50kKq-RUwyXtgobJGFJX1DTvCmqGEWoc4VfWhWtLwZP5247Br4_L9kbF6LLgph4m_ABpgMDOcF47vhaZ1wm4SEABZvBvITNB78JPysrPIncEoTZwRkt9GqKtjKtwoOHiO7yssz3rJgjiJVp4tIp0NFJwRYZRbRyrrkNenx9oj7DK6ZE2tij8jrigt20bSXMogpnME'],
  }
];


export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <View className="px-6 pt-4 pb-8">
          <SearchInput placeholder="Find something tasty..." />
        </View>

        <View className="px-6 mb-10">
          <View className="flex-row justify-between items-baseline mb-5">
            <StyledText variant="display-md">Daily Inspo</StyledText>
            <Button variant="ghost" size="sm" label="See all ">
              <Icon name="arrow_forward" size={16} />
            </Button>
          </View>
          <DailyInspirationCard />
        </View>

        <View className="mb-10 pl-6">
          <View className="flex-row justify-between items-center mb-6 pr-6">
            <StyledText variant="display-sm">Your Collections</StyledText>
            <Button variant="primary" size="icon">
              <Icon name="add" size={20} className="text-white dark:text-primary" />
            </Button>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
            <View className="flex-row gap-5 pr-6">
              {collections.map((collection) => (
                <CollectionCard key={collection.name} collection={collection} />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
