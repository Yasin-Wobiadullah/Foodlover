import React from 'react';
import { Text, TextProps } from 'react-native';

type IconProps = TextProps & {
  name: string;
  size?: number;
  color?: string;
  isFilled?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  isFilled = false,
  weight = 400,
  className,
  style,
  ...props
}) => {
  const fontVariationSettings = `'FILL' ${isFilled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`;

  return (
    <Text
      className={`font-material ${className}`}
      style={[{ fontSize: size, color, fontVariationSettings }, style]}
      {...props}
    >
      {name}
    </Text>
  );
};

export { Icon };
