import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BrowseStackParamList } from '../types';
import { TopBar } from '../components/TopBar';
import { HeroSection } from '../components/home/HeroSection';
import { SearchCard } from '../components/home/SearchCard';
import { MarketPulseSection } from '../components/home/MarketPulseSection';
import { TrustedNetworkSection } from '../components/home/TrustedNetworkSection';
import { BuyerDemandSection } from '../components/home/BuyerDemandSection';
import { SocialMediaSection } from '../components/home/SocialMediaSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { FooterSection } from '../components/home/FooterSection';

type Props = NativeStackScreenProps<BrowseStackParamList, 'BrowseHome'>;

export const BrowseJaminScreen: React.FC<Props> = ({ navigation }) => {
  const handleSearch = (
    location: string,
    propertyId: string,
    landType: string,
    budget: string,
  ) => {
    navigation.navigate('SearchResults', {
      location: location === 'Select City / District' ? undefined : location,
      propertyId: propertyId.trim() || undefined,
      landType: landType === 'All Land Types' ? undefined : landType,
      budget: budget === 'Max Budget (₹)' ? undefined : budget,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Header - UNCHANGED */}
      <TopBar />

      <ScrollView
        className="flex-1 bg-slate-50"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1 — HERO / SEARCH AREA */}
        <HeroSection />
        <SearchCard onSearch={handleSearch} />

        {/* SECTION 2 — LIVE MARKET PULSE */}
        <MarketPulseSection />

        {/* SECTION 3 — TRUSTED TRADERS & BROKERS */}
        <TrustedNetworkSection />

        {/* SECTION 4 — BUYER DEMAND */}
        <BuyerDemandSection />

        {/* SECTION 5 — SOCIAL MEDIA CARDS */}
        <SocialMediaSection />

        {/* SECTION 6 — HOW IT WORKS */}
        <HowItWorksSection />

        {/* FOOTER */}
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
};
