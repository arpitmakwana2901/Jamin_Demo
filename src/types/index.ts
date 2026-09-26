export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  area: string;
  type: 'Agricultural' | 'Commercial' | 'Residential';
  verified: boolean;
  has360: boolean;
  image: string;
  description?: string;
  features?: string[];
}

export interface Trader {
  id: string;
  name: string;
  city: string;
  deals: number;
  rating: number;
  verified: boolean;
  avatar?: string;
}

export interface BuyerRequest {
  id: string;
  name: string;
  type: string;
  time: string;
  budget: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  priceRange: string;
  unitsAvailable: number;
  type: 'Agricultural' | 'Commercial' | 'Residential';
  image: string;
  tagline?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  badge?: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  PropertyDetail: { property: Property };
  SearchResults: { location?: string; landType?: string; budget?: string; propertyId?: string };
};

export type BrowseStackParamList = {
  BrowseHome: undefined;
  PropertyDetail: { property: Property };
  SearchResults: { location?: string; landType?: string; budget?: string; propertyId?: string };
  LanguageSetting: undefined;
};

export type TabParamList = {
  Home: undefined;
  Search: { location?: string; landType?: string; budget?: string } | undefined;
  MapView: undefined;
  Projects: undefined;
  Account: undefined;
};
