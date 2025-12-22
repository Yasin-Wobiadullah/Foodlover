import React from 'react';
import { View, Image } from 'react-native';

interface ProfileAvatarProps {
  source: string | null;
  size?: number;
}

export default function ProfileAvatar({ source, size = 120 }: ProfileAvatarProps) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: size > 50 ? 3 : 1, borderColor: '#fff' }}>
      <Image
        style={{ width: '100%', height: '100%', borderRadius: size / 2 }}
        source={source ? { uri: source } : require('../../assets/images/icon.png')}
      />
    </View>
  );
}
