import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Property } from '../types';
import { colors } from '../theme/colors';

interface PropertyCardProps {
  property: Property;
  onPress?: (property: Property) => void;
  style?: ViewStyle;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress, style }) => {
  return (
    <TouchableOpacity
      style={style}
      className="bg-card rounded-[16px] overflow-hidden border border-border mb-4 shadow-sm shadow-black/10 elevation-6"
      activeOpacity={0.9}
      onPress={() => onPress && onPress(property)}
    >
      {/* Property Image with Badges */}
      <View className="h-[180px] w-full relative bg-[#E5E7EB]">
        <Image source={{ uri: property.image }} className="w-full h-full" resizeMode="cover" />

        {/* Badges Overlay */}
        <View className="absolute top-[10px] left-[10px] flex-row gap-[6px]">
          {property.verified && (
            <View className="bg-primary rounded-[12px] px-2 py-[4px] flex-row items-center">
              <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" className="mr-[3px]" />
              <Text className="text-white text-[11px] font-bold">सत्यापित</Text>
            </View>
          )}

          {property.has360 && (
            <View className="bg-secondary rounded-[12px] px-2 py-[4px] flex-row items-center">
              <Ionicons name="reload-circle" size={13} color="#1A1A1A" className="mr-[3px]" />
              <Text className="text-[#1A1A1A] text-[11px] font-bold">360° टूर</Text>
            </View>
          )}
        </View>

        {/* Type Tag */}
        <View className="absolute bottom-[10px] right-[10px] bg-black/60 rounded-[8px] px-2 py-[3px]">
          <Text className="text-white text-[11px] font-semibold">{property.type}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View className="p-[14px]">
        <Text className="text-[16px] font-extrabold text-text mb-1" numberOfLines={1}>
          {property.title}
        </Text>

        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={14} color={colors.textLight} className="mr-1" />
          <Text className="text-[13px] text-textLight font-medium" numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        <View className="flex-row justify-between items-center border-t border-divider pt-[10px]">
          <View>
            <Text className="text-[11px] text-textMuted font-medium">मूल्य</Text>
            <Text className="text-[17px] font-black text-primary">{property.price}</Text>
          </View>

          <View className="bg-primaryLight px-[10px] py-[5px] rounded-[8px] flex-row items-center">
            <Ionicons name="expand-outline" size={12} color={colors.primary} className="mr-1" />
            <Text className="text-[12px] font-bold text-primary">{property.area}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
