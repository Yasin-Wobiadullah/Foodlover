import React from 'react';
import { View } from 'react-native';
import { StyledText } from '../ui/StyledText';

interface SettingsGroupProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsGroup({ title, children }: SettingsGroupProps) {
  return (
    <View>
      <StyledText variant="caption" className="uppercase tracking-widest text-gray-400 mb-3 pl-2">
        {title}
      </StyledText>
      <View className="bg-[#F9F9F9] dark:bg-surface-dark rounded-[2rem] p-2 space-y-1">
        {children}
      </View>
    </View>
  );
}
