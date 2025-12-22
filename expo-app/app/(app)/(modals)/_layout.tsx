import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="profile" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}
