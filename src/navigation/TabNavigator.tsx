import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TabParamList } from '../types';
import { BrowseStack } from './BrowseStack';
import { SearchResultsScreen } from '../screens/SearchResultsScreen';
import { MapViewScreen } from '../screens/MapViewScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabBarIcon = (routeName: string, focused: boolean, color: string) => {
  let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';

  if (routeName === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (routeName === 'MapView') {
    iconName = focused ? 'map' : 'map-outline';
  } else if (routeName === 'Projects') {
    iconName = focused ? 'business' : 'business-outline';
  } else if (routeName === 'Account') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={22} color={color} />;
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused, color }) => renderTabBarIcon(route.name, focused, color),
      })}
    >
      <Tab.Screen
        name="Home"
        component={BrowseStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchResultsScreen}
        options={{ tabBarLabel: 'Search' }}
      />
      <Tab.Screen
        name="MapView"
        component={MapViewScreen}
        options={{ tabBarLabel: 'Map View' }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ tabBarLabel: 'Projects' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ tabBarLabel: 'Account' }}
      />
    </Tab.Navigator>
  );
};
