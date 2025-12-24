import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SimplePage from '@/components/ui/simple-page';
import { useTranslation } from 'react-i18next';
import List from '@/components/ui/List';
import RevenueCatUI from 'react-native-purchases-ui';

export default function SettingsScreen() {
  const { t } = useTranslation();

  const sections = [
    {
      title: 'Account Management',
      items: [
        {
          icon: 'credit_card',
          name: 'My Subscription',
          onPress: async () => {
            try {
              await RevenueCatUI.presentCustomerCenter();
            } catch (e) {
              console.error('Error presenting customer center:', e);
            }
          },
          rightContent: <Text style={{ color: '#6B7280' }}>Pro</Text>,
        },
        {
          icon: 'restaurant',
          name: 'Food Preferences',
          onPress: () => console.log('Food Preferences pressed'),
          rightContent: <Text style={{ color: '#6B7280' }}>Everything</Text>,
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          icon: 'language',
          name: 'Language',
          onPress: () => console.log('Language pressed'),
          rightContent: <Text style={{ color: '#6B7280' }}>English</Text>,
        },
        {
          icon: 'straighten',
          name: 'Measurement System',
          onPress: () => console.log('Measurement System pressed'),
          rightContent: <Text style={{ color: '#6B7280' }}>Metric</Text>,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help',
          name: 'FAQ',
          onPress: () => console.log('FAQ pressed'),
        },
        {
          icon: 'feedback',
          name: 'Feedback',
          onPress: () => console.log('Feedback pressed'),
        },
        {
          icon: 'bug_report',
          name: 'Report a Bug',
          onPress: () => console.log('Report a Bug pressed'),
        },
      ],
    },
    {
      title: 'Recommend',
      items: [
        {
          icon: 'share',
          name: 'Tell a Friend',
          onPress: () => console.log('Tell a Friend pressed'),
        },
        {
          icon: 'star',
          name: 'Rate App',
          onPress: () => console.log('Rate App pressed'),
        },
      ],
    },
    {
      title: 'Information',
      items: [
        {
          icon: 'info',
          name: 'About Us',
          onPress: () => console.log('About Us pressed'),
        },
        {
          icon: 'gavel',
          name: 'Terms of Service',
          onPress: () => console.log('Terms of Service pressed'),
        },
        {
          icon: 'privacy_tip',
          name: 'Privacy Policy',
          onPress: () => console.log('Privacy Policy pressed'),
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
