import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import SimplePage from '@/components/ui/simple-page';
import { ThemedText } from '@/components/ui/themed-text';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ShortcutCard from '@/components/profile/ShortcutCard';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import CircularButton from '@/components/ui/circular-button';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();

  return (
    <SimplePage
      title={t('profile.title')}
      rightButton={
        <CircularButton icon="settings" onPress={() => router.push('/(app)/(modals)/settings')} />
      }
    >
      <View className="items-center my-6">
        <ProfileAvatar source={user?.user_metadata?.avatar_url || null} />
        <ThemedText className="text-2xl font-lora mt-4 text-foreground">{t('profile.greeting', { name: user?.user_metadata?.full_name || '' })}</ThemedText>
      </View>

      <View className="mb-6">
        <ThemedText className="text-xl font-lora mb-3 px-4 text-foreground">{t('profile.myOverview')}</ThemedText>
        <View className="flex-row justify-between px-2">
          <ShortcutCard title={t('profile.myDiet')} icon="restaurant-menu" onPress={() => {}} />
          <ShortcutCard title={t('profile.iDontEat')} icon="block" onPress={() => {}} />
        </View>
        <View className="flex-row justify-between px-2">
          <ShortcutCard title={t('profile.favorites')} icon="favorite" onPress={() => {}} />
          <ShortcutCard title={t('profile.cookedRecipes')} icon="history" onPress={() => {}} />
        </View>
      </View>

      <View className="mb-6">
        <ThemedText className="text-xl font-lora mb-3 px-4 text-foreground">{t('profile.cookingHistory')}</ThemedText>
        {/* Placeholder for cooking history */}
      </View>
    </SimplePage>
  );
}
