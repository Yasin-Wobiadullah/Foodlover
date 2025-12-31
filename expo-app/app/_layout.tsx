import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { MaterialSymbols_400Regular, MaterialSymbols_700Bold, MaterialSymbols_600SemiBold } from '@expo-google-fonts/material-symbols';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { RevenueCatProvider, useRevenueCat } from '../context/RevenueCatContext';
import { useRouter, useSegments, Redirect } from 'expo-router';
import Purchases from 'react-native-purchases';

// Reduce noisy debug logs like "Vending Offerings from memory cache"
Purchases.setLogLevel(Purchases.LOG_LEVEL.INFO);

// Configure Purchases once; guard against re-configuring during fast refresh
Purchases.isConfigured().then((configured) => {
  if (!configured && process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY) {
    Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY });
  }
});

export const unstable_settings = {
  initialRouteName: '(app)',
};

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const { user } = useRevenueCat();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    const inApp = segments[0] === '(app)';
    const isPaywall = (segments as string[]).includes('paywall');

    if (!session && inApp) {
      router.replace('/login');
    } else if (session && !user.isPro && inApp && !isPaywall) {
      router.replace('/paywall');
    } else if (session && user.isPro) {
        // If user is pro, they shouldn't be on paywall or login
        const isLogin = segments.length === 1 && segments[0] === 'login';
        if (isLogin || isPaywall) {
            router.replace('/');
        }
    }
  }, [session, loading, segments, user.isPro]);

  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  
  const [fontsLoaded, fontError] = useFonts({
    'Lora_400Regular': Lora_400Regular,
    'Lora_700Bold': Lora_700Bold,
    'Inter_400Regular': Inter_400Regular,
    'Inter_600SemiBold': Inter_600SemiBold,
    'Inter_700Bold': Inter_700Bold,
    'MaterialSymbols_400Regular': MaterialSymbols_400Regular,
    'MaterialSymbols_700Bold': MaterialSymbols_700Bold,
    'MaterialSymbols_600SemiBold': MaterialSymbols_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <RevenueCatProvider>
          <AuthProvider>
            <ThemeProvider value={DefaultTheme}>
              <RootLayoutNav />
              <StatusBar style="auto" />
            </ThemeProvider>
          </AuthProvider>
        </RevenueCatProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
