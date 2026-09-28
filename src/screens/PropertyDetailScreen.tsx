import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BrowseStackParamList } from '../types';
import { colors } from '../theme/colors';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { shadows } from '../theme/spacing';

type Props = NativeStackScreenProps<BrowseStackParamList, 'PropertyDetail'>;

export const PropertyDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { property } = route.params;
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'location'>('desc');

  const galleryImages = [
    property.image,
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Top Header Bar */}
      <View className="h-[56px] flex-row items-center justify-between px-[16px] border-b border-[#E5E7EB]">
        <TouchableOpacity className="p-[4px]" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-[16px] font-extrabold text-[#111827] flex-1 text-center mx-[10px]" numberOfLines={1}>
          {property.title}
        </Text>
        <TouchableOpacity className="p-[4px]" onPress={() => Alert.alert('शेयर करें', 'प्रॉपर्टी लिंक कॉपी हो गया है!')}>
          <Ionicons name="share-social-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-[#F8FAFC]" showsVerticalScrollIndicator={false}>
        {/* Main Image Carousel */}
        <View className="h-[240px] w-full relative">
          <Image source={{ uri: property.image }} className="w-full h-full" resizeMode="cover" />

          {/* Badges Overlay */}
          <View className="absolute top-[12px] left-[12px] flex-row gap-[8px]">
            {property.verified && (
              <View className="bg-[#0B5E42] px-[10px] py-[5px] rounded-[14px] flex-row items-center">
                <Ionicons name="checkmark-circle" size={14} color="#FFFFFF" className="mr-[4px]" />
                <Text className="text-white text-[11px] font-bold">सत्यापित संपत्ति</Text>
              </View>
            )}

            {property.has360 && (
              <View className="bg-[#F5A623] px-[10px] py-[5px] rounded-[14px] flex-row items-center">
                <Ionicons name="reload-circle" size={14} color="#1A1A1A" className="mr-[4px]" />
                <Text className="text-[#111827] text-[11px] font-bold">360° टूर उपलब्ध</Text>
              </View>
            )}
          </View>
        </View>

        {/* Thumbnail Row */}
        <View className="flex-row p-[12px] gap-[8px] bg-white">
          {galleryImages.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} className="w-[60px] h-[44px] rounded-[6px]" resizeMode="cover" />
          ))}
        </View>

        {/* Title & Price Card */}
        <View className="bg-white p-[20px] mt-[8px]">
          <View className="flex-row justify-between items-center mb-[6px]">
            <Text className="text-[20px] font-extrabold text-[#111827] flex-1">{property.title}</Text>
            <View className="bg-[#F3F4F6] px-[10px] py-[4px] rounded-[8px]">
              <Text className="text-[12px] font-bold text-[#111827]">{property.type}</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-[16px]">
            <Ionicons name="location" size={16} color={colors.primary} className="mr-[4px]" />
            <Text className="text-[14px] text-[#4B5563] font-medium">{property.location}</Text>
          </View>

          <View className="flex-row justify-between items-center bg-[#E8F5E9] p-[14px] rounded-[12px]">
            <View>
              <Text className="text-[11px] text-[#9CA3AF] font-semibold">मांगी गई कीमत</Text>
              <Text className="text-[22px] font-black text-[#0B5E42]">{property.price}</Text>
            </View>

            <View className="items-end">
              <Text className="text-[11px] text-[#9CA3AF] font-semibold">कुल क्षेत्रफल</Text>
              <Text className="text-[18px] font-extrabold text-[#0B5E42]">{property.area}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View className="p-[20px] gap-[10px]">
          {property.has360 && (
            <TouchableOpacity
              className="bg-[#F5A623] rounded-[12px] py-[14px] flex-row justify-center items-center"
              activeOpacity={0.85}
              onPress={() => Alert.alert('360° वर्चुअल टूर', '360° वर्चुअल व्यूअर लोड हो रहा है...')}
            >
              <Ionicons name="compass-outline" size={20} color="#1A1A1A" className="mr-[6px]" />
              <Text className="text-[#111827] text-[15px] font-extrabold">360° वर्चुअल टूर देखें</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={shadows.card}
            className="bg-[#25D366] rounded-[12px] py-[14px] flex-row justify-center items-center"
            activeOpacity={0.85}
            onPress={() => Alert.alert('संपर्क करें', 'मालिक/दलाल का फ़ोन नंबर: +91 98765 43210')}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" className="mr-[6px]" />
            <Text className="text-white text-[15px] font-extrabold">मालिक से संपर्क करें</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation (विवरण | सुविधाएं | स्थान) */}
        <View className="flex-row bg-white border-b border-[#E5E7EB]">
          <TouchableOpacity
            className={`flex-1 py-[14px] items-center ${activeTab === 'desc' ? 'border-b-2 border-[#0B5E42]' : ''}`}
            onPress={() => setActiveTab('desc')}
          >
            <Text className={`text-[14px] ${activeTab === 'desc' ? 'text-[#0B5E42] font-extrabold' : 'text-[#4B5563] font-semibold'}`}>विवरण</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-[14px] items-center ${activeTab === 'features' ? 'border-b-2 border-[#0B5E42]' : ''}`}
            onPress={() => setActiveTab('features')}
          >
            <Text className={`text-[14px] ${activeTab === 'features' ? 'text-[#0B5E42] font-extrabold' : 'text-[#4B5563] font-semibold'}`}>सुविधाएं</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-[14px] items-center ${activeTab === 'location' ? 'border-b-2 border-[#0B5E42]' : ''}`}
            onPress={() => setActiveTab('location')}
          >
            <Text className={`text-[14px] ${activeTab === 'location' ? 'text-[#0B5E42] font-extrabold' : 'text-[#4B5563] font-semibold'}`}>स्थान</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View className="bg-white p-[20px]">
          {activeTab === 'desc' && (
            <Text className="text-[14px] text-[#111827] leading-[22px]">
              {property.description ||
                'यह गुजरात में स्थित एक प्रीमियम खुली जमीन की संपत्ति है। सभी कानूनी दस्तावेज और टाइटल डिड जांचे और सत्यापित किए गए हैं। उपजाऊ मिट्टी और उत्कृष्ट कनेक्टिविटी इसे निवेश के लिए आदर्श बनाती है।'}
            </Text>
          )}

          {activeTab === 'features' && (
            <View className="gap-[10px]">
              {(property.features || ['पानी की आपूर्ति', 'बाउंड्री वॉल', '4-लेन रोड', 'सरकारी दस्तावेज', 'बिजली']).map(
                (feat: string, idx: number) => (
                  <View key={idx} className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={16} color={colors.primary} className="mr-[6px]" />
                    <Text className="text-[14px] text-[#111827] font-medium">{feat}</Text>
                  </View>
                )
              )}
            </View>
          )}

          {activeTab === 'location' && (
            <View className="gap-[6px]">
              <Text className="text-[15px] font-bold text-[#111827]">स्थान: {property.location}</Text>
              <Text className="text-[13px] text-[#4B5563]">निकटतम राजमार्ग: 2.5 किमी | शहर केंद्र: 10 किमी</Text>
            </View>
          )}
        </View>

        {/* Similar Properties Section */}
        <View className="mt-[20px] pb-[40px]">
          <Text className="text-[18px] font-extrabold text-[#111827] px-[20px] mb-[12px]">समान संपत्तियां (Similar Properties)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {PROPERTIES.filter((p) => p.id !== property.id).map((sim) => (
              <View key={sim.id} className="w-[280px]">
                <PropertyCard property={sim} onPress={(p) => navigation.push('PropertyDetail', { property: p })} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
