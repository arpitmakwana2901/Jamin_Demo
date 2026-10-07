import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      setDrawerVisible(true);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Left: Drawer Menu Button with distinct circular badge */}
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={handleMenuPress}
        >
          <Ionicons name="menu-outline" size={22} color={colors.text} />
        </TouchableOpacity>

        {/* Right Actions: Jamin Buddy & Brand Logo */}
        <View style={styles.rightActions}>
          {/* Pill-shaped button "Jamin Buddy" with mic icon */}
          <TouchableOpacity
            style={styles.buddyPill}
            activeOpacity={0.8}
            onPress={onBuddyPress || (() => Alert.alert(t('header.jaminBuddy'), t('header.voiceActivated')))}
          >
            <View style={styles.micCircle}>
              <Ionicons name="mic" size={12} color="#FFFFFF" />
            </View>
            <Text style={styles.buddyText}>{t('header.jaminBuddy')}</Text>
          </TouchableOpacity>

          {/* Logo on the right side */}
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/images/header_logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.subLogoText}>{t('header.saraswatiGroup')}</Text>
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

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    // Elevation & shadow for clear separation from content & status bar
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  menuButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buddyPill: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 4,
    paddingRight: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  micCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  buddyText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
  },
  logoImage: {
    width: 36,
    height: 36,
  },
  subLogoText: {
    fontSize: 7.5,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
    marginTop: 1,
    textAlign: 'center',
  },
});
