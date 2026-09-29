// TODO: Replace with react-native-maps in production

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types';

const MAP_SATELLITE_IMAGE =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200';

const PIN_MARKERS = [
  { id: '1', top: '25%', left: '30%', title: '₹45L', propertyId: '1' },
  { id: '2', top: '40%', left: '60%', title: '₹1.2Cr', propertyId: '2' },
  { id: '3', top: '55%', left: '35%', title: '₹75L', propertyId: '3' },
  { id: '4', top: '35%', left: '75%', title: '₹32L', propertyId: '4' },
  { id: '5', top: '65%', left: '65%', title: '₹95L', propertyId: '1' },
];

export const MapViewScreen: React.FC<any> = ({ navigation }) => {
  const [selectedPin, setSelectedPin] = useState<string>('1');

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Map Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>नक्शा दृश्य (Map View)</Text>
          <Text style={styles.headerSubtitle}>
            गुजरात में भूमि स्थानों का नक्शा
          </Text>
          {/* <Ionicons name='duplicate' size={36} color={colors.primary} /> */}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            Alert.alert('फिल्टर', 'मानचित्र पर भूमि प्रकार या बजट अनुसार खोजें')
          }
        >
          <Ionicons name="options-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Map Content */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={{ uri: MAP_SATELLITE_IMAGE }}
          style={styles.mapImage}
          resizeMode="cover"
        >
          {/* Pins Overlay */}
          {PIN_MARKERS.map(pin => {
            const isSelected = selectedPin === pin.id;
            return (
              <TouchableOpacity
                key={pin.id}
                style={[
                  styles.markerContainer,
                  { top: pin.top, left: pin.left },
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedPin(pin.id)}
              >
                <View
                  style={[
                    styles.priceBadge,
                    isSelected && styles.priceBadgeSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.priceText,
                      isSelected && styles.priceTextSelected,
                    ]}
                  >
                    {pin.title}
                  </Text>
                </View>
                <Ionicons
                  name="location"
                  size={32}
                  color={isSelected ? colors.primary : colors.red}
                />
              </TouchableOpacity>
            );
          })}
        </ImageBackground>

        {/* Bottom Property Horizontal Scroll */}
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>चुनी गई संपत्तियां</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {PROPERTIES.map(property => (
              <View key={property.id} style={styles.cardWrapper}>
                <PropertyCard
                  property={property}
                  onPress={handlePropertyPress}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 60,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textLight,
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.topBarIconBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  priceBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: -4,
  },
  priceBadgeSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  priceText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.text,
  },
  priceTextSelected: {
    color: colors.white,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  sheetTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 14,
  },
  cardWrapper: {
    width: 280,
  },
});
