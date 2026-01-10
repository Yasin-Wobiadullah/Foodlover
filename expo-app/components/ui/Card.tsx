import * as React from 'react';
import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'bg-surface-light dark:bg-surface-dark rounded-3xl p-5 shadow-card border border-white/50 dark:border-white/5',
  {
    variants: {
      variant: {
        default: '',
        soft: 'shadow-soft',
        flat: 'shadow-none border-gray-100 dark:border-white/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps extends React.ComponentProps<typeof View>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<View, CardProps>(({ className, variant, ...props }, ref) => {
  return <View className={cn(cardVariants({ variant, className }))} ref={ref} {...props} />;
});

Card.displayName = 'Card';

export { Card, cardVariants };
