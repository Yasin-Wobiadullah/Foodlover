import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './themed-text';
import ListItem from './ListItem';

type ListSectionProps = {
  title: string;
  items: React.ComponentProps<typeof ListItem>[];
};

const ListSection: React.FC<ListSectionProps> = ({ title, items }) => (
  <View className="mb-6">
    <ThemedText className="text-xl font-inter-bold mb-3 px-4">{title}</ThemedText>
    {items.map((item, index) => (
      <ListItem key={index} {...item} />
    ))}
  </View>
);

type ListProps = {
  sections: ListSectionProps[];
};

const List: React.FC<ListProps> = ({ sections }) => (
  <View>
    {sections.map((section, index) => (
      <ListSection key={index} {...section} />
    ))}
  </View>
);

export default List;
