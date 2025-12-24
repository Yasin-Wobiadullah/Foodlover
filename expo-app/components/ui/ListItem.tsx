import React from 'react';
import { View, Text, Pressable, StyleSheet, Switch } from 'react-native';
import { ThemedText } from './themed-text';

type ListItemProps = {
  icon: string;
  name: string;
  description?: string;
  onPress?: () => void;
  rightContent?: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({ icon, name, description, onPress, rightContent }) => (
  <Pressable onPress={onPress} style={styles.container}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.textContainer}>
      <ThemedText style={styles.name}>{name}</ThemedText>
      {description && <ThemedText style={styles.description}>{description}</ThemedText>}
    </View>
    {rightContent}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    fontFamily: 'MaterialSymbols_400Regular',
    fontSize: 24,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ListItem;
