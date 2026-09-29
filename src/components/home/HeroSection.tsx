import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { HERO_FEATURES } from '../../data/homeData';

export const HeroSection: React.FC = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/homepage_image.png')}
      style={{ width: '100%', minHeight: 480 }}
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-[#051E14]/75" />

      <View className="pt-8 pb-[75px] px-4 items-center">
        {/* Main Title */}
        <Text className="text-[27px] font-black text-white text-center tracking-wide leading-[35px]">
          JAHAN JAMIN,{'\n'}WAHAN JAMIN24
        </Text>

        {/* Subtitle with horizontal decorative lines */}
        <View className="flex-row items-center mt-3.5 px-2 w-full justify-center">
          <View className="flex-1 h-[1px] bg-white/35" />
          <Text className="text-[#86EFAC] text-[10.5px] font-extrabold tracking-widest mx-2 text-center">
            INDIA'S LEADING OPEN LAND PLATFORM
          </Text>
          <View className="flex-1 h-[1px] bg-white/35" />
        </View>

        {/* Description text */}
        <Text className="text-white/90 text-[13px] font-medium text-center mt-3 leading-5 max-w-[94%]">
          Explore verified open land with 360° virtual tours, trusted connections & transparent details.
        </Text>

        {/* 4 Feature Badges (2x2 Grid) */}
        <View className="mt-5 flex-row flex-wrap justify-between gap-2.5 w-full">
          {HERO_FEATURES.map((item) => (
            <View key={item.id} className="w-[48%] bg-[#0F3C28]/70 border border-white/25 rounded-xl p-2.5 flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-white/20 justify-center items-center mr-2">
                <Ionicons name={item.iconName as any} size={18} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-[11.5px] font-bold" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-[#D1FAE5] text-[9.5px] font-medium mt-[1px]" numberOfLines={1}>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};
