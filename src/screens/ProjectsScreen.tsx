import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TopBar } from '../components/TopBar';
import { FooterSection } from '../components/home/FooterSection';
import { PROJECTS } from '../data/mockData';
import { Project } from '../types';
import { colors } from '../theme/colors';

export const ProjectsScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleContactBuilder = () => {
    if (!selectedProject) return;
    const phone = '919898072803';
    const msg = `Hello Jamin24, I am interested in project: ${selectedProject.name} in ${selectedProject.city}.`;
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(msg)}`).catch(() => {
      Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* TOP BAR HEADER */}
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PROJECTS LIST CONTAINER */}
        <View style={styles.projectsListContainer}>
          {PROJECTS.map((project) => (
            <View key={project.id} style={styles.projectCard}>
              {/* TOP BADGES ROW */}
              <View style={styles.topBadgesRow}>
                {/* STATUS BADGE */}
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{project.status || 'Active'}</Text>
                </View>

                {/* PLOTS AVAILABLE BADGE */}
                <View style={styles.plotsBadge}>
                  <Text style={styles.plotsBadgeText}>
                    {project.plotsAvailable || project.unitsAvailable} Plots Available
                  </Text>
                </View>
              </View>

              {/* PROJECT NAME TITLE */}
              <Text style={styles.projectNameTitle}>{project.name}</Text>

              {/* PROJECT BANNER GRAPHIC */}
              <View style={styles.bannerContainer}>
                {project.bannerType === 'abloom' ? (
                  <View style={styles.abloomBannerBox}>
                    <Text style={styles.abloomLogoText}>Abloom</Text>
                    <Text style={styles.abloomSubText}>
                      RESIDENTIAL PLOTS WITH WEEKEND HOMES
                    </Text>
                  </View>
                ) : project.bannerType === 'prarambh' ? (
                  <View style={styles.prarambhBannerBox}>
                    <Ionicons name="compass-outline" size={48} color={colors.primary} />
                    <Text style={styles.prarambhLogoText}>JAMIN 24</Text>
                    <Text style={styles.prarambhSubText}>SARASWATI GROUP</Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: project.image }}
                    style={styles.defaultBannerImage}
                    resizeMode="cover"
                  />
                )}
              </View>

              {/* PROJECT DETAILS HEADER */}
              <View style={styles.detailsHeaderBox}>
                <Text style={styles.detailsSectionTitle}>Project Details</Text>
                <View style={styles.greenUnderline} />
              </View>

              {/* PROJECT DETAILS ROWS */}
              <View style={styles.detailsRowsContainer}>
                {/* ROW 1: BUILDER */}
                <View style={styles.detailRow}>
                  <View style={styles.iconSquare}>
                    <Ionicons name="person-outline" size={16} color={colors.primary} />
                  </View>
                  <Text style={styles.detailRowLabel}>Builder</Text>
                  <Text style={styles.detailRowValue}>{project.builder || '-'}</Text>
                </View>

                {/* ROW 2: CITY */}
                <View style={styles.detailRow}>
                  <View style={styles.iconSquare}>
                    <Ionicons name="home-outline" size={16} color={colors.primary} />
                  </View>
                  <Text style={styles.detailRowLabel}>City</Text>
                  <Text style={styles.detailRowValue}>{project.city || 'Ahmedabad'}</Text>
                </View>

                {/* ROW 3: LOCATION */}
                <View style={styles.detailRow}>
                  <View style={styles.iconSquare}>
                    <Ionicons name="location-outline" size={16} color={colors.primary} />
                  </View>
                  <Text style={styles.detailRowLabel}>Location</Text>
                  <Text style={styles.detailRowValue}>{project.location || '-'}</Text>
                </View>
              </View>

              {/* VIEW PROJECT BUTTON */}
              <TouchableOpacity
                style={styles.viewProjectBtn}
                activeOpacity={0.88}
                onPress={() => handleOpenProject(project)}
              >
                <Text style={styles.viewProjectBtnText}>View Project</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* FOOTER SECTION */}
        <FooterSection />
      </ScrollView>

      {/* PROJECT DETAILS MODAL */}
      <Modal
        visible={!!selectedProject}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedProject(null)}
      >
        <TouchableWithoutFeedback onPress={() => setSelectedProject(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContentCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedProject?.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedProject(null)}>
                    <Ionicons name="close-circle" size={24} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {selectedProject && (
                  <View style={styles.modalBody}>
                    <Text style={styles.modalTagline}>{selectedProject.tagline}</Text>

                    <View style={styles.modalMetaBox}>
                      <View style={styles.modalMetaRow}>
                        <Text style={styles.modalMetaLabel}>Status:</Text>
                        <Text style={styles.modalMetaValue}>{selectedProject.status}</Text>
                      </View>
                      <View style={styles.modalMetaRow}>
                        <Text style={styles.modalMetaLabel}>City / Location:</Text>
                        <Text style={styles.modalMetaValue}>
                          {selectedProject.city || 'Ahmedabad'}, {selectedProject.location}
                        </Text>
                      </View>
                      <View style={styles.modalMetaRow}>
                        <Text style={styles.modalMetaLabel}>Plots Available:</Text>
                        <Text style={styles.modalMetaValue}>
                          {selectedProject.plotsAvailable || selectedProject.unitsAvailable} Plots
                        </Text>
                      </View>
                      <View style={styles.modalMetaRow}>
                        <Text style={styles.modalMetaLabel}>Price Range:</Text>
                        <Text style={styles.modalMetaPrice}>{selectedProject.priceRange}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.contactBuilderBtn}
                      onPress={handleContactBuilder}
                      activeOpacity={0.88}
                    >
                      <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.contactBuilderText}>Contact Builder / Sales</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F6',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#EEF2F6',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  projectsListContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 20,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  topBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#166534',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#166534',
  },
  plotsBadge: {
    borderWidth: 1,
    borderColor: '#B0D5C9',
    backgroundColor: '#F1F9F6',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  plotsBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  projectNameTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  bannerContainer: {
    height: 160,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  abloomBannerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  abloomLogoText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F4C3A',
    fontStyle: 'italic',
    letterSpacing: 1,
    marginBottom: 4,
  },
  abloomSubText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  prarambhBannerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  prarambhLogoText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F4C3A',
    letterSpacing: 2,
    marginTop: 4,
  },
  prarambhSubText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
  },
  defaultBannerImage: {
    width: '100%',
    height: '100%',
  },
  detailsHeaderBox: {
    marginBottom: 12,
  },
  detailsSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  greenUnderline: {
    width: 24,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  detailsRowsContainer: {
    gap: 8,
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconSquare: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailRowLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  detailRowValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewProjectBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProjectBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContentCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  modalBody: {
    gap: 12,
  },
  modalTagline: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  modalMetaBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  modalMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalMetaLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  modalMetaValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '800',
  },
  modalMetaPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '900',
  },
  contactBuilderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    borderRadius: 12,
    height: 44,
    marginTop: 6,
  },
  contactBuilderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
