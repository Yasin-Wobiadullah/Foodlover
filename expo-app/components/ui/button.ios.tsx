import React from 'react';
import { Button as NativeUIButton, Host } from '@expo/ui/swift-ui';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>, VariantProps<typeof buttonVariants> {
  title?: string;
}

const Button = React.forwardRef<any, ButtonProps>(({ onPress, children, variant = 'default', style, title }, ref) => {
  // Map custom variants to valid Expo UI variants
  let uiVariant: 'default' | 'bordered' | undefined = 'default';
  
  // Simple mapping
  if (variant === 'default') {
      uiVariant = 'default'; 
  } else {
      // For 'icon' and 'filter', fallback to default or bordered?
      // Let's use default to be safe.
      uiVariant = 'default';
  }

  return (
    <Host style={style as ViewStyle} matchContents>
      <NativeUIButton variant={uiVariant} onPress={onPress as any}>
        {title ? title : children}
      </NativeUIButton>
    </Host>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
