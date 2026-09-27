import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
  Linking,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Svg, { Path, Circle, Rect, G, Line } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = Math.round(width * 0.56);

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuItemConfig {
  id: string;
  title: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  badge?: number;
  showChevron?: boolean;
  onPress: () => void;
}

// Stylized agricultural landscape at the bottom of the drawer
const LandscapeIllustration: React.FC<{ width: number }> = ({ width: svgWidth }) => {
  return (
    <Svg width={svgWidth} height={85} viewBox="0 0 320 85" fill="none">
      {/* Background Hill slopes */}
      <Path
        d="M0 58 Q75 32 160 48 T320 34 L320 85 L0 85 Z"
        fill="#EDF7F4"
        opacity={0.85}
      />
      <Path
        d="M0 68 Q90 48 190 60 T320 48 L320 85 L0 85 Z"
        fill="#E2F2EC"
        opacity={0.9}
      />

      {/* Field contour & terrace lines */}
      <Path
        d="M0 46 Q70 24 160 38 T320 25"
        stroke="#C2E4D8"
        strokeWidth="1.2"
        fill="none"
      />
      <Path
        d="M0 56 Q80 34 180 48 T320 36"
        stroke="#B2DCD0"
        strokeWidth="1.2"
        fill="none"
      />
      <Path
        d="M0 66 Q100 46 200 58 T320 46"
        stroke="#A5D6C7"
        strokeWidth="1.2"
        fill="none"
      />
      <Path
        d="M0 77 Q110 58 210 68 T320 58"
        stroke="#96CFBF"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Group of stylized trees on the left */}
      <G opacity={0.85}>
        <Rect x="16" y="46" width="2" height="12" fill="#78AFA0" />
        <Circle cx="17" cy="40" r="8" fill="#91C7B8" />

        <Rect x="27" y="38" width="2.5" height="16" fill="#78AFA0" />
        <Circle cx="28" cy="30" r="12" fill="#82BDAE" />

        <Rect x="41" y="42" width="2" height="14" fill="#78AFA0" />
        <Circle cx="42" cy="35" r="9" fill="#99CEBF" />

        <Circle cx="10" cy="45" r="6.5" fill="#A4D5C7" />
        <Circle cx="51" cy="41" r="6.5" fill="#A8D7CA" />
      </G>

      {/* Stylized tractor on the right field */}
      <G opacity={0.85}>
        <Circle cx="230" cy="57" r="8" fill="#FFFFFF" stroke="#6FA695" strokeWidth="2.5" />
        <Circle cx="230" cy="57" r="3" fill="#6FA695" />

        <Circle cx="250" cy="61" r="4.5" fill="#FFFFFF" stroke="#6FA695" strokeWidth="2" />
        <Circle cx="250" cy="61" r="1.5" fill="#6FA695" />

        <Path
          d="M230 50 L238 50 L238 54 L250 54 L250 59 L230 59 Z"
          fill="#6FA695"
        />

        <Path
          d="M225 51 Q227 44 233 45 L233 50 Z"
          fill="#7BB0A0"
        />

        <Line x1="238" y1="48" x2="235" y2="51" stroke="#6FA695" strokeWidth="1.4" />
        <Line x1="247" y1="54" x2="247" y2="47" stroke="#6FA695" strokeWidth="1.4" />
      </G>
    </Svg>
  );
};

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<any>();
  const [activeId, setActiveId] = useState<string>('home');

  const handleNavigate = (screenName: string, params?: object) => {
    onClose();
    try {
      navigation.navigate(screenName, params);
    } catch {
      // If direct navigation fails, handle gracefully
    }
  };

  const handleCallSupport = () => {
    onClose();
    Linking.openURL('tel:+919876543210').catch(() => {
      Alert.alert('Customer Support', 'Helpline: +91 98765 43210');
    });
  };

  const handleWhatsAppSupport = () => {
    onClose();
    Linking.openURL('whatsapp://send?phone=+919876543210&text=Hello Jamin24, I need assistance.').catch(() => {
      Alert.alert('WhatsApp Support', 'WhatsApp Helpline: +91 98765 43210');
    });
  };

  const menuItems: MenuItemConfig[] = [
    {
      id: 'home',
      title: 'Home',
      iconName: 'home',
      showChevron: true,
      onPress: () => handleNavigate('Home'),
    },
    {
      id: 'search',
      title: 'Search Lands',
      iconName: 'search-outline',
      showChevron: true,
      onPress: () => handleNavigate('Search'),
    },
    {
      id: 'map',
      title: 'Map View',
      iconName: 'map-outline',
      showChevron: true,
      onPress: () => handleNavigate('MapView'),
    },
    {
      id: 'projects',
      title: 'My Projects',
      iconName: 'document-text-outline',
      showChevron: true,
      onPress: () => handleNavigate('Projects'),
    },
    {
      id: 'saved',
      title: 'Saved / Shortlisted',
      iconName: 'heart-outline',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          'Saved / Shortlisted',
          'Your shortlisted properties will appear here.',
          [
            { text: 'View Account', onPress: () => navigation.navigate('Account') },
            { text: 'OK', style: 'cancel' },
          ]
        );
      },
    },
    {
      id: 'notifications',
      title: 'Notifications',
      iconName: 'notifications-outline',
      badge: 3,
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          'Notifications',
          'You have 3 new notifications:\n\n• New verified agricultural land in your area\n• Price updated on shortlisted property\n• Jamin Buddy matching update'
        );
      },
    },
    {
      id: 'contact',
      title: 'Contact Us',
      iconName: 'call',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          'Contact Us',
          'Jamin24 Customer Support:\n\n📞 Phone: +91 98765 43210\n💬 WhatsApp: +91 98765 43210\n✉️ Email: support@jamin24.com',
          [
            { text: 'Call Now', onPress: handleCallSupport },
            { text: 'WhatsApp', onPress: handleWhatsAppSupport },
            { text: 'Close', style: 'cancel' },
          ]
        );
      },
    },
    {
      id: 'help',
      title: 'Help & Support',
      iconName: 'help-circle-outline',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          'Help & Support',
          'Jamin24 Help Desk:\n\n• 24/7 Helpline assistance\n• Land verification process guide\n• Legal document assistance\n• 360° virtual tour guidance\n\nHelpline: +91 98765 43210'
        );
      },
    },
    {
      id: 'about',
      title: 'About Us',
      iconName: 'information-circle-outline',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          'About Us',
          'Jamin24 • Saraswati Group\n\nIndia\'s leading open land platform connecting buyers and sellers with 100% verified listings, 360° virtual tours, and transparent deals.'
        );
      },
    },
    {
      id: 'language',
      title: 'Language Setting',
      iconName: 'language-outline',
      showChevron: true,
      onPress: () => handleNavigate('LanguageSetting'),
    },
    {
      id: 'settings',
      title: 'Settings',
      iconName: 'settings-outline',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          'Settings',
          'App Preferences:\n\n• Language: English (EN)\n• Notifications: Enabled\n• Version: 1.0.0'
        );
      },
    },
    {
      id: 'logout',
      title: 'Logout',
      iconName: 'log-out-outline',
      showChevron: false,
      onPress: () => {
        onClose();
        Alert.alert(
          'Logout',
          'Are you sure you want to log out from Jamin24?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => {} },
          ]
        );
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/45 flex-row">
        {/* Backdrop tap to dismiss */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute inset-0" />
        </TouchableWithoutFeedback>

        {/* Drawer Body */}
        <View
          style={{ width: DRAWER_WIDTH }}
          className="h-full bg-white elevation-20 shadow-xl shadow-black/25"
        >
          <View className="flex-1 bg-white">
            {/* Header: Dark Green with Logo, User Details & Watermark */}
            <TouchableOpacity
              style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 14 : 50 }}
              className="bg-headerDark pb-5 px-4 flex-row items-center relative overflow-hidden"
              activeOpacity={0.85}
              onPress={() => handleNavigate('Account')}
            >
              {/* Subtle watermark logo in top-right corner */}
              <Image
                source={require('../assets/images/drawer_logo.png')}
                className="absolute -right-[25px] -top-[20px] w-[140px] h-[140px] opacity-[0.12]"
                style={{ tintColor: '#FFFFFF' }}
                resizeMode="contain"
              />

              {/* White Circular Badge with Logo */}
              <View className="w-[46px] h-[46px] rounded-[23px] bg-white justify-center items-center shadow-sm elevation-3">
                <Image
                  source={require('../assets/images/drawer_logo.png')}
                  className="w-[38px] h-[38px]"
                  resizeMode="contain"
                />
              </View>

              {/* User Title & Subtitle */}
              <View className="flex-1 ml-[10px]">
                <Text className="text-[16px] font-bold text-white tracking-[0.2px]">Jamin Buddy</Text>
                <Text className="text-[12px] font-normal text-subHeaderGreen mt-[2px]">Farmer / Land Seeker</Text>
              </View>

              {/* Right Chevron */}
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Menu Items List */}
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingVertical: 10 }}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {menuItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    className={`flex-row items-center py-[10px] px-[12px] mx-[6px] my-[1.5px] rounded-[8px] relative ${
                      isActive ? 'bg-[#EEF6F2]' : ''
                    }`}
                    activeOpacity={0.7}
                    onPress={() => {
                      setActiveId(item.id);
                      item.onPress();
                    }}
                  >
                    {/* Active left green indicator */}
                    {isActive && (
                      <View className="absolute left-0 top-[4px] bottom-[4px] w-[3.5px] bg-[#00A86B] rounded-r-[3px] rounded-l-[2px]" />
                    )}

                    {/* Icon */}
                    <View className="w-[24px] items-start justify-center">
                      <Ionicons
                        name={item.iconName}
                        size={21}
                        color="#0B5E42"
                      />
                    </View>

                    {/* Title */}
                    <Text
                      className={`flex-1 text-[13.5px] ml-[6px] ${
                        isActive ? 'font-bold text-[#111827]' : 'font-semibold text-[#1E293B]'
                      }`}
                    >
                      {item.title}
                    </Text>

                    {/* Badge if present (Notifications) */}
                    {item.badge != null && (
                      <View className="w-[18px] h-[18px] rounded-[9px] bg-badgeRed justify-center items-center mr-[6px]">
                        <Text className="text-white text-[10px] font-bold">{item.badge}</Text>
                      </View>
                    )}

                    {/* Trailing Chevron (except Logout) */}
                    {item.showChevron !== false && (
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color="#0B5E42"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Bottom Section: Landscape Illustration & Footer */}
            <View className="mt-auto bg-white">
              <LandscapeIllustration width={DRAWER_WIDTH} />
              <View
                style={{ paddingBottom: Platform.OS === 'ios' ? 24 : 16 }}
                className="flex-row items-center justify-center pt-2"
              >
                <Text className="text-[12px] font-extrabold text-headerDark">Jamin24</Text>
                <Text className="text-[11px] text-[#CBD5E1] mx-[6px]">|</Text>
                <Text className="text-[10px] font-medium text-[#64748B]">Connecting Land & Dreams</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
