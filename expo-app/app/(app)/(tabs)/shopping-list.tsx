import { ThemedText } from '@/components/ui/themed-text';
import { StyleSheet, View } from 'react-native';

export default function ShoppingListScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Shopping List</ThemedText>
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
