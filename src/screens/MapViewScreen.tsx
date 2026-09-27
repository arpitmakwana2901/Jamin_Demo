// TODO: Replace with react-native-maps in production

import React, { useState } from 'react';
import {
  View,
  Text,
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
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Map Header */}
      <View className="h-[60px] bg-white flex-row items-center justify-between px-5 border-b border-border">
        <View className="justify-center">
          <Text className="text-[18px] font-extrabold text-text">नक्शा दृश्य (Map View)</Text>
          <Text className="text-[11px] text-textLight">
            गुजरात में भूमि स्थानों का नक्शा
          </Text>
        </View>
        <TouchableOpacity
          className="w-[38px] h-[38px] rounded-[19px] bg-topBarIconBg justify-center items-center"
          onPress={() =>
            Alert.alert('फिल्टर', 'मानचित्र पर भूमि प्रकार या बजट अनुसार खोजें')
          }
        >
          <Ionicons name="options-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Map Content */}
      <View className="flex-1 relative">
        <ImageBackground
          source={{ uri: MAP_SATELLITE_IMAGE }}
          className="flex-1 w-full h-full"
          resizeMode="cover"
        >
          {/* Pins Overlay */}
          {PIN_MARKERS.map(pin => {
            const isSelected = selectedPin === pin.id;
            return (
              <TouchableOpacity
                key={pin.id}
                className="absolute items-center"
                style={{ top: pin.top, left: pin.left }}
                activeOpacity={0.8}
                onPress={() => setSelectedPin(pin.id)}
              >
                <View
                  className={`px-[6px] py-[3px] rounded-[8px] border -mb-[4px] ${
                    isSelected ? 'bg-primary border-primary' : 'bg-white border-border'
                  }`}
                >
                  <Text
                    className={`text-[10px] font-extrabold ${
                      isSelected ? 'text-white' : 'text-text'
                    }`}
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
        <View className="absolute bottom-0 left-0 right-0 bg-white/92 rounded-t-[20px] pt-3 pb-5">
          <Text className="text-[14px] font-extrabold text-text px-5 mb-[10px]">चुनी गई संपत्तियां</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
          >
            {PROPERTIES.map(property => (
              <View key={property.id} className="w-[280px]">
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
