import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

export const TrustBadges: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Badge 1 */}
      <View style={styles.badgeColumn}>
        <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} style={styles.badgeIcon} />
        <Text style={styles.badgeTitle}>100% Secure</Text>
        <Text style={styles.badgeSubtext}>Safe & Transparent Deals</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Badge 2 */}
      <View style={styles.badgeColumn}>
        <Ionicons name="document-text-outline" size={20} color={colors.primary} style={styles.badgeIcon} />
        <Text style={styles.badgeTitle}>Legal Verified</Text>
        <Text style={styles.badgeSubtext}>All Documents Checked</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Badge 3 */}
      <View style={styles.badgeColumn}>
        <Ionicons name="headset-outline" size={20} color={colors.primary} style={styles.badgeIcon} />
        <Text style={styles.badgeTitle}>24/7 Support</Text>
        <Text style={styles.badgeSubtext}>We're Here to Help</Text>
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
