import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import RevenueCatUI from 'react-native-purchases-ui';

import { useAuth } from '../../../context/AuthContext';
import { UserProfileSection } from '../../../components/settings/UserProfileSection';
import { Button } from '../../../components/ui/Button';
import { ModalPage } from '../../../components/ui/ModalPage';
import { SettingsGroup } from '../../../components/settings/SettingsGroup';
import { SettingsRow } from '../../../components/settings/SettingsRow';
import { StyledText } from '../../../components/ui/StyledText';
import { cn } from '../../../lib/utils';

interface SegmentedControlProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const SegmentedControl = ({ options, selected, onSelect }: SegmentedControlProps) => {
    const { width } = useWindowDimensions();
    const selectedIndex = options.indexOf(selected);
    
    // NOTE: This is a simplified layout calculation. A more robust solution
    // might use onLayout to measure the container width.
    const containerWidth = width * 0.4; // Estimate container width
    const itemWidth = containerWidth / options.length;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(selectedIndex * itemWidth, { duration: 250 }) }],
        };
    }, [selectedIndex, itemWidth]);

    return (
        <View className="bg-white dark:bg-black/20 p-1 rounded-full flex-row relative shadow-sm h-8 items-center w-40">
            <Animated.View
                className="absolute top-1 bottom-1 bg-tint-green rounded-full shadow-sm"
                style={[{ width: itemWidth }, animatedStyle]}
            />
            {options.map((option: string) => (
                <Pressable
                    key={option}
                    onPress={() => onSelect(option)}
                    className="relative z-10 flex-1 items-center justify-center"
                >
                    <StyledText
                        className={cn(
                            "text-[11px] font-bold",
                            selected === option ? 'text-white' : 'text-gray-400'
                        )}
                    >
                        {option}
                    </StyledText>
                </Pressable>
            ))}
        </View>
    );
};

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [measurement, setMeasurement] = useState('Metric');
  const [temperature, setTemperature] = useState('F°');

  const handleSubscription = async () => {
    try {
      await RevenueCatUI.presentCustomerCenter();
    } catch (e) {
      console.error('Error presenting customer center:', e);
    }
  };

  return (
    <ModalPage title="Settings">
      <View className="px-6">
          <UserProfileSection onManageSubscription={handleSubscription} />

          <View className="space-y-8">
              <SettingsGroup title="Preferences">
                  <SettingsRow icon="📏" label="Measurement" type="segmented">
                      <SegmentedControl options={['Metric', 'US']} selected={measurement} onSelect={setMeasurement} />
                  </SettingsRow>
                    <SettingsRow icon="🌡️" label="Temperature" type="segmented">
                      <SegmentedControl options={['C°', 'F°']} selected={temperature} onSelect={setTemperature} />
                  </SettingsRow>
              </SettingsGroup>
              
              <SettingsGroup title="Food & Diet">
                  <SettingsRow icon="🥗" label="Diet Type" type="navigate" value="Vegetarian" valueBg="rgba(64, 78, 39, 0.1)" />
                  <SettingsRow icon="🚫" label="Things I Don't Eat" type="navigate" value="2 items" />
              </SettingsGroup>

              <SettingsGroup title="More">
                  <SettingsRow icon="💭" label="Leave Feedback" type="external" />
                  <SettingsRow icon="📄" label="Terms of Service" type="navigate" />
                  <SettingsRow icon="🔒" label="Privacy Policy" type="navigate" />
              </SettingsGroup>

              <View className="text-center pb-8 pt-4">
                  <StyledText variant="caption" className="text-gray-300 dark:text-gray-600">Version 2.4.0</StyledText>
                  <Button variant="ghost" size="sm" onPress={signOut} label="Logout" className="text-red-500 mt-2" />
              </View>
          </View>
      </View>
    </ModalPage>
  );
}
