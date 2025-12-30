import React from 'react';
import RevenueCatUI from 'react-native-purchases-ui';
import SimplePage from '@/components/ui/simple-page';
import { useTranslation } from 'react-i18next';

export default function CustomerCenterScreen() {
  const { t } = useTranslation();

  return (
    <SimplePage title={t('customerCenter.title')}>
      <RevenueCatUI.CustomerCenterView style={{ flex: 1 }} />
    </SimplePage>
  );
}
