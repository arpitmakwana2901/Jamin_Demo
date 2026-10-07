import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SearchStackParamList, Property } from '../types';
import { TopBar } from '../components/TopBar';
import { BrowseFilterCard, FilterState } from '../components/browse/BrowseFilterCard';
import { BrowsePropertyCard } from '../components/browse/BrowsePropertyCard';
import { BrowseSectionHeader } from '../components/browse/BrowseSectionHeader';
import { BROWSE_PROPERTIES } from '../data/mockData';
import { colors } from '../theme/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.82;

type Props = NativeStackScreenProps<SearchStackParamList, 'BrowseJamin'>;

const initialFilters: FilterState = {
  searchQuery: '',
  landType: 'Select land type',
  price: 'Price',
  state: 'Gujarat',
  district: 'Select district / city',
  taluka: 'Select taluka',
  village: 'Select area / village',
  sortBy: 'Sort By',
};

export const BrowseJaminScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeSectionFilter, setActiveSectionFilter] = useState<string | null>(null);

  const newlyAddedRef = useRef<FlatList>(null);
  const urgentRef = useRef<FlatList>(null);
  const premiumRef = useRef<FlatList>(null);

  const newlyAddedIndex = useRef(0);
  const urgentIndex = useRef(0);
  const premiumIndex = useRef(0);

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setActiveSectionFilter(null);
  };

  const handleSearchSubmit = () => {
    // Triggers re-render with active filters
  };

  // Filter Logic
  const newlyAddedList = BROWSE_PROPERTIES.filter((p) => p.isNewlyAdded);
  const urgentList = BROWSE_PROPERTIES.filter((p) => p.isUrgent);
  const premiumList = BROWSE_PROPERTIES.filter((p) => p.isPremium);

  const isFilteringActive =
    filters.searchQuery.trim().length > 0 ||
    !filters.landType.startsWith('Select') ||
    !filters.price.startsWith('Price') ||
    !filters.district.startsWith('Select') ||
    !filters.taluka.startsWith('Select') ||
    !filters.village.startsWith('Select') ||
    filters.sortBy !== 'Sort By' ||
    activeSectionFilter !== null;

  const filteredProperties = BROWSE_PROPERTIES.filter((property) => {
    // Search query filter
    if (filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTaluka = property.taluka?.toLowerCase().includes(q);
      const matchVillage = property.village?.toLowerCase().includes(q);
      const matchLocation = property.location.toLowerCase().includes(q);
      const matchTitle = property.title.toLowerCase().includes(q);
      const matchId = property.jaminId?.toLowerCase().includes(q);
      if (!matchTaluka && !matchVillage && !matchLocation && !matchTitle && !matchId) {
        return false;
      }
    }

    // Land type filter
    if (!filters.landType.startsWith('Select')) {
      if (property.type.toLowerCase() !== filters.landType.toLowerCase()) {
        return false;
      }
    }

    // District filter
    if (!filters.district.startsWith('Select')) {
      if (property.district?.toLowerCase() !== filters.district.toLowerCase()) {
        return false;
      }
    }

    // Taluka filter
    if (!filters.taluka.startsWith('Select')) {
      if (property.taluka?.toLowerCase() !== filters.taluka.toLowerCase()) {
        return false;
      }
    }

    // Village filter
    if (!filters.village.startsWith('Select')) {
      if (property.village?.toLowerCase() !== filters.village.toLowerCase()) {
        return false;
      }
    }

    // Active section filter (from View All)
    if (activeSectionFilter === 'newly') {
      if (!property.isNewlyAdded) return false;
    } else if (activeSectionFilter === 'urgent') {
      if (!property.isUrgent) return false;
    } else if (activeSectionFilter === 'premium') {
      if (!property.isPremium) return false;
    }

    return true;
  });

  // Scroll Helpers
  const scrollSection = (
    ref: React.RefObject<FlatList<any> | null>,
    indexRef: React.MutableRefObject<number>,
    direction: 'next' | 'prev',
    maxCount: number,
  ) => {
    if (direction === 'next') {
      indexRef.current = Math.min(indexRef.current + 1, maxCount - 1);
    } else {
      indexRef.current = Math.max(indexRef.current - 1, 0);
    }
    ref.current?.scrollToIndex({ index: indexRef.current, animated: true });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* HEADER TOP BAR */}
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* FILTER CARD & SEARCH BAR */}
        <BrowseFilterCard
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* ACTIVE SECTION FILTER BADGE (IF VIEW ALL PRESSED) */}
        {activeSectionFilter && (
          <View style={styles.activeFilterBanner}>
            <Text style={styles.activeFilterBannerText}>
              {t('browse.showingPrefix')}{' '}
              {activeSectionFilter === 'newly'
                ? t('browse.newlyAddedJamin')
                : activeSectionFilter === 'urgent'
                ? t('browse.urgentSellingJamin')
                : t('browse.premiumJamin')}{' '}
              {t('browse.propertiesSuffix')}
            </Text>
            <TouchableOpacity onPress={() => setActiveSectionFilter(null)}>
              <Ionicons name="close-circle" size={20} color="#1E293B" />
            </TouchableOpacity>
          </View>
        )}

        {/* FILTERED RESULTS VIEW (WHEN SEARCHING OR FILTERING) */}
        {isFilteringActive ? (
          <View style={styles.filteredResultsSection}>
            <View style={styles.filteredHeaderRow}>
              <Text style={styles.resultCountText}>
                {t('browse.showingPrefix')} <Text style={styles.resultCountHighlight}>{filteredProperties.length}</Text>{' '}
                {t('browse.propertiesSuffix')}
              </Text>
              <TouchableOpacity style={styles.clearAllLink} onPress={handleResetFilters}>
                <Text style={styles.clearAllLinkText}>{t('common.clearFilters')}</Text>
              </TouchableOpacity>
            </View>

            {filteredProperties.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color="#94A3B8" />
                <Text style={styles.emptyTitle}>{t('browse.noJaminFound')}</Text>
                <Text style={styles.emptySubtitle}>
                  {t('browse.noJaminDesc')}
                </Text>
                <TouchableOpacity style={styles.resetBtnAction} onPress={handleResetFilters}>
                  <Text style={styles.resetBtnActionText}>{t('browse.resetAllFilters')}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.cardsGridContainer}>
                {filteredProperties.map((item) => (
                  <BrowsePropertyCard
                    key={item.id}
                    property={item}
                    onPress={handlePropertyPress}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <>
            {/* SECTION 1: NEWLY ADDED JAMIN */}
            <View style={styles.sectionContainer}>
              <BrowseSectionHeader
                title={t('browse.newlyAddedJamin')}
                onViewAll={() => setActiveSectionFilter('newly')}
                onPrev={() => scrollSection(newlyAddedRef, newlyAddedIndex, 'prev', newlyAddedList.length)}
                onNext={() => scrollSection(newlyAddedRef, newlyAddedIndex, 'next', newlyAddedList.length)}
              />
              <FlatList
                ref={newlyAddedRef}
                data={newlyAddedList}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContent}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
                renderItem={({ item }) => (
                  <BrowsePropertyCard
                    property={item}
                    onPress={handlePropertyPress}
                    width={CARD_WIDTH}
                  />
                )}
              />
            </View>

            {/* SECTION 2: URGENT SELLING JAMIN */}
            <View style={styles.sectionContainer}>
              <BrowseSectionHeader
                title={t('browse.urgentSellingJamin')}
                onViewAll={() => setActiveSectionFilter('urgent')}
                onPrev={() => scrollSection(urgentRef, urgentIndex, 'prev', urgentList.length)}
                onNext={() => scrollSection(urgentRef, urgentIndex, 'next', urgentList.length)}
              />
              <FlatList
                ref={urgentRef}
                data={urgentList}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContent}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
                renderItem={({ item }) => (
                  <BrowsePropertyCard
                    property={item}
                    onPress={handlePropertyPress}
                    width={CARD_WIDTH}
                  />
                )}
              />
            </View>

            {/* SECTION 3: PREMIUM JAMIN */}
            <View style={styles.sectionContainer}>
              <BrowseSectionHeader
                title={t('browse.premiumJamin')}
                onViewAll={() => setActiveSectionFilter('premium')}
                onPrev={() => scrollSection(premiumRef, premiumIndex, 'prev', premiumList.length)}
                onNext={() => scrollSection(premiumRef, premiumIndex, 'next', premiumList.length)}
              />
              <FlatList
                ref={premiumRef}
                data={premiumList}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContent}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
                renderItem={({ item }) => (
                  <BrowsePropertyCard
                    property={item}
                    onPress={handlePropertyPress}
                    width={CARD_WIDTH}
                  />
                )}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  horizontalListContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  activeFilterBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeFilterBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  filteredResultsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  filteredHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCountText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  resultCountHighlight: {
    color: colors.primary,
    fontWeight: '900',
  },
  clearAllLink: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearAllLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  cardsGridContainer: {
    gap: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  resetBtnAction: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetBtnActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
