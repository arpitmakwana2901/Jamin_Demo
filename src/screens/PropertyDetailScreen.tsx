import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BrowseStackParamList, Property } from '../types';
import { colors } from '../theme/colors';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { shadows } from '../theme/spacing';

type Props = NativeStackScreenProps<BrowseStackParamList, 'PropertyDetail'>;

export const PropertyDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { property } = route.params;
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'location'>('desc');

  const galleryImages = [
    property.image,
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {property.title}
        </Text>
        <TouchableOpacity style={styles.shareIcon} onPress={() => Alert.alert('शेयर करें', 'प्रॉपर्टी लिंक कॉपी हो गया है!')}>
          <Ionicons name="share-social-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Image Carousel */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: property.image }} style={styles.image} resizeMode="cover" />

          {/* Badges Overlay */}
          <View style={styles.badgeOverlay}>
            {property.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.badgeText}>सत्यापित संपत्ति</Text>
              </View>
            )}

            {property.has360 && (
              <View style={styles.tourBadge}>
                <Ionicons name="reload-circle" size={14} color="#1A1A1A" style={{ marginRight: 4 }} />
                <Text style={styles.tourBadgeText}>360° टूर उपलब्ध</Text>
              </View>
            )}
          </View>
        </View>

        {/* Thumbnail Row */}
        <View style={styles.thumbnailRow}>
          {galleryImages.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} style={styles.thumbnail} resizeMode="cover" />
          ))}
        </View>

        {/* Title & Price Card */}
        <View style={styles.detailsSection}>
          <View style={styles.titleRow}>
            <Text style={styles.propertyTitle}>{property.title}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{property.type}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.locationText}>{property.location}</Text>
          </View>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabel}>मांगी गई कीमत</Text>
              <Text style={styles.priceValue}>{property.price}</Text>
            </View>

            <View style={styles.areaBox}>
              <Text style={styles.areaLabel}>कुल क्षेत्रफल</Text>
              <Text style={styles.areaValue}>{property.area}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionButtonsContainer}>
          {property.has360 && (
            <TouchableOpacity
              style={styles.tour360Btn}
              activeOpacity={0.85}
              onPress={() => Alert.alert('360° वर्चुअल टूर', '360° वर्चुअल व्यूअर लोड हो रहा है...')}
            >
              <Ionicons name="compass-outline" size={20} color="#1A1A1A" style={{ marginRight: 6 }} />
              <Text style={styles.tour360BtnText}>360° वर्चुअल टूर देखें</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.contactBtn}
            activeOpacity={0.85}
            onPress={() => Alert.alert('संपर्क करें', 'मालिक/दलाल का फ़ोन नंबर: +91 98765 43210')}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.contactBtnText}>मालिक से संपर्क करें</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation (विवरण | सुविधाएं | स्थान) */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'desc' && styles.tabItemActive]}
            onPress={() => setActiveTab('desc')}
          >
            <Text style={[styles.tabText, activeTab === 'desc' && styles.tabTextActive]}>विवरण</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'features' && styles.tabItemActive]}
            onPress={() => setActiveTab('features')}
          >
            <Text style={[styles.tabText, activeTab === 'features' && styles.tabTextActive]}>सुविधाएं</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'location' && styles.tabItemActive]}
            onPress={() => setActiveTab('location')}
          >
            <Text style={[styles.tabText, activeTab === 'location' && styles.tabTextActive]}>स्थान</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'desc' && (
            <Text style={styles.descriptionText}>
              {property.description ||
                'यह गुजरात में स्थित एक प्रीमियम खुली जमीन की संपत्ति है। सभी कानूनी दस्तावेज और टाइटल डिड जांचे और सत्यापित किए गए हैं। उपजाऊ मिट्टी और उत्कृष्ट कनेक्टिविटी इसे निवेश के लिए आदर्श बनाती है।'}
            </Text>
          )}

          {activeTab === 'features' && (
            <View style={styles.featuresGrid}>
              {(property.features || ['पानी की आपूर्ति', 'बाउंड्री वॉल', '4-लेन रोड', 'सरकारी दस्तावेज', 'बिजली']).map(
                (feat: string, idx: number) => (
                  <View key={idx} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.primary} style={{ marginRight: 6 }} />
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                )
              )}
            </View>
          )}

          {activeTab === 'location' && (
            <View style={styles.locationTabContent}>
              <Text style={styles.locationDetailText}>स्थान: {property.location}</Text>
              <Text style={styles.locationSubDetail}>निकटतम राजमार्ग: 2.5 किमी | शहर केंद्र: 10 किमी</Text>
            </View>
          )}
        </View>

        {/* Similar Properties Section */}
        <View style={styles.similarSection}>
          <Text style={styles.similarTitle}>समान संपत्तियां (Similar Properties)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarScroll}>
            {PROPERTIES.filter((p) => p.id !== property.id).map((sim) => (
              <View key={sim.id} style={styles.similarCardWrapper}>
                <PropertyCard property={sim} onPress={(p) => navigation.push('PropertyDetail', { property: p })} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  shareIcon: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  verifiedBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  tourBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tourBadgeText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  thumbnailRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: colors.white,
  },
  thumbnail: {
    width: 60,
    height: 44,
    borderRadius: 6,
  },
  detailsSection: {
    backgroundColor: colors.card,
    padding: 20,
    marginTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
  },
  typeBadge: {
    backgroundColor: colors.chipBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: 14,
    borderRadius: 12,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
  areaBox: {
    alignItems: 'flex-end',
  },
  areaLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  areaValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  actionButtonsContainer: {
    padding: 20,
    gap: 10,
  },
  tour360Btn: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tour360BtnText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  contactBtn: {
    backgroundColor: colors.whatsapp,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  contactBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  tabContentContainer: {
    backgroundColor: colors.card,
    padding: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  featuresGrid: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  locationTabContent: {
    gap: 6,
  },
  locationDetailText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  locationSubDetail: {
    fontSize: 13,
    color: colors.textLight,
  },
  similarSection: {
    marginTop: 20,
    paddingBottom: 40,
  },
  similarTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  similarScroll: {
    paddingHorizontal: 20,
    gap: 14,
  },
  similarCardWrapper: {
    width: 280,
  },
});
