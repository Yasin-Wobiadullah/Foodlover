import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledText } from '../../../components/ui/StyledText';
import { Icon } from '../../../components/ui/Icon';

export default function CameraScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 16 }}
        className="px-6 pb-4 flex-row items-center justify-between"
      >
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
        >
          <Icon name="close" size={24} className="text-white" />
        </Pressable>
        
        <StyledText variant="body-lg" className="text-white font-bold">
          Camera Search
        </StyledText>
        
        <View className="w-10" />
      </View>

      {/* Camera Preview Placeholder */}
      <View className="flex-1 items-center justify-center">
        <View className="items-center gap-4">
          <View className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Icon name="photo_camera" size={48} className="text-white" />
          </View>
          <StyledText variant="body-lg" className="text-white text-center">
            Camera functionality will be{'\n'}implemented here
          </StyledText>
          <StyledText variant="caption" className="text-white/60 text-center px-8">
            Point your camera at food to discover{'\n'}recipes and nutritional information
          </StyledText>
        </View>
      </View>

      {/* Bottom Actions */}
      <View
        style={{ paddingBottom: insets.bottom + 32 }}
        className="px-6 items-center"
      >
        <View className="flex-row items-center gap-8">
          <Pressable className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Icon name="photo_library" size={28} className="text-white" />
          </Pressable>
          
          <Pressable className="w-20 h-20 rounded-full bg-white border-4 border-white/40 flex items-center justify-center">
            <View className="w-16 h-16 rounded-full bg-white" />
          </Pressable>
          
          <Pressable className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Icon name="flip_camera_android" size={28} className="text-white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
