import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { useTranslation } from 'react-i18next';

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
        {/* Tree 1 */}
        <Rect x="16" y="46" width="2" height="12" fill="#78AFA0" />
        <Circle cx="17" cy="40" r="8" fill="#91C7B8" />

        {/* Tree 2 */}
        <Rect x="27" y="38" width="2.5" height="16" fill="#78AFA0" />
        <Circle cx="28" cy="30" r="12" fill="#82BDAE" />

        {/* Tree 3 */}
        <Rect x="41" y="42" width="2" height="14" fill="#78AFA0" />
        <Circle cx="42" cy="35" r="9" fill="#99CEBF" />

        {/* Accent Tree Bulbs */}
        <Circle cx="10" cy="45" r="6.5" fill="#A4D5C7" />
        <Circle cx="51" cy="41" r="6.5" fill="#A8D7CA" />
      </G>

      {/* Stylized tractor on the right field */}
      <G opacity={0.85}>
        {/* Rear Wheel (Big) */}
        <Circle cx="230" cy="57" r="8" fill="#FFFFFF" stroke="#6FA695" strokeWidth="2.5" />
        <Circle cx="230" cy="57" r="3" fill="#6FA695" />

        {/* Front Wheel (Small) */}
        <Circle cx="250" cy="61" r="4.5" fill="#FFFFFF" stroke="#6FA695" strokeWidth="2" />
        <Circle cx="250" cy="61" r="1.5" fill="#6FA695" />

        {/* Tractor Body & Hood */}
        <Path
          d="M230 50 L238 50 L238 54 L250 54 L250 59 L230 59 Z"
          fill="#6FA695"
        />

        {/* Tractor Mudguard / Seat */}
        <Path
          d="M225 51 Q227 44 233 45 L233 50 Z"
          fill="#7BB0A0"
        />

        {/* Steering wheel */}
        <Line x1="238" y1="48" x2="235" y2="51" stroke="#6FA695" strokeWidth="1.4" />

        {/* Exhaust pipe */}
        <Line x1="247" y1="54" x2="247" y2="47" stroke="#6FA695" strokeWidth="1.4" />
      </G>
    </Svg>
  );
};

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
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
      title: t('common.home'),
      iconName: 'home',
      showChevron: true,
      onPress: () => handleNavigate('Home'),
    },
    {
      id: 'search',
      title: t('drawer.searchLands'),
      iconName: 'search-outline',
      showChevron: true,
      onPress: () => handleNavigate('Search'),
    },
    {
      id: 'map',
      title: t('common.mapView'),
      iconName: 'map-outline',
      showChevron: true,
      onPress: () => handleNavigate('MapView'),
    },
    {
      id: 'projects',
      title: t('drawer.myProjects'),
      iconName: 'document-text-outline',
      showChevron: true,
      onPress: () => handleNavigate('Projects'),
    },
    {
      id: 'pricing',
      title: t('drawer.pricingPlans'),
      iconName: 'pricetag-outline',
      showChevron: true,
      onPress: () => handleNavigate('PricingPlans'),
    },
    {
      id: 'saved',
      title: t('drawer.savedShortlisted'),
      iconName: 'heart-outline',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          t('drawer.savedTitle'),
          t('drawer.savedMsg'),
          [
            { text: t('common.viewDetails'), onPress: () => navigation.navigate('Account') },
            { text: t('common.ok'), style: 'cancel' },
          ]
        );
      },
    },
    {
      id: 'notifications',
      title: t('common.notifications'),
      iconName: 'notifications-outline',
      badge: 3,
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          t('drawer.notifTitle'),
          t('drawer.notifMsg')
        );
      },
    },
    {
      id: 'contact',
      title: t('drawer.contactUs'),
      iconName: 'call',
      showChevron: true,
      onPress: () => handleNavigate('ContactUs'),
    },
    {
      id: 'help',
      title: t('drawer.helpSupport'),
      iconName: 'help-circle-outline',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          t('drawer.helpTitle'),
          t('drawer.helpMsg')
        );
      },
    },
    {
      id: 'about',
      title: t('drawer.aboutUs'),
      iconName: 'information-circle-outline',
      showChevron: true,
      onPress: () => handleNavigate('AboutUs'),
    },
    {
      id: 'language',
      title: t('drawer.languageSetting'),
      iconName: 'language-outline',
      showChevron: true,
      onPress: () => handleNavigate('LanguageSetting'),
    },
    {
      id: 'settings',
      title: t('drawer.settings'),
      iconName: 'settings-outline',
      showChevron: true,
      onPress: () => {
        onClose();
        Alert.alert(
          t('drawer.settingsTitle'),
          t('drawer.settingsMsg')
        );
      },
    },
    {
      id: 'logout',
      title: t('drawer.logout'),
      iconName: 'log-out-outline',
      showChevron: false,
      onPress: () => {
        onClose();
        Alert.alert(
          t('drawer.logoutTitle'),
          t('drawer.logoutMsg'),
          [
            { text: t('common.cancel'), style: 'cancel' },
            { text: t('drawer.logout'), style: 'destructive', onPress: () => {} },
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
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      {visible && (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
      )}
      <View style={styles.overlay}>
        {/* Backdrop tap to dismiss */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Drawer Body */}
        <View style={styles.drawerContainer}>
          <View style={styles.drawerContent}>
            {/* Header: Dark Green with Logo, User Details & Watermark */}
            <TouchableOpacity
              style={styles.drawerHeader}
              activeOpacity={0.85}
              onPress={() => handleNavigate('Account')}
            >
              {/* Subtle watermark logo in top-right corner */}
              <Image
                source={require('../assets/images/drawer_logo.png')}
                style={styles.headerWatermark}
                resizeMode="contain"
              />

              {/* White Circular Badge with Logo */}
              <View style={styles.headerLogoCircle}>
                <Image
                  source={require('../assets/images/drawer_logo.png')}
                  style={styles.headerLogoImage}
                  resizeMode="contain"
                />
              </View>

              {/* User Title & Subtitle */}
              <View style={styles.headerInfo}>
                <Text style={styles.headerTitle}>{t('drawer.title')}</Text>
                <Text style={styles.headerSubtitle}>{t('drawer.userRole')}</Text>
              </View>

              {/* Right Chevron */}
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Menu Items List */}
            <ScrollView
              style={styles.menuScroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {menuItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      isActive && styles.menuItemActive,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => {
                      setActiveId(item.id);
                      item.onPress();
                    }}
                  >
                    {/* Active left green indicator */}
                    {isActive && <View style={styles.activeIndicator} />}

                    {/* Icon */}
                    <View style={styles.menuIconContainer}>
                      <Ionicons
                        name={item.iconName}
                        size={21}
                        color="#0B5E42"
                      />
                    </View>

                    {/* Title */}
                    <Text
                      style={[
                        styles.menuTitle,
                        isActive && styles.menuTitleActive,
                      ]}
                    >
                      {item.title}
                    </Text>

                    {/* Badge if present (Notifications) */}
                    {item.badge != null && (
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
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
            <View style={styles.bottomSection}>
              <LandscapeIllustration width={DRAWER_WIDTH} />
              <View style={styles.footerContainer}>
                <Text style={styles.footerBrand}>Jamin24</Text>
                <Text style={styles.footerDivider}>|</Text>
                <Text style={styles.footerTagline}>{t('drawer.brandTagline')}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerHeader: {
    backgroundColor: '#074430',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 16 : 54,
    paddingBottom: 22,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  headerWatermark: {
    position: 'absolute',
    right: -25,
    top: -20,
    width: 140,
    height: 140,
    opacity: 0.12,
    tintColor: '#FFFFFF',
  },
  headerLogoCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLogoImage: {
    width: 38,
    height: 38,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9ED8C9',
    marginTop: 2,
  },
  menuScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    marginVertical: 1.5,
    borderRadius: 8,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: '#EEF6F2',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 4,
    bottom: 4,
    width: 3.5,
    backgroundColor: '#00A86B',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  menuIconContainer: {
    width: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 6,
  },
  menuTitleActive: {
    fontWeight: '700',
    color: '#111827',
  },
  badgeContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E03B3B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  bottomSection: {
    marginTop: 'auto',
    backgroundColor: '#FFFFFF',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  footerBrand: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A4D3C',
  },
  footerDivider: {
    fontSize: 11,
    color: '#CBD5E1',
    marginHorizontal: 6,
  },
  footerTagline: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
  },
});
