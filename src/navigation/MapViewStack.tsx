import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapViewStackParamList } from '../types';
import { MapViewScreen } from '../screens/MapViewScreen';
import { PropertyDetailScreen } from '../screens/PropertyDetailScreen';
import { AboutUsScreen } from '../screens/AboutUsScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';

const Stack = createNativeStackNavigator<MapViewStackParamList>();

export const MapViewStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapHome" component={MapViewScreen} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};
