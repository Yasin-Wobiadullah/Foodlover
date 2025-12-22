import React from 'react';
import { View, StyleSheet } from 'react-native';
import SimplePage from '@/components/ui/simple-page';
import { ThemedText } from '@/components/ui/themed-text';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <SimplePage title={t('settings.title')}>
      <View style={styles.content}>
        <ThemedText type="title">Settings Content</ThemedText>
        <ThemedText>This is a placeholder for the settings page.</ThemedText>
      </View>
    </SimplePage>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
});
