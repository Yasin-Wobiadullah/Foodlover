import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        icon: "bg-gray-100",
        filter: "bg-gray-200",
      },
      size: {
        default: "px-8 py-4",
        icon: "h-12 w-12",
        filter: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  "text-base font-bold",
  {
    variants: {
      variant: {
        default: "text-white",
        icon: "text-foreground",
        filter: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
