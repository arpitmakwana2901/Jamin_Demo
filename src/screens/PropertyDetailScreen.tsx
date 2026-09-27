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
      <View className="h-[56px] flex-row items-center justify-between px-4 border-b border-border">
        <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-[16px] font-extrabold text-text flex-1 text-center mx-[10px]" numberOfLines={1}>
          {property.title}
        </Text>
        <TouchableOpacity className="p-1" onPress={() => Alert.alert('शेयर करें', 'प्रॉपर्टी लिंक कॉपी हो गया है!')}>
          <Ionicons name="share-social-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
        {/* Main Image Carousel */}
        <View className="h-[240px] w-full relative">
          <Image source={{ uri: property.image }} className="w-full h-full" resizeMode="cover" />

          {/* Badges Overlay */}
          <View className="absolute top-3 left-3 flex-row gap-2">
            {property.verified && (
              <View className="bg-primary px-[10px] py-[5px] rounded-[14px] flex-row items-center">
                <Ionicons name="checkmark-circle" size={14} color="#FFFFFF" className="mr-1" />
                <Text className="text-white text-[11px] font-bold">सत्यापित संपत्ति</Text>
              </View>
            )}

            {property.has360 && (
              <View className="bg-secondary px-[10px] py-[5px] rounded-[14px] flex-row items-center">
                <Ionicons name="reload-circle" size={14} color="#1A1A1A" className="mr-1" />
                <Text className="text-text text-[11px] font-bold">360° टूर उपलब्ध</Text>
              </View>
            )}
          </View>
        </View>

        {/* Thumbnail Row */}
        <View className="flex-row p-3 gap-2 bg-white">
          {galleryImages.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} className="w-[60px] h-[44px] rounded-[6px]" resizeMode="cover" />
          ))}
        </View>

        {/* Title & Price Card */}
        <View className="bg-card p-5 mt-2">
          <View className="flex-row justify-between items-center mb-[6px]">
            <Text className="text-[20px] font-extrabold text-text flex-1">{property.title}</Text>
            <View className="bg-chipBg px-[10px] py-[4px] rounded-[8px]">
              <Text className="text-[12px] font-bold text-text">{property.type}</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <Ionicons name="location" size={16} color={colors.primary} className="mr-1" />
            <Text className="text-[14px] text-textLight font-medium">{property.location}</Text>
          </View>

          <View className="flex-row justify-between items-center bg-primaryLight p-[14px] rounded-[12px]">
            <View>
              <Text className="text-[11px] text-textMuted font-semibold">मांगी गई कीमत</Text>
              <Text className="text-[22px] font-black text-primary">{property.price}</Text>
            </View>

            <View className="items-end">
              <Text className="text-[11px] text-textMuted font-semibold">कुल क्षेत्रफल</Text>
              <Text className="text-[18px] font-extrabold text-primary">{property.area}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View className="p-5 gap-[10px]">
          {property.has360 && (
            <TouchableOpacity
              className="bg-secondary rounded-[12px] py-[14px] flex-row justify-center items-center"
              activeOpacity={0.85}
              onPress={() => Alert.alert('360° वर्चुअल टूर', '360° वर्चुअल व्यूअर लोड हो रहा है...')}
            >
              <Ionicons name="compass-outline" size={20} color="#1A1A1A" className="mr-[6px]" />
              <Text className="text-text text-[15px] font-extrabold">360° वर्चुअल टूर देखें</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="bg-whatsapp rounded-[12px] py-[14px] flex-row justify-center items-center shadow-md shadow-black/10 elevation-6"
            activeOpacity={0.85}
            onPress={() => Alert.alert('संपर्क करें', 'मालिक/दलाल का फ़ोन नंबर: +91 98765 43210')}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" className="mr-[6px]" />
            <Text className="text-white text-[15px] font-extrabold">मालिक से संपर्क करें</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation (विवरण | सुविधाएं | स्थान) */}
        <View className="flex-row bg-card border-b border-border">
          <TouchableOpacity
            className={`flex-1 py-[14px] items-center ${activeTab === 'desc' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('desc')}
          >
            <Text className={`text-[14px] ${activeTab === 'desc' ? 'text-primary font-extrabold' : 'font-semibold text-textLight'}`}>
              विवरण
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-[14px] items-center ${activeTab === 'features' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('features')}
          >
            <Text className={`text-[14px] ${activeTab === 'features' ? 'text-primary font-extrabold' : 'font-semibold text-textLight'}`}>
              सुविधाएं
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-[14px] items-center ${activeTab === 'location' ? 'border-b-2 border-primary' : ''}`}
            onPress={() => setActiveTab('location')}
          >
            <Text className={`text-[14px] ${activeTab === 'location' ? 'text-primary font-extrabold' : 'font-semibold text-textLight'}`}>
              स्थान
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View className="bg-card p-5">
          {activeTab === 'desc' && (
            <Text className="text-[14px] text-text leading-[22px]">
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
                    <Text className="text-[14px] text-text font-medium">{feat}</Text>
                  </View>
                )
              )}
            </View>
          )}

          {activeTab === 'location' && (
            <View className="gap-[6px]">
              <Text className="text-[15px] font-bold text-text">स्थान: {property.location}</Text>
              <Text className="text-[13px] text-textLight">निकटतम राजमार्ग: 2.5 किमी | शहर केंद्र: 10 किमी</Text>
            </View>
          )}
        </View>

        {/* Similar Properties Section */}
        <View className="mt-5 pb-[40px]">
          <Text className="text-[18px] font-extrabold text-text px-5 mb-3">समान संपत्तियां (Similar Properties)</Text>
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
