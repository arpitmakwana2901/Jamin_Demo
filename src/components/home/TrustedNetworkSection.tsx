import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TRUSTED_TRADERS, TRUSTED_BROKERS, TrustedPerson } from '../../data/homeData';

export const TrustedNetworkSection: React.FC = () => {
  const renderPersonList = (list: TrustedPerson[], categoryTitle: string) => (
    <View className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-sm">
      <View className="flex-row items-center mb-3.5 pb-3 border-b border-slate-100">
        <View className="bg-[#0B5E42] px-2.5 py-1 rounded-xl mr-2.5">
          <Text className="text-white text-xs font-extrabold">Top 5</Text>
        </View>
        <Text className="text-lg font-extrabold text-slate-900">{categoryTitle}</Text>
      </View>

      <View className="gap-2.5">
        {list.map((person) => (
          <View key={person.rank} className="flex-row items-center bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
            <View className="w-6.5 h-6.5 w-[26px] h-[26px] rounded-full bg-[#E8F5E9] justify-center items-center mr-3">
              <Text className="text-xs font-extrabold text-[#0B5E42]">{person.rank}</Text>
            </View>

            <Text className="flex-1 text-[13.5px] font-bold text-slate-900" numberOfLines={1}>
              {person.name}
            </Text>

            <View className="ml-1.5">
              <Ionicons name="checkmark-circle" size={18} color="#0B5E42" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View className="mt-8 px-4">
      {/* Header */}
      <View className="mb-4">
        <View className="self-start bg-[#E8F5E9] border border-[#A7F3D0] px-2.5 py-1 rounded-full mb-2">
          <Text className="text-[10.5px] font-extrabold text-[#0B5E42] tracking-wider">
            VERIFIED NETWORK
          </Text>
        </View>

        <Text className="text-2xl font-extrabold text-slate-900 leading-7">
          Trusted Traders & Brokers
        </Text>

        <Text className="text-[13px] text-slate-600 mt-1.5 leading-5">
          Meet the verified traders and brokers trusted by our community.
        </Text>
      </View>

      {/* Two cards stacked vertically on mobile */}
      <View className="gap-4">
        {renderPersonList(TRUSTED_TRADERS, 'Trusted Traders')}
        {renderPersonList(TRUSTED_BROKERS, 'Trusted Brokers')}
      </View>
    </View>
  );
};
