import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

export const AccountScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="bg-card rounded-[16px] p-5 items-center mb-5 border border-border">
          <View className="w-[70px] h-[70px] rounded-[35px] bg-primaryLight justify-center items-center mb-3">
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>
          <Text className="text-[18px] font-extrabold text-text">Sarshakhi User</Text>
          <Text className="text-[13px] text-textLight mt-[2px]">+91 98765 43210</Text>
          <View className="flex-row items-center bg-primaryLight px-[10px] py-[4px] rounded-[12px] mt-[10px]">
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} className="mr-1" />
            <Text className="text-[11px] font-bold text-primary">Verified Buyer / Seller</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="bg-card rounded-[16px] p-4 mb-4 border border-border">
          <Text className="text-[14px] font-extrabold text-text mb-3">My Activity</Text>
          
          <TouchableOpacity className="flex-row items-center py-3 border-b border-divider" onPress={() => Alert.alert('Saved Lands', 'No saved lands yet.')}>
            <Ionicons name="bookmark-outline" size={20} color={colors.primary} className="mr-3" />
            <Text className="flex-1 text-[14px] font-semibold text-text">Saved Jamin</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-divider" onPress={() => Alert.alert('My Inquiries', 'View active inquiries.')}>
            <Ionicons name="chatbubbles-outline" size={20} color={colors.primary} className="mr-3" />
            <Text className="flex-1 text-[14px] font-semibold text-text">My Inquiries</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-divider" onPress={() => Alert.alert('My Listings', 'List your land.')}>
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} className="mr-3" />
            <Text className="flex-1 text-[14px] font-semibold text-text">List Your Land</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View className="bg-card rounded-[16px] p-4 mb-4 border border-border">
          <Text className="text-[14px] font-extrabold text-text mb-3">Settings & Support</Text>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-divider" onPress={() => Alert.alert('Language', 'Select Language')}>
            <Ionicons name="globe-outline" size={20} color={colors.primary} className="mr-3" />
            <Text className="flex-1 text-[14px] font-semibold text-text">App Language (EN / HI / GU)</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-divider" onPress={() => Alert.alert('Support', 'Calling Support helpline: +91 98765 43210')}>
            <Ionicons name="headset-outline" size={20} color={colors.primary} className="mr-3" />
            <Text className="flex-1 text-[14px] font-semibold text-text">24/7 Customer Support</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-divider" onPress={() => Alert.alert('About Jamin24', 'Jamin24 v1.0.0 - Sarshakhi Group')}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} className="mr-3" />
            <Text className="flex-1 text-[14px] font-semibold text-text">About Jamin24</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
