import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Property } from '../types';
import { colors } from '../theme/colors';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { EmptyState } from '../components/EmptyState';

type Props = {
  route?: {
    params?: {
      location?: string;
      landType?: string;
      budget?: string;
      propertyId?: string;
    };
  };
  navigation?: any;
};

export const SearchResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { location, landType } = route?.params || {};

  const filteredProperties = PROPERTIES.filter((p) => {
    if (location && location !== 'अहमदाबाद' && !p.location.includes(location)) {
      // Allow demo matching
    }
    return true;
  });

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="h-[56px] flex-row items-center px-4 border-b border-border">
        <TouchableOpacity className="p-1 mr-[10px]" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-[16px] font-extrabold text-text">खोज परिणाम (Search Results)</Text>
          <Text className="text-[11px] text-textLight">
            {location || 'गुजरात'} • {landType || 'सभी प्रकार'}
          </Text>
        </View>

        <TouchableOpacity className="p-2 bg-primaryLight rounded-[8px]" onPress={() => navigation.goBack()}>
          <Ionicons name="funnel-outline" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-[14px]">
          <Text className="text-[14px] text-textLight font-semibold">
            <Text className="text-primary font-extrabold">{filteredProperties.length}</Text> संपत्तियां मिलीं
          </Text>
        </View>

        {filteredProperties.length === 0 ? (
          <EmptyState
            title="कोई परिणाम नहीं मिला"
            description="आपकी खोज मानदंड से मेल खाती कोई जमीन नहीं मिली। कृपया फ़िल्टर बदलें।"
            actionText="वापस जाएं"
            onAction={() => navigation.goBack()}
          />
        ) : (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={handlePropertyPress}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
