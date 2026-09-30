import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';

export const AccountScreen: React.FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>
          <Text style={styles.userName}>Sarshakhi User</Text>
          <Text style={styles.userPhone}>+91 98765 43210</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.verifiedText}>Verified Buyer / Seller</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Activity</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Saved Lands', 'No saved lands yet.')}>
            <Ionicons name="bookmark-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>Saved Jamin</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('My Inquiries', 'View active inquiries.')}>
            <Ionicons name="chatbubbles-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>My Inquiries</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('My Listings', 'List your land.')}>
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>List Your Land</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings & Support</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Language', 'Select Language')}>
            <Ionicons name="globe-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>App Language (EN / HI / GU)</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Support', 'Calling Support helpline: +91 98765 43210')}>
            <Ionicons name="headset-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>24/7 Customer Support</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation?.navigate('AboutUs')}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} style={styles.menuIcon} />
            <Text style={styles.menuText}>About Jamin24</Text>
            <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  userPhone: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});
