import React from 'react';
import { TouchableOpacity, StyleSheet, Alert, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';
import { shadows } from '../theme/spacing';

interface WhatsAppFabProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export const WhatsAppFab: React.FC<WhatsAppFabProps> = ({ onPress, style }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert('WhatsApp Support', 'Jamin24 व्हाट्सएप सहायता केंद्र से जुड़ें (+91 98765 43210)');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.fab, style]}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Ionicons name="logo-whatsapp" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.whatsapp,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.fab,
  },
});
