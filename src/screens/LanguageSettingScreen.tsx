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
      <View className="h-[56px] flex-row items-center justify-between px-4 border-b border-border bg-white">
        <TouchableOpacity
          className="w-[40px] h-[40px] justify-center items-start"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-[18px] font-bold text-text">Language Setting</Text>
        <View className="w-[40px]" />
      </View>

      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View className="bg-white rounded-[16px] p-5 items-center mb-5 border border-border">
          <View className="w-[56px] h-[56px] rounded-[28px] bg-primaryLight justify-center items-center mb-3">
            <Ionicons
              name="language-outline"
              size={26}
              color={colors.primary}
            />
          </View>
          <Text className="text-[18px] font-bold text-text mb-[6px]">Select Your Language</Text>
          <Text className="text-[13px] text-textLight text-center leading-[18px]">
            Choose your preferred language for using Jamin24.
          </Text>
        </View>

        {/* Language Options List */}
        <View className="gap-3 mb-[28px]">
          {languages.map(language => {
            const isSelected = selectedLanguage === language.id;
            return (
              <TouchableOpacity
                key={language.id}
                className={`rounded-[14px] py-4 px-[18px] flex-row items-center justify-between border-[1.5px] elevation-1 shadow-sm shadow-black/5 ${
                  isSelected ? 'border-primary bg-[#F0F9F5]' : 'bg-white border-border'
                }`}
                activeOpacity={0.8}
                onPress={() => handleSelectLanguage(language.id)}
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-[42px] h-[42px] rounded-[21px] justify-center items-center mr-[14px] ${
                      isSelected ? 'bg-primary' : 'bg-chipBg'
                    }`}
                  >
                    <Text
                      className={`text-[13px] font-bold ${
                        isSelected ? 'text-white' : 'text-textLight'
                      }`}
                    >
                      {language.code}
                    </Text>
                  </View>
                  <View className="justify-center">
                    <Text
                      className={`text-[16px] font-bold ${
                        isSelected ? 'text-primary' : 'text-text'
                      }`}
                    >
                      {language.nativeName}
                    </Text>
                    <Text className="text-[13px] text-textLight mt-[2px]">{language.name}</Text>
                  </View>
                </View>

                {/* Radio button */}
                <View
                  className={`w-[22px] h-[22px] rounded-[11px] border-2 justify-center items-center ${
                    isSelected ? 'border-primary' : 'border-[#D1D5DB]'
                  }`}
                >
                  {isSelected && <View className="w-[12px] h-[12px] rounded-[6px] bg-primary" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Apply / Save Button */}
        <TouchableOpacity
          className="bg-primary rounded-[12px] py-[14px] items-center justify-center elevation-2 shadow-sm shadow-primary/25"
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text className="text-white text-[15px] font-bold">Apply Language</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
