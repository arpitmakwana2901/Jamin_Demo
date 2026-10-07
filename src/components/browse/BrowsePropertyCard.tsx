import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  Linking,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { Property } from '../../types';
import { colors } from '../../theme/colors';

interface BrowsePropertyCardProps {
  property: Property;
  onPress: (property: Property) => void;
  width?: number;
}

export const BrowsePropertyCard: React.FC<BrowsePropertyCardProps> = ({
  property,
  onPress,
  width,
}) => {
  const { t } = useTranslation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this property on Jamin24: ${property.title} in ${property.location}. Price: ${property.price}`,
        url: `https://jamin24.com/property/${property.jaminId || property.id}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleChat = () => {
    const phoneNumber = '919876543210';
    const message = `Hello, I am interested in property ID: ${property.jaminId || property.id} (${property.title})`;
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`).catch(() => {
      Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
    });
  };

  const villageName = property.village || property.location.split(',')[0].trim().toUpperCase();
  const talukaName = property.taluka || 'Vijapur';
  const districtName = property.district || 'Mehsana';

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => onPress(property)}
      style={[styles.card, width ? { width } : styles.fullWidthCard]}
    >
      {/* IMAGE CONTAINER WITH MAP OVERLAY & BADGES */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.image }}
          style={styles.propertyImage}
          resizeMode="cover"
        />

        {/* GREEN OVERLAY SHADE FOR SATELLITE MAP LOOK */}
        <View style={styles.mapGreenTintOverlay} />

        {/* TOP LEFT BADGES */}
        <View style={styles.topLeftBadges}>
          {property.isUrgent && (
            <View style={styles.urgentBadge}>
              <Ionicons name="flame" size={12} color="#FFFFFF" style={{ marginRight: 3 }} />
              <Text style={styles.urgentBadgeText}>{t('browse.urgentSelling')}</Text>
            </View>
          )}

          {property.has360 && (
            <View style={styles.badge360}>
              <Ionicons name="compass" size={12} color="#FFFFFF" style={{ marginRight: 2 }} />
              <Text style={styles.badge360Text}>{t('browse.tour360')}</Text>
            </View>
          )}

          {property.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>{t('browse.premiumListing')}</Text>
            </View>
          )}
        </View>

        {/* RIGHT LOCATION & LOGO CARD OVERLAY */}
        <View style={styles.locationOverlayBox}>
          <View style={styles.compassLogoCircle}>
            <Ionicons name="compass-outline" size={16} color={colors.primary} />
          </View>
          <Text style={styles.overlayVillageText}>{villageName}</Text>
          <Text style={styles.overlaySubText}>{t('browse.talukaPrefix')} {talukaName}</Text>
          <Text style={styles.overlaySubText}>{t('browse.districtPrefix')} {districtName}</Text>

          <View style={styles.overlayAreaPill}>
            <Text style={styles.overlayAreaPillText}>{property.area.toUpperCase()}</Text>
          </View>
        </View>

        {/* BOTTOM LAND TYPE TAG ON IMAGE */}
        <View style={styles.landTypeTagOnImage}>
          <Text style={styles.landTypeTagText}>{property.type} Land</Text>
        </View>
      </View>

      {/* CARD CONTENT */}
      <View style={styles.cardContent}>
        <Text style={styles.propertyTitle} numberOfLines={1}>
          {property.title}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color="#64748B" style={{ marginRight: 4 }} />
          <Text style={styles.locationText} numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        <Text style={styles.jaminIdText}>
          {t('common.jaminId')}: {property.jaminId || `02-${property.id.padStart(8, '0')}`}
        </Text>

        {/* METRICS ROW */}
        <View style={styles.metricsRow}>
          <Text style={styles.metricAreaText}>{property.area}</Text>
          <Text style={styles.metricPriceText}>{property.pricePerVigha || property.price}</Text>
        </View>

        {/* ACTION BUTTONS ROW */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() => onPress(property)}
            activeOpacity={0.8}
          >
            <Text style={styles.viewDetailsText}>{t('common.viewDetails')}</Text>
            <Ionicons name="open-outline" size={13} color="#1E293B" style={{ marginLeft: 3 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatBtn}
            onPress={handleChat}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubble-outline" size={14} color="#1E293B" style={{ marginRight: 4 }} />
            <Text style={styles.chatBtnText}>{t('common.chat')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social-outline" size={15} color="#1E293B" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  fullWidthCard: {
    width: '100%',
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  mapGreenTintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 94, 66, 0.08)',
  },
  topLeftBadges: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    zIndex: 10,
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  urgentBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  badge360: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badge360Text: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  premiumBadge: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  locationOverlayBox: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 95,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  compassLogoCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  overlayVillageText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  overlaySubText: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 11,
  },
  overlayAreaPill: {
    marginTop: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 0.5,
    borderColor: '#CBD5E1',
  },
  overlayAreaPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
  },
  landTypeTagOnImage: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  landTypeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  cardContent: {
    padding: 14,
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    flex: 1,
  },
  jaminIdText: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 10,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  metricAreaText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  metricPriceText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  viewDetailsBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  chatBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  chatBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
