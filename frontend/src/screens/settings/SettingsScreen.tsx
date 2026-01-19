import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { usePostPrivacy, PrivacyLevel } from '@/context/PostPrivacyContext';
import { BottomNavigation } from '@/components/common/BottomNavigation';

const PRIVACY_OPTIONS = [
  {
    id: 'publico' as PrivacyLevel,
    label: 'Público',
    description: 'Todos podem ver seus posts',
    icon: 'globe-outline',
  },
  {
    id: 'amigos' as PrivacyLevel,
    label: 'Amigos',
    description: 'Apenas seus amigos podem ver',
    icon: 'people-outline',
  },
  {
    id: 'privado' as PrivacyLevel,
    label: 'Privado',
    description: 'Apenas você pode ver seus posts',
    icon: 'lock-closed-outline',
  },
];

export const SettingsScreen = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const { defaultPrivacy, setDefaultPrivacy } = usePostPrivacy();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handlePrivacySelect = (privacy: PrivacyLevel) => {
    setDefaultPrivacy(privacy);
    setShowPrivacyModal(false);
  };

  const currentPrivacy = PRIVACY_OPTIONS.find((p) => p.id === defaultPrivacy);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Configurações</Text>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content}>
        {/* Privacy Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade de Posts</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowPrivacyModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Ionicons
                  name={currentPrivacy?.icon as any}
                  size={24}
                  color="#FF6B9D"
                />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Privacidade Padrão</Text>
                <Text style={styles.settingValue}>{currentPrivacy?.label}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </TouchableOpacity>

          <Text style={styles.sectionDescription}>
            Escolha o nível de privacidade padrão para todos os seus novos posts
          </Text>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="notifications-outline" size={24} color="#FF6B9D" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Notificações Push</Text>
                <Text style={styles.settingValue}>Habilitado</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="person-outline" size={24} color="#FF6B9D" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Editar Perfil</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="lock-closed-outline" size={24} color="#FF6B9D" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Mudar Senha</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="information-circle-outline" size={24} color="#FF6B9D" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Versão do App</Text>
                <Text style={styles.settingValue}>1.0.0</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Privacy Modal */}
      <Modal
        visible={showPrivacyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Privacidade Padrão</Text>
            <TouchableOpacity
              onPress={() => setShowPrivacyModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {PRIVACY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.privacyOption,
                  defaultPrivacy === option.id && styles.privacyOptionSelected,
                ]}
                onPress={() => handlePrivacySelect(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.privacyOptionContent}>
                  <View style={styles.privacyIconContainer}>
                    <Ionicons
                      name={option.icon as any}
                      size={28}
                      color={
                        defaultPrivacy === option.id ? '#FF6B9D' : '#8E8E93'
                      }
                    />
                  </View>
                  <View style={styles.privacyTextContent}>
                    <Text
                      style={[
                        styles.privacyLabel,
                        defaultPrivacy === option.id &&
                          styles.privacyLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={[
                        styles.privacyDescription,
                        defaultPrivacy === option.id &&
                          styles.privacyDescriptionSelected,
                      ]}
                    >
                      {option.description}
                    </Text>
                  </View>
                </View>
                {defaultPrivacy === option.id && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={24} color="#FF6B9D" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeAreaTop: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
  },

  // === SECTIONS ===
  section: {
    marginTop: 20,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#DBDBDB',
    borderBottomColor: '#DBDBDB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#8E8E93',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  // === SETTING ITEM ===
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  settingValue: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },

  // === MODAL ===
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // === PRIVACY OPTIONS ===
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DBDBDB',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  privacyOptionSelected: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFF9FB',
  },
  privacyOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  privacyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyTextContent: {
    flex: 1,
  },
  privacyLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 3,
  },
  privacyLabelSelected: {
    color: '#FF6B9D',
    fontWeight: '700',
  },
  privacyDescription: {
    fontSize: 12,
    color: '#8E8E93',
  },
  privacyDescriptionSelected: {
    color: '#FF6B9D',
    fontWeight: '500',
  },
  checkmark: {
    marginLeft: 12,
  },
});
