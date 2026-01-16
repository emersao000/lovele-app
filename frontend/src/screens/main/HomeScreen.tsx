import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import Svg, { Path, Circle, G, Rect, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Ícone Home
const HomeIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Mensagens/Bate-papo
const MessageIcon = ({ active = false, size = 24, hasNew = false }) => (
  <Svg width={size + 4} height={size + 4} viewBox="0 0 28 28" fill="none">
    <Path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
    {hasNew && <Circle cx="22" cy="6" r="5" fill="#FF3B30" />}
  </Svg>
);

// Ícone Criar Momento
const CreateMomentIcon = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Defs>
      <SvgGradient id="createGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
        <Stop offset="100%" stopColor="#C44569" stopOpacity="1" />
      </SvgGradient>
    </Defs>
    <Rect width="32" height="32" rx="16" fill="url(#createGrad)" />
    <Path
      d="M16 11V21M11 16H21"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Explorar
const ExploreIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="10"
      cy="10"
      r="7"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L15 15"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Perfil
const ProfileIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="7"
      r="4"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Foto/Galeria
const GalleryIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
    <Path d="M21 15L16 10L5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Ícone Vídeo
const VideoIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M23 7L16 12L23 17V7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="1" y="5" width="15" height="14" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Ícone Relógio (tempo)
const ClockIcon = ({ size = 16, color = "#636E72" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Ícone Privacidade
const PrivacyIcon = ({ size = 16, color = "#636E72" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Mock de dados
const mockMoments = [
  {
    id: 1,
    user: { name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?img=1' },
    content: 'Que dia incrível! Aproveitando cada segundo',
    timeLeft: '22h',
    privacy: 'Público',
    reactions: 45,
  },
  {
    id: 2,
    user: { name: 'João Pedro', avatar: 'https://i.pravatar.cc/150?img=2' },
    content: 'Começando a semana com energia positiva',
    timeLeft: '18h',
    privacy: 'Amigos',
    reactions: 28,
  },
  {
    id: 3,
    user: { name: 'Maria Clara', avatar: 'https://i.pravatar.cc/150?img=3' },
    content: 'Feliz demais com essa conquista!',
    timeLeft: '12h',
    privacy: 'Público',
    reactions: 89,
  },
];

export const HomeScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateMoment, setShowCreateMoment] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]}</Text>
          <Text style={styles.subGreeting}>Veja os momentos especiais</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={() => setShowCreateMoment(true)}>
          <CreateMomentIcon size={28} />
        </TouchableOpacity>
      </View>

      {/* Modal Criar Momento */}
      {showCreateMoment && (
        <View style={styles.modalOverlay}>
          <View style={styles.createMomentModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Criar Momento</Text>
              <TouchableOpacity onPress={() => setShowCreateMoment(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Compartilhe um momento que desaparecerá em 24 horas
            </Text>

            <View style={styles.modalOptions}>
              <TouchableOpacity style={styles.modalOption}>
                <View style={styles.modalOptionIcon}>
                  <GalleryIcon size={24} color="#FF6B9D" />
                </View>
                <Text style={styles.modalOptionText}>Adicionar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption}>
                <View style={styles.modalOptionIcon}>
                  <VideoIcon size={24} color="#FF6B9D" />
                </View>
                <Text style={styles.modalOptionText}>Adicionar Vídeo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.privacySelector}>
              <Text style={styles.privacyLabel}>Privacidade:</Text>
              <View style={styles.privacyOptions}>
                <TouchableOpacity style={[styles.privacyOption, styles.privacyOptionActive]}>
                  <Text style={styles.privacyOptionTextActive}>Público</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.privacyOption}>
                  <Text style={styles.privacyOptionText}>Amigos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.privacyOption}>
                  <Text style={styles.privacyOptionText}>Privado</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.createMomentButton}>
              <Text style={styles.createMomentButtonText}>Publicar Momento</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Feed de Momentos */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        <View style={styles.feedHeader}>
          <Text style={styles.feedTitle}>Momentos Ativos</Text>
          <Text style={styles.feedSubtitle}>Desaparecem em 24h</Text>
        </View>

        {mockMoments.map((moment) => (
          <View key={moment.id} style={styles.momentCard}>
            <View style={styles.momentHeader}>
              <View style={styles.momentUser}>
                <Image source={{ uri: moment.user.avatar }} style={styles.momentAvatar} />
                <View>
                  <Text style={styles.momentUserName}>{moment.user.name}</Text>
                  <View style={styles.momentMeta}>
                    <ClockIcon size={14} />
                    <Text style={styles.momentTime}>{moment.timeLeft} restantes</Text>
                    <Text style={styles.momentDot}>•</Text>
                    <PrivacyIcon size={14} />
                    <Text style={styles.momentPrivacy}>{moment.privacy}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.momentContent}>
              <Text style={styles.momentText}>{moment.content}</Text>
            </View>

            <View style={styles.momentFooter}>
              <TouchableOpacity style={styles.reactionButton}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z"
                    stroke="#FF6B9D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text style={styles.reactionCount}>{moment.reactions}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.commentButton}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                    stroke="#636E72"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text style={styles.commentText}>Responder</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(24 - parseInt(moment.timeLeft)) / 24 * 100}%` }]} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <HomeIcon active={activeTab === 'home'} size={26} />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('explore')}>
          <ExploreIcon active={activeTab === 'explore'} size={26} />
          <Text style={[styles.navLabel, activeTab === 'explore' && styles.navLabelActive]}>Explorar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('messages')}>
          <MessageIcon active={activeTab === 'messages'} hasNew={true} size={26} />
          <Text style={[styles.navLabel, activeTab === 'messages' && styles.navLabelActive]}>Conversas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <ProfileIcon active={activeTab === 'profile'} size={26} />
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3436',
  },
  subGreeting: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 2,
  },
  createButton: {
    shadowColor: '#C44569',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  feed: {
    flex: 1,
  },
  feedHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
  },
  feedSubtitle: {
    fontSize: 13,
    color: '#636E72',
    marginTop: 2,
  },
  momentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  momentHeader: {
    marginBottom: 12,
  },
  momentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  momentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
  },
  momentUserName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3436',
  },
  momentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  momentTime: {
    fontSize: 12,
    color: '#636E72',
  },
  momentDot: {
    fontSize: 12,
    color: '#636E72',
  },
  momentPrivacy: {
    fontSize: 12,
    color: '#636E72',
  },
  momentContent: {
    marginBottom: 16,
  },
  momentText: {
    fontSize: 15,
    color: '#2D3436',
    lineHeight: 22,
  },
  momentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 12,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reactionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B9D',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
  },
  progressBar: {
    height: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B9D',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  createMomentModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3436',
  },
  modalClose: {
    fontSize: 28,
    color: '#636E72',
    fontWeight: '300',
  },
  modalDescription: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  modalOption: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF5F8',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFE0EB',
  },
  modalOptionIcon: {
    marginBottom: 8,
  },
  modalOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C44569',
    textAlign: 'center',
  },
  privacySelector: {
    marginBottom: 24,
  },
  privacyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
  },
  privacyOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  privacyOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  privacyOptionActive: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFF5F8',
  },
  privacyOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636E72',
  },
  privacyOptionTextActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C44569',
  },
  createMomentButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createMomentButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#636E72',
  },
  navLabelActive: {
    color: '#FF6B9D',
  },
});