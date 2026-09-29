import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BrowseStackParamList, Property } from '../types';
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
  const { location, landType, budget } = route?.params || {};

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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>खोज परिणाम (Search Results)</Text>
          <Text style={styles.headerSubtitle}>
            {location || 'गुजरात'} • {landType || 'सभी प्रकार'}
          </Text>
        </View>

        <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="funnel-outline" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultCountRow}>
          <Text style={styles.resultCountText}>
            <Text style={styles.resultCountHighlight}>{filteredProperties.length}</Text> संपत्तियां मिलीं
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textLight,
  },
  filterBtn: {
    padding: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultCountRow: {
    marginBottom: 14,
  },
  resultCountText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '600',
  },
  resultCountHighlight: {
    color: colors.primary,
    fontWeight: '800',
  },
});
