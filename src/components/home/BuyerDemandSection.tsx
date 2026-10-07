import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { BUYER_REQUESTS_LIST } from '../../data/homeData';

export const BuyerDemandSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View className="mt-8 px-4">
      {/* Soft rounded background container */}
      <View className="bg-[#F0FDF4] rounded-[22px] p-5 border border-[#C8E6C9]">
        {/* Top Info Banner */}
        <View className="mb-4">
          <View className="self-start bg-[#DCFCE7] border border-[#86EFAC] px-2.5 py-1 rounded-full mb-2.5">
            <Text className="text-[10px] font-extrabold text-[#0B5E42] tracking-wider">
              {t('home.buyerDemandBadge')}
            </Text>
          </View>

          <Text className="text-2xl font-extrabold text-[#074430] leading-7">
            {t('home.buyerDemandTitle')}
          </Text>

          <Text className="text-[13px] text-slate-600 mt-1.5 leading-5">
            {t('home.buyerDemandDesc')}
          </Text>

          <TouchableOpacity
            className="bg-[#0B5E42] flex-row items-center self-start px-4.5 py-3 rounded-xl mt-3.5 shadow-md active:opacity-90"
            activeOpacity={0.85}
            onPress={() => Alert.alert('Post Jamin', 'Post your Jamin free workflow.')}
          >
            <Text className="text-white text-sm font-extrabold">{t('home.postJaminFree')}</Text>
            <Ionicons name="arrow-forward-outline" size={16} color="#FFFFFF" className="ml-1.5" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-[#C8E6C9] my-4" />

        {/* Latest Buyer Requests section */}
        <View className="flex-row justify-between items-start mb-3.5">
          <View className="flex-1">
            <Text className="text-[17px] font-extrabold text-slate-900">{t('home.latestBuyerRequests')}</Text>
            <Text className="text-[11.5px] text-slate-600 mt-0.5">
              {t('home.latestBuyerRequestsSub')}
            </Text>
          </View>

          <TouchableOpacity
            className="py-1 px-2"
            onPress={() => Alert.alert('Buyer Requests', 'Viewing all buyer requests')}
          >
            <Text className="text-[13px] font-extrabold text-[#0B5E42]">{t('common.viewAll')} →</Text>
          </TouchableOpacity>
        </View>

        {/* Requests List */}
        <View className="gap-2.5">
          {BUYER_REQUESTS_LIST.map((req) => (
            <View key={req.id} className="bg-white rounded-xl p-3 flex-row items-center border border-slate-200">
              <View className="w-[38px] h-[38px] rounded-full bg-[#E8F5E9] justify-center items-center mr-3">
                <Ionicons name="cart-outline" size={18} color="#0B5E42" />
              </View>

              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[13.5px] font-extrabold text-slate-900">{req.title}</Text>
                  <Text className="text-[10.5px] text-slate-400 font-medium">{req.timeAgo}</Text>
                </View>

                <Text className="text-[11.5px] text-slate-600 mt-0.5">{req.location}</Text>

                <Text className="text-xs font-bold text-[#0B5E42] mt-0.5">{t('home.budgetPrefix')} {req.budget}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

