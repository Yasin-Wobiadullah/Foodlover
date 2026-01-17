import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { StyledText } from './StyledText';
import { Icon } from './Icon';

const chipVariants = cva(
  'flex-row items-center gap-1 px-4 py-2 rounded-xl border',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-surface-dark border-gray-100 dark:border-white/10',
        tinted: 'bg-tint-green/10 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const chipTextVariants = cva('text-sm font-semibold', {
  variants: {
    variant: {
      default: 'text-gray-600 dark:text-gray-300',
      tinted: 'text-tint-green',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ChipProps
  extends React.ComponentProps<typeof View>,
    VariantProps<typeof chipVariants> {
  label: string;
  iconName?: string;
  onPress?: () => void;
}

const Chip = React.forwardRef<View, ChipProps>(
  ({ className, variant, label, iconName, onPress, ...props }, ref) => {
    const chipContent = (
      <>
        {iconName && <Icon name={iconName} size={16} className={cn(chipTextVariants({ variant }))} />}
        <StyledText className={cn(chipTextVariants({ variant }))}>{label}</StyledText>
      </>
    );

    if (onPress) {
      return (
        <Pressable onPress={onPress} ref={ref as any}>
          <View className={cn(chipVariants({ variant, className }))} {...props}>
            {chipContent}
          </View>
        </Pressable>
      );
    }

    return (
      <View className={cn(chipVariants({ variant, className }))} ref={ref} {...props}>
        {chipContent}
      </View>
    );
  }
);

Chip.displayName = 'Chip';

export { Chip, chipVariants };
