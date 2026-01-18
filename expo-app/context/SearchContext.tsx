import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { searchRecipes, SearchRecipe } from '../lib/searchService';
import i18n from '../lib/i18n';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchRecipe[];
  isSearching: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  performSearch: (query: string) => void;
  loadMore: () => void;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchRecipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const ITEMS_PER_PAGE = 10;

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
        const { data, error: searchError } = await searchRecipes(
          query,
          currentLanguage,
          undefined,
          ITEMS_PER_PAGE,
          0
        );

        if (searchError) {
          setError(searchError.message);
          setSearchResults([]);
          setHasMore(false);
        } else {
          setSearchResults(data);
          setOffset(ITEMS_PER_PAGE);
          // If we got fewer results than requested, we've reached the end
          setHasMore(data.length === ITEMS_PER_PAGE);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setSearchResults([]);
        setHasMore(false);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce delay
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore || !searchQuery) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const currentLanguage = i18n.language || 'en';
      const { data, error: searchError } = await searchRecipes(
        searchQuery,
        currentLanguage,
        undefined,
        ITEMS_PER_PAGE,
        offset
      );

      if (searchError) {
        setError(searchError.message);
      } else {
        // Filter out duplicates before appending
        setSearchResults(prev => {
          const existingIds = new Set(prev.map(r => r.id));
          const newRecipes = data.filter(r => !existingIds.has(r.id));
          return [...prev, ...newRecipes];
        });
        setOffset(prev => prev + ITEMS_PER_PAGE);
        // If we got fewer results than requested, we've reached the end
        setHasMore(data.length === ITEMS_PER_PAGE);
      }
    } catch (err) {
      setError('Failed to load more results');
    } finally {
      setIsLoadingMore(false);
    }
  }, [searchQuery, offset, hasMore, isLoadingMore]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
    setIsSearching(false);
    setIsLoadingMore(false);
    setHasMore(true);
    setOffset(0);
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
        isLoadingMore,
        hasMore,
        error,
        performSearch,
        loadMore,
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
