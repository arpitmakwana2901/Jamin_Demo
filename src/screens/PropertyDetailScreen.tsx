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
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BrowseStackParamList, Property } from '../types';
import { colors } from '../theme/colors';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { shadows } from '../theme/spacing';

type Props = NativeStackScreenProps<BrowseStackParamList, 'PropertyDetail'>;

export const PropertyDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { t } = useTranslation();
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
        <TouchableOpacity style={styles.shareIcon} onPress={() => Alert.alert(t('common.share'), t('propertyDetail.shareMsg'))}>
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
                <Text style={styles.badgeText}>{t('propertyDetail.verifiedProperty')}</Text>
              </View>
            )}

            {property.has360 && (
              <View style={styles.tourBadge}>
                <Ionicons name="reload-circle" size={14} color="#1A1A1A" style={{ marginRight: 4 }} />
                <Text style={styles.tourBadgeText}>{t('propertyDetail.tour360Available')}</Text>
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
              <Text style={styles.priceLabel}>{t('propertyDetail.askedPrice')}</Text>
              <Text style={styles.priceValue}>{property.price}</Text>
            </View>

            <View style={styles.areaBox}>
              <Text style={styles.areaLabel}>{t('propertyDetail.totalArea')}</Text>
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
              onPress={() => Alert.alert(t('propertyDetail.watch360Tour'), '360° Virtual Viewer...')}
            >
              <Ionicons name="compass-outline" size={20} color="#1A1A1A" style={{ marginRight: 6 }} />
              <Text style={styles.tour360BtnText}>{t('propertyDetail.watch360Tour')}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.contactBtn}
            activeOpacity={0.85}
            onPress={() => Alert.alert(t('common.contactUs'), '+91 98765 43210')}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.contactBtnText}>{t('propertyDetail.contactOwner')}</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'desc' && styles.tabItemActive]}
            onPress={() => setActiveTab('desc')}
          >
            <Text style={[styles.tabText, activeTab === 'desc' && styles.tabTextActive]}>{t('propertyDetail.descTab')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'features' && styles.tabItemActive]}
            onPress={() => setActiveTab('features')}
          >
            <Text style={[styles.tabText, activeTab === 'features' && styles.tabTextActive]}>{t('propertyDetail.featuresTab')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'location' && styles.tabItemActive]}
            onPress={() => setActiveTab('location')}
          >
            <Text style={[styles.tabText, activeTab === 'location' && styles.tabTextActive]}>{t('propertyDetail.locationTab')}</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'desc' && (
            <Text style={styles.descriptionText}>
              {property.description || t('propertyDetail.defaultDescription')}
            </Text>
          )}

          {activeTab === 'features' && (
            <View style={styles.featuresGrid}>
              {(property.features || ['Water supply', 'Boundary wall', '4-Lane road', 'Legal docs', 'Electricity']).map(
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
              <Text style={styles.locationDetailText}>{t('common.location')}: {property.location}</Text>
              <Text style={styles.locationSubDetail}>{t('propertyDetail.nearestHighway')}</Text>
            </View>
          )}
        </View>

        {/* Similar Properties Section */}
        <View style={styles.similarSection}>
          <Text style={styles.similarTitle}>{t('propertyDetail.similarProperties')}</Text>
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
