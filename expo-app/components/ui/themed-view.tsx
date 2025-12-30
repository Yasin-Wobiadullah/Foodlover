import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps;

export function ThemedView({ ...otherProps }: ThemedViewProps) {
  return <View {...otherProps} />;
}
