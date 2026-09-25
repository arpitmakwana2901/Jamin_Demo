import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';
import { TrustBadges } from './TrustBadges';

interface SearchCardProps {
  onSearch?: (location: string, propertyId: string, landType: string, budget: string) => void;
}

const DISTRICTS = [
  'Select City / District',
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Bhavnagar',
  'Jamnagar',
  'Junagadh',
  'Gandhinagar',
  'Anand',
  'Kutch',
  'Mehsana',
];

const LAND_TYPES = [
  'All Land Types',
  'Agricultural Land',
  'Commercial Land',
  'Residential Plot',
  'Industrial Land',
];

const BUDGET_OPTIONS = [
  'Max Budget (₹)',
  'Under ₹25 Lakhs',
  '₹25 Lakhs - ₹50 Lakhs',
  '₹50 Lakhs - ₹1 Crore',
  '₹1 Crore - ₹5 Crores',
  '₹5 Crores+',
];

export const SearchCard: React.FC<SearchCardProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>('Select City / District');
  const [propertyId, setPropertyId] = useState<string>('');
  const [landType, setLandType] = useState<string>('All Land Types');
  const [budget, setBudget] = useState<string>('Max Budget (₹)');

  const [activeModal, setActiveModal] = useState<'location' | 'landType' | 'budget' | null>(null);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(location, propertyId, landType, budget);
    }
  };

  const getModalData = () => {
    if (activeModal === 'location') return DISTRICTS;
    if (activeModal === 'landType') return LAND_TYPES;
    if (activeModal === 'budget') return BUDGET_OPTIONS;
    return [];
  };

  const handleSelect = (item: string) => {
    if (activeModal === 'location') setLocation(item);
    if (activeModal === 'landType') setLandType(item);
    if (activeModal === 'budget') setBudget(item);
    setActiveModal(null);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Title */}
      <Text style={styles.title}>Find Your Dream Jamin</Text>

      {/* Row 1: Location & Property ID */}
      <View style={styles.row}>
        {/* Left: Location */}
        <View style={styles.column}>
          <Text style={styles.label}>Location</Text>
          <TouchableOpacity
            style={styles.inputField}
            activeOpacity={0.7}
            onPress={() => setActiveModal('location')}
          >
            <Ionicons name="location-outline" size={16} color={colors.primary} style={styles.inputIcon} />
            <Text
              style={[
                styles.inputText,
                location === 'Select City / District' && styles.placeholderText,
              ]}
              numberOfLines={1}
            >
              {location}
            </Text>
            <Ionicons name="chevron-down-outline" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Right: Property ID */}
        <View style={styles.column}>
          <Text style={styles.label}>Property ID (If you have)</Text>
          <View style={styles.inputField}>
            <Ionicons name="barcode-outline" size={16} color={colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="e.g. GJ-01-382120-0001"
              placeholderTextColor={colors.textMuted}
              value={propertyId}
              onChangeText={setPropertyId}
            />
          </View>
        </View>
      </View>

      {/* Row 2: Land Type & Budget */}
      <View style={styles.row}>
        {/* Left: Land Type */}
        <View style={styles.column}>
          <Text style={styles.label}>Land Type</Text>
          <TouchableOpacity
            style={styles.inputField}
            activeOpacity={0.7}
            onPress={() => setActiveModal('landType')}
          >
            <Ionicons name="leaf-outline" size={16} color={colors.primary} style={styles.inputIcon} />
            <Text
              style={[
                styles.inputText,
                landType === 'All Land Types' && styles.placeholderText,
              ]}
              numberOfLines={1}
            >
              {landType}
            </Text>
            <Ionicons name="chevron-down-outline" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Right: Budget */}
        <View style={styles.column}>
          <Text style={styles.label}>Your Budget</Text>
          <TouchableOpacity
            style={styles.inputField}
            activeOpacity={0.7}
            onPress={() => setActiveModal('budget')}
          >
            <Ionicons name="cash-outline" size={16} color={colors.primary} style={styles.inputIcon} />
            <Text
              style={[
                styles.inputText,
                budget === 'Max Budget (₹)' && styles.placeholderText,
              ]}
              numberOfLines={1}
            >
              {budget}
            </Text>
            <Ionicons name="chevron-down-outline" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Button */}
      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.85}
        onPress={handleSearch}
      >
        <Ionicons name="search-outline" size={18} color={colors.white} style={styles.searchIcon} />
        <Text style={styles.searchButtonText}>Search Jamin</Text>
      </TouchableOpacity>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Modal for Dropdowns */}
      <Modal
        visible={activeModal !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <TouchableWithoutFeedback onPress={() => setActiveModal(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {activeModal === 'location'
                    ? 'Select Location'
                    : activeModal === 'landType'
                    ? 'Select Land Type'
                    : 'Select Budget'}
                </Text>
                <FlatList
                  data={getModalData()}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                      <Ionicons name="chevron-forward-outline" size={16} color={colors.textMuted} />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginTop: -45,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 44,
  },
  inputIcon: {
    marginRight: 6,
  },
  inputText: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  placeholderText: {
    color: colors.textMuted,
    fontWeight: '400',
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    padding: 0,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    width: '100%',
    maxHeight: 380,
    borderRadius: 16,
    padding: 18,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  modalItemText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
});
