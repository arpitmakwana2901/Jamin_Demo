import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import { LanguageSelectModal } from '../components/LanguageSelectModal';

export const AccountScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();

  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  // Auth modal state
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // Language modal state
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalVisible(true);
  };

  const handleAuthSubmit = () => {
    if (!inputPhone.trim() || inputPhone.trim().length < 10) {
      Alert.alert('Validation', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!inputPassword.trim()) {
      Alert.alert('Validation', 'Please enter your password.');
      return;
    }
    if (authMode === 'register' && !inputName.trim()) {
      Alert.alert('Validation', 'Please enter your full name.');
      return;
    }

    const name = authMode === 'register' ? inputName.trim() : inputName.trim() || 'Jamin24 User';
    setUserName(name);
    setUserPhone(`+91 ${inputPhone.trim()}`);
    setIsLoggedIn(true);
    setAuthModalVisible(false);
    setInputName('');
    setInputPhone('');
    setInputPassword('');

    Alert.alert(
      authMode === 'login' ? t('account.loginSuccess') : t('account.registerSuccess'),
      authMode === 'login' ? t('account.loginSuccessMsg') : t('account.registerSuccessMsg')
    );
  };

  const handleLogout = () => {
    Alert.alert(
      t('drawer.logoutTitle'),
      t('drawer.logoutMsg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('drawer.logout'),
          style: 'destructive',
          onPress: () => {
            setIsLoggedIn(false);
            setUserName('');
            setUserPhone('');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile / Login Card (Original UI Structure) */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>

          {!isLoggedIn ? (
            <>
              <Text style={styles.userName}>{t('account.welcomeTitle')}</Text>
              <Text style={styles.userPhone}>{t('account.welcomeDesc')}</Text>

              {/* Login / Register Buttons */}
              <View style={styles.authRow}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  activeOpacity={0.8}
                  onPress={() => openAuth('login')}
                >
                  <Text style={styles.loginBtnText}>{t('account.login')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerBtn}
                  activeOpacity={0.8}
                  onPress={() => openAuth('register')}
                >
                  <Text style={styles.registerBtnText}>{t('account.register')}</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userPhone}>{userPhone}</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color={colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.verifiedText}>{t('account.verifiedUser')}</Text>
              </View>

              <TouchableOpacity
                style={styles.logoutBtn}
                activeOpacity={0.7}
                onPress={handleLogout}
              >
                <Text style={styles.logoutBtnText}>{t('account.logout')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Menu Options (Original UI Structure) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account.myActivity')}</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              if (!isLoggedIn) {
                openAuth('login');
              } else {
                Alert.alert(t('account.savedJamin'), t('drawer.savedMsg'));
              }
            }}
          >
            <Ionicons name="bookmark-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('account.savedJamin')}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              if (!isLoggedIn) {
                openAuth('login');
              } else {
                Alert.alert(t('account.myInquiries'), 'View active inquiries.');
              }
            }}
          >
            <Ionicons name="chatbubbles-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('account.myInquiries')}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              if (!isLoggedIn) {
                openAuth('login');
              } else {
                Alert.alert(t('account.listYourLand'), 'List your land.');
              }
            }}
          >
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('account.listYourLand')}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Settings Section (Original UI Structure with Workable Language & AboutUs) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account.settingsSupport')}</Text>

          {/* App Language (Workable Modal) */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setLanguageModalVisible(true)}
          >
            <Ionicons name="globe-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('account.appLanguage')} (EN / HI / GU)</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {/* 24/7 Customer Support */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert(t('account.customerSupport'), 'Calling Support helpline: +91 98765 43210')}
          >
            <Ionicons name="headset-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('account.customerSupport')}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {/* About Jamin24 (Opens AboutUs Screen) */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation?.navigate('AboutUs')}
          >
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('account.aboutJamin24')}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Auth Modal */}
      <Modal
        visible={authModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAuthModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.authModalCard}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setAuthModalVisible(false)}
            >
              <Ionicons name="close" size={22} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.segmentRow}>
              <TouchableOpacity
                style={[styles.segmentTab, authMode === 'login' && styles.segmentTabActive]}
                onPress={() => setAuthMode('login')}
              >
                <Text style={[styles.segmentTabText, authMode === 'login' && styles.segmentTabTextActive]}>
                  {t('account.login')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentTab, authMode === 'register' && styles.segmentTabActive]}
                onPress={() => setAuthMode('register')}
              >
                <Text style={[styles.segmentTabText, authMode === 'register' && styles.segmentTabTextActive]}>
                  {t('account.register')}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formTitle}>
              {authMode === 'login' ? t('account.loginTitle') : t('account.registerTitle')}
            </Text>

            {authMode === 'register' && (
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>{t('account.fullName')}</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t('account.fullNamePlaceholder')}
                  placeholderTextColor={colors.textMuted}
                  value={inputName}
                  onChangeText={setInputName}
                />
              </View>
            )}

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>{t('account.mobileNumber')}</Text>
              <TextInput
                style={styles.inputField}
                placeholder={t('account.mobilePlaceholder')}
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={inputPhone}
                onChangeText={setInputPhone}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>{t('account.password')}</Text>
              <TextInput
                style={styles.inputField}
                placeholder={t('account.passwordPlaceholder')}
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                value={inputPassword}
                onChangeText={setInputPassword}
              />
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.85}
              onPress={handleAuthSubmit}
            >
              <Text style={styles.submitBtnText}>
                {authMode === 'login' ? t('account.login') : t('account.register')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            >
              <Text style={styles.toggleBtnText}>
                {authMode === 'login' ? t('account.dontHaveAccount') : t('account.alreadyHaveAccount')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      <LanguageSelectModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  userPhone: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 18,
  },
  authRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
    width: '100%',
  },
  loginBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  registerBtn: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  logoutBtn: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  logoutBtnText: {
    color: colors.red,
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  // Auth Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  authModalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
  },
  modalCloseBtn: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  segmentRow: {
    flexDirection: 'row',
    backgroundColor: colors.chipBg,
    borderRadius: 10,
    padding: 3,
    marginBottom: 16,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentTabActive: {
    backgroundColor: colors.white,
  },
  segmentTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
  },
  segmentTabTextActive: {
    fontWeight: '800',
    color: colors.primary,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 14,
  },
  inputBox: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 4,
  },
  inputField: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: colors.text,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  toggleBtn: {
    marginTop: 12,
    alignItems: 'center',
  },
  toggleBtnText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
});
