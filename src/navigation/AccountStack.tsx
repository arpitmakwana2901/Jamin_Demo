import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../types';
import { AccountScreen } from '../screens/AccountScreen';
import { AboutUsScreen } from '../screens/AboutUsScreen';
import { LanguageSettingScreen } from '../screens/LanguageSettingScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';
import { PricingPlansScreen } from '../screens/PricingPlansScreen';
import { PropertyDetailScreen } from '../screens/PropertyDetailScreen';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountHome" component={AccountScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="LanguageSetting" component={LanguageSettingScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="PricingPlans" component={PricingPlansScreen} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
    </Stack.Navigator>
  );
};
