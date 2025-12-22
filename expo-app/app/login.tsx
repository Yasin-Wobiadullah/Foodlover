import React from 'react';
import { View, StyleSheet } from 'react-native';
import Auth from '@/components/auth/Auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
  });

  return (
    <View style={styles.container}>
      <Auth />
    </View>
  );
}
