import React from 'react';
import { View, ImageBackground, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyledText } from '../ui/StyledText';
import { Icon } from '../ui/Icon';
import { Chip } from '../ui/Chip';

// This would come from your data source
const recipe = {
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSnhg2K84nYp1hYrsvSHdfx-exVcf3Lw68CMALr_AG0A5EKvCrGWq7rZYTu0d1pCRNnm-oMWj_FapiQ6-9ZE4VR0pS001tv4rHuuFvWCATrMYSfwQ-0RqUR7dVZDk18GGscDGFcOJYvrG7VfOLqU4EStrE8Ry6DCaj_JY_qXg2gA3znbQseUVSBDude_Kjs0fR8lcc9s7hTt46p-7xyqMaM16EBh4cg6HNR23gu7VX4bOb2WDuxOfKz-p6LG3S57OLm5m72aEUjj4',
  time: '45 min',
  tags: ['Italian', 'Pasta'],
  title: 'Authentic Carbonara\nwith Truffle',
  rating: 4.9,
  calories: 620,
};

export function DailyInspirationCard() {
  return (
    <Pressable className="w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-soft">
      <ImageBackground
        source={{ uri: recipe.imageUrl }}
        className="w-full h-full justify-between"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
          locations={[0, 0.5, 1]}
          className="absolute inset-0"
        />

        <View className="p-5 flex-row justify-end">
          <View className="bg-white/30 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-xs font-bold flex-row items-center gap-1.5">
            <Icon name="timer" size={16} style={{ color: 'white' }} />
            <StyledText className="text-white text-xs font-bold">{recipe.time}</StyledText>
          </View>
        </View>

        <View className="p-6">
          <View className="flex-row gap-2 mb-3">
            {recipe.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="tinted" />
            ))}
          </View>
          <StyledText variant="display-lg" className="text-white mb-4 leading-tight">
            {recipe.title}
          </StyledText>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4 text-white">
              <View className="flex-row items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                <Icon name="star" size={18} style={{ color: '#FFD700' }} />
                <StyledText className="text-white font-bold text-sm">{recipe.rating}</StyledText>
              </View>
              <View className="flex-row items-center gap-1.5 font-semibold">
                <Icon name="local_fire_department" size={18} style={{ color: '#FFA500' }} />
                <StyledText className="text-white text-sm">{recipe.calories} kcal</StyledText>
              </View>
            </View>
            <Pressable className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg">
              <Icon name="bookmark" size={24} className="text-primary" />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
