import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { MaterialSymbols_400Regular, MaterialSymbols_700Bold } from '@expo-google-fonts/material-symbols';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '../context/AuthContext';
import { RevenueCatProvider } from '../context/RevenueCatContext';

export const unstable_settings = {
  initialRouteName: '(app)',
};

function RootLayoutNav() {
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
  
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    'Lora_400Regular': Lora_400Regular,
    'Lora_700Bold': Lora_700Bold,
    'Inter_400Regular': Inter_400Regular,
    'Inter_600SemiBold': Inter_600SemiBold,
    'Inter_700Bold': Inter_700Bold,
    'MaterialSymbols_400Regular': MaterialSymbols_400Regular,
    'MaterialSymbols_700Bold': MaterialSymbols_700Bold,
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
        <AuthProvider>
          <RevenueCatProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <RootLayoutNav />
              <StatusBar style="auto" />
            </ThemeProvider>
          </RevenueCatProvider>
        </AuthProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
