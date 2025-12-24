import React from 'react';
import { Text, type TextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva(
  'text-foreground',
  {
    variants: {
      variant: {
        default: 'text-base font-inter',
        title: 'text-4xl font-lora-bold',
        h1: 'text-3xl font-lora-bold',
        h2: 'text-3xl font-lora-bold',
        h3: 'text-xl font-lora-bold',
        h4: 'text-lg font-lora-bold',
        body: 'text-base font-inter',
        link: 'text-base font-inter-semibold text-primary',
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
