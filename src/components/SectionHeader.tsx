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
    <View className="my-[14px] px-5">
      <View className="flex-row items-center">
        {badge && (
          <View className="bg-primary px-2 py-[3px] rounded-[12px] mr-2">
            <Text className="text-white text-[10px] font-extrabold">{badge}</Text>
          </View>
        )}
        <Text className="text-[20px] font-extrabold text-text">{title}</Text>
      </View>

      {subtitle && <Text className="text-[13px] text-textLight mt-[2px] font-medium">{subtitle}</Text>}

      {actionText && (
        <TouchableOpacity className="absolute right-5 top-[2px] flex-row items-center" onPress={onActionPress}>
          <Text className="text-[13px] font-bold text-primary mr-[2px]">{actionText}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
