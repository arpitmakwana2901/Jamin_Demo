import React from 'react';
import {
  View,
  Text,
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
import { PROPERTIES, TRADERS, BUYER_REQUESTS } from '../data/mockData';

type Props = NativeStackScreenProps<BrowseStackParamList, 'BrowseHome'>;

export const BrowseJaminScreen: React.FC<Props> = ({ navigation }) => {
  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleSearch = (location: string, propertyId: string, landType: string, budget: string) => {
    navigation.navigate('SearchResults', { location, propertyId, landType, budget });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Top App Bar Header */}
      <TopBar />

      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with background image and 2x2 feature pills */}
        <HeroSection />

        {/* Search Card overlapping Hero Section */}
        <SearchCard onSearch={handleSearch} />

        {/* SECTION: Featured Verified Listings */}
        <View className="mt-6">
          <SectionHeader
            title="Featured Verified Lands"
            subtitle="100% Verified & Transparent Open Land Deals"
            actionText="View All"
            onActionPress={() => navigation.navigate('SearchResults', {})}
          />

          <View className="px-4">
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
        <View className="mt-6">
          <SectionHeader
            title="Verified Land Brokers & Traders"
            subtitle="Connect with trusted local land experts"
            badge="VERIFIED"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 6 }}
          >
            {TRADERS.map((trader) => (
              <TouchableOpacity
                key={trader.id}
                className="bg-card border border-border rounded-[14px] p-3 w-[148px] items-center"
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    trader.name,
                    `${trader.city} • ${trader.deals} Successful Deals\nRating: ⭐ ${trader.rating}/5.0`
                  )
                }
              >
                <View className="relative mb-[6px]">
                  <Image source={{ uri: trader.avatar }} className="w-[50px] h-[50px] rounded-[25px] bg-border" />
                  {trader.verified && (
                    <View className="absolute bottom-0 right-0 bg-primary w-[16px] h-[16px] rounded-[8px] justify-center items-center">
                      <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <Text className="text-[13px] font-bold text-text text-center">{trader.name}</Text>
                <Text className="text-[11px] text-textLight mb-[6px]">{trader.city}, Gujarat</Text>

                <View className="flex-row items-center mb-2 w-full justify-evenly">
                  <View className="items-center">
                    <Text className="text-[11px] font-bold text-text">{trader.deals}</Text>
                    <Text className="text-[9px] text-textMuted">Deals</Text>
                  </View>
                  <View className="w-[1px] h-[14px] bg-border" />
                  <View className="items-center">
                    <Text className="text-[11px] font-bold text-text">⭐ {trader.rating}</Text>
                    <Text className="text-[9px] text-textMuted">Rating</Text>
                  </View>
                </View>

                <TouchableOpacity
                  className="flex-row items-center bg-primaryLight px-2 py-[6px] rounded-[8px] w-full justify-center"
                  onPress={() => Alert.alert('Contact', `Call ${trader.name}`)}
                >
                  <Ionicons name="call-outline" size={13} color={colors.primary} className="mr-1" />
                  <Text className="text-[11px] font-bold text-primary">Connect</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SECTION: Buyer Demands */}
        <View className="mt-6">
          <SectionHeader
            title="Recent Buyer Demands"
            subtitle="Active buyers searching for land right now"
          />

          <View className="px-4 gap-[10px]">
            {BUYER_REQUESTS.map((req) => (
              <View key={req.id} className="bg-card rounded-[12px] border border-border p-3 flex-row items-center">
                <View className="w-[38px] h-[38px] rounded-[19px] bg-primaryLight justify-center items-center mr-[10px]">
                  <Ionicons name="cart-outline" size={18} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[13px] font-bold text-text">{req.name}</Text>
                    <Text className="text-[10px] text-textMuted">{req.time}</Text>
                  </View>
                  <Text className="text-[11px] text-textLight mt-[2px]">
                    Type: {req.type} • Location: {req.location || 'Gujarat'}
                  </Text>
                  <Text className="text-[11px] font-bold text-primary mt-[2px]">Budget: {req.budget}</Text>
                </View>
                <TouchableOpacity
                  className="bg-primary px-[10px] py-[6px] rounded-[6px] ml-[6px]"
                  onPress={() => Alert.alert('Match Offer', `Send your property offer to buyer`)}
                >
                  <Text className="text-white text-[11px] font-bold">Match</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
