import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';

export const FooterSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View className="mt-10 bg-[#031E14] pt-7.5 pt-8 pb-10 px-5">
      {/* Brand Column */}
      <View className="mb-4">
        <View className="flex-row items-center mb-2.5">
          <Image
            source={require('../../assets/images/header_logo.png')}
            style={{ width: 34, height: 34 }}
            className="mr-2.5"
            resizeMode="contain"
          />
          <Text className="text-2xl font-black text-white tracking-widest ml-2">JAMIN24</Text>
        </View>

        <Text className="text-[#A7F3D0] text-[12.5px] leading-5 opacity-90">
          Discover verified Jamin options with local guidance, clear information, and dependable support from search to site visit.
        </Text>
      </View>

      <View className="h-[1px] bg-white/15 my-4.5 my-4" />

      {/* Quick Links & Resources 2 Column Grid */}
      <View className="flex-row justify-between">
        {/* Column 1: Quick Links */}
        <View className="flex-1">
          <Text className="text-sm font-extrabold text-white mb-3">{t('home.quickLinks')}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Home', 'Already on Home screen')}>
            <Text className="text-[#D1FAE5] text-[13px] mb-2 font-medium">{t('common.home')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('About Us', 'Jamin24 - India\'s Leading Open Land Platform.')}>
            <Text className="text-[#D1FAE5] text-[13px] mb-2 font-medium">{t('common.aboutUs')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Browse Jamin', 'Opening Browse Jamin screen...')}>
            <Text className="text-[#D1FAE5] text-[13px] mb-2 font-medium">Browse Jamin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Contact Us', 'Call us at +91 9898072803')}>
            <Text className="text-[#D1FAE5] text-[13px] mb-2 font-medium">{t('common.contactUs')}</Text>
          </TouchableOpacity>
        </View>

        {/* Column 2: Resources */}
        <View className="flex-1">
          <Text className="text-sm font-extrabold text-white mb-3">{t('home.resources')}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Help & FAQs', 'Frequently Asked Questions')}>
            <Text className="text-[#D1FAE5] text-[13px] mb-2 font-medium">{t('home.helpFaqs')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Terms and Conditions', 'Terms & Conditions of Jamin24')}>
            <Text className="text-[#D1FAE5] text-[13px] mb-2 font-medium">{t('home.termsConditions')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Privacy Policy', 'Privacy Policy of Jamin24')}>
            <Text className="text-[#D1FAE5] text-[13px] mb-2 font-medium">{t('home.privacyPolicy')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-[1px] bg-white/15 my-4.5 my-4" />

      {/* Connect With Us */}
      <View className="mt-0.5">
        <Text className="text-sm font-extrabold text-white mb-3">{t('home.connectWithUs')}</Text>

        <View className="flex-row items-center mb-2">
          <Ionicons name="call-outline" size={16} color="#4ADE80" />
          <Text className="text-[#D1FAE5] text-[13px] font-medium ml-2.5">+91 9898072803</Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Ionicons name="mail-outline" size={16} color="#4ADE80" />
          <Text className="text-[#D1FAE5] text-[13px] font-medium ml-2.5">info@jamin24.com</Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={16} color="#4ADE80" />
          <Text className="text-[#D1FAE5] text-[13px] font-medium ml-2.5">Ahmedabad, Gujarat, India</Text>
        </View>
      </View>

      <View className="h-[1px] bg-white/15 my-4.5 my-4" />

      {/* Copyright */}
      <View className="items-center mt-1">
        <Text className="text-white/60 text-[11.5px] text-center">
          {t('home.copyright')}
        </Text>
      </View>
    </View>
  );
};

