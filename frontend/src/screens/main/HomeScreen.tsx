import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import Svg, { Path, Circle, G, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

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

// Ícone Explorar
const ExploreIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="11"
      cy="11"
      r="8"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L16.65 16.65"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Adicionar (Criar Post)
const AddIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Defs>
      <SvgGradient id="addGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
        <Stop offset="100%" stopColor="#C44569" stopOpacity="1" />
      </SvgGradient>
    </Defs>
    <Circle cx="12" cy="12" r="10" fill="url(#addGrad)" />
    <Path
      d="M12 8V16M8 12H16"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Notificações
const NotificationIcon = ({ active = false, size = 24, hasNew = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {hasNew && <Circle cx="18" cy="6" r="4" fill="#FF3B30" />}
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
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Coração (Curtir)
const HeartIcon = ({ filled = false, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z"
      stroke={filled ? "#FF6B9D" : "#2D3436"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Comentário
const CommentIcon = ({ size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke="#2D3436"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Compartilhar
const ShareIcon = ({ size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
      stroke="#2D3436"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6L12 2L8 6"
      stroke="#2D3436"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2V15"
      stroke="#2D3436"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Mock de dados
const mockStories = [
  { id: 1, name: 'Seu Story', image: null, isUser: true, hasNew: false },
  { id: 2, name: 'Ana Silva', image: '👩', hasNew: true },
  { id: 3, name: 'João Pedro', image: '👨', hasNew: true },
  { id: 4, name: 'Maria Clara', image: '👧', hasNew: true },
  { id: 5, name: 'Carlos Lima', image: '🧑', hasNew: false },
];

const mockPosts = [
  {
    id: 1,
    user: { name: 'Ana Silva', avatar: '👩', verified: true },
    image: 'https://picsum.photos/400/400?random=1',
    likes: 1234,
    caption: 'Que dia incrível! 🌟',
    comments: 89,
    time: '2h',
  },
  {
    id: 2,
    user: { name: 'João Pedro', avatar: '👨', verified: false },
    image: 'https://picsum.photos/400/500?random=2',
    likes: 856,
    caption: 'Novos horizontes... 🌅',
    comments: 42,
    time: '5h',
  },
];

export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Lovele</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconButton}>
            <NotificationIcon hasNew={true} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesList}>
          {mockStories.map((story) => (
            <TouchableOpacity key={story.id} style={styles.storyItem}>
              <View style={[
                styles.storyImageContainer,
                story.hasNew && styles.storyImageContainerNew,
                story.isUser && styles.storyImageContainerUser
              ]}>
                {story.isUser ? (
                  <View style={styles.addStoryButton}>
                    <Text style={styles.addStoryIcon}>+</Text>
                  </View>
                ) : (
                  <Text style={styles.storyAvatar}>{story.image}</Text>
                )}
              </View>
              <Text style={styles.storyName} numberOfLines={1}>
                {story.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {mockPosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.postUserInfo}>
                <View style={styles.postAvatar}>
                  <Text style={styles.postAvatarText}>{post.user.avatar}</Text>
                </View>
                <View>
                  <View style={styles.postUserNameContainer}>
                    <Text style={styles.postUserName}>{post.user.name}</Text>
                    {post.user.verified && <Text style={styles.verifiedBadge}>✓</Text>}
                  </View>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.postMenuIcon}>⋯</Text>
              </TouchableOpacity>
            </View>

            {/* Post Image */}
            <Image source={{ uri: post.image }} style={styles.postImage} />

            {/* Post Actions */}
            <View style={styles.postActions}>
              <View style={styles.postActionsLeft}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleLike(post.id)}
                >
                  <HeartIcon filled={likedPosts.includes(post.id)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <CommentIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <ShareIcon />
                </TouchableOpacity>
              </View>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
              <Text style={styles.postLikes}>
                {likedPosts.includes(post.id) ? post.likes + 1 : post.likes} curtidas
              </Text>
              <Text style={styles.postCaption}>
                <Text style={styles.postCaptionUser}>{post.user.name}</Text> {post.caption}
              </Text>
              <TouchableOpacity>
                <Text style={styles.postComments}>Ver todos os {post.comments} comentários</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <HomeIcon active={activeTab === 'home'} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('explore')}
        >
          <ExploreIcon active={activeTab === 'explore'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemAdd}>
          <AddIcon />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('notifications')}
        >
          <NotificationIcon active={activeTab === 'notifications'} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <ProfileIcon active={activeTab === 'profile'} />
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3436',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIconButton: {
    padding: 4,
  },
  storiesContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
    paddingVertical: 12,
  },
  storiesList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  storyItem: {
    alignItems: 'center',
    width: 70,
  },
  storyImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    marginBottom: 6,
  },
  storyImageContainerNew: {
    borderColor: '#FF6B9D',
    borderWidth: 3,
  },
  storyImageContainerUser: {
    borderColor: '#636E72',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  storyAvatar: {
    fontSize: 32,
  },
  addStoryButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addStoryIcon: {
    fontSize: 28,
    color: '#636E72',
    fontWeight: '300',
  },
  storyName: {
    fontSize: 12,
    color: '#2D3436',
    textAlign: 'center',
  },
  feed: {
    flex: 1,
  },
  postCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAvatarText: {
    fontSize: 20,
  },
  postUserNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3436',
  },
  verifiedBadge: {
    fontSize: 12,
    color: '#FF6B9D',
  },
  postTime: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 2,
  },
  postMenuIcon: {
    fontSize: 24,
    color: '#2D3436',
    fontWeight: 'bold',
  },
  postImage: {
    width: width,
    height: width,
    backgroundColor: '#F8FAFC',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  postInfo: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  postLikes: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 6,
  },
  postCaption: {
    fontSize: 14,
    color: '#2D3436',
    lineHeight: 20,
    marginBottom: 6,
  },
  postCaptionUser: {
    fontWeight: '700',
  },
  postComments: {
    fontSize: 14,
    color: '#636E72',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  navItem: {
    padding: 8,
  },
  navItemAdd: {
    padding: 4,
  },
});
