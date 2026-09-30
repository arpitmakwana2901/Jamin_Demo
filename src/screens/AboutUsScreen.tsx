import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TopBar } from '../components/TopBar';
import { FooterSection } from '../components/home/FooterSection';
import { colors } from '../theme/colors';

export const AboutUsScreen: React.FC<any> = ({ navigation }) => {
  const handleContactUs = () => {
    const phone = '919898072803';
    const message = 'Hello Jamin24, I would like to get more information about your land services.';
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`).catch(() => {
      Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
    });
  };

  const handleViewProperties = () => {
    try {
      navigation.navigate('Search');
    } catch {
      // Fallback
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* APP HEADER */}
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.heroTextContent}>
            <View style={styles.tagPillBadge}>
              <Text style={styles.tagPillText}>WHO WE ARE & WHAT WE DO</Text>
            </View>

            <Text style={styles.heroMainTitle}>About Jamin 24</Text>

            <Text style={styles.heroParagraph}>
              Jamin24 is a modern land real estate platform built to make land buying, selling, and project discovery simple, clear, and trustworthy.
            </Text>

            <Text style={styles.heroParagraph}>
              Our primary focus is the Open Land real estate, where buyers can explore verified agricultural plots, non-agricultural (NA) land, commercial parcels, plotting developments, along with 360° drone view photos, plot boundaries, and structural video outlines to help users understand every Jamin better.
            </Text>

            <Text style={styles.heroParagraph}>
              Jamin24 is backed by Saraswati Group, a trusted business name with over 25+ years of experience in finance, land real estate advisory, and structural plots.
            </Text>

            {/* HERO BUTTONS */}
            <View style={styles.heroButtonsRow}>
              <TouchableOpacity
                style={styles.contactUsBtn}
                onPress={handleContactUs}
                activeOpacity={0.88}
              >
                <Text style={styles.contactUsBtnText}>Contact Us</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewPropertiesBtn}
                onPress={handleViewProperties}
                activeOpacity={0.88}
              >
                <Text style={styles.viewPropertiesBtnText}>View Properties</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* HERO IMAGE BANNER */}
          <View style={styles.heroImageCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.imageGreenTintOverlay} />

            {/* OVERLAY BADGE ON IMAGE */}
            <View style={styles.imageGuideBadge}>
              <Ionicons name="compass-outline" size={14} color={colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.imageGuideBadgeText}>View 360° Jamin guidelines</Text>
            </View>
          </View>
        </View>

        {/* SECTION 2: PURPOSE - MISSION & VISION */}
        <View style={styles.purposeSection}>
          <View style={styles.centerTagPill}>
            <Text style={styles.tagPillText}>OUR PURPOSE</Text>
          </View>

          <Text style={styles.centerSectionTitle}>
            Built Around Trust, Clarity, and Better Jamin Decisions
          </Text>

          <Text style={styles.centerSectionSub}>
            We combine market knowledge with a practical, clear filter process for residential, commercial, and agricultural land.
          </Text>

          <View style={styles.missionVisionCardsGrid}>
            {/* MISSION CARD */}
            <View style={styles.pvCard}>
              <View style={styles.pvIconCircle}>
                <Ionicons name="locate-outline" size={20} color={colors.primary} />
              </View>

              <Text style={styles.pvCardTitle}>Our Mission</Text>
              <Text style={styles.pvCardSub}>
                To empower land buyers and sellers across India by providing transparent, verified, and technology-driven land deals.
              </Text>

              <View style={styles.pvChecklist}>
                <View style={styles.pvCheckRow}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.pvCheckText}>Simplify buying, selling, and land search guidelines</Text>
                </View>

                <View style={styles.pvCheckRow}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.pvCheckText}>Offer honest guidance and background verification</Text>
                </View>

                <View style={styles.pvCheckRow}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.pvCheckText}>Create a reliable framework for land trading</Text>
                </View>
              </View>
            </View>

            {/* VISION CARD */}
            <View style={styles.pvCard}>
              <View style={styles.pvIconCircle}>
                <Ionicons name="eye-outline" size={20} color={colors.primary} />
              </View>

              <Text style={styles.pvCardTitle}>Our Vision</Text>
              <Text style={styles.pvCardSub}>
                To become India's premier online platform where buyers, sellers, traders, and brokers connect with confidence.
              </Text>

              <View style={styles.pvChecklist}>
                <View style={styles.pvCheckRow}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.pvCheckText}>Building long-term trust for open land market</Text>
                </View>

                <View style={styles.pvCheckRow}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.pvCheckText}>Enabling real plot video tours and 360° views</Text>
                </View>

                <View style={styles.pvCheckRow}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.pvCheckText}>Deliver value for buyers, sellers, and investors</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 3: WHY CHOOSE US - START WITH CONFIDENCE */}
        <View style={styles.confidenceSection}>
          <View style={styles.centerTagPill}>
            <Text style={styles.tagPillText}>WHY CHOOSE US</Text>
          </View>

          <Text style={styles.centerSectionTitle}>Start with confidence</Text>

          <View style={styles.confidenceGrid}>
            {/* FEATURE 1 */}
            <View style={styles.confidenceCard}>
              <View style={styles.confIconSquare}>
                <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.confTitle}>Verified Listings</Text>
              <Text style={styles.confDesc}>
                Every verified plot is inspected for title, ownership integrity, and location clarity.
              </Text>
            </View>

            {/* FEATURE 2 */}
            <View style={styles.confidenceCard}>
              <View style={styles.confIconSquare}>
                <Ionicons name="person-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.confTitle}>Trusted Agents</Text>
              <Text style={styles.confDesc}>
                Connect with experienced agents who bring market knowledge and verified regional track records.
              </Text>
            </View>

            {/* FEATURE 3 */}
            <View style={styles.confidenceCard}>
              <View style={styles.confIconSquare}>
                <Ionicons name="document-text-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.confTitle}>Easy Process</Text>
              <Text style={styles.confDesc}>
                From 360° drone views to document reviews, we make land search simple and organized.
              </Text>
            </View>

            {/* FEATURE 4 */}
            <View style={styles.confidenceCard}>
              <View style={styles.confIconSquare}>
                <Ionicons name="headset-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.confTitle}>Expert Support</Text>
              <Text style={styles.confDesc}>
                Get dedicated support for land discovery, pricing, documentation, and site visits.
              </Text>
            </View>
          </View>
        </View>

        {/* SECTION 4: WHAT WE OFFER GRID */}
        <View style={styles.offerSection}>
          <View style={styles.centerTagPill}>
            <Text style={styles.tagPillText}>WHAT WE OFFER</Text>
          </View>

          <Text style={styles.centerSectionTitle}>
            A clearer land experience, from discovery to decision
          </Text>

          <Text style={styles.centerSectionSub}>
            See part of overall platform features that helps land buyers, sellers, and future project promotion.
          </Text>

          <View style={styles.offerGrid}>
            <View style={styles.offerChip}>
              <Ionicons name="videocam-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>360° virtual walkthrough</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="navigate-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Location guidance</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="film-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Drone aerial shoot videos</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="pricetag-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Clear land price information</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="folder-open-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Document format & transparent inquiries</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="business-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Builder and commercial promotion project availability</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="chatbubbles-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Agent & buyer support</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="phone-portrait-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Digital promotional packages</Text>
            </View>

            <View style={styles.offerChip}>
              <Ionicons name="megaphone-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.offerChipText}>Promotion tools and seller portal</Text>
            </View>
          </View>
        </View>

        {/* SECTION 5: CALLOUT HIGHLIGHT BANNER */}
        <View style={styles.calloutCard}>
          <View style={styles.tagPillBadge}>
            <Text style={styles.tagPillText}>WHY VERIFICATION MATTERS</Text>
          </View>

          <Text style={styles.calloutTitle}>
            Because land decisions need clarity before commitment.
          </Text>

          <Text style={styles.calloutSub}>
            Jamin24 helps users see the land properly, understand the project clearly, and make better decisions with confidence.
          </Text>
        </View>

        {/* SECTION 6: TEAM SECTION */}
        <View style={styles.teamSection}>
          <View style={styles.centerTagPill}>
            <Text style={styles.tagPillText}>OUR TEAM</Text>
          </View>

          <Text style={styles.centerSectionTitle}>
            Experienced People Behind Every Deal
          </Text>

          <Text style={styles.centerSectionSub}>
            A focused team where transparent support is backed by industry experience, market experts, and verified guidance.
          </Text>

          <View style={styles.teamCardsGrid}>
            {/* TEAM MEMBER 1 */}
            <View style={styles.teamMemberCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' }}
                style={styles.teamMemberPhoto}
                resizeMode="cover"
              />
              <View style={styles.teamMemberInfoBox}>
                <Text style={styles.teamMemberName}>JAINIKBHAI PATEL</Text>
                <Text style={styles.teamMemberRole}>Founder and CEO</Text>
              </View>
            </View>

            {/* TEAM MEMBER 2 */}
            <View style={styles.teamMemberCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500' }}
                style={styles.teamMemberPhoto}
                resizeMode="cover"
              />
              <View style={styles.teamMemberInfoBox}>
                <Text style={styles.teamMemberName}>AJAYBHAI PATEL</Text>
                <Text style={styles.teamMemberRole}>Founder & Chairman</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 7: CTA BOTTOM BANNER */}
        <View style={styles.ctaBannerSection}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000' }}
            style={styles.ctaBannerBg}
            resizeMode="cover"
          >
            <View style={styles.ctaDarkOverlay} />
            <View style={styles.ctaContentContainer}>
              <View style={styles.ctaPillBadge}>
                <Text style={styles.ctaPillBadgeText}>START YOUR SEARCH TODAY</Text>
              </View>

              <Text style={styles.ctaHeadline}>Ready to Start Your Jamin Journey?</Text>

              <Text style={styles.ctaSubtext}>
                Discover verified listings, schedule a site visit, or list your land plot with maximum visibility and transparency.
              </Text>

              <View style={styles.ctaButtonsRow}>
                <TouchableOpacity
                  style={styles.ctaWhiteBtn}
                  onPress={handleContactUs}
                  activeOpacity={0.88}
                >
                  <Text style={styles.ctaWhiteBtnText}>Contact Us</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ctaOutlineBtn}
                  onPress={handleViewProperties}
                  activeOpacity={0.88}
                >
                  <Text style={styles.ctaOutlineBtnText}>View Properties</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
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
  heroSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 20,
  },
  heroTextContent: {
    gap: 12,
  },
  tagPillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDF7F4',
    borderWidth: 1,
    borderColor: '#C2E4D8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  tagPillText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: colors.primaryDark,
    letterSpacing: 0.8,
  },
  heroMainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  heroParagraph: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    fontWeight: '500',
  },
  heroButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  contactUsBtn: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactUsBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  viewPropertiesBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPropertiesBtnText: {
    color: '#1E293B',
    fontSize: 13,
    fontWeight: '700',
  },
  heroImageCard: {
    height: 220,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageGreenTintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 94, 66, 0.1)',
  },
  imageGuideBadge: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageGuideBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  purposeSection: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
  },
  centerTagPill: {
    alignSelf: 'center',
    backgroundColor: '#EDF7F4',
    borderWidth: 1,
    borderColor: '#C2E4D8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
  },
  centerSectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  centerSectionSub: {
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  missionVisionCardsGrid: {
    width: '100%',
    gap: 16,
  },
  pvCard: {
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
  pvIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  pvCardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
  },
  pvCardSub: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 14,
  },
  pvChecklist: {
    gap: 8,
  },
  pvCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pvCheckText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  confidenceSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 10,
  },
  confidenceGrid: {
    gap: 12,
    marginTop: 14,
  },
  confidenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  confIconSquare: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  confTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  confDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  offerSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 10,
  },
  offerGrid: {
    gap: 8,
    marginTop: 14,
  },
  offerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  offerChipText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  calloutCard: {
    backgroundColor: '#FFFDF7',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  calloutTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 6,
    lineHeight: 26,
  },
  calloutSub: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
  },
  teamSection: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 10,
  },
  teamCardsGrid: {
    gap: 16,
    marginTop: 14,
  },
  teamMemberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  teamMemberPhoto: {
    width: '100%',
    height: 240,
    backgroundColor: '#0F172A',
  },
  teamMemberInfoBox: {
    padding: 16,
    alignItems: 'center',
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  teamMemberRole: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  ctaBannerSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
  },
  ctaBannerBg: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0A4D3C',
  },
  ctaDarkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 77, 60, 0.88)',
  },
  ctaContentContainer: {
    padding: 24,
    gap: 10,
  },
  ctaPillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ctaPillBadgeText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  ctaHeadline: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  ctaSubtext: {
    fontSize: 12.5,
    color: '#E2F2EC',
    lineHeight: 18,
  },
  ctaButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  ctaWhiteBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaWhiteBtnText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '900',
  },
  ctaOutlineBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaOutlineBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
