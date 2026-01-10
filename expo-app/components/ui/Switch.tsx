import * as React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';

export interface SwitchProps extends RNSwitchProps {}

const Switch = React.forwardRef<RNSwitch, SwitchProps>(({ ...props }, ref) => {
  return (
    <RNSwitch
      ref={ref}
      trackColor={{ false: '#E5E7EB', true: '#404e27' }}
      thumbColor={'#FFFFFF'}
      ios_backgroundColor="#E5E7EB"
      {...props}
    />
  );
});

Switch.displayName = 'Switch';

export { Switch };
