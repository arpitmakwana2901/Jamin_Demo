import React from 'react';
import { View, Text, ImageBackground, Platform } from 'react-native';
import { FeatureGridCard, FeatureCardData } from './FeatureGridCard';

const FEATURE_ITEMS: FeatureCardData[] = [
  {
    id: '1',
    iconName: 'cube-outline',
    title: '360° Virtual Tours',
  },
  {
    id: '2',
    iconName: 'shield-checkmark-outline',
    title: 'Verified Listings',
  },
  {
    id: '3',
    iconName: 'people-outline',
    title: 'Trusted Network',
  },
  {
    id: '4',
    iconName: 'home-outline',
    title: 'Smart Match',
  },
];

export const HeroSection: React.FC = () => {
  return (
    <ImageBackground
      source={require('../assets/images/homepage_image.png')}
      className="w-full min-h-[450px]"
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-overlayDark" />

      <View className="pt-[32px] pb-[70px] px-4 items-center">
        {/* Main Title */}
        <Text
          className="text-[26px] font-black text-white text-center tracking-[0.5px] leading-[34px]"
          style={{ fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-black' }}
        >
          JAHAN JAMIN, WAHAN JAMIN24
        </Text>

        {/* Subtitle with horizontal lines on both sides */}
        <View className="flex-row items-center mt-[12px] px-2">
          <View className="flex-1 h-[1px] bg-white/40" />
          <Text className="text-white text-[11px] font-bold tracking-[1.2px] mx-[10px] text-center">
            INDIA'S LEADING OPEN LAND PLATFORM
          </Text>
          <View className="flex-1 h-[1px] bg-white/40" />
        </View>

        {/* Description text */}
        <Text className="text-white text-[13px] font-medium text-center mt-[12px] leading-[20px] opacity-90 max-w-[92%]">
          Explore verified open lands with 360° virtual tours, trusted connections & transparent deals.
        </Text>

        {/* 4 Feature Pills Grid (2x2) */}
        <View className="mt-[24px] flex-row flex-wrap justify-between gap-[12px] w-full">
          {FEATURE_ITEMS.map((item) => (
            <FeatureGridCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};
