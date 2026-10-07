import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

// Ultra-smooth Apple-grade cubic-bezier easing curve
const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

export const SplashScreen: React.FC = () => {
  // Animation values with native driver
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoTranslateY = useRef(new Animated.Value(-12)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(18)).current;
  const titleScale = useRef(new Animated.Value(0.92)).current;

  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineScale = useRef(new Animated.Value(0.9)).current;
  const taglineTranslateY = useRef(new Animated.Value(10)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered sequential animations with slow, gradual ultra-smooth easing
    Animated.parallel([
      // Step 1: Logo appears slowly (smooth gradual fade + gentle scale up)
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1100,
        easing: smoothEase,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1100,
        easing: smoothEase,
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslateY, {
        toValue: 0,
        duration: 1100,
        easing: smoothEase,
        useNativeDriver: true,
      }),

      // Step 2: "JAMIN 24" Text appears gradually on a single line right below logo
      Animated.sequence([
        Animated.delay(550),
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 950,
            easing: smoothEase,
            useNativeDriver: true,
          }),
          Animated.timing(titleScale, {
            toValue: 1,
            duration: 950,
            easing: smoothEase,
            useNativeDriver: true,
          }),
          Animated.timing(titleTranslateY, {
            toValue: 0,
            duration: 950,
            easing: smoothEase,
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Step 3: Tagline badge appears gradually
      Animated.sequence([
        Animated.delay(950),
        Animated.parallel([
          Animated.timing(taglineOpacity, {
            toValue: 1,
            duration: 850,
            easing: smoothEase,
            useNativeDriver: true,
          }),
          Animated.timing(taglineScale, {
            toValue: 1,
            duration: 850,
            easing: smoothEase,
            useNativeDriver: true,
          }),
          Animated.timing(taglineTranslateY, {
            toValue: 0,
            duration: 850,
            easing: smoothEase,
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Step 4: Bottom loader & motto reveal slowly
      Animated.sequence([
        Animated.delay(1350),
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 850,
          easing: smoothEase,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    logoOpacity,
    logoScale,
    logoTranslateY,
    titleOpacity,
    titleScale,
    titleTranslateY,
    taglineOpacity,
    taglineScale,
    taglineTranslateY,
    footerOpacity,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Luxury Ambient Background Glows */}
      <View style={styles.ambientGlowTop} />
      <View style={styles.ambientGlowCenter} />
      <View style={styles.ambientGlowBottom} />

      {/* Main Center Content Container */}
      <View style={styles.centerContainer}>
        {/* Step 1: Refined Compact Logo in Premium Card */}
        <Animated.View
          style={[
            styles.logoCard,
            {
              opacity: logoOpacity,
              transform: [
                { scale: logoScale },
                { translateY: logoTranslateY },
              ],
            },
          ]}
        >
          <Image
            source={require('../assets/images/header_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Step 2: "JAMIN 24" - Guaranteed Single Line with Premium Typography */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleOpacity,
              transform: [
                { scale: titleScale },
                { translateY: titleTranslateY },
              ],
            },
          ]}
        >
          <View style={styles.singleLineTitleWrapper}>
            <Text style={styles.titleJamin} numberOfLines={1}>
              JAMIN
            </Text>
            <View style={styles.badge24}>
              <Text style={styles.title24} numberOfLines={1}>
                24
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Step 3: Tagline in Luxury Pill Badge */}
        <Animated.View
          style={[
            styles.taglineWrapper,
            {
              opacity: taglineOpacity,
              transform: [
                { scale: taglineScale },
                { translateY: taglineTranslateY },
              ],
            },
          ]}
        >
          <View style={styles.taglinePill}>
            <View style={styles.dotIndicator} />
            <Text style={styles.taglineText} numberOfLines={1}>
              INDIA'S LEADING OPEN LAND PLATFORM
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Step 4: Footer */}
      <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
        <Text style={styles.footerText}>Connecting Land & Dreams</Text>
        <Text style={styles.footerSubText}>Trusted Real Estate Network</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Multi-layered Ambient Glows
  ambientGlowTop: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: '#ECFDF5', // Emerald light glow
    opacity: 0.7,
  },
  ambientGlowCenter: {
    position: 'absolute',
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: '#F0FDF4', // Mint light glow
    opacity: 0.5,
  },
  ambientGlowBottom: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#FEF3C7', // Subtle warm gold glow
    opacity: 0.45,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 10,
  },
  // Refined Compact Logo in Modern Card Badge
  logoCard: {
    width: 104,
    height: 94,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // Modern Soft Glow Shadow
    shadowColor: '#0B5E42',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#E8F5E9',
  },
  logoImage: {
    width: 82,
    height: 72,
  },
  // Single Line "JAMIN 24" Title Styling
  titleContainer: {
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleLineTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  titleJamin: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary, // #0B5E42 Deep Green
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  badge24: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 8,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title24: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  // Luxury Tagline Pill Badge
  taglineWrapper: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taglinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary, // Gold dot
    marginRight: 6,
  },
  taglineText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.primary, // #0B5E42
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 42,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  spinnerWrapper: {
    marginBottom: 8,
  },
  footerText: {
    color: colors.text,
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  footerSubText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.8,
    marginTop: 3,
  },
});
