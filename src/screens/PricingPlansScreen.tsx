import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';
import { PRICING_PLANS } from '../data/mockData';
import { shadows } from '../theme/spacing';

export const PricingPlansScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-[20px] py-[16px] border-b border-[#E5E7EB]">
        <Text className="text-[22px] font-extrabold text-[#111827]">सब्सक्रिप्शन प्लान्स (Pricing Plans)</Text>
        <Text className="text-[13px] text-[#4B5563] mt-[4px] leading-[18px]">
          अपनी आवश्यकता के अनुसार सही प्लान चुनें और बिक्री 10x बढ़ाएं
        </Text>
      </View>

      <ScrollView
        className="flex-1 bg-[#F8FAFC]"
        contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {PRICING_PLANS.map((plan) => {
          const isPro = plan.popular;
          return (
            <View
              key={plan.id}
              style={shadows.card}
              className={`rounded-[20px] p-[20px] relative ${
                isPro
                  ? 'border-2 border-[#0B5E42] bg-[#FAFDFB]'
                  : 'border border-[#E5E7EB] bg-white'
              }`}
            >
              {/* Popular Badge */}
              {isPro && (
                <View className="absolute -top-[12px] right-[20px] bg-[#0B5E42] px-[12px] py-[4px] rounded-[12px]">
                  <Text className="text-white text-[11px] font-extrabold">{plan.badge || 'सर्वश्रेष्ठ पसंद'}</Text>
                </View>
              )}

              <Text className="text-[18px] font-extrabold text-[#111827] mb-[8px]">{plan.name}</Text>

              <View className="flex-row items-baseline mb-[16px]">
                <Text className="text-[30px] font-black text-[#0B5E42]">{plan.price}</Text>
                <Text className="text-[14px] text-[#4B5563] ml-[4px] font-semibold">{plan.period}</Text>
              </View>

              <View className="h-[1px] bg-[#E5E7EB] mb-[16px]" />

              {/* Features List */}
              <View className="gap-[12px] mb-[20px]">
                {plan.features.map((feature, idx) => (
                  <View key={idx} className="flex-row items-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={isPro ? colors.primary : '#10B981'}
                      className="mr-[8px]"
                    />
                    <Text className="text-[13px] font-semibold text-[#111827] flex-1">{feature}</Text>
                  </View>
                ))}
              </View>

              {/* Subscribe Button */}
              <TouchableOpacity
                className={`rounded-[12px] py-[14px] items-center ${
                  isPro ? 'bg-[#0B5E42]' : 'bg-[#F3F4F6]'
                }`}
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    plan.name,
                    `${plan.price}${plan.period} प्लान का चयन किया गया।\nपेमेंट गेटवे पर पुनः निर्देशित किया जा रहा है...`
                  )
                }
              >
                <Text
                  className={`text-[15px] font-bold ${
                    isPro ? 'text-white' : 'text-[#111827]'
                  }`}
                >
                  अभी सदस्यता लें
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
