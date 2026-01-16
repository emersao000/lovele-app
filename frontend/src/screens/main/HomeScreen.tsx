import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Ícone Home
const HomeIcon = ({ active = false }) => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
      stroke={active ? "#FF6B9D" : "#8E8E93"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Ícone Chat (melhorado)
const ChatIcon = ({ active = false, badge = false }) => (
  <View>
    <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
        stroke={active ? "#FF6B9D" : "#8E8E93"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8" cy="12" r="1" fill={active ? "#FF6B9D" : "#8E8E93"} />
      <Circle cx="12" cy="12" r="1" fill={active ? "#FF6B9D" : "#8E8E93"} />
      <Circle cx="16" cy="12" r="1" fill={active ? "#FF6B9D" : "#8E8E93"} />
    </Svg>
    {badge && <View style={styles.notificationBadge}><Text style={styles.badgeText}>3</Text></View>}
  </View>
);

// Ícone Explorar
const ExploreIcon = ({ active = false }) => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Circle 
      cx="12" 
      cy="12" 
      r="9" 
      stroke={active ? "#FF6B9D" : "#8E8E93"} 
      strokeWidth="2"
    />
    <Path
      d="M14.5 9.5L9.5 14.5M14.5 9.5L16 8L15 15L8 16L9.5 14.5M14.5 9.5L9.5 14.5"
      stroke={active ? "#FF6B9D" : "#8E8E93"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Perfil (melhorado - avatar style)
const ProfileIcon = ({ active = false, userAvatar = null }) => {
  if (userAvatar) {
    return (
      <View style={styles.profileIconContainer}>
        <Image source={{ uri: userAvatar }} style={styles.profileIconImage} />
        {active && <View style={styles.profileActiveRing} />}
      </View>
    );
  }
  
  return (
    <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <Circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={active ? "#FF6B9D" : "#8E8E93"} 
        strokeWidth="2"
      />
      <Circle 
        cx="12" 
        cy="10" 
        r="3" 
        stroke={active ? "#FF6B9D" : "#8E8E93"} 
        strokeWidth="2"
      />
      <Path
        d="M6.5 18.5C6.5 16.5 8.68629 15 12 15C15.3137 15 17.5 16.5 17.5 18.5"
        stroke={active ? "#FF6B9D" : "#8E8E93"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// Ícone Plus
const PlusIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

// Mock Stories
const mockStories = [
  {
    id: 'add',
    user: { name: 'Adicionar', avatar: null, isAdd: true },
    hasNew: false,
    isViewed: false,
  },
  {
    id: 1,
    user: { name: 'Marina', avatar: 'https://i.pravatar.cc/150?img=5' },
    hasNew: true,
    isViewed: false,
  },
  {
    id: 2,
    user: { name: 'Lucas', avatar: 'https://i.pravatar.cc/150?img=12' },
    hasNew: true,
    isViewed: false,
  },
  {
    id: 3,
    user: { name: 'Beatriz', avatar: 'https://i.pravatar.cc/150?img=9' },
    hasNew: true,
    isViewed: false,
  },
  {
    id: 4,
    user: { name: 'Pedro', avatar: 'https://i.pravatar.cc/150?img=13' },
    hasNew: false,
    isViewed: true,
  },
  {
    id: 5,
    user: { name: 'Amanda', avatar: 'https://i.pravatar.cc/150?img=20' },
    hasNew: true,
    isViewed: false,
  },
];

// Mock Momentos
const mockMoments = [
  {
    id: 1,
    user: {
      name: 'Carolina Mendes',
      username: '@carolmends',
      avatar: 'https://i.pravatar.cc/200?img=5',
      verified: true,
    },
    content: 'Às vezes precisamos apenas de um café e uma conversa sincera para entender que está tudo bem não estar bem',
    timestamp: '2h atrás',
    expiresIn: 22,
    engagement: {
      reactions: 847,
      replies: 23,
    },
    theme: 'warm',
  },
  {
    id: 2,
    user: {
      name: 'Rafael Santos',
      username: '@rafaelsantos',
      avatar: 'https://i.pravatar.cc/200?img=12',
      verified: false,
    },
    content: 'Começar de novo não é fracasso. É coragem de escrever um novo capítulo',
    timestamp: '5h atrás',
    expiresIn: 19,
    engagement: {
      reactions: 1243,
      replies: 45,
    },
    theme: 'cool',
  },
  {
    id: 3,
    user: {
      name: 'Julia Rocha',
      username: '@juliarocha',
      avatar: 'https://i.pravatar.cc/200?img=9',
      verified: true,
    },
    content: 'Aquele momento em que você percebe que pequenas vitórias também merecem ser celebradas',
    timestamp: '8h atrás',
    expiresIn: 16,
    engagement: {
      reactions: 2103,
      replies: 67,
    },
    theme: 'vibrant',
  },
];

export const HomeScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'warm':
        return { from: '#FFE5E5', to: '#FFF0F0', accent: '#FF6B9D' };
      case 'cool':
        return { from: '#E5F3FF', to: '#F0F8FF', accent: '#4A90E2' };
      case 'vibrant':
        return { from: '#FFF4E5', to: '#FFFAF0', accent: '#FF9B50' };
      default:
        return { from: '#F5F5F5', to: '#FAFAFA', accent: '#666' };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>Lovele</Text>
        </View>
        <TouchableOpacity style={styles.composeButton} activeOpacity={0.8}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      {/* Stories Section */}
      <View style={styles.storiesSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContainer}
        >
          {mockStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              activeOpacity={0.7}
            >
              {story.user.isAdd ? (
                <View style={styles.addStoryContainer}>
                  <Svg width="68" height="68" viewBox="0 0 68 68">
                    <Defs>
                      <SvgGradient id="addStoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#C44569" stopOpacity="1" />
                      </SvgGradient>
                    </Defs>
                    <Circle cx="34" cy="34" r="32" fill="url(#addStoryGrad)" />
                  </Svg>
                  <View style={styles.addStoryIcon}>
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <Path d="M12 6V18M6 12H18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    </Svg>
                  </View>
                </View>
              ) : (
                <View style={styles.storyAvatarContainer}>
                  {story.hasNew && !story.isViewed && (
                    <Svg width="72" height="72" style={styles.storyRing}>
                      <Defs>
                        <SvgGradient id={`storyGrad${story.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
                          <Stop offset="50%" stopColor="#C44569" stopOpacity="1" />
                          <Stop offset="100%" stopColor="#FF6B9D" stopOpacity="1" />
                        </SvgGradient>
                      </Defs>
                      <Circle
                        cx="36"
                        cy="36"
                        r="34"
                        stroke={`url(#storyGrad${story.id})`}
                        strokeWidth="3"
                        fill="none"
                      />
                    </Svg>
                  )}
                  {story.isViewed && (
                    <View style={styles.viewedStoryRing} />
                  )}
                  <Image
                    source={{ uri: story.user.avatar }}
                    style={styles.storyAvatar}
                  />
                </View>
              )}
              <Text style={styles.storyName} numberOfLines={1}>
                {story.user.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Timeline de momentos */}
      <ScrollView
        style={styles.timeline}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.timelineContent}
      >
        {/* Header da timeline */}
        <View style={styles.timelineHeader}>
          <Text style={styles.timelineTitle}>Momentos</Text>
          <Text style={styles.timelineSubtitle}>
            {mockMoments.length} ativos agora
          </Text>
        </View>

        {/* Cards de momentos */}
        {mockMoments.map((moment) => {
          const theme = getThemeColors(moment.theme);

          return (
            <View key={moment.id} style={styles.momentCard}>
              {/* Background gradiente sutil */}
              <View style={[styles.cardBackground, { backgroundColor: theme.from }]} />

              {/* Conteúdo do card */}
              <View style={styles.cardContent}>
                {/* Header do momento */}
                <View style={styles.momentHeader}>
                  <Image
                    source={{ uri: moment.user.avatar }}
                    style={styles.avatar}
                  />
                  <View style={styles.userInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.userName}>{moment.user.name}</Text>
                      {moment.user.verified && (
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <Path
                            d="M9 12L11 14L15 10M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                            fill="#FF6B9D"
                            stroke="#FF6B9D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      )}
                    </View>
                    <Text style={styles.userHandle}>{moment.user.username}</Text>
                  </View>
                  <Text style={styles.timestamp}>{moment.timestamp}</Text>
                </View>

                {/* Conteúdo do momento */}
                <Text style={styles.momentText}>{moment.content}</Text>

                {/* Footer do momento */}
                <View style={styles.momentFooter}>
                  <View style={styles.engagementRow}>
                    <TouchableOpacity style={styles.engagementButton} activeOpacity={0.7}>
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z"
                          stroke={theme.accent}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                      <Text style={[styles.engagementText, { color: theme.accent }]}>
                        {moment.engagement.reactions.toLocaleString()}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.engagementButton} activeOpacity={0.7}>
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                          stroke="#8E8E93"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                      <Text style={styles.engagementText}>
                        {moment.engagement.replies}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.expiryContainer}>
                    <View style={[styles.expiryDot, { backgroundColor: theme.accent }]} />
                    <Text style={styles.expiryText}>{moment.expiresIn}h restantes</Text>
                  </View>
                </View>

                {/* Barra de progresso minimalista */}
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${((24 - moment.expiresIn) / 24) * 100}%`,
                        backgroundColor: theme.accent + '40'
                      }
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* Espaço para o bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navContent}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveTab('home')}
            activeOpacity={0.7}
          >
            <HomeIcon active={activeTab === 'home'} />
            {activeTab === 'home' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveTab('explore')}
            activeOpacity={0.7}
          >
            <ExploreIcon active={activeTab === 'explore'} />
            {activeTab === 'explore' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveTab('chat')}
            activeOpacity={0.7}
          >
            <ChatIcon active={activeTab === 'chat'} badge={true} />
            {activeTab === 'chat' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveTab('profile')}
            activeOpacity={0.7}
          >
            <ProfileIcon 
              active={activeTab === 'profile'}
              userAvatar="https://i.pravatar.cc/100?img=8"
            />
            {activeTab === 'profile' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
  },
  composeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  // Stories
  storiesSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 16,
  },
  storiesContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 72,
  },
  addStoryContainer: {
    width: 68,
    height: 68,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addStoryIcon: {
    position: 'absolute',
  },
  storyAvatarContainer: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  storyRing: {
    position: 'absolute',
  },
  viewedStoryRing: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: '#E0E0E0',
  },
  storyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F0F0',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  storyName: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Timeline
  timeline: {
    flex: 1,
  },
  timelineContent: {
    paddingHorizontal: 20,
  },
  timelineHeader: {
    paddingVertical: 20,
  },
  timelineTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  momentCard: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    padding: 20,
  },
  momentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F0F0',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  userHandle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 13,
    color: '#8E8E93',
  },
  momentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1a1a1a',
    marginBottom: 20,
  },
  momentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  engagementRow: {
    flexDirection: 'row',
    gap: 24,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  engagementText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  expiryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  expiryText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  progressContainer: {
    height: 2,
    backgroundColor: '#F0F0F0',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 1,
  },

  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 34,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  navButton: {
    alignItems: 'center',
    padding: 8,
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF6B9D',
    marginTop: 6,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  profileIconContainer: {
    position: 'relative',
  },
  profileIconImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  profileActiveRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
});