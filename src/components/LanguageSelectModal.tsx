import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../i18n';

interface LanguageSelectModalProps {
  visible: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English', subLabel: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', subLabel: 'हिंदी', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati', subLabel: 'ગુજરાતી', flag: '🇬🇺' },
];

export const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({ visible, onClose }) => {
  const { i18n } = useTranslation();

  const handleSelectLanguage = async (code: string) => {
    await changeAppLanguage(code);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 justify-center items-center px-5">
        <View className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
          {/* Header Icon & Title */}
          <View className="items-center mb-6">
            <View className="w-14 h-14 rounded-full bg-emerald-100 items-center justify-center mb-3">
              <Ionicons name="language-outline" size={28} color="#0B5E42" />
            </View>
            <Text className="text-xl font-black text-gray-900 text-center">
              Select Language
            </Text>
            <Text className="text-xs font-bold text-gray-500 text-center mt-1">
              अपनी भाषा चुनें / તમારી ભાષા પસંદ કરો
            </Text>
          </View>

          {/* Language Choices */}
          <View className="gap-y-3 mb-4">
            {LANGUAGES.map((lang) => {
              const isSelected = i18n.language === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  activeOpacity={0.85}
                  onPress={() => handleSelectLanguage(lang.code)}
                  className={`flex-row items-center justify-between p-4 rounded-2xl border ${
                    isSelected
                      ? 'bg-emerald-50 border-[#0B5E42]'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <View className="flex-row items-center">
                    <Text className="text-2xl mr-3">{lang.flag}</Text>
                    <View>
                      <Text className={`text-base font-extrabold ${isSelected ? 'text-[#0B5E42]' : 'text-gray-800'}`}>
                        {lang.label}
                      </Text>
                      <Text className="text-xs text-gray-500 font-medium">
                        {lang.subLabel}
                      </Text>
                    </View>
                  </View>

                  {isSelected ? (
                    <View className="w-6 h-6 rounded-full bg-[#0B5E42] items-center justify-center">
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    </View>
                  ) : (
                    <View className="w-6 h-6 rounded-full border border-gray-300" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};
