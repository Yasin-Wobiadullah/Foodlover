import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { searchRecipes, SearchRecipe } from '../lib/searchService';
import i18n from '../lib/i18n';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchRecipe[];
  isSearching: boolean;
  error: string | null;
  performSearch: (query: string) => void;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchRecipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (query: string) => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setSearchQuery(query);
    setError(null);

    // If query is empty, clear results
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Set loading state immediately
    setIsSearching(true);

    // Debounce the actual search
    debounceTimer.current = setTimeout(async () => {
      try {
        const currentLanguage = i18n.language || 'en';
        const { data, error: searchError } = await searchRecipes(query, currentLanguage);

        if (searchError) {
          setError(searchError.message);
          setSearchResults([]);
        } else {
          setSearchResults(data);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce delay
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
    setIsSearching(false);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        error,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
