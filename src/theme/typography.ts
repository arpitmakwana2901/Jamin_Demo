import { Platform, TextStyle } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'System' : 'sans-serif';
const fontBold = Platform.OS === 'ios' ? 'System' : 'sans-serif-medium';
const fontHeavy = Platform.OS === 'ios' ? 'System' : 'sans-serif-black';

export const typography: Record<string, TextStyle> = {
  heroHeadline: {
    fontFamily: fontHeavy,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 44,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  heroSubHeading: {
    fontFamily: fontBold,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
  },
  heroDescription: {
    fontFamily,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: fontBold,
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  cardTitle: {
    fontFamily: fontBold,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  body: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  bodySmall: {
    fontFamily,
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  tiny: {
    fontFamily: fontBold,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#6B7280',
  },
  button: {
    fontFamily: fontBold,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
};
