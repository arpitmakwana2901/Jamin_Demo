import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Property } from '../types';
import { colors } from '../theme/colors';
import { shadows } from '../theme/spacing';

interface PropertyCardProps {
  property: Property;
  onPress?: (property: Property) => void;
  style?: ViewStyle;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.9}
      onPress={() => onPress && onPress(property)}
    >
      {/* Property Image with Badges */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.image} resizeMode="cover" />
        
        {/* Badges Overlay */}
        <View style={styles.badgeRow}>
          {property.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" style={{ marginRight: 3 }} />
              <Text style={styles.verifiedBadgeText}>सत्यापित</Text>
            </View>
          )}

          {property.has360 && (
            <View style={styles.tourBadge}>
              <Ionicons name="reload-circle" size={13} color="#1A1A1A" style={{ marginRight: 3 }} />
              <Text style={styles.tourBadgeText}>360° टूर</Text>
            </View>
          )}
        </View>

        {/* Type Tag */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{property.type}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={colors.textLight} style={{ marginRight: 4 }} />
          <Text style={styles.locationText} numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <View>
            <Text style={styles.priceLabel}>मूल्य</Text>
            <Text style={styles.priceText}>{property.price}</Text>
          </View>

          <View style={styles.areaBadge}>
            <Ionicons name="expand-outline" size={12} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.areaText}>{property.area}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    ...shadows.card,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    gap: 6,
  },
  verifiedBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  tourBadge: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tourBadgeText: {
    color: '#1A1A1A',
    fontSize: 11,
    fontWeight: '700',
  },
  typeBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 10,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.primary,
  },
  areaBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
});
