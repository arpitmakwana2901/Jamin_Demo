import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme/colors';

interface BrowseSectionHeaderProps {
  title: string;
  onViewAll?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const BrowseSectionHeader: React.FC<BrowseSectionHeaderProps> = ({
  title,
  onViewAll,
  onPrev,
  onNext,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={onViewAll}
          activeOpacity={0.8}
        >
          <Text style={styles.viewAllText}>{t('common.viewAll')}</Text>
        </TouchableOpacity>


        <View style={styles.arrowsRow}>
          <TouchableOpacity
            style={styles.arrowCircle}
            onPress={onPrev}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={14} color="#334155" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.arrowCircle}
            onPress={onNext}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={14} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewAllBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewAllText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  arrowsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
