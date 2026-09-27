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
      <View className="px-5 py-[14px] border-b border-border">
        <Text className="text-[22px] font-extrabold text-text">प्रॉपर्टी प्रोजेक्ट्स</Text>
        <Text className="text-[13px] text-textLight mt-[2px]">गुजरात में नई विकास परियोजनाएं</Text>
      </View>

      {/* Category Tabs */}
      <View className="bg-background py-[10px]">
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
                className={`px-4 py-2 rounded-[20px] bg-white border ${
                  isSelected ? 'bg-primary border-primary' : 'border-border'
                }`}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  className={`text-[13px] ${
                    isSelected ? 'text-white font-bold' : 'font-semibold text-text'
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
        className="flex-1 bg-background"
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
          <View className="flex-row flex-wrap gap-3">
            {filteredProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={{ width: cardWidth }}
                className="bg-card rounded-[16px] border border-border overflow-hidden"
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
                  <View className="absolute top-2 right-2 bg-primary rounded-[8px] px-[6px] py-[3px]">
                    <Text className="text-white text-[10px] font-bold">{project.unitsAvailable} इकाइयां</Text>
                  </View>
                </View>

                <View className="p-[10px]">
                  <Text className="text-[14px] font-extrabold text-text mb-1" numberOfLines={1}>
                    {project.name}
                  </Text>
                  <View className="flex-row items-center mb-[6px]">
                    <Ionicons name="location-outline" size={12} color={colors.textLight} />
                    <Text className="text-[11px] text-textLight ml-[2px]" numberOfLines={1}>
                      {project.location}
                    </Text>
                  </View>
                  <Text className="text-[13px] font-extrabold text-primary mb-2">{project.priceRange}</Text>

                  <View className="bg-primaryLight py-[6px] rounded-[8px] items-center">
                    <Text className="text-[11px] font-bold text-primary">विवरण देखें</Text>
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
