import * as React from 'react';
import { Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils'; // I will create this utility file next

const textVariants = cva('text-primary dark:text-white', {
  variants: {
    variant: {
      // Display
      'display-xl': 'font-display text-4xl font-extrabold tracking-tight',
      'display-lg': 'font-display text-3xl font-extrabold tracking-tight',
      'display-md': 'font-display text-2xl font-extrabold tracking-tight',
      'display-sm': 'font-display text-xl font-bold tracking-tight',

      // Body
      'body-lg': 'font-sans text-lg font-bold',
      'body-md': 'font-sans text-base font-bold',
      'body-sm': 'font-sans text-sm font-semibold',

      // Others
      'caption': 'font-sans text-xs font-semibold',
      'muted': 'font-sans text-sm text-gray-text dark:text-gray-text-light',
    },
  },
  defaultVariants: {
    variant: 'body-md',
  },
});

export interface TextProps extends React.ComponentProps<typeof Text>, VariantProps<typeof textVariants> {}

const StyledText = React.forwardRef<Text, TextProps>(({ className, variant, ...props }, ref) => {
  return <Text className={cn(textVariants({ variant, className }))} ref={ref} {...props} />;
});

StyledText.displayName = 'StyledText';

export { StyledText, textVariants };
