import { SearchProvider, useSearch } from '@/context/SearchContext';
import { Stack } from 'expo-router';
import React from 'react';

function SearchStack() {
  const { setSearchQuery } = useSearch();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Search',
          headerSearchBarOptions: {
            placement: 'automatic',
            placeholder: 'Search recipes...',
            onChangeText: (event) => setSearchQuery(event.nativeEvent.text),
          },
        }}
      />
    </Stack>
  );
}

export default function SearchLayout() {
  return (
    <SearchProvider>
      <SearchStack />
    </SearchProvider>
  );
}
