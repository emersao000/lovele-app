import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Ícone Home
const HomeIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={active ? "#FF6B9D" : "#B2BEC3"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Mensagens
const MessageIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
      stroke={active ? "#FF6B9D" : "#B2BEC3"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Explorar
const ExploreIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={active ? "#FF6B9D" : "#B2BEC3"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.24 7.76001L14.12 14.12L7.76001 16.24L9.88001 9.88001L16.24 7.76001Z"
      stroke={active ? "#FF6B9D" : "#B2BEC3"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Perfil
const ProfileIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={active ? "#FF6B9D" : "#B2BEC3"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="7"
      r="4"
      stroke={active ? "#FF6B9D" : "#B2BEC3"}
      strokeWidth="2.5"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Sparkle/Estrela (Momentos)
const SparkleIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Fire (Trending)
const FireIcon = ({ size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8.5 14.5C8.5 14.5 9 13.5 9 12C9 9.5 7.5 8.5 6.5 6C6 5 6 4 6 4C4.5 6.5 3 10 3 14C3 18.5 6.5 22 12 22C17.5 22 21 18.5 21 14C21 10 19.5 8.5 18 6C18 6 18 7 17 8C15 10 14 11 14 14C14 15.5 14.5 16.5 14.5 16.5C13.5 15.5 13 14.5 13 13C13 11 14 9.5 14 7.5C14 6.5 13.5 5.5 13.5 5.5C12 7 10 9 10 12C10 13.5 10.5 14.5 10.5 14.5C9.5 13.5 8.5 12 8.5 10.5C8.5 9 9 8 9 7C9 6.5 8.5 6 8.5 6C7.5 7.5 6 10 6 13C6 15 7 16.5 8.5 17.5"
      stroke="#FF6B9D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FF6B9D"
      opacity="0.3"
    />
  </Svg>
);

const mockMoments = [
  {
    id: 1,
    user: { name: 'Marina Costa', avatar: 'https://i.pravatar.cc/150?img=5' },
    content: 'Às vezes a vida nos surpreende nos momentos mais simples',
    gradient: ['#FF6B9D', '#C44569'],
    timeLeft: '23h',
    reactions: 156,
    trending: true,
  },
  {
    id: 2,
    user: { name: 'Lucas Almeida', avatar: 'https://i.pravatar.cc/150?img=12' },
    content: 'Café, música boa e uma segunda-feira inspiradora',
    gradient: ['#FEA47F', '#F97F51'],
    timeLeft: '18h',
    reactions: 89,
    trending: false,
  },
  {
    id: 3,
    user: { name: 'Beatriz Santos', avatar: 'https://i.pravatar.cc/150?img=9' },
    content: 'Conquistar sonhos, um passo de cada vez',
    gradient: ['#25CCF7', '#1B9CFC'],
    timeLeft: '14h',
    reactions: 234,
    trending: true,
  },
];

export const HomeScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [momentText, setMomentText] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header com Gradiente */}
      <View style={styles.headerContainer}>
        <Svg height="200" width={width} style={styles.headerSvg}>
          <Defs>
            <SvgGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
              <Stop offset="100%" stopColor="#C44569" stopOpacity="1" />
            </SvgGradient>
          </Defs>
          <Rect width={width} height="200" fill="url(#headerGrad)" />
        </Svg>

        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>{user?.name?.split(' ')[0]}</Text>
            <Text style={styles.headerSubtitle}>Seus momentos, suas histórias</Text>
          </View>

          <TouchableOpacity style={styles.createFloatingButton} onPress={() => setShowCreateModal(true)}>
            <SparkleIcon size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24h</Text>
          <Text style={styles.statLabel}>Duração</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockMoments.length}</Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {mockMoments.reduce((acc, m) => acc + m.reactions, 0)}
          </Text>
          <Text style={styles.statLabel}>Reações</Text>
        </View>
      </View>

      {/* Feed */}
      <ScrollView 
        style={styles.feed} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      >
        <View style={styles.feedHeader}>
          <Text style={styles.feedTitle}>Em Alta Agora</Text>
          <FireIcon />
        </View>

        {mockMoments.map((moment, index) => (
          <View key={moment.id} style={styles.momentCard}>
            <Svg height="100%" width="100%" style={styles.momentGradientBg}>
              <Defs>
                <SvgGradient id={`grad${moment.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor={moment.gradient[0]} stopOpacity="0.1" />
                  <Stop offset="100%" stopColor={moment.gradient[1]} stopOpacity="0.05" />
                </SvgGradient>
              </Defs>
              <Rect width="100%" height="100%" fill={`url(#grad${moment.id})`} rx="20" />
            </Svg>

            <View style={styles.momentCardContent}>
              {moment.trending && (
                <View style={styles.trendingBadge}>
                  <FireIcon size={14} />
                  <Text style={styles.trendingText}>Em alta</Text>
                </View>
              )}

              <View style={styles.momentHeader}>
                <Image source={{ uri: moment.user.avatar }} style={styles.momentAvatar} />
                <View style={styles.momentUserInfo}>
                  <Text style={styles.momentUserName}>{moment.user.name}</Text>
                  <View style={styles.momentTimeContainer}>
                    <View style={styles.timeDot} />
                    <Text style={styles.momentTime}>{moment.timeLeft} restantes</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.momentContent}>{moment.content}</Text>

              <View style={styles.momentFooter}>
                <TouchableOpacity style={styles.reactionContainer}>
                  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z"
                      fill={moment.gradient[0]}
                      opacity="0.8"
                    />
                  </Svg>
                  <Text style={[styles.reactionCount, { color: moment.gradient[0] }]}>
                    {moment.reactions}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareText}>Compartilhar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${(24 - parseInt(moment.timeLeft)) / 24 * 100}%`,
                      backgroundColor: moment.gradient[0]
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal Criar Momento */}
      {showCreateModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.createModal}>
            <Svg height="100%" width="100%" style={styles.modalGradient}>
              <Defs>
                <SvgGradient id="modalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="0.05" />
                  <Stop offset="100%" stopColor="#C44569" stopOpacity="0.1" />
                </SvgGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#modalGrad)" rx="24" />
            </Svg>

            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleContainer}>
                  <SparkleIcon size={24} color="#FF6B9D" />
                  <Text style={styles.modalTitle}>Criar Momento</Text>
                </View>
                <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#636E72"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalDescription}>
                Compartilhe um pensamento que desaparecerá em 24 horas
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.momentInput}
                  placeholder="O que está pensando?"
                  placeholderTextColor="#B2BEC3"
                  multiline
                  numberOfLines={4}
                  value={momentText}
                  onChangeText={setMomentText}
                  maxLength={280}
                />
                <Text style={styles.charCount}>{momentText.length}/280</Text>
              </View>

              <View style={styles.privacyContainer}>
                <Text style={styles.privacyLabel}>Visibilidade</Text>
                <View style={styles.privacyButtons}>
                  <TouchableOpacity style={[styles.privacyButton, styles.privacyButtonActive]}>
                    <Text style={styles.privacyButtonTextActive}>Público</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.privacyButton}>
                    <Text style={styles.privacyButtonText}>Amigos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.privacyButton}>
                    <Text style={styles.privacyButtonText}>Privado</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.publishButton}>
                <Svg height="100%" width="100%" style={styles.publishButtonGradient}>
                  <Defs>
                    <SvgGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
                      <Stop offset="100%" stopColor="#C44569" stopOpacity="1" />
                    </SvgGradient>
                  </Defs>
                  <Rect width="100%" height="100%" fill="url(#btnGrad)" rx="16" />
                </Svg>
                <Text style={styles.publishButtonText}>Publicar Momento</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <HomeIcon active={activeTab === 'home'} size={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('explore')}>
          <ExploreIcon active={activeTab === 'explore'} size={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('messages')}>
          <MessageIcon active={activeTab === 'messages'} size={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <ProfileIcon active={activeTab === 'profile'} size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  headerContainer: {
    position: 'relative',
    height: 200,
  },
  headerSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerContent: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  createFloatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -40,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF6B9D',
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
    fontWeight: '600',
  },
  feed: {
    flex: 1,
    marginTop: 20,
  },
  feedContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  feedTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3436',
  },
  momentCard: {
    position: 'relative',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  momentGradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  momentCardContent: {
    padding: 20,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  trendingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B9D',
  },
  momentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  momentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
  },
  momentUserInfo: {
    flex: 1,
  },
  momentUserName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
  },
  momentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  timeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF6B9D',
  },
  momentTime: {
    fontSize: 13,
    color: '#636E72',
  },
  momentContent: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24,
    marginBottom: 20,
  },
  momentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactionCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  shareButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
  },
  shareText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#F1F3F5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 1000,
  },
  createModal: {
    width: '100%',
    maxWidth: 500,
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  modalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalContent: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3436',
  },
  modalDescription: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  momentInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#2D3436',
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  charCount: {
    fontSize: 12,
    color: '#B2BEC3',
    textAlign: 'right',
    marginTop: 8,
  },
  privacyContainer: {
    marginBottom: 24,
  },
  privacyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  privacyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  privacyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  privacyButtonActive: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFF5F8',
  },
  privacyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
  },
  privacyButtonTextActive: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B9D',
  },
  publishButton: {
    position: 'relative',
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishButtonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    zIndex: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    padding: 8,
  },
});