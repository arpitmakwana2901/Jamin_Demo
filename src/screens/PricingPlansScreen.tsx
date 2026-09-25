import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';
import { PRICING_PLANS } from '../data/mockData';
import { shadows } from '../theme/spacing';

export const PricingPlansScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>सब्सक्रिप्शन प्लान्स (Pricing Plans)</Text>
        <Text style={styles.headerSubtitle}>
          अपनी आवश्यकता के अनुसार सही प्लान चुनें और बिक्री 10x बढ़ाएं
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {PRICING_PLANS.map((plan) => {
          const isPro = plan.popular;
          return (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                isPro && styles.proPlanCard,
              ]}
            >
              {/* Popular Badge */}
              {isPro && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>{plan.badge || 'सर्वश्रेष्ठ पसंद'}</Text>
                </View>
              )}

              <Text style={styles.planName}>{plan.name}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.priceText}>{plan.price}</Text>
                <Text style={styles.periodText}>{plan.period}</Text>
              </View>

              <View style={styles.divider} />

              {/* Features List */}
              <View style={styles.featureList}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={isPro ? colors.primary : '#10B981'}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {/* Subscribe Button */}
              <TouchableOpacity
                style={[
                  styles.subscribeButton,
                  isPro && styles.proSubscribeButton,
                ]}
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    plan.name,
                    `${plan.price}${plan.period} प्लान का चयन किया गया।\nपेमेंट गेटवे पर पुनः निर्देशित किया जा रहा है...`
                  )
                }
              >
                <Text
                  style={[
                    styles.subscribeButtonText,
                    isPro && styles.proSubscribeText,
                  ]}
                >
                  अभी सदस्यता लें
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
    lineHeight: 18,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  planCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    position: 'relative',
    ...shadows.card,
  },
  proPlanCard: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: '#FAFDFB',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  priceText: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.primary,
  },
  periodText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 4,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: colors.chipBg,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  proSubscribeButton: {
    backgroundColor: colors.primary,
  },
  subscribeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  proSubscribeText: {
    color: colors.white,
  },
});
