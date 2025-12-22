import { ThemedText } from '@/components/ui/themed-text';
import { StyleSheet, View } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Search</ThemedText>
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
