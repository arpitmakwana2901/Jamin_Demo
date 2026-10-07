import React from 'react';
import { TouchableOpacity, StyleSheet, Alert, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import { shadows } from '../theme/spacing';

interface WhatsAppFabProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export const WhatsAppFab: React.FC<WhatsAppFabProps> = ({ onPress, style }) => {
  const { t } = useTranslation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert(t('common.helpSupport'), 'Jamin24 (+91 98980 72803)');
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
