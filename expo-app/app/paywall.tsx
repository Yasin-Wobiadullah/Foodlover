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
          console.log('Purchase completed:', customerInfo);
        }}
        onRestoreCompleted={({ customerInfo }) => {
          console.log('Restore completed:', customerInfo);
        }}
        onDismiss={() => {
          console.log('Paywall dismissed');
        }}
      />
    </View>
  );
}
