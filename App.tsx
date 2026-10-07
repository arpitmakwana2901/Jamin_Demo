import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import './src/i18n';
import { loadSavedLanguage } from './src/i18n';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SplashScreen } from './src/components/SplashScreen';
import { LanguageSelectModal } from './src/components/LanguageSelectModal';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    loadSavedLanguage();

    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowLanguageModal(true);
    }, 3400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <RootNavigator />
          <LanguageSelectModal
            visible={showLanguageModal}
            onClose={() => setShowLanguageModal(false)}
          />
        </>
      )}
    </SafeAreaProvider>
  );
}
