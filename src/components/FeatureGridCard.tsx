import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32 - 12) / 2;

export interface FeatureCardData {
  id: string;
  iconName: string;
  title: string;
}

interface FeatureGridCardProps {
  item: FeatureCardData;
}

export const FeatureGridCard: React.FC<FeatureGridCardProps> = ({ item }) => {
  return (
    <View
      style={{ width: cardWidth }}
      className="bg-[rgba(0,0,0,0.45)] border border-[rgba(255,255,255,0.25)] rounded-[14px] px-[12px] py-[12px] flex-row items-center"
    >
      <View className="w-[34px] h-[34px] rounded-[17px] bg-[rgba(255,255,255,0.20)] justify-center items-center mr-[10px]">
        <Ionicons name={item.iconName as any} size={20} color={colors.white} />
      </View>
      <Text className="flex-1 text-white text-[12px] font-bold leading-[16px]" numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );
};
