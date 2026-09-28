import React, { useState } from 'react';
import {
  View,
  Text,
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
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Header Bar */}
      <View className="h-[56px] flex-row items-center justify-between px-[16px] border-b border-[#E5E7EB] bg-white">
        <TouchableOpacity
          className="w-[40px] h-[40px] justify-center items-start"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-[18px] font-bold text-[#111827]">Language Setting</Text>
        <View className="w-[40px]" />
      </View>

      <ScrollView
        className="flex-1 bg-[#F8FAFC]"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View className="bg-white rounded-[16px] p-[20px] items-center mb-[20px] border border-[#E5E7EB]">
          <View className="w-[56px] h-[56px] rounded-[28px] bg-[#E8F5E9] justify-center items-center mb-[12px]">
            <Ionicons
              name="language-outline"
              size={26}
              color={colors.primary}
            />
          </View>
          <Text className="text-[18px] font-bold text-[#111827] mb-[6px]">Select Your Language</Text>
          <Text className="text-[13px] text-[#4B5563] text-center leading-[18px]">
            Choose your preferred language for using Jamin24.
          </Text>
        </View>

        {/* Language Options List */}
        <View className="gap-[12px] mb-[28px]">
          {languages.map(language => {
            const isSelected = selectedLanguage === language.id;
            return (
              <TouchableOpacity
                key={language.id}
                className={`rounded-[14px] py-[16px] px-[18px] flex-row items-center justify-between border-[1.5px] elevation-1 ${
                  isSelected ? 'border-[#0B5E42] bg-[#F0F9F5]' : 'border-[#E5E7EB] bg-white'
                }`}
                activeOpacity={0.8}
                onPress={() => handleSelectLanguage(language.id)}
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-[42px] h-[42px] rounded-[21px] justify-center items-center mr-[14px] ${
                      isSelected ? 'bg-[#0B5E42]' : 'bg-[#F3F4F6]'
                    }`}
                  >
                    <Text
                      className={`text-[13px] font-bold ${
                        isSelected ? 'text-white' : 'text-[#4B5563]'
                      }`}
                    >
                      {language.code}
                    </Text>
                  </View>
                  <View className="justify-center">
                    <Text
                      className={`text-[16px] font-bold ${
                        isSelected ? 'text-[#0B5E42]' : 'text-[#111827]'
                      }`}
                    >
                      {language.nativeName}
                    </Text>
                    <Text className="text-[13px] text-[#4B5563] mt-[2px]">{language.name}</Text>
                  </View>
                </View>

                {/* Radio button */}
                <View
                  className={`w-[22px] h-[22px] rounded-[11px] border-2 justify-center items-center ${
                    isSelected ? 'border-[#0B5E42]' : 'border-[#D1D5DB]'
                  }`}
                >
                  {isSelected && <View className="w-[12px] h-[12px] rounded-[6px] bg-[#0B5E42]" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Apply / Save Button */}
        <TouchableOpacity
          className="bg-[#0B5E42] rounded-[12px] py-[14px] items-center justify-center elevation-2"
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text className="text-white text-[15px] font-bold">Apply Language</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
