import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SOCIAL_CARDS } from '../../data/homeData';

export const SocialMediaSection: React.FC = () => {
  return (
    <View className="mt-8 px-4">
      <Text className="text-base font-extrabold text-slate-900 mb-3.5">Join Our Community</Text>

      <View className="flex-row flex-wrap justify-between gap-2.5">
        {SOCIAL_CARDS.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="w-[48%] rounded-xl p-3 flex-row items-center border border-black/5"
            style={{ backgroundColor: item.bgColor }}
            activeOpacity={0.8}
            onPress={() => Alert.alert(item.platform, `Opening Jamin24 ${item.platform}...`)}
          >
            <View
              className="w-[34px] h-[34px] rounded-full justify-center items-center mr-2"
              style={{ backgroundColor: item.color }}
            >
              <Ionicons name={item.iconName as any} size={20} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-extrabold text-slate-900">{item.platform}</Text>
              <Text className="text-[9.5px] text-slate-600 mt-0.5" numberOfLines={1}>
                {item.label}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
