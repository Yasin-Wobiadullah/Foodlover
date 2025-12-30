import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ThemedText } from './themed-text';

type ListItemProps = {
  icon: string;
  name: string;
  description?: string;
  onPress?: () => void;
  rightContent?: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({ icon, name, description, onPress, rightContent }) => (
  <Pressable onPress={onPress} className="flex-row items-center p-4">
    <Text className="font-material text-2xl mr-4">{icon}</Text>
    <View className="flex-1">
      <ThemedText className="text-lg">{name}</ThemedText>
      {description && <ThemedText className="text-sm text-gray-500">{description}</ThemedText>}
    </View>
    {rightContent}
  </Pressable>
);

export default ListItem;
