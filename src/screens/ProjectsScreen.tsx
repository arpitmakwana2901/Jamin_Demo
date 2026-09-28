import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../theme/colors';
import { PROJECTS } from '../data/mockData';
import { EmptyState } from '../components/EmptyState';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40 - 12) / 2;

const CATEGORIES = ['सभी', 'निवासीय', 'व्यावसायिक', 'कृषि'];

export const ProjectsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('सभी');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedCategory === 'सभी') return true;
    if (selectedCategory === 'निवासीय') return proj.type === 'Residential';
    if (selectedCategory === 'व्यावसायिक') return proj.type === 'Commercial';
    if (selectedCategory === 'कृषि') return proj.type === 'Agricultural';
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-[20px] py-[14px] border-b border-[#E5E7EB]">
        <Text className="text-[22px] font-extrabold text-[#111827]">प्रॉपर्टी प्रोजेक्ट्स</Text>
        <Text className="text-[13px] text-[#4B5563] mt-[2px]">गुजरात में नई विकास परियोजनाएं</Text>
      </View>

      {/* Category Tabs */}
      <View className="bg-[#F8FAFC] py-[10px]">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                className={`px-[16px] py-[8px] rounded-[20px] border ${
                  isSelected
                    ? 'bg-[#0B5E42] border-[#0B5E42]'
                    : 'bg-white border-[#E5E7EB]'
                }`}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  className={`text-[13px] ${
                    isSelected ? 'text-white font-bold' : 'text-[#111827] font-semibold'
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 2-Column Grid */}
      <ScrollView
        className="flex-1 bg-[#F8FAFC]"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="कोई प्रोजेक्ट नहीं मिला"
            description="वर्तमान में इस श्रेणी में कोई प्रोजेक्ट उपलब्ध नहीं है।"
            actionText="सभी देखें"
            onAction={() => setSelectedCategory('सभी')}
          />
        ) : (
          <View className="flex-row flex-wrap gap-[12px]">
            {filteredProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={{ width: cardWidth }}
                className="bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden"
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    project.name,
                    `${project.tagline}\nस्थान: ${project.location}\nकीमत: ${project.priceRange}\nउपलब्ध यूनिट्स: ${project.unitsAvailable}`
                  )
                }
              >
                <View className="h-[120px] w-full relative">
                  <Image source={{ uri: project.image }} className="w-full h-full" resizeMode="cover" />
                  <View className="absolute top-[8px] right-[8px] bg-[#0B5E42] rounded-[8px] px-[6px] py-[3px]">
                    <Text className="text-white text-[10px] font-bold">{project.unitsAvailable} इकाइयां</Text>
                  </View>
                </View>

                <View className="p-[10px]">
                  <Text className="text-[14px] font-extrabold text-[#111827] mb-[4px]" numberOfLines={1}>
                    {project.name}
                  </Text>
                  <View className="flex-row items-center mb-[6px]">
                    <Ionicons name="location-outline" size={12} color={colors.textLight} />
                    <Text className="text-[11px] text-[#4B5563] ml-[2px]" numberOfLines={1}>
                      {project.location}
                    </Text>
                  </View>
                  <Text className="text-[13px] font-extrabold text-[#0B5E42] mb-[8px]">{project.priceRange}</Text>

                  <View className="bg-[#E8F5E9] py-[6px] rounded-[8px] items-center">
                    <Text className="text-[11px] font-bold text-[#0B5E42]">विवरण देखें</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
