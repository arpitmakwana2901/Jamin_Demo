import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../../theme/colors';
import {
  FILTER_LAND_TYPES,
  FILTER_STATES,
  FILTER_DISTRICTS,
  FILTER_TALUKAS,
  FILTER_VILLAGES,
  FILTER_PRICES,
  FILTER_SORT_OPTIONS,
} from '../../data/mockData';

export interface FilterState {
  searchQuery: string;
  landType: string;
  price: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  sortBy: string;
}

interface BrowseFilterCardProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  onSearchSubmit: () => void;
}

export const BrowseFilterCard: React.FC<BrowseFilterCardProps> = ({
  filters,
  onFilterChange,
  onReset,
  onSearchSubmit,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalFieldKey, setModalFieldKey] = useState<keyof FilterState | null>(null);

  const openPicker = (title: string, fieldKey: keyof FilterState, options: string[]) => {
    setModalTitle(title);
    setModalFieldKey(fieldKey);
    setModalOptions(options);
    setActiveModal(fieldKey);
  };

  const handleSelectOption = (option: string) => {
    if (modalFieldKey) {
      onFilterChange({
        ...filters,
        [modalFieldKey]: option,
      });
    }
    setActiveModal(null);
  };

  return (
    <View style={styles.container}>
      {/* PAGE HEADING & TOP SEARCH INPUT */}
      <View style={styles.pageHeaderRow}>
        <Text style={styles.pageTitle}>List of Jamin</Text>

        {/* SEARCH BAR */}
        <View style={styles.searchBarBox}>
          <Ionicons name="search" size={16} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Taluka Name"
            placeholderTextColor="#94A3B8"
            value={filters.searchQuery}
            onChangeText={(text) => onFilterChange({ ...filters, searchQuery: text })}
            onSubmitEditing={onSearchSubmit}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={onSearchSubmit}
            activeOpacity={0.8}
          >
            <Ionicons name="search" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN FILTER CARD */}
      <View style={styles.filterCard}>
        {/* CARD TOP HEADER */}
        <View style={styles.filterCardHeader}>
          <View style={styles.filterTitleRow}>
            <Ionicons name="funnel-outline" size={18} color="#1E293B" style={{ marginRight: 6 }} />
            <Text style={styles.filterTitleText}>Filter</Text>
          </View>

          <View style={styles.topRightControls}>
            {/* SORT BY DROPDOWN */}
            <TouchableOpacity
              style={styles.sortByBtn}
              onPress={() => openPicker('Sort By', 'sortBy', FILTER_SORT_OPTIONS)}
              activeOpacity={0.8}
            >
              <Text style={styles.sortByBtnText}>{filters.sortBy}</Text>
              <Ionicons name="chevron-down" size={14} color="#64748B" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            {/* RESET FILTERS */}
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={onReset}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh-outline" size={14} color="#334155" style={{ marginRight: 4 }} />
              <Text style={styles.resetBtnText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FILTER DROPDOWNS GRID */}
        <View style={styles.filterGrid}>
          {/* 1. LAND TYPE */}
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>Land Type</Text>
            <TouchableOpacity
              style={styles.dropdownPicker}
              onPress={() => openPicker('Land Type', 'landType', FILTER_LAND_TYPES)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dropdownText,
                  filters.landType.startsWith('Select') && styles.dropdownPlaceholder,
                ]}
                numberOfLines={1}
              >
                {filters.landType}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* 2. TOTAL PRICE */}
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>Total Price</Text>
            <TouchableOpacity
              style={styles.dropdownPicker}
              onPress={() => openPicker('Total Price', 'price', FILTER_PRICES)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dropdownText,
                  filters.price.startsWith('Price') && styles.dropdownPlaceholder,
                ]}
                numberOfLines={1}
              >
                {filters.price}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* 3. STATE */}
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>State</Text>
            <TouchableOpacity
              style={styles.dropdownPicker}
              onPress={() => openPicker('State', 'state', FILTER_STATES)}
              activeOpacity={0.8}
            >
              <Text style={styles.dropdownText} numberOfLines={1}>
                {filters.state}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* 4. DISTRICT / CITY */}
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>District / City</Text>
            <TouchableOpacity
              style={styles.dropdownPicker}
              onPress={() => openPicker('District / City', 'district', FILTER_DISTRICTS)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dropdownText,
                  filters.district.startsWith('Select') && styles.dropdownPlaceholder,
                ]}
                numberOfLines={1}
              >
                {filters.district}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* 5. TALUKA */}
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>Taluko</Text>
            <TouchableOpacity
              style={styles.dropdownPicker}
              onPress={() => openPicker('Taluko', 'taluka', FILTER_TALUKAS)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dropdownText,
                  filters.taluka.startsWith('Select') && styles.dropdownPlaceholder,
                ]}
                numberOfLines={1}
              >
                {filters.taluka}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* 6. AREA / VILLAGE */}
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>Area / Village</Text>
            <TouchableOpacity
              style={styles.dropdownPicker}
              onPress={() => openPicker('Area / Village', 'village', FILTER_VILLAGES)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dropdownText,
                  filters.village.startsWith('Select') && styles.dropdownPlaceholder,
                ]}
                numberOfLines={1}
              >
                {filters.village}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* OPTION PICKER MODAL */}
      <Modal
        visible={!!activeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <TouchableWithoutFeedback onPress={() => setActiveModal(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitleText}>Select {modalTitle}</Text>
                  <TouchableOpacity onPress={() => setActiveModal(null)}>
                    <Ionicons name="close-circle" size={24} color="#64748B" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
                  {modalOptions.map((opt, idx) => {
                    const isSelected = modalFieldKey ? filters[modalFieldKey] === opt : false;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[styles.modalOptionItem, isSelected && styles.modalOptionSelected]}
                        onPress={() => handleSelectOption(opt)}
                      >
                        <Text
                          style={[
                            styles.modalOptionText,
                            isSelected && styles.modalOptionTextSelected,
                          ]}
                        >
                          {opt}
                        </Text>
                        {isSelected && (
                          <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageHeaderRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingLeft: 10,
    paddingRight: 4,
    height: 44,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 0,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 6,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  filterCard: {
    backgroundColor: '#D9ECE6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B0D5C9',
    padding: 14,
  },
  filterCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  topRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortByBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 10,
    height: 32,
  },
  sortByBtnText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 6,
    height: 32,
  },
  resetBtnText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  fieldBox: {
    width: '48%',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  dropdownPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 10,
    height: 38,
  },
  dropdownText: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '500',
    flex: 1,
  },
  dropdownPlaceholder: {
    color: '#94A3B8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 10,
  },
  modalTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalList: {
    maxHeight: 300,
  },
  modalOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  modalOptionSelected: {
    backgroundColor: '#E8F5E9',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  modalOptionTextSelected: {
    color: colors.primary,
    fontWeight: '800',
  },
});
