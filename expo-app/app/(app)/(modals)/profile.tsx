import React from 'react';
import { View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import SimplePage from '@/components/ui/simple-page';
import { ThemedText } from '@/components/ui/themed-text';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ShortcutCard from '@/components/profile/ShortcutCard';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <SimplePage
      title={t('profile.title')}
      rightButton={
        <Button variant="icon" size="icon" onPress={() => router.push('/(app)/(modals)/settings')}>
          <MaterialIcons
            name="settings"
            size={28}
            className="text-foreground"
          />
        </Button>
      }
    >
      <ProfileAvatar source={null} />

      <View className="mb-6">
        <ThemedText className="text-xl font-bold mb-3 px-4 text-foreground">{t('profile.myOverview')}</ThemedText>
        <View className="flex-row justify-between px-2">
          <ShortcutCard title={t('profile.myDiet')} icon="restaurant-menu" onPress={() => {}} />
          <ShortcutCard title={t('profile.iDontEat')} icon="no-food" onPress={() => {}} />
        </View>
        <View className="flex-row justify-between px-2">
          <ShortcutCard title={t('profile.favorites')} icon="favorite" onPress={() => {}} />
          <ShortcutCard title={t('profile.cookedRecipes')} icon="history" onPress={() => {}} />
        </View>
      </View>

      <View className="mb-6">
        <ThemedText className="text-xl font-bold mb-3 px-4 text-foreground">{t('profile.cookingHistory')}</ThemedText>
        {/* Placeholder for cooking history */}
      </View>
    </SimplePage>
  );
}
