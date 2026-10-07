import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { TopBar } from '../components/TopBar';
import { FooterSection } from '../components/home/FooterSection';
import { colors } from '../theme/colors';

export const ContactUsScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCallUs = () => {
    Linking.openURL('tel:+919898072803').catch(() => {
      Alert.alert('Call Us', 'Helpline: +91 98980 72803');
    });
  };

  const handleEmailUs = () => {
    Linking.openURL('mailto:info@jamin24.com').catch(() => {
      Alert.alert('Email Us', 'Email: info@jamin24.com');
    });
  };

  const handleExploreJamin = () => {
    try {
      navigation.navigate('Search');
    } catch {
      // Fallback
    }
  };

  const handleSubmitInquiry = () => {
    if (!fullName.trim() || !mobileNumber.trim()) {
      Alert.alert('Required Fields', 'Please enter your Full Name and Mobile Number.');
      return;
    }

    const textMsg = `Hello Jamin24, I have an inquiry:\nName: ${fullName}\nPhone: ${mobileNumber}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
    Linking.openURL(`whatsapp://send?phone=919898072803&text=${encodeURIComponent(textMsg)}`).catch(() => {
      Alert.alert(
        'Inquiry Submitted',
        `Thank you ${fullName}! Your inquiry has been received. Our team will reach out to you shortly.`,
      );
    });

    // Reset form
    setFullName('');
    setEmail('');
    setMobileNumber('');
    setSubject('');
    setMessage('');
  };

  const handleSocialLink = (platform: string) => {
    let url = 'https://jamin24.com';
    if (platform === 'facebook') url = 'https://facebook.com';
    if (platform === 'instagram') url = 'https://instagram.com';
    if (platform === 'linkedin') url = 'https://linkedin.com';
    if (platform === 'twitter') url = 'https://twitter.com';

    Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* TOP BAR HEADER */}
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: HERO BANNER SECTION */}
        <View style={styles.heroBannerSection}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000' }}
            style={styles.heroBgImage}
            resizeMode="cover"
          >
            <View style={styles.heroDarkOverlay} />

            <View style={styles.heroContentBox}>
              <View style={styles.heroTagPill}>
                <Text style={styles.heroTagPillText}>{t('contact.heroTag')}</Text>
              </View>

              <Text style={styles.heroTitleText}>{t('contact.heroTitle')}</Text>

              <Text style={styles.heroSubText}>
                {t('contact.heroSub')}
              </Text>

              {/* BUTTONS */}
              <View style={styles.heroButtonsRow}>
                <TouchableOpacity
                  style={styles.contactNowBtn}
                  onPress={handleCallUs}
                  activeOpacity={0.88}
                >
                  <Text style={styles.contactNowBtnText}>{t('common.contactNow')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.exploreJaminBtn}
                  onPress={handleExploreJamin}
                  activeOpacity={0.88}
                >
                  <Text style={styles.exploreJaminBtnText}>{t('common.exploreJamin')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* RIGHT SIDE 3 TRANSLUCENT GLASS METRIC CARDS */}
            <View style={styles.glassMetricsContainer}>
              <View style={styles.glassCardBox}>
                <Text style={styles.glassCardNumber}>{t('contact.quickResponseVal')}</Text>
                <Text style={styles.glassCardLabel}>{t('contact.quickResponseLabel')}</Text>
              </View>

              <View style={styles.glassCardBox}>
                <Text style={styles.glassCardNumber}>{t('contact.dealsVal')}</Text>
                <Text style={styles.glassCardLabel}>{t('contact.dealsLabel')}</Text>
              </View>

              <View style={styles.glassCardBox}>
                <Text style={styles.glassCardNumber}>{t('contact.verifiedVal')}</Text>
                <Text style={styles.glassCardLabel}>{t('contact.verifiedLabel')}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* SECTION 2: CONTACT INFORMATION CARDS ROW (3 CARDS) */}
        <View style={styles.contactCardsRow}>
          {/* CARD 1: OFFICE ADDRESS */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconCircle}>
              <Ionicons name="location-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>{t('contact.officeAddress')}</Text>
              <Text style={styles.infoValue}>
                {t('contact.officeAddressVal')}
              </Text>
            </View>
          </View>

          {/* CARD 2: CALL US */}
          <TouchableOpacity
            style={styles.infoCard}
            onPress={handleCallUs}
            activeOpacity={0.85}
          >
            <View style={styles.infoIconCircle}>
              <Ionicons name="call-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>{t('common.callUs')}</Text>
              <Text style={styles.infoValueBold}>{t('contact.callUsBold')}</Text>
            </View>
          </TouchableOpacity>

          {/* CARD 3: EMAIL US */}
          <TouchableOpacity
            style={styles.infoCard}
            onPress={handleEmailUs}
            activeOpacity={0.85}
          >
            <View style={styles.infoIconCircle}>
              <Ionicons name="mail-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>{t('common.emailUs')}</Text>
              <Text style={styles.infoValueBold}>{t('contact.emailUsBold')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* SECTION 3: INQUIRY FORM & CONNECT BOX */}
        <View style={styles.formAndConnectContainer}>
          {/* LEFT: INQUIRY FORM CARD */}
          <View style={styles.inquiryFormCard}>
            <View style={styles.sectionTagPill}>
              <Text style={styles.sectionTagText}>{t('contact.sendInquiryTag')}</Text>
            </View>

            <Text style={styles.formTitle}>{t('contact.formTitle')}</Text>

            <Text style={styles.formSubtitle}>
              {t('contact.formSubtitle')}
            </Text>

            {/* FORM INPUTS */}
            <View style={styles.formGrid}>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>{t('contact.fullName')}</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={t('contact.fullNamePlaceholder')}
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>{t('contact.emailLabel')}</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={t('contact.emailPlaceholder')}
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>{t('contact.mobileNumber')}</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={t('contact.mobilePlaceholder')}
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
              </View>

              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>{t('contact.subject')}</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={t('contact.subjectPlaceholder')}
                  placeholderTextColor="#94A3B8"
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>

              <View style={styles.fieldBoxFull}>
                <Text style={styles.fieldLabel}>{t('contact.message')}</Text>
                <TextInput
                  style={[styles.formInput, styles.formTextArea]}
                  placeholder={t('contact.messagePlaceholder')}
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={message}
                  onChangeText={setMessage}
                />
              </View>

              <TouchableOpacity
                style={styles.submitInquiryBtn}
                onPress={handleSubmitInquiry}
                activeOpacity={0.88}
              >
                <Text style={styles.submitInquiryBtnText}>{t('contact.submitInquiryBtn')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* RIGHT: CONNECT CARD & URGENT SITE VISIT */}
          <View style={styles.connectCard}>
            <View style={styles.sectionTagPill}>
              <Text style={styles.sectionTagText}>{t('contact.connectTag')}</Text>
            </View>

            <Text style={styles.formTitle}>{t('contact.reachUsTitle')}</Text>

            <Text style={styles.formSubtitle}>
              {t('contact.reachUsSubtitle')}
            </Text>

            {/* SOCIAL ICONS ROW */}
            <View style={styles.socialIconsRow}>
              <TouchableOpacity
                style={styles.socialCircle}
                onPress={() => handleSocialLink('facebook')}
              >
                <Ionicons name="logo-facebook" size={16} color="#1E293B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialCircle}
                onPress={() => handleSocialLink('instagram')}
              >
                <Ionicons name="logo-instagram" size={16} color="#1E293B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialCircle}
                onPress={() => handleSocialLink('linkedin')}
              >
                <Ionicons name="logo-linkedin" size={16} color="#1E293B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialCircle}
                onPress={() => handleSocialLink('twitter')}
              >
                <Ionicons name="logo-twitter" size={16} color="#1E293B" />
              </TouchableOpacity>
            </View>

            {/* URGENT SITE VISIT BOX */}
            <View style={styles.urgentSiteVisitBox}>
              <Text style={styles.urgentSiteTitle}>{t('contact.urgentSiteTitle')}</Text>
              <Text style={styles.urgentSiteSub}>
                {t('contact.urgentSiteSub')}
              </Text>
            </View>
          </View>
        </View>

        {/* SECTION 4: VISIT JAMIN24 IN AHMEDABAD (MAP LOCATION) */}
        <View style={styles.officeMapSection}>
          <View style={styles.sectionTagPill}>
            <Text style={styles.sectionTagText}>{t('contact.officeLocationTag')}</Text>
          </View>

          <Text style={styles.officeMapTitle}>{t('contact.officeMapTitle')}</Text>

          <View style={styles.mapContainerBox}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000' }}
              style={styles.mapImage}
              resizeMode="cover"
            >
              {/* OFFICE PIN MARKER */}
              <TouchableOpacity
                style={styles.officePinMarker}
                onPress={handleCallUs}
                activeOpacity={0.8}
              >
                <Ionicons name="location" size={18} color={colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.officePinText}>{t('contact.officePinText')}</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>

        {/* SECTION 5: BOTTOM CTA BANNER */}
        <View style={styles.ctaCardBox}>
          <View style={styles.sectionTagPill}>
            <Text style={styles.sectionTagText}>{t('contact.suitableJaminTag')}</Text>
          </View>

          <View style={styles.ctaRowContent}>
            <View style={styles.ctaTextContainer}>
              <Text style={styles.ctaMainTitle}>{t('contact.ctaMainTitle')}</Text>
              <Text style={styles.ctaMainSub}>
                {t('contact.ctaMainSub')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.ctaExploreBtn}
              onPress={handleExploreJamin}
              activeOpacity={0.88}
            >
              <Text style={styles.ctaExploreBtnText}>{t('common.exploreJamin')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FOOTER */}
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroBannerSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heroBgImage: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0A4D3C',
    padding: 20,
  },
  heroDarkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 77, 60, 0.82)',
  },
  heroContentBox: {
    zIndex: 10,
    gap: 10,
    marginBottom: 20,
  },
  heroTagPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  heroTagPillText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  heroTitleText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  heroSubText: {
    fontSize: 12,
    color: '#E2F2EC',
    lineHeight: 18,
    fontWeight: '500',
  },
  heroButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  contactNowBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNowBtnText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '900',
  },
  exploreJaminBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreJaminBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  glassMetricsContainer: {
    zIndex: 10,
    gap: 10,
  },
  glassCardBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  glassCardNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  glassCardLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#E2F2EC',
  },
  contactCardsRow: {
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  infoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 11.5,
    color: '#475569',
    lineHeight: 16,
  },
  infoValueBold: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  formAndConnectContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 16,
  },
  inquiryFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  sectionTagPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDF7F4',
    borderWidth: 1,
    borderColor: '#C2E4D8',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  sectionTagText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.primaryDark,
    letterSpacing: 0.8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 16,
  },
  formGrid: {
    gap: 12,
  },
  fieldBox: {
    width: '100%',
  },
  fieldBoxFull: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  formInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    height: 42,
    fontSize: 12.5,
    color: '#0F172A',
  },
  formTextArea: {
    height: 90,
    paddingTop: 10,
  },
  submitInquiryBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  submitInquiryBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  connectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  socialIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  socialCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgentSiteVisitBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  urgentSiteTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  urgentSiteSub: {
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 16,
  },
  officeMapSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  officeMapTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 12,
  },
  mapContainerBox: {
    height: 220,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#0F172A',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  officePinMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  officePinText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  ctaCardBox: {
    backgroundColor: '#FFFDF7',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  ctaRowContent: {
    gap: 14,
    marginTop: 8,
  },
  ctaTextContainer: {
    gap: 4,
  },
  ctaMainTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  ctaMainSub: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  ctaExploreBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaExploreBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
