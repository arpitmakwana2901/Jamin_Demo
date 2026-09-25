import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BrowseStackParamList, Property } from '../types';
import { TopBar } from '../components/TopBar';
import { HeroSection } from '../components/HeroSection';
import { SearchCard } from '../components/SearchCard';
import { PropertyCard } from '../components/PropertyCard';
import { SectionHeader } from '../components/SectionHeader';
import { colors } from '../theme/colors';
import { PROPERTIES, TRADERS, BUYER_REQUESTS, DISTRICTS_HINDI } from '../data/mockData';

type Props = NativeStackScreenProps<BrowseStackParamList, 'BrowseHome'>;

export const BrowseJaminScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Ahmedabad');

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleSearch = (location: string, propertyId: string, landType: string, budget: string) => {
    navigation.navigate('SearchResults', { location, propertyId, landType, budget });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top App Bar Header */}
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with background image and 2x2 feature pills */}
        <HeroSection />

        {/* Search Card overlapping Hero Section */}
        <SearchCard onSearch={handleSearch} />

        {/* SECTION: Featured Verified Listings */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            title="Featured Verified Lands"
            subtitle="100% Verified & Transparent Open Land Deals"
            actionText="View All"
            onActionPress={() => navigation.navigate('SearchResults', {})}
          />

          <View style={styles.propertyListPadding}>
            {PROPERTIES.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onPress={handlePropertyPress}
              />
            ))}
          </View>
        </View>

        {/* SECTION: Verified Land Traders */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            title="Verified Land Brokers & Traders"
            subtitle="Connect with trusted local land experts"
            badge="VERIFIED"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.traderScrollContainer}
          >
            {TRADERS.map((trader) => (
              <TouchableOpacity
                key={trader.id}
                style={styles.traderCard}
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    trader.name,
                    `${trader.city} • ${trader.deals} Successful Deals\nRating: ⭐ ${trader.rating}/5.0`
                  )
                }
              >
                <View style={styles.traderAvatarContainer}>
                  <Image source={{ uri: trader.avatar }} style={styles.traderAvatar} />
                  {trader.verified && (
                    <View style={styles.traderVerifiedBadge}>
                      <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <Text style={styles.traderName}>{trader.name}</Text>
                <Text style={styles.traderCity}>{trader.city}, Gujarat</Text>

                <View style={styles.traderStatsRow}>
                  <View style={styles.traderStat}>
                    <Text style={styles.traderStatNumber}>{trader.deals}</Text>
                    <Text style={styles.traderStatLabel}>Deals</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.traderStat}>
                    <Text style={styles.traderStatNumber}>⭐ {trader.rating}</Text>
                    <Text style={styles.traderStatLabel}>Rating</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.traderConnectBtn}
                  onPress={() => Alert.alert('Contact', `Call ${trader.name}`)}
                >
                  <Ionicons name="call-outline" size={13} color={colors.primary} style={{ marginRight: 4 }} />
                  <Text style={styles.traderConnectText}>Connect</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SECTION: Buyer Demands */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            title="Recent Buyer Demands"
            subtitle="Active buyers searching for land right now"
          />

          <View style={styles.demandListPadding}>
            {BUYER_REQUESTS.map((req) => (
              <View key={req.id} style={styles.demandCard}>
                <View style={styles.demandIconCircle}>
                  <Ionicons name="cart-outline" size={18} color={colors.primary} />
                </View>
                <View style={styles.demandInfo}>
                  <View style={styles.demandHeaderRow}>
                    <Text style={styles.demandTitle}>{req.name}</Text>
                    <Text style={styles.demandTime}>{req.time}</Text>
                  </View>
                  <Text style={styles.demandDetails}>
                    Type: {req.type} • Location: {req.location || 'Gujarat'}
                  </Text>
                  <Text style={styles.demandBudget}>Budget: {req.budget}</Text>
                </View>
                <TouchableOpacity
                  style={styles.demandMatchBtn}
                  onPress={() => Alert.alert('Match Offer', `Send your property offer to buyer`)}
                >
                  <Text style={styles.demandMatchText}>Match</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionContainer: {
    marginTop: 24,
  },
  propertyListPadding: {
    paddingHorizontal: 16,
  },
  traderScrollContainer: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 6,
  },
  traderCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    width: 148,
    alignItems: 'center',
  },
  traderAvatarContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  traderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.border,
  },
  traderVerifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  traderName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  traderCity: {
    fontSize: 11,
    color: colors.textLight,
    marginBottom: 6,
  },
  traderStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  traderStat: {
    alignItems: 'center',
  },
  traderStatNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  traderStatLabel: {
    fontSize: 9,
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 14,
    backgroundColor: colors.border,
  },
  traderConnectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  traderConnectText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  demandListPadding: {
    paddingHorizontal: 16,
    gap: 10,
  },
  demandCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  demandIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  demandInfo: {
    flex: 1,
  },
  demandHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  demandTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  demandTime: {
    fontSize: 10,
    color: colors.textMuted,
  },
  demandDetails: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
  demandBudget: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  demandMatchBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
  },
  demandMatchText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
});
