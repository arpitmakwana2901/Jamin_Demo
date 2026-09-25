import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { FeatureGridCard, FeatureCardData } from './FeatureGridCard';

const FEATURE_ITEMS: FeatureCardData[] = [
  {
    id: '1',
    iconName: 'cube-outline',
    title: '360° Virtual Tours',
  },
  {
    id: '2',
    iconName: 'shield-checkmark-outline',
    title: 'Verified Listings',
  },
  {
    id: '3',
    iconName: 'people-outline',
    title: 'Trusted Network',
  },
  {
    id: '4',
    iconName: 'home-outline',
    title: 'Smart Match',
  },
];

export const HeroSection: React.FC = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/hero_bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Main Title */}
        <Text style={styles.mainTitle}>
          JAHAN JAMIN, WAHAN JAMIN24
        </Text>

        {/* Subtitle with horizontal lines on both sides */}
        <View style={styles.subtitleRow}>
          <View style={styles.line} />
          <Text style={styles.subtitleText}>INDIA'S LEADING OPEN LAND PLATFORM</Text>
          <View style={styles.line} />
        </View>

        {/* Description text */}
        <Text style={styles.descriptionText}>
          Explore verified open lands with 360° virtual tours, trusted connections & transparent deals.
        </Text>

        {/* 4 Feature Pills Grid (2x2) */}
        <View style={styles.featureGrid}>
          {FEATURE_ITEMS.map((item) => (
            <FeatureGridCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    minHeight: 450,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlayDark,
  },
  content: {
    paddingTop: 32,
    paddingBottom: 70,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-black',
    lineHeight: 34,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  subtitleText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  descriptionText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
    opacity: 0.9,
    maxWidth: '92%',
  },
  featureGrid: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
});
