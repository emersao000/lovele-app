import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

// ==========================================
// 📋 TIPOS/INTERFACES
// ==========================================

export type PostType = 'momento' | 'recado';
export type PrivacyLevel = 'publico' | 'amigos' | 'privado';

export interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectType: (type: PostType, privacy: PrivacyLevel) => void;
}

interface PostTypeOption {
  id: PostType;
  label: string;
  description: string;
  icon: string;
  colors: [string, string];
}

interface PrivacyOption {
  id: PrivacyLevel;
  label: string;
  description: string;
  icon: string;
}

// ==========================================
// 📦 DADOS
// ==========================================

const POST_TYPES: PostTypeOption[] = [
  {
    id: 'momento',
    label: 'Momento',
    description: 'Compartilhe um momento com texto, foto ou vídeo',
    icon: 'time-outline',
    colors: ['#FF6B9D', '#C44569'],
  },
  {
    id: 'recado',
    label: 'Recado',
    description: 'Deixe uma mensagem para alguém especial',
    icon: 'chatbubble-ellipses-outline',
    colors: ['#FF9D5C', '#F97316'],
  },
];

const PRIVACY_OPTIONS: PrivacyOption[] = [
  {
    id: 'publico',
    label: 'Público',
    description: 'Todos podem ver',
    icon: 'globe-outline',
  },
  {
    id: 'amigos',
    label: 'Amigos',
    description: 'Apenas seus amigos',
    icon: 'people-outline',
  },
  {
    id: 'privado',
    label: 'Privado',
    description: 'Apenas você',
    icon: 'lock-closed-outline',
  },
];

// ==========================================
// 🎨 COMPONENTE PRINCIPAL
// ==========================================

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  visible,
  onClose,
  onSelectType,
}) => {
  const [selectedType, setSelectedType] = useState<PostType>('momento');
  const [selectedPrivacy, setSelectedPrivacy] = useState<PrivacyLevel>('publico');
  const [step, setStep] = useState<'type' | 'privacy'>('type');

  const handleTypeSelect = (type: PostType) => {
    setSelectedType(type);
    setStep('privacy');
  };

  const handlePrivacySelect = (privacy: PrivacyLevel) => {
    setSelectedPrivacy(privacy);
    onSelectType(selectedType, privacy);
    resetModal();
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const resetModal = () => {
    setStep('type');
    setSelectedType('momento');
    setSelectedPrivacy('publico');
  };

  const handleBack = () => {
    setStep('type');
  };

  // ==========================================
  // 🎨 RENDERIZADORES
  // ==========================================

  const renderTypeSelection = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>O que deseja compartilhar?</Text>
        <Text style={styles.stepSubtitle}>Escolha o tipo de post</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {POST_TYPES.map((postType) => (
          <TouchableOpacity
            key={postType.id}
            onPress={() => handleTypeSelect(postType.id)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={postType.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.typeCard}
            >
              <View style={styles.typeCardContent}>
                <View style={styles.typeIconContainer}>
                  <Ionicons name={postType.icon as any} size={32} color="#FFFFFF" />
                </View>

                <View style={styles.typeTextContainer}>
                  <Text style={styles.typeLabel}>{postType.label}</Text>
                  <Text style={styles.typeDescription}>{postType.description}</Text>
                </View>

                <View style={styles.typeArrow}>
                  <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPrivacySelection = () => {
    const selectedPostType = POST_TYPES.find((t) => t.id === selectedType);

    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.stepTitle}>Privacidade</Text>
            <Text style={styles.stepSubtitle}>Quem pode ver seu {selectedPostType?.label.toLowerCase()}?</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.privacyOptionsContainer}
        >
          {PRIVACY_OPTIONS.map((privacyOption) => (
            <TouchableOpacity
              key={privacyOption.id}
              onPress={() => handlePrivacySelect(privacyOption.id)}
              activeOpacity={0.7}
              style={[
                styles.privacyCard,
                selectedPrivacy === privacyOption.id && styles.privacyCardSelected,
              ]}
            >
              <View style={styles.privacyCardContent}>
                <View style={styles.privacyIconContainer}>
                  <Ionicons
                    name={privacyOption.icon as any}
                    size={28}
                    color={selectedPrivacy === privacyOption.id ? '#FF6B9D' : '#8E8E93'}
                  />
                </View>

                <View style={styles.privacyTextContainer}>
                  <Text
                    style={[
                      styles.privacyLabel,
                      selectedPrivacy === privacyOption.id && styles.privacyLabelSelected,
                    ]}
                  >
                    {privacyOption.label}
                  </Text>
                  <Text
                    style={[
                      styles.privacyDescription,
                      selectedPrivacy === privacyOption.id && styles.privacyDescriptionSelected,
                    ]}
                  >
                    {privacyOption.description}
                  </Text>
                </View>

                {selectedPrivacy === privacyOption.id && (
                  <View style={styles.privacyCheckmark}>
                    <Ionicons name="checkmark-circle" size={24} color="#FF6B9D" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={handleClose}
            style={styles.cancelButton}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header com Close */}
        {step === 'type' && (
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Criar Post</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        )}

        {/* Content */}
        <View style={styles.modalContent}>
          {step === 'type' ? renderTypeSelection() : renderPrivacySelection()}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// ==========================================
// 🎨 ESTILOS
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // === MODAL HEADER ===
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    backgroundColor: '#FFFFFF',
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

  // === STEP CONTAINER ===
  modalContent: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
  },

  // === STEP HEADER ===
  stepHeader: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },

  // === TYPE SELECTION ===
  optionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
    paddingBottom: 20,
  },
  typeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  typeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  typeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTextContainer: {
    flex: 1,
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  typeArrow: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // === PRIVACY SELECTION ===
  privacyOptionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    paddingBottom: 20,
  },
  privacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DBDBDB',
    overflow: 'hidden',
  },
  privacyCardSelected: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFF9FB',
  },
  privacyCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  privacyTextContainer: {
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
  privacyCheckmark: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // === BUTTONS ===
  cancelButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DBDBDB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
