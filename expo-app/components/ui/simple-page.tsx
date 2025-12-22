import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonHeader from './button-header';

interface SimplePageProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  rightButton?: React.ReactNode;
}

export default function SimplePage({
  title,
  children,
  onClose,
  rightButton,
}: SimplePageProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <View>
            <View className="absolute top-0 left-0 right-0 z-10">
        <ButtonHeader
          title={title}
          leftButtonIcon="close"
          onLeftButtonPress={handleClose}
          rightButton={rightButton}
        />
      </View>
      <ScrollView className="flex-1 pt-20">{children}</ScrollView>

    </View>

  );
} 
