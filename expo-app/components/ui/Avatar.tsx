import * as React from 'react';
import { Image, ImageProps, View } from 'react-native';
import { cn } from '../../lib/utils';

interface AvatarProps extends ImageProps {
  containerClassName?: string;
}

const Avatar = React.forwardRef<Image, AvatarProps>(
  ({ className, containerClassName, source, ...props }, ref) => {
    return (
      <View
        className={cn(
          'h-9 w-9 rounded-full overflow-hidden border-2 border-white dark:border-surface-dark shadow-sm',
          containerClassName
        )}
      >
        <Image
          ref={ref}
          className={cn('w-full h-full object-cover', className)}
          source={source}
          {...props}
        />
      </View>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
