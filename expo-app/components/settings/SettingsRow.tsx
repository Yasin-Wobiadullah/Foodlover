import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';
import { Switch } from '../ui/Switch';

type SettingsRowProps = {
  icon: string;
  label: string;
  value?: string;
  valueBg?: string;
  type: 'navigate' | 'external' | 'switch' | 'segmented';
  onPress?: () => void;
  children?: React.ReactNode;
};

export function SettingsRow({ icon, label, value, valueBg, type, onPress, children }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center justify-between p-4 hover:bg-white dark:hover:bg-white/5 rounded-3xl transition-colors group"
    >
      <View className="flex-row items-center gap-4">
        <Text className="text-xl">{icon}</Text>
        <StyledText variant="body-sm" className="font-bold">{label}</StyledText>
      </View>
      <View className="flex-row items-center gap-2">
        {value && (
            <View style={{ backgroundColor: valueBg }} className="px-2 py-1 rounded-lg">
                <StyledText className="text-xs font-bold text-tint-green">{value}</StyledText>
            </View>
        )}
        {type === 'navigate' && <Icon name="chevron_right" size={20} className="text-gray-300 group-hover:text-primary dark:group-hover:text-white transition-colors" />}
        {type === 'external' && <Icon name="arrow_outward" size={20} className="text-gray-300 group-hover:text-primary dark:group-hover:text-white transition-colors" />}
        {type === 'switch' && <Switch />}
        {children}
      </View>
    </Pressable>
  );
}
