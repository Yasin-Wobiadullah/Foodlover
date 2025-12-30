import React from 'react';
import { View } from 'react-native';
import Auth from '@/components/auth/Auth';

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center bg-background">
      <Auth />
    </View>
  );
}
