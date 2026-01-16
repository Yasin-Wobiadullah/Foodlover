import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Text } from 'react-native';

export const unstable_settings = {
  initialRouteName: '(tabs)',

};

export default function AppLayout() {
  const { session, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the login screen.
  if (!session) {
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(screens)" />
    </Stack>
  );
}
