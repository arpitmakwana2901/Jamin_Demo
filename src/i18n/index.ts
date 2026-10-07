import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en';
import hi from './hi';
import gu from './gu';

export const LANGUAGE_KEY = '@app_language';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  gu: { translation: gu },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export const loadSavedLanguage = async () => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLang && ['en', 'hi', 'gu'].includes(savedLang)) {
      await i18n.changeLanguage(savedLang);
    }
  } catch (error) {
    console.error('Error loading saved language:', error);
  }
};

export const changeAppLanguage = async (lang: string) => {
  try {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

export default i18n;
