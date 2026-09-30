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

  // Extended fields for Browse & Map View Jamin
  jaminId?: string;
  taluka?: string;
  district?: string;
  state?: string;
  village?: string;
  pricePerVigha?: string;
  isNewlyAdded?: boolean;
  isUrgent?: boolean;
  isPremium?: boolean;
  mapOverlayText?: string;
  mapPositionIndicator?: string;
  pinTop?: string;
  pinLeft?: string;
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

  // Extended fields for Builder Portal / Projects
  status?: 'Active' | 'Coming Soon';
  plotsAvailable?: number;
  builder?: string;
  city?: string;
  bannerType?: 'abloom' | 'prarambh' | 'default';
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
  PricingPlans: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
};

export type SearchStackParamList = {
  BrowseJamin: undefined;
  PropertyDetail: { property: Property };
  SearchResults: { location?: string; landType?: string; budget?: string; propertyId?: string };
  PricingPlans: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
};

export type MapViewStackParamList = {
  MapHome: undefined;
  PropertyDetail: { property: Property };
  AboutUs: undefined;
  ContactUs: undefined;
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  MapView: undefined;
  Projects: undefined;
  Account: undefined;
};


