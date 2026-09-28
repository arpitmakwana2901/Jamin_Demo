import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  actionText,
  onActionPress,
}) => {
  return (
    <View className="my-[14px] px-[20px] relative">
      <View className="flex-row items-center">
        {badge && (
          <View className="bg-[#0B5E42] px-[8px] py-[3px] rounded-[12px] mr-[8px]">
            <Text className="text-white text-[10px] font-extrabold">{badge}</Text>
          </View>
        )}
        <Text className="text-[20px] font-extrabold text-[#111827]">{title}</Text>
      </View>

      {subtitle && <Text className="text-[13px] text-[#4B5563] mt-[2px] font-medium">{subtitle}</Text>}

      {actionText && (
        <TouchableOpacity className="absolute right-[20px] top-[2px] flex-row items-center" onPress={onActionPress}>
          <Text className="text-[13px] font-bold text-[#0B5E42] mr-[2px]">{actionText}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
