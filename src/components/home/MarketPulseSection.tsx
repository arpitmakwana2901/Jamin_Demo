import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Svg, { Path } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { MAP_MARKERS, LAND_POSTING_INDICATORS, DISTRICT_LIST } from '../../data/homeData';

export const MarketPulseSection: React.FC = () => {
  const { t } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedChip, setSelectedChip] = useState<string>('Highway Touch');

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 1.4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.8));
  };

  return (
    <View className="mt-7 px-4">
      {/* Section Header */}
      <View className="mb-4">
        <View className="self-start bg-[#E8F5E9] border border-[#A7F3D0] px-2.5 py-1 rounded-full mb-2">
          <Text className="text-[10.5px] font-extrabold text-[#0B5E42] tracking-wider">
            {t('home.marketPulseBadge')}
          </Text>
        </View>

        <Text className="text-2xl font-extrabold text-slate-900 leading-7">
          {t('home.marketPulseTitle')}
        </Text>

        <Text className="text-[13px] text-slate-600 mt-1.5 leading-5">
          {t('home.marketPulseDesc')}
        </Text>
      </View>

      {/* Map Card */}
      <View className="bg-[#041F14] rounded-2xl overflow-hidden border border-[#15803D] shadow-lg mb-5">
        {/* Map Header bar */}
        <View className="flex-row justify-between items-center px-3.5 py-2.5 bg-[#03170E] border-b border-[#14532D]">
          <View className="flex-row items-center">
            <Ionicons name="map-outline" size={16} color="#4ADE80" />
            <Text className="text-[#F0FDF4] text-[12.5px] font-bold ml-1.5">
              {t('home.heatmapTitle')}
            </Text>
          </View>
          <View className="flex-row items-center bg-red-500/20 px-2 py-0.5 rounded-lg border border-red-500/40">
            <View className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1" />
            <Text className="text-red-500 text-[9.5px] font-extrabold">{t('home.live')}</Text>
          </View>
        </View>

        {/* Map Canvas View */}
        <View className="h-60 relative justify-center items-center bg-[#052A1B]">
          {/* Dark map background SVG */}
          <Svg height="260" width="100%" viewBox="0 0 340 240" className="absolute inset-0">
            <Path
              d="M 50,70 Q 70,30 140,25 Q 220,20 280,60 Q 310,100 290,150 Q 260,200 200,210 Q 150,220 120,185 Q 90,180 70,140 Q 30,110 50,70 Z"
              fill="#062C1D"
              stroke="#15803D"
              strokeWidth="2"
            />
            <Path d="M 120,30 Q 140,90 180,140" stroke="#166534" strokeWidth="1" strokeDasharray="4 4" />
            <Path d="M 70,80 Q 150,110 240,110" stroke="#166534" strokeWidth="1" strokeDasharray="4 4" />
            <Path d="M 140,140 Q 200,170 260,160" stroke="#166534" strokeWidth="1" strokeDasharray="4 4" />
          </Svg>

          {/* Interactive Zoom Controls */}
          <View className="absolute top-3 left-3 bg-black/65 rounded-lg border border-white/20 z-10 overflow-hidden">
            <TouchableOpacity className="w-8 h-8 justify-center items-center" onPress={handleZoomIn} activeOpacity={0.7}>
              <Text className="text-white text-lg font-bold">+</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-white/20" />
            <TouchableOpacity className="w-8 h-8 justify-center items-center" onPress={handleZoomOut} activeOpacity={0.7}>
              <Text className="text-white text-lg font-bold">-</Text>
            </TouchableOpacity>
          </View>

          {/* Map Markers Overlay */}
          <View
            className="w-full h-full absolute"
            style={{ transform: [{ scale: zoomLevel }] }}
          >
            {MAP_MARKERS.map((marker) => (
              <View
                key={marker.id}
                className="absolute items-center -ml-4 -mt-4"
                style={{ top: `${marker.topPercent}%`, left: `${marker.leftPercent}%` }}
              >
                <View className="absolute w-8 h-8 rounded-full bg-amber-400/30" />
                <View className="bg-amber-500 px-2 py-0.5 rounded-full border-1.5 border-white shadow-md">
                  <Text className="text-white text-[11px] font-black">{marker.count}</Text>
                </View>
                <Text className="text-yellow-200 text-[9px] font-bold mt-0.5 shadow-sm">
                  {marker.locationName}
                </Text>
              </View>
            ))}
          </View>

          <Text className="absolute bottom-2 right-3 text-white/25 text-[9px] font-extrabold tracking-widest">
            GUJARAT OPEN LAND NETWORK
          </Text>
        </View>

        {/* Map Footer stats bar */}
        <View className="px-3 py-2 bg-[#02120B] items-center">
          <Text className="text-[#A7F3D0] text-xs">
            {t('home.highActivityText')}{' '}
            <Text className="font-extrabold text-white">{t('home.inMehsanaGandhinagar')}</Text>
          </Text>
        </View>
      </View>

      {/* Land Posting Indicators */}
      <View className="mb-5">
        <Text className="text-xs font-extrabold text-slate-500 tracking-wider mb-2.5">
          {t('home.landPostingIndicators')}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 10 }}
        >
          {LAND_POSTING_INDICATORS.map((indicator, idx) => {
            const isSelected = selectedChip === indicator;
            return (
              <TouchableOpacity
                key={idx}
                className={`flex-row items-center border rounded-full px-3 py-2 ${
                  isSelected ? 'bg-[#0B5E42] border-[#0B5E42]' : 'bg-white border-slate-300'
                }`}
                onPress={() => setSelectedChip(indicator)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={12}
                  color={isSelected ? '#FFFFFF' : '#0B5E42'}
                  className="mr-1.5"
                />
                <Text className={`text-[11.5px] ${isSelected ? 'text-white font-bold' : 'text-slate-900 font-semibold'}`}>
                  {indicator}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* District List Card */}
      <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <View className="flex-row items-center mb-3.5">
          <Ionicons name="location" size={18} color="#0B5E42" />
          <Text className="text-base font-extrabold text-slate-900 ml-1.5 flex-1">{t('home.districtsList')}</Text>
          <View className="bg-[#E8F5E9] px-2 py-0.5 rounded-lg">
            <Text className="text-[10px] font-bold text-[#0B5E42]">{DISTRICT_LIST.length} {t('home.activeCount')}</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-2.5">
          {DISTRICT_LIST.map((item) => (
            <View key={item.id} className="w-[48%] flex-row items-center bg-slate-50 rounded-xl p-2.5 border border-slate-100">
              <View className="bg-[#0B5E42] min-w-[28px] h-[22px] rounded-full justify-center items-center mr-2.5 px-1.5">
                <Text className="text-white text-[11px] font-extrabold">{item.count}</Text>
              </View>
              <Text className="text-[13px] font-bold text-slate-900 flex-1">{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

