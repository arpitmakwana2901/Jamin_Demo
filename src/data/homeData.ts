export interface HeroFeature {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface DistrictMarketItem {
  id: string;
  name: string;
  count: number;
}

export interface MapMarkerItem {
  id: string;
  count: number;
  locationName: string;
  topPercent: number;
  leftPercent: number;
}

export interface TrustedPerson {
  rank: number;
  name: string;
}

export interface BuyerDemandItem {
  id: string;
  title: string;
  location: string;
  budget: string;
  timeAgo: string;
}

export interface SocialCardItem {
  id: string;
  platform: string;
  label: string;
  iconName: string;
  color: string;
  bgColor: string;
}

export const HERO_FEATURES: HeroFeature[] = [
  {
    id: '1',
    title: '360° Virtual Tours',
    subtitle: 'Experience Every Detail',
    iconName: 'cube-outline',
  },
  {
    id: '2',
    title: 'Verified Listings',
    subtitle: '100% Verified Properties',
    iconName: 'shield-checkmark-outline',
  },
  {
    id: '3',
    title: 'Trusted Network',
    subtitle: 'Buy & Sell',
    iconName: 'people-outline',
  },
  {
    id: '4',
    title: 'Smart Match',
    subtitle: 'We Connect Right Buyers',
    iconName: 'git-compare-outline',
  },
];

export const MAP_MARKERS: MapMarkerItem[] = [
  { id: '1', count: 70, locationName: 'Ahmedabad', topPercent: 48, leftPercent: 54 },
  { id: '2', count: 26, locationName: 'Mehsana', topPercent: 28, leftPercent: 44 },
  { id: '3', count: 15, locationName: 'Gandhinagar', topPercent: 38, leftPercent: 50 },
  { id: '4', count: 10, locationName: 'Vadodara', topPercent: 60, leftPercent: 60 },
  { id: '5', count: 3, locationName: 'Patan', topPercent: 20, leftPercent: 36 },
  { id: '6', count: 2, locationName: 'Surat', topPercent: 74, leftPercent: 58 },
];

export const LAND_POSTING_INDICATORS = [
  'Nearby Kachha Road',
  'Approach Road 1 Way',
  'Approach Road 2 Way',
  'Highway Touch',
  '4 Lane Highway Touch (2 Lane Each Side)',
  '6 Lane Highway Touch (3 Lane Each Side)',
  'Fresh Highway Touch (Controlled Access)',
  'Jamin Under First Plot from Main Road',
  'Under New Jamin',
  'Others',
];

export const DISTRICT_LIST: DistrictMarketItem[] = [
  { id: '1', name: 'Mehsana', count: 90 },
  { id: '2', name: 'Gandhinagar', count: 74 },
  { id: '3', name: 'Ahmedabad', count: 15 },
  { id: '4', name: 'Sabarkantha', count: 15 },
  { id: '5', name: 'Vadodara', count: 12 },
  { id: '6', name: 'Patan', count: 3 },
  { id: '7', name: 'Surat', count: 8 },
  { id: '8', name: 'Rajkot', count: 6 },
];

export const TRUSTED_TRADERS: TrustedPerson[] = [
  { rank: 1, name: 'Amrish Patel' },
  { rank: 2, name: 'Yuvrajsinh Chavda' },
  { rank: 3, name: 'Parvin Bhai' },
  { rank: 4, name: 'Kiran Patel' },
  { rank: 5, name: 'Jagdish Ravat' },
];

export const TRUSTED_BROKERS: TrustedPerson[] = [
  { rank: 1, name: 'Patan Property Solutions' },
  { rank: 2, name: 'Krishna Patel' },
  { rank: 3, name: 'Lalishwar Corporation' },
  { rank: 4, name: 'GoIndiaVaish' },
  { rank: 5, name: 'Satishkumar Chhaganbhai Prajapati' },
];

export const BUYER_REQUESTS_LIST: BuyerDemandItem[] = [
  {
    id: '1',
    title: 'Agricultural Land',
    location: 'Mehsana, Gandhinagar',
    budget: '₹6000000-70000000',
    timeAgo: '34 min ago',
  },
  {
    id: '2',
    title: 'Agricultural Land',
    location: 'Vijapur, Mehsana',
    budget: '₹700000-...',
    timeAgo: '15 hrs ago',
  },
  {
    id: '3',
    title: 'Agricultural Land',
    location: 'Visnagar, Mehsana',
    budget: '₹4000000-5000000',
    timeAgo: '17 hrs ago',
  },
  {
    id: '4',
    title: 'Agricultural Land',
    location: 'Vijapur, Mehsana',
    budget: '₹30000000-40000000',
    timeAgo: '19 hrs ago',
  },
  {
    id: '5',
    title: 'Agricultural Land',
    location: 'Mansa, Gandhinagar',
    budget: '₹4000000-4500000',
    timeAgo: '20 hrs ago',
  },
];

export const SOCIAL_CARDS: SocialCardItem[] = [
  {
    id: 'insta',
    platform: 'Instagram',
    label: 'Connect on Instagram',
    iconName: 'logo-instagram',
    color: '#E1306C',
    bgColor: '#FDF2F8',
  },
  {
    id: 'fb',
    platform: 'Facebook',
    label: 'Connect on Facebook',
    iconName: 'logo-facebook',
    color: '#1877F2',
  bgColor: '#EFF6FF',
  },
  {
    id: 'wa',
    platform: 'WhatsApp',
    label: 'Connect on WhatsApp',
    iconName: 'logo-whatsapp',
    color: '#25D366',
    bgColor: '#F0FDF4',
  },
  {
    id: 'yt',
    platform: 'YouTube',
    label: 'Watch on YouTube',
    iconName: 'logo-youtube',
    color: '#FF0000',
    bgColor: '#FEF2F2',
  },
];
