import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { Project } from '../types';
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>प्रॉपर्टी प्रोजेक्ट्स</Text>
        <Text style={styles.headerSubtitle}>गुजरात में नई विकास परियोजनाएं</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.tabChip, isSelected && styles.tabChipSelected]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 2-Column Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
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
          <View style={styles.grid}>
            {filteredProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectCard}
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    project.name,
                    `${project.tagline}\nस्थान: ${project.location}\nकीमत: ${project.priceRange}\nउपलब्ध यूनिट्स: ${project.unitsAvailable}`
                  )
                }
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: project.image }} style={styles.image} resizeMode="cover" />
                  <View style={styles.unitsBadge}>
                    <Text style={styles.unitsBadgeText}>{project.unitsAvailable} इकाइयां</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.projectName} numberOfLines={1}>
                    {project.name}
                  </Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color={colors.textLight} />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {project.location}
                    </Text>
                  </View>
                  <Text style={styles.priceRange}>{project.priceRange}</Text>

                  <View style={styles.enquireButton}>
                    <Text style={styles.enquireText}>विवरण देखें</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  tabContainer: {
    backgroundColor: colors.background,
    paddingVertical: 10,
  },
  tabScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  tabTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  projectCard: {
    width: cardWidth,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  unitsBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  unitsBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  cardContent: {
    padding: 10,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 11,
    color: colors.textLight,
    marginLeft: 2,
  },
  priceRange: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  enquireButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  enquireText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
});
