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

interface SearchCardProps {
  onSearch?: (location: string, propertyId: string, landType: string, budget: string) => void;
}

const DISTRICTS = [
  'Select City / District',
  'Mehsana',
  'Gandhinagar',
  'Ahmedabad',
  'Sabarkantha',
  'Vadodara',
  'Patan',
  'Surat',
  'Rajkot',
  'Bhavnagar',
  'Jamnagar',
  'Junagadh',
  'Anand',
  'Kutch',
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
    <View className="bg-white mx-4 -mt-[50px] rounded-[20px] p-5 shadow-lg border border-slate-200 z-10">
      {/* Title */}
      <Text className="text-xl font-extrabold text-[#074430] text-center mb-4">
        Find Your Dream Jamin
      </Text>

      {/* Location Field */}
      <View className="mb-3">
        <Text className="text-xs font-bold text-slate-900 mb-1.5">Location</Text>
        <TouchableOpacity
          className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3 h-[46px]"
          activeOpacity={0.7}
          onPress={() => setActiveModal('location')}
        >
          <Ionicons name="location-outline" size={18} color="#0B5E42" className="mr-2" />
          <Text
            className={`flex-1 text-[12.5px] font-semibold ${
              location === 'Select City / District' ? 'text-slate-400 font-normal' : 'text-slate-900'
            }`}
            numberOfLines={1}
          >
            {location}
          </Text>
          <Ionicons name="chevron-down-outline" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Property ID Field */}
      <View className="mb-3">
        <Text className="text-xs font-bold text-slate-900 mb-1.5">Property ID</Text>
        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3 h-[46px]">
          <Ionicons name="barcode-outline" size={18} color="#0B5E42" className="mr-2" />
          <TextInput
            className="flex-1 text-[12.5px] text-slate-900 font-medium p-0"
            placeholder="e.g. GJ-01-382120-0001"
            placeholderTextColor="#9CA3AF"
            value={propertyId}
            onChangeText={setPropertyId}
          />
        </View>
      </View>

      {/* Land Type & Budget in 2 columns */}
      <View className="flex-row gap-2.5 mb-3.5">
        {/* Land Type */}
        <View className="flex-1">
          <Text className="text-xs font-bold text-slate-900 mb-1.5">Land Type</Text>
          <TouchableOpacity
            className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3 h-[46px]"
            activeOpacity={0.7}
            onPress={() => setActiveModal('landType')}
          >
            <Ionicons name="leaf-outline" size={16} color="#0B5E42" className="mr-1.5" />
            <Text
              className={`flex-1 text-[12.5px] font-semibold ${
                landType === 'All Land Types' ? 'text-slate-400 font-normal' : 'text-slate-900'
              }`}
              numberOfLines={1}
            >
              {landType}
            </Text>
            <Ionicons name="chevron-down-outline" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Your Budget */}
        <View className="flex-1">
          <Text className="text-xs font-bold text-slate-900 mb-1.5">Your Budget</Text>
          <TouchableOpacity
            className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3 h-[46px]"
            activeOpacity={0.7}
            onPress={() => setActiveModal('budget')}
          >
            <Ionicons name="cash-outline" size={16} color="#0B5E42" className="mr-1.5" />
            <Text
              className={`flex-1 text-[12.5px] font-semibold ${
                budget === 'Max Budget (₹)' ? 'text-slate-400 font-normal' : 'text-slate-900'
              }`}
              numberOfLines={1}
            >
              {budget}
            </Text>
            <Ionicons name="chevron-down-outline" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Primary Search Button */}
      <TouchableOpacity
        className="bg-[#0B5E42] rounded-xl h-[50px] flex-row justify-center items-center mt-1 shadow-md active:opacity-90"
        activeOpacity={0.85}
        onPress={handleSearch}
      >
        <Ionicons name="search-outline" size={18} color="#FFFFFF" className="mr-2" />
        <Text className="text-white text-base font-extrabold">Search Jamin</Text>
      </TouchableOpacity>

      {/* Trust Indicators */}
      <View className="mt-5 pt-4 border-t border-slate-200 flex-row justify-between items-center">
        {/* Badge 1 */}
        <View className="flex-1 items-center px-0.5">
          <Ionicons name="shield-checkmark-outline" size={20} color="#0B5E42" />
          <Text className="text-[11px] font-extrabold text-slate-900 text-center mt-1">100% Secure</Text>
          <Text className="text-[9.5px] text-slate-600 text-center mt-0.5">Safe & Transparent</Text>
        </View>

        <View className="w-[1px] h-[38px] bg-slate-200" />

        {/* Badge 2 */}
        <View className="flex-1 items-center px-0.5">
          <Ionicons name="document-text-outline" size={20} color="#0B5E42" />
          <Text className="text-[11px] font-extrabold text-slate-900 text-center mt-1">Legal Verified</Text>
          <Text className="text-[9.5px] text-slate-600 text-center mt-0.5">All Documents Checked</Text>
        </View>

        <View className="w-[1px] h-[38px] bg-slate-200" />

        {/* Badge 3 */}
        <View className="flex-1 items-center px-0.5">
          <Ionicons name="headset-outline" size={20} color="#0B5E42" />
          <Text className="text-[11px] font-extrabold text-slate-900 text-center mt-1">24/7 Support</Text>
          <Text className="text-[9.5px] text-slate-600 text-center mt-0.5">We're Here to Help</Text>
        </View>
      </View>

      {/* Modal for Dropdowns */}
      <Modal
        visible={activeModal !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <TouchableWithoutFeedback onPress={() => setActiveModal(null)}>
          <View className="flex-1 bg-black/50 justify-center items-center p-5">
            <TouchableWithoutFeedback>
              <View className="bg-white w-full max-h-[400px] rounded-2xl p-4.5">
                <Text className="text-base font-extrabold text-slate-900 mb-3 pb-2.5 border-b border-slate-200">
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
                      className="flex-row justify-between items-center py-3 border-b border-slate-100"
                      onPress={() => handleSelect(item)}
                    >
                      <Text className="text-[13.5px] text-slate-900 font-semibold">{item}</Text>
                      <Ionicons name="checkmark-circle-outline" size={18} color="#0B5E42" />
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
