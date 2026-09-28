import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Property } from '../types';
import { colors } from '../theme/colors';
import { shadows } from '../theme/spacing';

interface PropertyCardProps {
  property: Property;
  onPress?: (property: Property) => void;
  style?: ViewStyle;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[shadows.card, style]}
      className="bg-white rounded-[16px] overflow-hidden border border-[#E5E7EB] mb-[16px]"
      activeOpacity={0.9}
      onPress={() => onPress && onPress(property)}
    >
      {/* Property Image with Badges */}
      <View className="h-[180px] w-full relative bg-[#E5E7EB]">
        <Image source={{ uri: property.image }} className="w-full h-full" resizeMode="cover" />
        
        {/* Badges Overlay */}
        <View className="absolute top-[10px] left-[10px] flex-row gap-[6px]">
          {property.verified && (
            <View className="bg-[#0B5E42] rounded-[12px] px-[8px] py-[4px] flex-row items-center">
              <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" className="mr-[3px]" />
              <Text className="text-white text-[11px] font-bold">सत्यापित</Text>
            </View>
          )}

          {property.has360 && (
            <View className="bg-[#F5A623] rounded-[12px] px-[8px] py-[4px] flex-row items-center">
              <Ionicons name="reload-circle" size={13} color="#1A1A1A" className="mr-[3px]" />
              <Text className="text-[#1A1A1A] text-[11px] font-bold">360° टूर</Text>
            </View>
          )}
        </View>

        {/* Type Tag */}
        <View className="absolute bottom-[10px] right-[10px] bg-[rgba(0,0,0,0.6)] rounded-[8px] px-[8px] py-[3px]">
          <Text className="text-white text-[11px] font-semibold">{property.type}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View className="p-[14px]">
        <Text className="text-[16px] font-extrabold text-[#111827] mb-[4px]" numberOfLines={1}>
          {property.title}
        </Text>

        <View className="flex-row items-center mb-[12px]">
          <Ionicons name="location-outline" size={14} color={colors.textLight} className="mr-[4px]" />
          <Text className="text-[13px] text-[#4B5563] font-medium" numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        <View className="flex-row justify-between items-center border-t border-[#E5E7EB] pt-[10px]">
          <View>
            <Text className="text-[11px] text-[#9CA3AF] font-medium">मूल्य</Text>
            <Text className="text-[17px] font-black text-[#0B5E42]">{property.price}</Text>
          </View>

          <View className="bg-[#E8F5E9] px-[10px] py-[5px] rounded-[8px] flex-row items-center">
            <Ionicons name="expand-outline" size={12} color={colors.primary} className="mr-[4px]" />
            <Text className="text-[12px] font-bold text-[#0B5E42]">{property.area}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
