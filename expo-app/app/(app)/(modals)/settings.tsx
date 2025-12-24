import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SimplePage from '@/components/ui/simple-page';
import { useTranslation } from 'react-i18next';
import List from '@/components/ui/List';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/themed-text';
import { useRevenueCat } from '@/context/RevenueCatContext';
import RevenueCatUI from 'react-native-purchases-ui';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useRevenueCat();

  const sections = [
    {
      title: t('settings.accountManagement'),
      items: [
        {
          icon: 'credit_card',
          name: t('settings.mySubscription'),
          onPress: async () => {
            router.back();
            try {
              await RevenueCatUI.presentCustomerCenter();
            } catch (e) {
              console.error('Error presenting customer center:', e);
            }
          },
          rightContent: user.isPro ? <Text style={{ color: '#6B7280' }}>Pro</Text> : null,
        },
        {
          icon: 'restaurant',
          name: t('settings.foodPreferences'),
          onPress: () => {},
          rightContent: <Text style={{ color: '#6B7280' }}>{t('settings.everything')}</Text>,
        },
      ],
    },
    {
      title: t('settings.system'),
      items: [
        {
          icon: 'language',
          name: t('settings.language'),
          onPress: () => {},
          rightContent: <Text style={{ color: '#6B7280' }}>{t('settings.english')}</Text>,
        },
        {
          icon: 'straighten',
          name: t('settings.measurementSystem'),
          onPress: () => {},
          rightContent: <Text style={{ color: '#6B7280' }}>{t('settings.metric')}</Text>,
        },
      ],
    },
    {
      title: t('settings.support'),
      items: [
        {
          icon: 'help',
          name: t('settings.faq'),
          onPress: () => {},
        },
        {
          icon: 'feedback',
          name: t('settings.feedback'),
          onPress: () => {},
        },
        {
          icon: 'bug_report',
          name: t('settings.reportABug'),
          onPress: () => {},
        },
      ],
    },
    {
      title: t('settings.recommend'),
      items: [
        {
          icon: 'share',
          name: t('settings.tellAFriend'),
          onPress: () => {},
        },
        {
          icon: 'star',
          name: t('settings.rateApp'),
          onPress: () => {},
        },
      ],
    },
    {
      title: t('settings.information'),
      items: [
        {
          icon: 'info',
          name: t('settings.aboutUs'),
          onPress: () => {},
        },
        {
          icon: 'gavel',
          name: t('settings.termsOfService'),
          onPress: () => {},
        },
        {
          icon: 'privacy_tip',
          name: t('settings.privacyPolicy'),
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SimplePage title={t('settings.title')}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingTop: 20 }}>
          <List sections={sections} />
        </View>
      </ScrollView>
    </SimplePage>
  );
}
