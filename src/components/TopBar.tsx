import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';
import { DrawerMenu } from './DrawerMenu';

interface TopBarProps {
  onBuddyPress?: () => void;
  onLanguagePress?: () => void;
  onMenuPress?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onBuddyPress,
  onLanguagePress,
  onMenuPress,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      setDrawerVisible(true);
    }
  };

  return (
    <>
      <View className="h-[64px] bg-white flex-row items-center justify-between px-[16px] border-b border-[#E5E7EB] z-20">
        {/* Left: Drawer Menu Icon */}
        <TouchableOpacity
          className="p-[4px] justify-center items-center"
          activeOpacity={0.7}
          onPress={handleMenuPress}
        >
          <Ionicons name="menu-outline" size={26} color={colors.text} />
        </TouchableOpacity>

        {/* Right Actions: Jamin Buddy & Logo on the right side */}
        <View className="flex-row items-center gap-[8px]">
          {/* Pill-shaped button "Jamin Buddy" with mic icon */}
          <TouchableOpacity
            className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-[20px] px-[10px] py-[6px] flex-row items-center"
            activeOpacity={0.8}
            onPress={onBuddyPress || (() => Alert.alert('Jamin Buddy', 'Voice assistant activated.'))}
          >
            <Ionicons name="mic-outline" size={14} color={colors.primary} className="mr-[4px]" />
            <Text className="text-[#0B5E42] text-[12px] font-bold">Jamin Buddy</Text>
          </TouchableOpacity>

          {/* Logo on the right side of the app */}
          <View className="justify-center items-center ml-[2px]">
            <Image
              source={require('../assets/images/header_logo.png')}
              className="w-[36px] h-[36px]"
              resizeMode="contain"
            />
            <Text className="text-[7.5px] font-extrabold text-[#0B5E42] tracking-[0.8px] mt-[1px] text-center">SARASWATI GROUP</Text>
          </View>
        </View>
      </View>

      {/* Slide-in Drawer Menu Modal */}
      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
};
