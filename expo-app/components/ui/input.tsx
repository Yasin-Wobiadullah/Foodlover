import React from 'react';
import { TextInput } from 'react-native';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  return (
    <TextInput
      className="w-full px-4 py-3 rounded-lg bg-background border border-primary/50 text-foreground"
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
export default Input;
