import { SearchResultsList } from '@/components/search/SearchResultsList';
import { useSearch } from '@/context/SearchContext';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

export default function SearchScreen() {
  const { searchQuery } = useSearch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchResultsList searchQuery={searchQuery} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
});
