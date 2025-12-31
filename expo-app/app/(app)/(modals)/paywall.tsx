import React from 'react';
import { View } from 'react-native';
import RevenueCatUI from 'react-native-purchases-ui';

export default function PaywallScreen() {
  return (
    <View style={{ flex: 1 }}>
      <RevenueCatUI.Paywall
        options={{
          offering: null,
        }}
        onPurchaseCompleted={({ customerInfo }) => {
          console.log('Paywall Purchase completed:', JSON.stringify(customerInfo, null, 2));
        }}
        onRestoreCompleted={({ customerInfo }) => {
          console.log('Paywall Restore completed:', JSON.stringify(customerInfo, null, 2));
        }}
        onDismiss={() => {
          console.log('Paywall dismissed');
        }}
      />
    </View>
  );
}
