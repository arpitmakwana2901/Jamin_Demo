import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';

export const TrustBadges: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Badge 1 */}
      <View style={styles.badgeColumn}>
        <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} style={styles.badgeIcon} />
        <Text style={styles.badgeTitle}>{t('home.secure100')}</Text>
        <Text style={styles.badgeSubtext}>{t('home.safeTransparent')}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Badge 2 */}
      <View style={styles.badgeColumn}>
        <Ionicons name="document-text-outline" size={20} color={colors.primary} style={styles.badgeIcon} />
        <Text style={styles.badgeTitle}>{t('home.legalVerified')}</Text>
        <Text style={styles.badgeSubtext}>{t('home.allDocsChecked')}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Badge 3 */}
      <View style={styles.badgeColumn}>
        <Ionicons name="headset-outline" size={20} color={colors.primary} style={styles.badgeIcon} />
        <Text style={styles.badgeTitle}>{t('home.support247')}</Text>
        <Text style={styles.badgeSubtext}>{t('home.hereToHelp')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeIcon: {
    marginBottom: 4,
  },
  badgeTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  badgeSubtext: {
    fontSize: 9,
    fontWeight: '500',
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: colors.divider,
  },
});
