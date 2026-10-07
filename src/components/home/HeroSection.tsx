import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const heroFeatures = [
    {
      id: '1',
      title: t('home.feature1Title'),
      subtitle: t('home.feature1Sub'),
      iconName: 'cube-outline',
    },
    {
      id: '2',
      title: t('home.feature2Title'),
      subtitle: t('home.feature2Sub'),
      iconName: 'shield-checkmark-outline',
    },
    {
      id: '3',
      title: t('home.feature3Title'),
      subtitle: t('home.feature3Sub'),
      iconName: 'people-outline',
    },
    {
      id: '4',
      title: t('home.feature4Title'),
      subtitle: t('home.feature4Sub'),
      iconName: 'git-compare-outline',
    },
  ];

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
          {t('home.heroTitle')}
        </Text>

        {/* Subtitle with horizontal decorative lines */}
        <View className="flex-row items-center mt-3.5 px-2 w-full justify-center">
          <View className="flex-1 h-[1px] bg-white/35" />
          <Text className="text-[#86EFAC] text-[10.5px] font-extrabold tracking-widest mx-2 text-center">
            {t('home.heroTagline')}
          </Text>
          <View className="flex-1 h-[1px] bg-white/35" />
        </View>

        {/* Description text */}
        <Text className="text-white/90 text-[13px] font-medium text-center mt-3 leading-5 max-w-[94%]">
          {t('home.heroDesc')}
        </Text>

        {/* 4 Feature Badges (2x2 Grid) */}
        <View className="mt-5 flex-row flex-wrap justify-between gap-2.5 w-full">
          {heroFeatures.map((item) => (
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

