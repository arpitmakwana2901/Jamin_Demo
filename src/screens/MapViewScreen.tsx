import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { MapViewStackParamList, Property } from '../types';
import { TopBar } from '../components/TopBar';
import { BrowseFilterCard, FilterState } from '../components/browse/BrowseFilterCard';
import { BrowsePropertyCard } from '../components/browse/BrowsePropertyCard';
import { FooterSection } from '../components/home/FooterSection';
import { MAP_PROPERTIES, LAND_POSITION_INDICATORS } from '../data/mockData';
import { colors } from '../theme/colors';

const MAP_SATELLITE_IMAGE =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200';

type Props = NativeStackScreenProps<MapViewStackParamList, 'MapHome'>;

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

export const MapViewScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('m1');
  const [isFullScreenMap, setIsFullScreenMap] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [showIndicators, setShowIndicators] = useState<boolean>(true);

  const cardListRef = useRef<ScrollView>(null);

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleSearchSubmit = () => {
    // Triggers re-render
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 2.0));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 0.8));
  };

  // Filter Properties
  const filteredProperties = MAP_PROPERTIES.filter((property) => {
    // Search query
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

    return true;
  });

  const handlePinSelect = (property: Property) => {
    setSelectedPropertyId(property.id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* APP TOP BAR */}
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* FILTER CARD PANEL */}
        <BrowseFilterCard
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* MAP & CARDS CONTAINER */}
        <View style={styles.mapViewSection}>
          {/* SATELLITE MAP CONTAINER */}
          <View
            style={[
              styles.mapCardContainer,
              isFullScreenMap && styles.mapCardContainerFullScreen,
            ]}
          >
            <ImageBackground
              source={{ uri: MAP_SATELLITE_IMAGE }}
              style={[
                styles.mapBackground,
                { transform: [{ scale: zoomScale }] },
              ]}
              resizeMode="cover"
            >
              {/* TOP LEFT ZOOM CONTROLS */}
              <View style={styles.zoomControlsBox}>
                <TouchableOpacity
                  style={styles.zoomBtn}
                  onPress={handleZoomIn}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={18} color="#1E293B" />
                </TouchableOpacity>
                <View style={styles.zoomDivider} />
                <TouchableOpacity
                  style={styles.zoomBtn}
                  onPress={handleZoomOut}
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove" size={18} color="#1E293B" />
                </TouchableOpacity>
              </View>

              {/* TOP RIGHT FULL SCREEN BUTTON */}
              <TouchableOpacity
                style={styles.fullScreenBtn}
                onPress={() => setIsFullScreenMap(!isFullScreenMap)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isFullScreenMap ? 'contract' : 'expand'}
                  size={14}
                  color="#1E293B"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.fullScreenBtnText}>
                  {isFullScreenMap ? t('mapView.exitFullScreen') : t('mapView.fullScreen')}
                </Text>
              </TouchableOpacity>

              {/* PLOT PIN MARKERS OVERLAY */}
              {filteredProperties.map((prop) => {
                const isSelected = selectedPropertyId === prop.id;
                return (
                  <TouchableOpacity
                    key={prop.id}
                    style={[
                      styles.pinMarkerWrapper,
                      {
                        top: (prop.pinTop as any) || '40%',
                        left: (prop.pinLeft as any) || '50%',
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handlePinSelect(prop)}
                  >
                    <View
                      style={[
                        styles.pinPill,
                        isSelected && styles.pinPillSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.pinPillText,
                          isSelected && styles.pinPillTextSelected,
                        ]}
                      >
                        {prop.village || prop.title.split(' ')[0]}
                      </Text>
                    </View>
                    <View style={[styles.pinIconCircle, isSelected && styles.pinIconCircleSelected]}>
                      <Ionicons
                        name="location"
                        size={20}
                        color={isSelected ? colors.primary : '#EF4444'}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ImageBackground>

            {/* LAND POSITION INDICATORS PANEL (BOTTOM OF MAP) */}
            <View style={styles.indicatorsPanel}>
              <TouchableOpacity
                style={styles.indicatorsHeader}
                onPress={() => setShowIndicators(!showIndicators)}
                activeOpacity={0.8}
              >
                <Text style={styles.indicatorsTitle}>{t('mapView.landPositionIndicators')}</Text>
                <Ionicons
                  name={showIndicators ? 'chevron-down' : 'chevron-up'}
                  size={16}
                  color="#1E293B"
                />
              </TouchableOpacity>

              {showIndicators && (
                <View style={styles.indicatorsGrid}>
                  {LAND_POSITION_INDICATORS.map((ind, idx) => (
                    <View key={idx} style={styles.indicatorChip}>
                      <View
                        style={[styles.indicatorDot, { backgroundColor: ind.color }]}
                      />
                      <Text style={styles.indicatorLabel}>{ind.label}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* PROPERTY CARDS LIST PANEL */}
          <View style={styles.cardsListContainer}>
            <Text style={styles.cardsListHeaderTitle}>
              {t('mapView.propertiesOnMap')} ({filteredProperties.length})
            </Text>
            {filteredProperties.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="map-outline" size={40} color="#94A3B8" />
                <Text style={styles.emptyTitle}>{t('mapView.noJaminOnMap')}</Text>
                <Text style={styles.emptySubtitle}>
                  {t('mapView.noJaminOnMapDesc')}
                </Text>
              </View>
            ) : (
              filteredProperties.map((property) => {
                const isSelected = selectedPropertyId === property.id;
                return (
                  <View
                    key={property.id}
                    style={[
                      styles.cardItemWrapper,
                      isSelected && styles.cardItemSelected,
                    ]}
                  >
                    <BrowsePropertyCard
                      property={property}
                      onPress={handlePropertyPress}
                    />
                  </View>
                );
              })
            )}
          </View>
        </View>


        {/* FOOTER */}
        <FooterSection />
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
  mapViewSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 20,
  },
  mapCardContainer: {
    height: 480,
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  mapCardContainerFullScreen: {
    height: 650,
  },
  mapBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  zoomControlsBox: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 20,
  },
  zoomBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  fullScreenBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 20,
  },
  fullScreenBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
  },
  pinMarkerWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 15,
  },
  pinPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 2,
  },
  pinPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pinPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
  },
  pinPillTextSelected: {
    color: '#FFFFFF',
  },
  pinIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#EF4444',
  },
  pinIconCircleSelected: {
    borderColor: colors.primary,
    backgroundColor: '#E8F5E9',
  },
  indicatorsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 25,
  },
  indicatorsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  indicatorsTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  indicatorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    maxHeight: 120,
  },
  indicatorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: '#CBD5E1',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  indicatorLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#334155',
  },
  cardsListContainer: {
    width: '100%',
    gap: 14,
  },
  cardsListHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardItemWrapper: {
    borderRadius: 18,
  },
  cardItemSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 18,
    padding: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
});
