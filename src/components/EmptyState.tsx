import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search-outline',
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <View className="p-[30px] items-center justify-center">
      <View className="w-[72px] h-[72px] rounded-[36px] bg-[#E8F5E9] justify-center items-center mb-[16px]">
        <Ionicons name={'duplicate'} size={36} color={colors.primary} />
      </View>

      <Text className="text-[18px] font-extrabold text-[#111827] text-center mb-[6px]">{title}</Text>
      <Text className="text-[13px] text-[#4B5563] text-center leading-[20px] mb-[20px]">{description}</Text>

      {actionText && onAction && (
        <TouchableOpacity
          className="bg-[#0B5E42] px-[20px] py-[12px] rounded-[12px]"
          activeOpacity={0.8}
          onPress={onAction}
        >
          <Text className="text-white text-[14px] font-bold">{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
