import React from 'react';
import { Text, type TextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva(
  'text-foreground',
  {
    variants: {
      variant: {
        default: 'text-base font-normal',
        title: 'text-4xl font-extrabold',
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-bold',
        h3: 'text-xl font-bold',
        h4: 'text-lg font-bold',
        body: 'text-base font-normal',
        link: 'text-base font-semibold text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ThemedTextProps extends TextProps, VariantProps<typeof textVariants> {}

const ThemedText = React.forwardRef<
  React.ElementRef<typeof Text>,
  ThemedTextProps
>(({ className, variant, ...props }, ref) => {
  return (
    <Text
      className={textVariants({ variant, className })}
      ref={ref}
      {...props}
    />
  );
});

ThemedText.displayName = 'ThemedText';

export { ThemedText, textVariants };
