import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants, buttonTextVariants } from './button-variants';

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>, VariantProps<typeof buttonVariants> {
  title?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(({ className, variant, size, title, ...props }, ref) => {
  return (
    <TouchableOpacity
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    >
      {title && (
        <Text className={buttonTextVariants({ variant })}>
          {title}
        </Text>
      )}
      {props.children}
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
