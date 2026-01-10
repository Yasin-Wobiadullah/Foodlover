import * as React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';
import { Icon } from './Icon';

export interface SearchInputProps extends TextInputProps {}

const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <View className="relative group">
        <TextInput
          ref={ref}
          className={cn(
            'w-full py-4 pl-12 pr-4 bg-white dark:bg-surface-dark border-0 rounded-2xl shadow-card text-base font-bold placeholder-gray-400 text-primary dark:text-white focus:ring-2 focus:ring-tint-green transition-all',
            className
          )}
          placeholderTextColor="#A1A1AA"
          {...props}
        />
        <Icon
          name="search"
          size={24}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          weight={600}
        />
      </View>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
