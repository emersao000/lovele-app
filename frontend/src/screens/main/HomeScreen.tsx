import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Dados de Stories Inovadores
const innovativeStories = [
  {
    id: 1,
    name: 'Seu Story',
    subtitle: 'Toque aqui',
    gradient: ['#FF6B9D', '#FF8FAC'],
    icon: '➕',
    type: 'create',
  },
  {
    id: 2,
    name: 'Marina',
    subtitle: 'Viagem em alta',
    gradient: ['#FF6B9D', '#C44569'],
    hasNew: true,
    views: 234,
  },
  {
    id: 3,
    name: 'Lucas',
    subtitle: 'Novo projeto',
    gradient: ['#FF8A80', '#D32F2F'],
    hasNew: true,
    views: 567,
  },
  {
    id: 4,
    name: 'Beatriz',
    subtitle: 'Momentos',
    gradient: ['#AB47BC', '#7B1FA2'],
    hasNew: false,
    views: 89,
  },
  {
    id: 5,
    name: 'Pedro',
    subtitle: 'Em direto',
    gradient: ['#29B6F6', '#1976D2'],
    hasNew: true,
    views: 1234,
  },
];

// Dados de Posts Inovadores
const innovativePosts = [
  {
    id: 1,
    user: { name: 'Ana Silva', avatar: '👩' },
    title: 'Descoberta Incrível',
    preview: 'Encontrei um lugar absolutamente incrível na praia que você não vai acreditar...',
    gradient: ['#FF6B9D', '#C44569'],
    icon: '🌊',
    likes: 1234,
    comments: 89,
    timestamp: '2h',
    verified: true,
  },
  {
    id: 2,
    user: { name: 'João Pedro', avatar: '👨' },
    title: 'Novo Projeto',
    preview: 'Lançamos algo que vamos revolucionar toda a indústria de tecnologia...',
    gradient: ['#FF8A80', '#D32F2F'],
    icon: '🚀',
    likes: 856,
    comments: 42,
    timestamp: '5h',
    verified: false,
  },
  {
    id: 3,
    user: { name: 'Maria Clara', avatar: '👧' },
    title: 'Workshop Exclusivo',
    preview: 'Aprenda as melhores técnicas de design com os melhores profissionais...',
    gradient: ['#AB47BC', '#7B1FA2'],
    icon: '🎨',
    likes: 456,
    comments: 23,
    timestamp: '8h',
    verified: false,
  },
  {
    id: 4,
    user: { name: 'Carlos Lima', avatar: '🧑' },
    title: 'Viagem Épica',
    preview: 'Atravessei o país inteiro em apenas uma semana, confira o resultado...',
    gradient: ['#29B6F6', '#1976D2'],
    icon: '✈️',
    likes: 2345,
    comments: 156,
    timestamp: '12h',
    verified: true,
  },
];

// Card de Story Inovador
const StoryCard = ({ story, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.storyCard} onPress={onPress} activeOpacity={0.8}>
      <Svg style={styles.storyGradientBg} height="100%" width="100%">
        <Defs>
          <SvgGradient id={`storyGrad${story.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={story.gradient[0]} stopOpacity="1" />
            <Stop offset="100%" stopColor={story.gradient[1]} stopOpacity="0.8" />
          </SvgGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#storyGrad${story.id})`} rx="20" />
      </Svg>

      <View style={styles.storyContent}>
        {story.type === 'create' ? (
          <View style={styles.storyCreateButton}>
            <Text style={styles.storyIcon}>{story.icon}</Text>
          </View>
        ) : (
          <>
            {story.hasNew && <View style={styles.storyBadge} />}
            <Text style={styles.storyBigIcon}>📌</Text>
            <Text style={styles.storyName} numberOfLines={1}>
              {story.name}
            </Text>
            <Text style={styles.storySubtitle} numberOfLines={1}>
              {story.subtitle}
            </Text>
            {story.views && (
              <Text style={styles.storyViews}>👁️ {story.views}</Text>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Card de Post Inovador
const PostCard = ({ post, onLike }: any) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.postContainer}>
      <Svg style={styles.postGradient} height="100%" width="100%">
        <Defs>
          <SvgGradient id={`postGrad${post.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={post.gradient[0]} stopOpacity="0.15" />
            <Stop offset="100%" stopColor={post.gradient[1]} stopOpacity="0.05" />
          </SvgGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#postGrad${post.id})`} rx="24" />
      </Svg>

      <TouchableOpacity style={styles.postCard} activeOpacity={0.7}>
        <View style={styles.postHeader}>
          <View style={styles.postIconCircle}>
            <Text style={styles.postMainIcon}>{post.icon}</Text>
          </View>

          <View style={styles.postHeaderRight}>
            <View style={styles.postUserRow}>
              <Text style={styles.postAvatar}>{post.user.avatar}</Text>
              <View>
                <View style={styles.postNameRow}>
                  <Text style={styles.postUserName}>{post.user.name}</Text>
                  {post.verified && <Text style={styles.verifiedBadge}>✓</Text>}
                </View>
                <Text style={styles.postTime}>{post.timestamp}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <MaterialCommunityIcons name="dots-vertical" size={20} color="#636E72" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.postBody}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postPreview} numberOfLines={2}>
            {post.preview}
          </Text>
        </View>

        <View style={styles.postFooter}>
          <View style={styles.postStats}>
            <TouchableOpacity style={styles.statItem} onPress={handleLike}>
              <Text style={styles.statIcon}>{liked ? '❤️' : '🤍'}</Text>
              <Text style={styles.statText}>{liked ? post.likes + 1 : post.likes}</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="chat-outline" size={18} color="#636E72" />
              <Text style={styles.statText}>{post.comments}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="share-outline" size={18} color="#636E72" />
              <Text style={styles.statText}>Compartilhar</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const HomeScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header Premium */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]}! 👋</Text>
          <Text style={styles.logo}>Lovele</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#FF6B9D" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Scroll */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Seção de Stories Inovadora */}
        <View style={styles.storiesSection}>
          <Text style={styles.sectionTitle}>Seus Stories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesScroll}
            scrollEventThrottle={16}
          >
            {innovativeStories.map((story) => (
              <StoryCard key={story.id} story={story} onPress={() => {}} />
            ))}
          </ScrollView>
        </View>

        {/* Seção de Posts Inovadora */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Suas Descobertas</Text>
          <View style={styles.postsContainer}>
            {innovativePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom Navigation - Premium com Icons Nativos */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'home' && styles.navButtonActive]}
          onPress={() => setActiveTab('home')}
        >
          <MaterialCommunityIcons
            name="home"
            size={26}
            color={activeTab === 'home' ? '#FF6B9D' : '#B2BEC3'}
          />
          <View style={activeTab === 'home' ? styles.navIndicator : null} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'search' && styles.navButtonActive]}
          onPress={() => setActiveTab('search')}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={26}
            color={activeTab === 'search' ? '#FF6B9D' : '#B2BEC3'}
          />
          <View style={activeTab === 'search' ? styles.navIndicator : null} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButtonCenter}>
          <View style={styles.addButtonGradient}>
            <MaterialCommunityIcons name="plus" size={32} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'messages' && styles.navButtonActive]}
          onPress={() => setActiveTab('messages')}
        >
          <MaterialCommunityIcons
            name="heart-outline"
            size={26}
            color={activeTab === 'messages' ? '#FF6B9D' : '#B2BEC3'}
          />
          <View style={activeTab === 'messages' ? styles.navIndicator : null} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'profile' && styles.navButtonActive]}
          onPress={() => setActiveTab('profile')}
        >
          <MaterialCommunityIcons
            name="account"
            size={26}
            color={activeTab === 'profile' ? '#FF6B9D' : '#B2BEC3'}
          />
          <View style={activeTab === 'profile' ? styles.navIndicator : null} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  greeting: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 4,
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FF6B9D',
    letterSpacing: -0.5,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  storiesSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 16,
    marginHorizontal: 24,
    letterSpacing: -0.3,
  },
  storiesScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  storyCard: {
    width: 140,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  storyGradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  storyContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  storyBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    backgroundColor: '#FF6B9D',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  storyCreateButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyIcon: {
    fontSize: 48,
  },
  storyBigIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  storyName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  storySubtitle: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  storyViews: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  postsSection: {
    marginHorizontal: 24,
  },
  postsContainer: {
    gap: 16,
  },
  postContainer: {
    position: 'relative',
    marginBottom: 8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  postGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postMainIcon: {
    fontSize: 28,
  },
  postHeaderRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  postUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postAvatar: {
    fontSize: 24,
  },
  postNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postUserName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D3436',
  },
  verifiedBadge: {
    fontSize: 12,
    color: '#FF6B9D',
  },
  postTime: {
    fontSize: 11,
    color: '#B2BEC3',
    marginTop: 2,
  },
  menuButton: {
    padding: 4,
  },
  postBody: {
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 6,
  },
  postPreview: {
    fontSize: 13,
    color: '#636E72',
    lineHeight: 19,
  },
  postFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
    paddingTop: 12,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 18,
  },
  statText: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '500',
  },
  spacer: {
    height: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  navButtonActive: {
    marginTop: 4,
  },
  navIndicator: {
    width: 4,
    height: 4,
    backgroundColor: '#FF6B9D',
    borderRadius: 2,
    marginTop: 6,
  },
  navButtonCenter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
});
