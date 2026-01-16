import React from 'react';
import { View, Pressable, Modal } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Icon } from '../ui/Icon';
import { StyledText } from '../ui/StyledText';

interface SearchMenuPopupProps {
  visible: boolean;
  onClose: () => void;
  onSearchPress: () => void;
  onCameraPress: () => void;
}

export function SearchMenuPopup({ visible, onClose, onSearchPress, onCameraPress }: SearchMenuPopupProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 justify-end"
      >
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          className="absolute inset-0 bg-black/50"
        />
        
        <Animated.View
          entering={SlideInDown.duration(300).damping(20)}
          exiting={SlideOutDown.duration(200)}
          className="bg-white dark:bg-surface-dark rounded-t-3xl p-6 pb-8"
        >
          <View className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full self-center mb-6" />
          
          <StyledText variant="display-sm" className="mb-6">
            Choose Search Type
          </StyledText>
          
          <View className="gap-3">
            <Pressable
              onPress={onSearchPress}
              className="flex-row items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 active:bg-gray-100 dark:active:bg-white/10"
            >
              <View className="w-12 h-12 rounded-full bg-tint-green/10 dark:bg-tint-green/20 flex items-center justify-center">
                <Icon name="search" size={24} className="text-tint-green" />
              </View>
              <View className="flex-1">
                <StyledText variant="body-lg" className="font-bold">
                  Text Search
                </StyledText>
                <StyledText variant="caption" className="text-gray-500 dark:text-gray-400">
                  Search by recipe name or ingredients
                </StyledText>
              </View>
              <Icon name="arrow_forward" size={20} className="text-gray-400" />
            </Pressable>
            
            <Pressable
              onPress={onCameraPress}
              className="flex-row items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 active:bg-gray-100 dark:active:bg-white/10"
            >
              <View className="w-12 h-12 rounded-full bg-primary/10 dark:bg-white/20 flex items-center justify-center">
                <Icon name="photo_camera" size={24} className="text-primary dark:text-white" />
              </View>
              <View className="flex-1">
                <StyledText variant="body-lg" className="font-bold">
                  Camera Search
                </StyledText>
                <StyledText variant="caption" className="text-gray-500 dark:text-gray-400">
                  Scan food to find recipes
                </StyledText>
              </View>
              <Icon name="arrow_forward" size={20} className="text-gray-400" />
            </Pressable>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
