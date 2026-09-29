import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export const HowItWorksSection: React.FC = () => {
  return (
    <View className="mt-8 px-4">
      <View className="bg-[#073B2A] rounded-[22px] p-5.5 border border-[#146C51] shadow-lg p-5">
        {/* Label Badge */}
        <View className="self-start bg-emerald-400/15 border border-emerald-400/30 px-2.5 py-1 rounded-full mb-2.5">
          <Text className="text-[10px] font-extrabold text-emerald-400 tracking-widest">
            JAMIN24, SIMPLIFIED
          </Text>
        </View>

        {/* Heading */}
        <Text className="text-2xl font-black text-white leading-7">
          From search to site visit,{'\n'}see how it works.
        </Text>

        {/* Description */}
        <Text className="text-[13px] text-white/85 mt-2 leading-5">
          A simple 2-minute guide to finding verified land, connecting with owners and moving forward with clarity.
        </Text>

        {/* Checklist */}
        <View className="mt-4 gap-2.5">
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={18} color="#4ADE80" className="mr-2" />
            <Text className="text-white text-[13.5px] font-bold ml-2">Search smarter</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={18} color="#4ADE80" className="mr-2" />
            <Text className="text-white text-[13.5px] font-bold ml-2">Verify details</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={18} color="#4ADE80" className="mr-2" />
            <Text className="text-white text-[13.5px] font-bold ml-2">Connect directly</Text>
          </View>
        </View>

        {/* Circular Play Button & CTA */}
        <TouchableOpacity
          className="bg-white/12 border border-white/25 rounded-2xl px-4 py-3.5 flex-row items-center justify-center mt-5.5 mt-5 active:opacity-90"
          activeOpacity={0.85}
          onPress={() => Alert.alert('Watch Guide', 'Opening 2-minute guide video...')}
        >
          <View className="w-[38px] h-[38px] rounded-full bg-white justify-center items-center mr-2.5">
            <Ionicons name="play" size={22} color="#0B5E42" className="ml-0.5" />
          </View>
          <Text className="text-white text-[13px] font-extrabold tracking-wider">
            WATCH THE 2 MIN GUIDE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
