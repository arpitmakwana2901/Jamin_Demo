import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../types';
import { BrowseJaminScreen } from '../screens/BrowseJaminScreen';
import { PropertyDetailScreen } from '../screens/PropertyDetailScreen';
import { SearchResultsScreen } from '../screens/SearchResultsScreen';
import { AboutUsScreen } from '../screens/AboutUsScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BrowseJamin" component={BrowseJaminScreen} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};
