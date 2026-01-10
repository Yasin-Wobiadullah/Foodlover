import * as React from 'react';
import { Pressable, type PressableStateCallbackType } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { StyledText } from './StyledText';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-full transition-transform active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-primary dark:bg-white shadow-lg',
        secondary: 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/10 shadow-card',
        ghost: 'bg-transparent',
        destructive: 'bg-red-500',
      },
      size: {
        default: 'px-5 py-3',
        sm: 'px-4 py-2',
        lg: 'px-8 py-4',
        icon: 'h-10 w-10 items-center justify-center rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('font-bold', {
  variants: {
    variant: {
      primary: 'text-white dark:text-primary',
      secondary: 'text-primary dark:text-white',
      ghost: 'text-primary dark:text-white',
      destructive: 'text-white',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ComponentProps<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  label?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, children, label, ...props }, ref) => {
    return (
      <Pressable className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {(state: PressableStateCallbackType) => (
          <>
            {label && <StyledText className={cn(buttonTextVariants({ variant, size }))}>{label}</StyledText>}
            {typeof children === 'function' ? children(state) : children}
          </>
        )}
      </Pressable>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
