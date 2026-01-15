import React from 'react';
import { Text } from 'react-native';
import { cn } from '../../lib/utils';

type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

interface IconProps extends React.ComponentProps<typeof Text> {
  name: string;
  size?: number;
  weight?: IconWeight;
}

const weightToFontFamily: Record<IconWeight, string> = {
  100: 'MaterialSymbols_100Thin',
  200: 'MaterialSymbols_200ExtraLight',
  300: 'MaterialSymbols_300Light',
  400: 'MaterialSymbols_400Regular',
  500: 'MaterialSymbols_500Medium',
  600: 'MaterialSymbols_600SemiBold',
  700: 'MaterialSymbols_700Bold',
};

export function Icon({ name, size = 24, weight = 400, className, style, ...rest }: IconProps) {
  const fontFamily = weightToFontFamily[weight];

  return (
    <Text
      style={[{ fontFamily, fontSize: size }, style]}
      className={cn(className)}
      {...rest}
    >
      {name}
    </Text>
  );
}
