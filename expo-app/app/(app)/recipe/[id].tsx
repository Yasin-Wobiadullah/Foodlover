import { ThemedText } from '@/components/ui/themed-text';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ThemedText variant="h1">Recipe Detail</ThemedText>
      <ThemedText>Recipe ID: {id}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
