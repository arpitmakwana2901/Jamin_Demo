import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
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
      <View style={styles.container}>
        {/* Left: Logo & Subtitle */}
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.subLogoText}>SARSHAKHI GROUP</Text>
        </View>

        {/* Right Actions */}
        <View style={styles.rightActions}>
          {/* Pill-shaped button "Jamin Buddy" with mic icon */}
          <TouchableOpacity
            style={styles.buddyPill}
            activeOpacity={0.8}
            onPress={onBuddyPress || (() => Alert.alert('Jamin Buddy', 'Voice assistant activated.'))}
          >
            <Ionicons name="mic-outline" size={15} color={colors.primary} style={styles.iconMargin} />
            <Text style={styles.buddyText}>Jamin Buddy</Text>
          </TouchableOpacity>

          {/* Language selector "EN" with globe icon */}
          <TouchableOpacity
            style={styles.langPill}
            activeOpacity={0.8}
            onPress={onLanguagePress || (() => Alert.alert('Language', 'Language selector opened.'))}
          >
            <Ionicons name="globe-outline" size={15} color={colors.text} style={styles.iconMargin} />
            <Text style={styles.langText}>EN</Text>
          </TouchableOpacity>

          {/* Hamburger Menu Icon */}
          <TouchableOpacity
            style={styles.menuButton}
            activeOpacity={0.7}
            onPress={handleMenuPress}
          >
            <Ionicons name="menu-outline" size={26} color={colors.text} />
          </TouchableOpacity>
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
    height: 64,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 20,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 124,
    height: 32,
  },
  subLogoText: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 1,
    marginTop: 1,
    marginLeft: 2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buddyPill: {
    backgroundColor: colors.primaryLight,
    borderColor: '#C8E6C9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buddyText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  langPill: {
    backgroundColor: colors.chipBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  langText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  iconMargin: {
    marginRight: 4,
  },
  menuButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
