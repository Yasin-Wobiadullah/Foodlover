import React, { useEffect } from 'react';
import { View } from 'react-native';
import SimplePage from '@/components/ui/simple-page';
import { useTranslation } from 'react-i18next';
import RevenueCatUI from 'react-native-purchases-ui';
import { useRouter } from 'expo-router';

export default function CustomerCenterScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const presentCustomerCenter = async () => {
      try {
        await RevenueCatUI.presentCustomerCenter();
      } catch (e) {
        // handle error
      } finally {
        router.back();
      }
    };
    presentCustomerCenter();
  }, []);

  return (
    <SimplePage title={t('customerCenter.title')}>
      <View style={{ padding: 20 }} />
    </SimplePage>
  );
}
