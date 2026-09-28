import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

export const AccountScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="bg-white rounded-[16px] p-[20px] items-center mb-[20px] border border-[#E5E7EB]">
          <View className="w-[70px] h-[70px] rounded-[35px] bg-[#E8F5E9] justify-center items-center mb-[12px]">
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>
          <Text className="text-[18px] font-extrabold text-[#111827]">Sarshakhi User</Text>
          <Text className="text-[13px] text-[#4B5563] mt-[2px]">+91 98765 43210</Text>
          <View className="flex-row items-center bg-[#E8F5E9] px-[10px] py-[4px] rounded-[12px] mt-[10px]">
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} className="mr-[4px]" />
            <Text className="text-[11px] font-bold text-[#0B5E42]">Verified Buyer / Seller</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="bg-white rounded-[16px] p-[16px] mb-[16px] border border-[#E5E7EB]">
          <Text className="text-[14px] font-extrabold text-[#111827] mb-[12px]">My Activity</Text>
          
          <TouchableOpacity className="flex-row items-center py-[12px] border-b border-[#E5E7EB]" onPress={() => Alert.alert('Saved Lands', 'No saved lands yet.')}>
            <Ionicons name="bookmark-outline" size={20} color={colors.primary} className="mr-[12px]" />
            <Text className="flex-1 text-[14px] font-semibold text-[#111827]">Saved Jamin</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-[12px] border-b border-[#E5E7EB]" onPress={() => Alert.alert('My Inquiries', 'View active inquiries.')}>
            <Ionicons name="chatbubbles-outline" size={20} color={colors.primary} className="mr-[12px]" />
            <Text className="flex-1 text-[14px] font-semibold text-[#111827]">My Inquiries</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-[12px] border-b border-[#E5E7EB]" onPress={() => Alert.alert('My Listings', 'List your land.')}>
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} className="mr-[12px]" />
            <Text className="flex-1 text-[14px] font-semibold text-[#111827]">List Your Land</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View className="bg-white rounded-[16px] p-[16px] mb-[16px] border border-[#E5E7EB]">
          <Text className="text-[14px] font-extrabold text-[#111827] mb-[12px]">Settings & Support</Text>

          <TouchableOpacity className="flex-row items-center py-[12px] border-b border-[#E5E7EB]" onPress={() => Alert.alert('Language', 'Select Language')}>
            <Ionicons name="globe-outline" size={20} color={colors.primary} className="mr-[12px]" />
            <Text className="flex-1 text-[14px] font-semibold text-[#111827]">App Language (EN / HI / GU)</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-[12px] border-b border-[#E5E7EB]" onPress={() => Alert.alert('Support', 'Calling Support helpline: +91 98765 43210')}>
            <Ionicons name="headset-outline" size={20} color={colors.primary} className="mr-[12px]" />
            <Text className="flex-1 text-[14px] font-semibold text-[#111827]">24/7 Customer Support</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-[12px] border-b border-[#E5E7EB]" onPress={() => Alert.alert('About Jamin24', 'Jamin24 v1.0.0 - Sarshakhi Group')}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} className="mr-[12px]" />
            <Text className="flex-1 text-[14px] font-semibold text-[#111827]">About Jamin24</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
