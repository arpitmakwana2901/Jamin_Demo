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
        {/* Left: Drawer Menu Icon */}
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={handleMenuPress}
        >
          <Ionicons name="menu-outline" size={26} color={colors.text} />
        </TouchableOpacity>

        {/* Right Actions: Jamin Buddy & Logo on the right side */}
        <View style={styles.rightActions}>
          {/* Pill-shaped button "Jamin Buddy" with mic icon */}
          <TouchableOpacity
            style={styles.buddyPill}
            activeOpacity={0.8}
            onPress={onBuddyPress || (() => Alert.alert('Jamin Buddy', 'Voice assistant activated.'))}
          >
            <Ionicons name="mic-outline" size={14} color={colors.primary} style={styles.iconMargin} />
            <Text style={styles.buddyText}>Jamin Buddy</Text>
          </TouchableOpacity>

          {/* Logo on the right side of the app */}
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/images/header_logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.subLogoText}>SARASWATI GROUP</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buddyText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  iconMargin: {
    marginRight: 4,
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
  menuButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
