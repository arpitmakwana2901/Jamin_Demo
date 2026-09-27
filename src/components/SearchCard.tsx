import React, { useState } from 'react';
import {
  View,
  Text,
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
    <View className="bg-card mx-4 -mt-[45px] rounded-[16px] p-[18px] shadow-lg shadow-black/10 elevation-8 z-10">
      {/* Title */}
      <Text className="text-[18px] font-extrabold text-text text-center mb-4">Find Your Dream Jamin</Text>

      {/* Row 1: Location & Property ID */}
      <View className="flex-row gap-3 mb-3">
        {/* Left: Location */}
        <View className="flex-1">
          <Text className="text-[12px] font-bold text-text mb-[6px]">Location</Text>
          <TouchableOpacity
            className="flex-row items-center bg-chipBg border border-border rounded-[10px] px-[10px] h-[44px]"
            activeOpacity={0.7}
            onPress={() => setActiveModal('location')}
          >
            <Ionicons name="location-outline" size={16} color={colors.primary} className="mr-[6px]" />
            <Text
              className={`flex-1 text-[12px] ${
                location === 'Select City / District' ? 'text-textMuted font-normal' : 'text-text font-semibold'
              }`}
              numberOfLines={1}
            >
              {location}
            </Text>
            <Ionicons name="chevron-down-outline" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Right: Property ID */}
        <View className="flex-1">
          <Text className="text-[12px] font-bold text-text mb-[6px]">Property ID (If you have)</Text>
          <View className="flex-row items-center bg-chipBg border border-border rounded-[10px] px-[10px] h-[44px]">
            <Ionicons name="barcode-outline" size={16} color={colors.primary} className="mr-[6px]" />
            <TextInput
              className="flex-1 text-[12px] text-text p-0 font-medium"
              placeholder="e.g. GJ-01-382120-0001"
              placeholderTextColor={colors.textMuted}
              value={propertyId}
              onChangeText={setPropertyId}
            />
          </View>
        </View>
      </View>

      {/* Row 2: Land Type & Budget */}
      <View className="flex-row gap-3 mb-3">
        {/* Left: Land Type */}
        <View className="flex-1">
          <Text className="text-[12px] font-bold text-text mb-[6px]">Land Type</Text>
          <TouchableOpacity
            className="flex-row items-center bg-chipBg border border-border rounded-[10px] px-[10px] h-[44px]"
            activeOpacity={0.7}
            onPress={() => setActiveModal('landType')}
          >
            <Ionicons name="leaf-outline" size={16} color={colors.primary} className="mr-[6px]" />
            <Text
              className={`flex-1 text-[12px] ${
                landType === 'All Land Types' ? 'text-textMuted font-normal' : 'text-text font-semibold'
              }`}
              numberOfLines={1}
            >
              {landType}
            </Text>
            <Ionicons name="chevron-down-outline" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Right: Budget */}
        <View className="flex-1">
          <Text className="text-[12px] font-bold text-text mb-[6px]">Your Budget</Text>
          <TouchableOpacity
            className="flex-row items-center bg-chipBg border border-border rounded-[10px] px-[10px] h-[44px]"
            activeOpacity={0.7}
            onPress={() => setActiveModal('budget')}
          >
            <Ionicons name="cash-outline" size={16} color={colors.primary} className="mr-[6px]" />
            <Text
              className={`flex-1 text-[12px] ${
                budget === 'Max Budget (₹)' ? 'text-textMuted font-normal' : 'text-text font-semibold'
              }`}
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
        className="bg-primary rounded-[10px] h-[48px] flex-row justify-center items-center mt-[6px] shadow-sm elevation-3"
        activeOpacity={0.85}
        onPress={handleSearch}
      >
        <Ionicons name="search-outline" size={18} color={colors.white} className="mr-2" />
        <Text className="text-white text-[15px] font-bold">Search Jamin</Text>
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
          <View className="flex-1 bg-black/45 justify-center items-center p-5">
            <TouchableWithoutFeedback>
              <View className="bg-white w-full max-h-[380px] rounded-[16px] p-[18px]">
                <Text className="text-[16px] font-bold text-text mb-3 border-b border-border pb-[10px]">
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
                      className="flex-row justify-between items-center py-3 border-b border-divider"
                      onPress={() => handleSelect(item)}
                    >
                      <Text className="text-[13px] text-text font-medium">{item}</Text>
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
  