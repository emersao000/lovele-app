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
import { usePostPrivacy } from '@/context/PostPrivacyContext';

const { height } = Dimensions.get('window');

// ==========================================
// 📋 TIPOS/INTERFACES
// ==========================================

export type PostType = 'momento' | 'recado';

export interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectType: (type: PostType) => void;
}

interface PostTypeOption {
  id: PostType;
  label: string;
  description: string;
  icon: string;
  colors: [string, string];
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

// ==========================================
// 🎨 COMPONENTE PRINCIPAL
// ==========================================

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  visible,
  onClose,
  onSelectType,
}) => {
  const { defaultPrivacy } = usePostPrivacy();

  const handleTypeSelect = (type: PostType) => {
    onSelectType(type);
    onClose();
  };

  const handleClose = () => {
    onClose();
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


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header com Close */}
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

        {/* Content */}
        <View style={styles.modalContent}>
          {renderTypeSelection()}
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

});
