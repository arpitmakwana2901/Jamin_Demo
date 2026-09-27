import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

export const TrustBadges: React.FC = () => {
  return (
    <View className="mt-[18px] pt-4 border-t border-border flex-row justify-between items-center">
      {/* Badge 1 */}
      <View className="flex-1 items-center px-1">
        <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} className="mb-1" />
        <Text className="text-[11px] font-bold text-text text-center">100% Secure</Text>
        <Text className="text-[9px] font-medium text-textLight text-center mt-[2px]">Safe & Transparent Deals</Text>
      </View>

      {/* Divider */}
      <View className="w-[1px] h-[36px] bg-divider" />

      {/* Badge 2 */}
      <View className="flex-1 items-center px-1">
        <Ionicons name="document-text-outline" size={20} color={colors.primary} className="mb-1" />
        <Text className="text-[11px] font-bold text-text text-center">Legal Verified</Text>
        <Text className="text-[9px] font-medium text-textLight text-center mt-[2px]">All Documents Checked</Text>
      </View>

      {/* Divider */}
      <View className="w-[1px] h-[36px] bg-divider" />

      {/* Badge 3 */}
      <View className="flex-1 items-center px-1">
        <Ionicons name="headset-outline" size={20} color={colors.primary} className="mb-1" />
        <Text className="text-[11px] font-bold text-text text-center">24/7 Support</Text>
        <Text className="text-[9px] font-medium text-textLight text-center mt-[2px]">We're Here to Help</Text>
      </View>
    </View>
  );
};
