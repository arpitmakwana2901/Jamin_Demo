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
      className="bg-glassBg border border-glassBorder rounded-[14px] px-3 py-3 flex-row items-center"
    >
      <View className="w-[34px] h-[34px] rounded-[17px] bg-glassIconBg justify-center items-center mr-[10px]">
        <Ionicons name={item.iconName as any} size={20} color={colors.white} />
      </View>
      <Text className="flex-1 text-white text-[12px] font-bold leading-[16px]" numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );
};
