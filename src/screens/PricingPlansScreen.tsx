import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { TopBar } from '../components/TopBar';
import { FooterSection } from '../components/home/FooterSection';
import { colors } from '../theme/colors';

export const PricingPlansScreen: React.FC = () => {
  const { t } = useTranslation();

  const handleApplyNow = (planName: string) => {
    const phone = '919898072803';
    const message = `Hello Jamin24, I would like to apply for the ${planName} plan.`;
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`).catch(() => {
      Alert.alert(
        'Plan Selection',
        `Thank you for selecting ${planName}.\nOur team will contact you shortly to activate your plan.`,
      );
    });
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
        {/* HEADER HERO BANNER SECTION */}
        <View style={styles.heroBannerSection}>
          {/* GREEN BANNER CARD */}
          <View style={styles.greenBannerCard}>
            <View style={styles.pricingPillBadge}>
              <Text style={styles.pricingPillText}>{t('pricing.pricingPill')}</Text>
            </View>

            <Text style={styles.heroHeadlineText}>
              {t('pricing.heroHeadline')}
            </Text>

            <Text style={styles.heroDescriptionText}>
              {t('pricing.heroDesc')}
            </Text>

            {/* METRICS ROW INSIDE GREEN CARD */}
            <View style={styles.heroMetricsRow}>
              <View style={styles.metricCardBox}>
                <Text style={styles.metricCardNumber}>{t('pricing.planTypesCount')}</Text>
                <Text style={styles.metricCardLabel}>{t('pricing.planTypesLabel')}</Text>
              </View>

              <View style={styles.metricCardBox}>
                <Text style={styles.metricCardNumber}>{t('pricing.boostMaxDuration')}</Text>
                <Text style={styles.metricCardLabel}>{t('pricing.boostDurationLabel')}</Text>
              </View>
            </View>
          </View>

          {/* BEFORE PLAN PURCHASE WHITE CARD */}
          <View style={styles.beforePurchaseCard}>
            <Text style={styles.beforePurchaseTitle}>{t('pricing.beforePurchaseTitle')}</Text>
            <Text style={styles.beforePurchaseSub}>
              {t('pricing.beforePurchaseSub')}
            </Text>

            <View style={styles.checklistContainer}>
              <View style={styles.checkRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={styles.checkText}>{t('pricing.profileCompletion')}</Text>
              </View>

              <View style={styles.checkRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={styles.checkText}>{t('pricing.verificationStatus')}</Text>
              </View>

              <View style={styles.checkRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={styles.checkText}>{t('pricing.planDetails')}</Text>
              </View>

              <View style={styles.checkRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={styles.checkText}>{t('pricing.benefits')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 1: SELLER PLANS */}
        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitleText}>{t('pricing.sellerPlansTitle')}</Text>
          <Text style={styles.sectionSubtitleText}>
            {t('pricing.sellerPlansSub')}
          </Text>
        </View>

        <View style={styles.plansGridContainer}>
          {/* CARD 1: FREE LISTING */}
          <View style={styles.planCard}>
            {/* BADGES ROW */}
            <View style={styles.badgesRow}>
              <View style={styles.tagBadgePill}>
                <Text style={styles.tagBadgePillText}>{t('pricing.months6')}</Text>
              </View>
              <View style={styles.tagBadgePill}>
                <Text style={styles.tagBadgePillText}>{t('pricing.standardSellerDashboard')}</Text>
              </View>
            </View>

            <Text style={styles.planCardTitle}>{t('pricing.freeListingTitle')}</Text>

            {/* PRICE */}
            <View style={styles.priceRow}>
              <Text style={styles.priceMainText}>{t('pricing.freePrice')}</Text>
            </View>

            {/* FEATURES CHECKLIST */}
            <View style={styles.featuresList}>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>1 Image</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Basic info</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Low visibility</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Verification required</Text>
              </View>
            </View>

            {/* APPLY BUTTON */}
            <TouchableOpacity
              style={styles.applyBtn}
              activeOpacity={0.88}
              onPress={() => handleApplyNow(t('pricing.freeListingTitle'))}
            >
              <Text style={styles.applyBtnText}>{t('pricing.applyNow')}</Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>

          {/* CARD 2: PRO LISTING */}
          <View style={styles.planCard}>
            {/* BADGES ROW */}
            <View style={styles.badgesRow}>
              <View style={styles.tagBadgePill}>
                <Text style={styles.tagBadgePillText}>{t('pricing.months12')}</Text>
              </View>
              <View style={styles.tagBadgePill}>
                <Text style={styles.tagBadgePillText}>{t('pricing.standardSellerDashboard')}</Text>
              </View>
            </View>

            <Text style={styles.planCardTitle}>{t('pricing.proListingTitle')}</Text>

            {/* PRICE WITH STRIKETHROUGH */}
            <View style={styles.priceRow}>
              <Text style={styles.priceMainText}>{t('pricing.freePrice')} </Text>
              <Text style={styles.strikeThroughPrice}>₹25,000</Text>
            </View>

            {/* FEATURES CHECKLIST */}
            <View style={styles.featuresList}>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Drone shoot of land</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Professional land photography</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>360° virtual land view</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Short promotional reel</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Verified listing badge</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Priority ranking on platform</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Complete land profile page</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Location & access road details</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Plot / land description writing</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Inquiry management support</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Buyer lead visibility</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>WhatsApp sharing link</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Jamin24 branding support</Text>
              </View>
            </View>

            {/* APPLY BUTTON */}
            <TouchableOpacity
              style={styles.applyBtn}
              activeOpacity={0.88}
              onPress={() => handleApplyNow(t('pricing.proListingTitle'))}
            >
              <Text style={styles.applyBtnText}>{t('pricing.applyNow')}</Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 2: ROLE SUBSCRIPTIONS */}
        <View style={[styles.sectionHeaderBox, { marginTop: 24 }]}>
          <Text style={styles.sectionTitleText}>{t('pricing.roleSubscriptionsTitle')}</Text>
          <Text style={styles.sectionSubtitleText}>
            {t('pricing.roleSubscriptionsSub')}
          </Text>
        </View>

        <View style={styles.plansGridContainer}>
          {/* CARD 1: BROKER ANNUAL SUBSCRIPTION */}
          <View style={styles.planCard}>
            {/* BADGES ROW */}
            <View style={styles.badgesRow}>
              <View style={styles.tagBadgePill}>
                <Text style={styles.tagBadgePillText}>{t('pricing.months12')}</Text>
              </View>
              <View style={styles.tagBadgePill}>
                <Text style={styles.tagBadgePillText}>{t('pricing.brokerWorkspace')}</Text>
              </View>
            </View>

            <Text style={styles.planCardTitle}>{t('pricing.brokerAnnualSubTitle')}</Text>

            {/* PRICE WITH STRIKETHROUGH */}
            <View style={styles.priceRow}>
              <Text style={styles.priceMainText}>{t('pricing.freePrice')} </Text>
              <Text style={styles.strikeThroughPrice}>₹5,000</Text>
              <Text style={styles.pricePeriodSub}>{t('pricing.perYear')}</Text>
            </View>

            {/* FEATURES CHECKLIST */}
            <View style={styles.featuresList}>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Contact all sellers</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>30 contact reveals/month</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Earnings dashboard</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Wallet system</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Referral system</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Boost listings</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Ranking system</Text>
              </View>
              <View style={styles.featureItemRow}>
                <Ionicons name="checkmark-circle-outline" size={15} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.featureItemText}>Required: Full KYC verification</Text>
              </View>
            </View>

            {/* APPLY BUTTON */}
            <TouchableOpacity
              style={styles.applyBtn}
              activeOpacity={0.88}
              onPress={() => handleApplyNow(t('pricing.brokerAnnualSubTitle'))}
            >
              <Text style={styles.applyBtnText}>{t('pricing.applyNow')}</Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>


        {/* FOOTER SECTION */}
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
    gap: 16,
  },
  greenBannerCard: {
    backgroundColor: '#23735B',
    borderRadius: 20,
    padding: 20,
  },
  pricingPillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  pricingPillText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  heroHeadlineText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 30,
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  heroDescriptionText: {
    fontSize: 12.5,
    color: '#E2F2EC',
    lineHeight: 18,
    marginBottom: 18,
    fontWeight: '500',
  },
  heroMetricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCardBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  metricCardNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  metricCardLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#E2F2EC',
  },
  beforePurchaseCard: {
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
  beforePurchaseTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  beforePurchaseSub: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 14,
  },
  checklistContainer: {
    gap: 8,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  sectionHeaderBox: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 2,
  },
  sectionSubtitleText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  plansGridContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  planCard: {
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
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tagBadgePill: {
    backgroundColor: '#EDF7F4',
    borderWidth: 1,
    borderColor: '#C2E4D8',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagBadgePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  planCardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  priceMainText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
  },
  strikeThroughPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  pricePeriodSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  featuresList: {
    gap: 8,
    marginBottom: 20,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureItemText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    height: 42,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
