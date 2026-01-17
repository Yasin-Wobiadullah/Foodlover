import React from 'react';
import { View, Pressable } from 'react-native';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';

interface SearchResultsHeaderProps {
  resultCount: number;
  onFilterPress?: () => void;
}

export function SearchResultsHeader({ resultCount, onFilterPress }: SearchResultsHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mb-5">
      <StyledText className="text-sm font-bold text-gray-400 uppercase tracking-wider">
        {resultCount} {resultCount === 1 ? 'Result' : 'Results'}
      </StyledText>
      <Pressable 
        onPress={onFilterPress}
        className="flex-row items-center gap-1"
      >
        <Icon 
          name="tune" 
          size={18} 
          className="text-tint-green dark:text-tint-green-light"
        />
        <StyledText className="text-sm font-bold text-tint-green dark:text-tint-green-light">
          Filters
        </StyledText>
      </Pressable>
    </View>
  );
}
