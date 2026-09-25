import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32 - 12) / 2;

export interface FeatureCardData {
  id: string;
  iconName: string;
  title: string;
}

interface FeatureGridCardProps {
  item: FeatureCardData;
}

export const FeatureGridCard: React.FC<FeatureGridCardProps> = ({ item }) => {
  return (
    <View style={styles.pillContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name={item.iconName as any} size={20} color={colors.white} />
      </View>
      <Text style={styles.pillText} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    width: cardWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pillText: {
    flex: 1,
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});
