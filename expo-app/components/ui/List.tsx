import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import ListItem from './ListItem';

type ListSectionProps = {
  title: string;
  items: React.ComponentProps<typeof ListItem>[];
};

const ListSection: React.FC<ListSectionProps> = ({ title, items }) => (
  <View style={styles.listSection}>
    <ThemedText style={styles.listSectionTitle}>{title}</ThemedText>
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

const styles = StyleSheet.create({
  listSection: {
    marginBottom: 24,
  },
  listSectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});

export default List;
