import React from 'react';
import { View, Pressable } from 'react-native';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';

interface SearchResultsHeaderProps {
  resultCount: number;
  totalCount?: number;
  onFilterPress?: () => void;
}

export function SearchResultsHeader({ resultCount, totalCount = 0, onFilterPress }: SearchResultsHeaderProps) {
  return (
    <View className="flex-row justify-end items-center mb-6">
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
