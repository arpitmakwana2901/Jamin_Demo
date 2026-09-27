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

export const PricingPlansScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-5 py-4 border-b border-border">
        <Text className="text-[22px] font-extrabold text-text">सब्सक्रिप्शन प्लान्स (Pricing Plans)</Text>
        <Text className="text-[13px] text-textLight mt-1 leading-[18px]">
          अपनी आवश्यकता के अनुसार सही प्लान चुनें और बिक्री 10x बढ़ाएं
        </Text>
      </View>

      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {PRICING_PLANS.map((plan) => {
          const isPro = plan.popular;
          return (
            <View
              key={plan.id}
              className={`rounded-[20px] p-5 relative shadow-md shadow-black/10 elevation-6 ${
                isPro ? 'border-primary border-2 bg-[#FAFDFB]' : 'bg-card border border-border'
              }`}
            >
              {/* Popular Badge */}
              {isPro && (
                <View className="absolute -top-[12px] right-5 bg-primary px-3 py-[4px] rounded-[12px]">
                  <Text className="text-white text-[11px] font-extrabold">{plan.badge || 'सर्वश्रेष्ठ पसंद'}</Text>
                </View>
              )}

              <Text className="text-[18px] font-extrabold text-text mb-2">{plan.name}</Text>

              <View className="flex-row items-baseline mb-4">
                <Text className="text-[30px] font-black text-primary">{plan.price}</Text>
                <Text className="text-[14px] text-textLight ml-1 font-semibold">{plan.period}</Text>
              </View>

              <View className="h-[1px] bg-divider mb-4" />

              {/* Features List */}
              <View className="gap-3 mb-5">
                {plan.features.map((feature, idx) => (
                  <View key={idx} className="flex-row items-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={isPro ? colors.primary : '#10B981'}
                      className="mr-2"
                    />
                    <Text className="text-[13px] font-semibold text-text flex-1">{feature}</Text>
                  </View>
                ))}
              </View>

              {/* Subscribe Button */}
              <TouchableOpacity
                className={`rounded-[12px] py-[14px] items-center ${
                  isPro ? 'bg-primary' : 'bg-chipBg'
                }`}
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    plan.name,
                    `${plan.price}${plan.period} प्लान का चयन किया गया।\nपेमेंट गेटवे पर पुनः निर्देशित किया जा रहा है...`
                  )
                }
              >
                <Text className={`text-[15px] font-bold ${isPro ? 'text-white' : 'text-text'}`}>
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
