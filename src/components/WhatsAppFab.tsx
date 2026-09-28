import React from 'react';
import { TouchableOpacity, Alert, ViewStyle } from 'react-native';
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
      style={[shadows.fab, style]}
      className="w-[52px] h-[52px] rounded-[26px] bg-[#25D366] justify-center items-center"
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Ionicons name="logo-whatsapp" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
};
