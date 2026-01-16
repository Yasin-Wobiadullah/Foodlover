import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../ui/Avatar';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

interface TabHeaderProps {
  title?: string;
  subtitle?: string;
  showBorder?: boolean;
  rightAction?: React.ReactNode;
}

export function TabHeader({ title, subtitle, showBorder = false, rightAction }: TabHeaderProps) {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top + 16, paddingBottom: title ? 16 : 8 }}
      className={cn(
        "px-6 flex flex-col gap-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm",
        showBorder && "border-b border-gray-100 dark:border-white/5"
      )}
    >
      {/* Top Row - Brand & Avatar */}
      <View className="flex-row justify-between items-center w-full">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-full bg-primary dark:bg-white flex items-center justify-center shadow-sm">
            <Icon name="restaurant" size={18} className="text-white dark:text-primary" />
          </View>
          <StyledText variant="body-lg" className="font-display tracking-tight">
            FoodLover
          </StyledText>
        </View>
        <Avatar source={{ uri: session?.user?.user_metadata?.avatar_url }} />
      </View>

      {/* Bottom Row - Title & Actions (optional) */}
      {title && (
        <View className="flex-row justify-between items-end">
          <View className="flex-1">
            <StyledText variant="display-lg">{title}</StyledText>
            {subtitle && (
              <StyledText variant="muted" className="mt-1">
                {subtitle}
              </StyledText>
            )}
          </View>
          {rightAction && <View>{rightAction}</View>}
        </View>
      )}
    </View>
  );
}
