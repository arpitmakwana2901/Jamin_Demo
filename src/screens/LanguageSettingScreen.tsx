import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BrowseStackParamList } from '../types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<BrowseStackParamList, 'LanguageSetting'>;

interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
  code: string;
}

const languages: LanguageOption[] = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    code: 'EN',
  },
  {
    id: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    code: 'HI',
  },
  {
    id: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    code: 'GU',
  },
];

export const LanguageSettingScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleSelectLanguage = (id: string) => {
    setSelectedLanguage(id);
  };

  const handleSave = () => {
    const selected = languages.find(lang => lang.id === selectedLanguage);
    Alert.alert(
      'Language Updated',
      `Language has been set to ${selected?.name} (${selected?.nativeName}).`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language Setting</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="language-outline"
              size={26}
              color={colors.primary}
            />
          </View>
          <Text style={styles.infoTitle}>Select Your Language</Text>
          <Text style={styles.infoSubtitle}>
            Choose your preferred language for using Jamin24.
          </Text>
        </View>

        {/* Language Options List */}
        <View style={styles.optionsList}>
          {languages.map(language => {
            const isSelected = selectedLanguage === language.id;
            return (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => handleSelectLanguage(language.id)}
              >
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.codeBadge,
                      isSelected && styles.codeBadgeSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.codeBadgeText,
                        isSelected && styles.codeBadgeTextSelected,
                      ]}
                    >
                      {language.code}
                    </Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text
                      style={[
                        styles.nativeNameText,
                        isSelected && styles.nativeNameTextSelected,
                      ]}
                    >
                      {language.nativeName}
                    </Text>
                    <Text style={styles.englishNameText}>{language.name}</Text>
                  </View>
                </View>

                {/* Radio button */}
                <View
                  style={[
                    styles.radioCircle,
                    isSelected && styles.radioCircleSelected,
                  ]}
                >
                  {isSelected && <View style={styles.radioInnerCircle} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Apply / Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Apply Language</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  infoSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  optionsList: {
    gap: 12,
    marginBottom: 28,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: colors.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F0F9F5',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.chipBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  codeBadgeSelected: {
    backgroundColor: colors.primary,
  },
  codeBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textLight,
  },
  codeBadgeTextSelected: {
    color: colors.white,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  nativeNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  nativeNameTextSelected: {
    color: colors.primary,
  },
  englishNameText: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.primary,
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
