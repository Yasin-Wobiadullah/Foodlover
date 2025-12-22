import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { StyleSheet, View } from 'react-native';

export default function FavoritesScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
