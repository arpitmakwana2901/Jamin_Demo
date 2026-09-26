import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrowseStackParamList } from '../types';
import { BrowseJaminScreen } from '../screens/BrowseJaminScreen';
import { PropertyDetailScreen } from '../screens/PropertyDetailScreen';
import { SearchResultsScreen } from '../screens/SearchResultsScreen';
import { LanguageSettingScreen } from '../screens/LanguageSettingScreen';

const Stack = createNativeStackNavigator<BrowseStackParamList>();

export const BrowseStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BrowseHome" component={BrowseJaminScreen} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="LanguageSetting" component={LanguageSettingScreen} />
    </Stack.Navigator>
  );
};
