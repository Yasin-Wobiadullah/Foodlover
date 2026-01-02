import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';

export default function TabLayout() {

  return (
    <NativeTabs
        tintColor={DynamicColorIOS({
            dark: 'black',
            light: 'black',
        })}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Label>Search</Label>
        <Icon sf={{ default: 'magnifyingglass', selected: 'magnifyingglass.circle.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorites">
        <Label>Favorites</Label>
        <Icon sf={{ default: 'heart', selected: 'heart.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="shopping-list">
        <Label>Shopping List</Label>
        <Icon sf={{ default: 'cart', selected: 'cart.fill' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
