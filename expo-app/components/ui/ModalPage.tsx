import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StyledText } from './StyledText';
import { Icon } from './Icon';

interface ModalPageProps {
  title: string;
  children: React.ReactNode;
}

export function ModalPage({ title, children }: ModalPageProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-background-dark">
      <View style={{ paddingTop: insets.top }} className="px-6 pb-2 flex-row justify-between items-center sticky top-0 z-10 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md">
        <StyledText variant="display-lg">{title}</StyledText>
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 dark:bg-surface-dark flex items-center justify-center"
        >
          <Icon name="close" size={20} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >
        {children}
      </ScrollView>
    </View>
  );
}
