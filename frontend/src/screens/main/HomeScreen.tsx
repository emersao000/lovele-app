import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  Platform,
  SafeAreaView,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { PostDetail, Post } from '@/components/post';
import { CreatePostModal, PostType, PrivacyLevel } from '@/components/post/CreatePostModal';

const { width } = Dimensions.get('window');

// ==========================================
// 🎨 LOGO LOVELE SVG
// ==========================================
const LoveleLogo = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <Defs>
      <SvgGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
        <Stop offset="50%" stopColor="#C44569" stopOpacity="1" />
        <Stop offset="100%" stopColor="#8B2E5C" stopOpacity="1" />
      </SvgGradient>
    </Defs>

    <Path
      d="M 60,40 L 80,40 L 80,140 L 140,140 L 140,160 L 60,160 Z"
      fill="url(#logoGrad)"
    />

    <Path
      d="M 100,50 C 100,50 90,40 80,40 C 70,40 65,48 65,55 C 65,70 100,95 100,95 C 100,95 135,70 135,55 C 135,48 130,40 120,40 C 110,40 100,50 100,50 Z"
      fill="url(#logoGrad)"
    />

    <Circle cx="155" cy="65" r="8" fill="#FF6B9D" opacity="0.6" />
    <Circle cx="145" cy="85" r="5" fill="#C44569" opacity="0.4" />
  </Svg>
);

// ==========================================
// 📊 MOCK DATA
// ==========================================
const FEED_DATA = [
  {
    id: '1',
    type: 'momento',
    user: {
      name: 'Carolina Mendes',
      username: 'carolmends',
      avatar: 'https://i.pravatar.cc/150?img=5',
      verified: true,
    },
    content: {
      text: 'Às vezes precisamos apenas de um café e uma conversa sincera para entender que está tudo bem não estar bem ☕✨',
      image: 'https://picsum.photos/600/800?random=1',
      type: 'misto',
    },
    expiresIn: 22,
    timestamp: '2h',
    likes: 2847,
    comments: 189,
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    type: 'recado',
    from: {
      name: 'Rafael Costa',
      username: 'rafaelc',
      avatar: 'https://i.pravatar.cc/150?img=12',
      verified: false,
    },
    to: {
      name: 'Mariana Silva',
      username: 'marisilva',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
    content: {
      text: 'Obrigado por acreditar em mim quando nem eu mesmo acreditava. Sua amizade é meu porto seguro 🌟',
      type: 'texto',
    },
    timestamp: '4h',
    likes: 1567,
    comments: 67,
    isLiked: false,
  },
  {
    id: '3',
    type: 'momento',
    user: {
      name: 'Lucas Mendes',
      username: 'lucasm',
      avatar: 'https://i.pravatar.cc/150?img=13',
      verified: true,
    },
    content: {
      text: 'Começar de novo não é fracasso. É coragem de escrever um novo capítulo da sua história 📖✨',
      image: 'https://picsum.photos/600/800?random=3',
      type: 'misto',
    },
    expiresIn: 18,
    timestamp: '6h',
    likes: 3201,
    comments: 234,
    isLiked: false,
    isSaved: false,
  },
  {
    id: '4',
    type: 'recado',
    from: {
      name: 'Ana Paula',
      username: 'anapaula',
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true,
    },
    to: {
      name: 'Pedro Henrique',
      username: 'pedroh',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    content: {
      text: 'Você fez meu dia especial só por existir. Gratidão eterna! 💖',
      type: 'texto',
    },
    timestamp: '8h',
    likes: 892,
    comments: 34,
    isLiked: false,
  },
];

// ==========================================
// 🎴 CARD DE MOMENTO - LAYOUT DIFERENCIADO
// ==========================================
const MomentoCard = ({ item, onLike, onSave }: any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showHeart, setShowHeart] = useState(false);
  const heartAnim = useRef(new Animated.Value(0)).current;

  const handleDoubleTap = () => {
    if (!item.isLiked) {
      onLike(item.id);
      setShowHeart(true);

      Animated.sequence([
        Animated.spring(heartAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnim, {
          toValue: 0,
          delay: 800,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowHeart(false));
    }
  };

  const handleLike = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    onLike(item.id);
  };

  return (
    <View style={styles.momentoCard}>
      <View style={styles.momentoContainer}>
        {/* Header Compacto */}
        <View style={styles.momentoHeader}>
          <View style={styles.userSection}>
            <LinearGradient
              colors={['#FF6B9D', '#C44569']}
              style={styles.avatarGradient}
            >
              <View style={styles.avatarBorder}>
                <Image source={{ uri: item.user.avatar }} style={styles.avatarImg} />
              </View>
            </LinearGradient>

            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.username}>{item.user.username}</Text>
                {item.user.verified && (
                  <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
                )}
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>

          {item.expiresIn && (
            <View style={styles.timerBadge}>
              <Ionicons name="time-outline" size={14} color="#FF6B9D" />
              <Text style={styles.timerText}>{item.expiresIn}h</Text>
            </View>
          )}
        </View>

        {/* Texto do Momento */}
        <View style={styles.momentoTextContainer}>
          <Text style={styles.momentoText}>{item.content.text}</Text>
        </View>

        {/* Imagem com Cantos Arredondados */}
        {item.content.image && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleDoubleTap}
            style={styles.imageWrapper}
          >
            <Image
              source={{ uri: item.content.image }}
              style={styles.momentoImage}
              resizeMode="cover"
            />

            {/* Overlay Gradiente Sutil */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageOverlay}
            />

            {/* Ícone de Timer na Imagem */}
            {item.expiresIn && (
              <View style={styles.imageTimer}>
                <Ionicons name="hourglass-outline" size={16} color="#FFFFFF" />
              </View>
            )}

            {/* Double Tap Heart Animation */}
            {showHeart && (
              <Animated.View
                style={[
                  styles.heartAnimation,
                  {
                    opacity: heartAnim,
                    transform: [{ scale: heartAnim }],
                  },
                ]}
              >
                <Ionicons name="heart" size={80} color="#FFFFFF" />
              </Animated.View>
            )}
          </TouchableOpacity>
        )}

        {/* Barra de Progresso do Tempo */}
        {item.expiresIn && (
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['#FF6B9D', '#C44569']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressBar,
                { width: `${((24 - item.expiresIn) / 24) * 100}%` },
              ]}
            />
          </View>
        )}

        {/* Footer com Estatísticas */}
        <View style={styles.momentoFooter}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={16} color="#FF6B9D" />
              <Text style={styles.statNumber}>{item.likes.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble" size={16} color="#8E8E93" />
              <Text style={styles.statNumber}>{item.comments}</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={handleLike} activeOpacity={0.7} style={styles.actionBtn}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Ionicons
                  name={item.isLiked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={item.isLiked ? '#FF3B30' : '#1A1A1A'}
                />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={22} color="#1A1A1A" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.actionBtn}>
              <MaterialCommunityIcons name="share-outline" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onSave(item.id)} activeOpacity={0.7} style={styles.actionBtn}>
              <Ionicons
                name={item.isSaved ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={item.isSaved ? '#FF6B9D' : '#1A1A1A'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// ==========================================
// 💌 CARD DE RECADO
// ==========================================
const RecadoCard = ({ item, onLike }: any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    onLike(item.id);
  };

  return (
    <View style={styles.recadoCard}>
      <LinearGradient colors={['#FFF5F7', '#FFFFFF']} style={styles.recadoContainer}>
        {/* Header */}
        <View style={styles.recadoHeader}>
          <View style={styles.recadoConnection}>
            <View style={styles.avatarStack}>
              <Image source={{ uri: item.from.avatar }} style={styles.stackAvatar1} />
              <View style={styles.arrowBadge}>
                <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
              </View>
              <Image source={{ uri: item.to.avatar }} style={styles.stackAvatar2} />
            </View>

            <View style={styles.recadoUsers}>
              <View style={styles.recadoUserRow}>
                <Text style={styles.recadoFromName}>{item.from.username}</Text>
                {item.from.verified && (
                  <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
                )}
              </View>
              <View style={styles.recadoArrowRow}>
                <Ionicons name="arrow-forward" size={14} color="#FF6B9D" />
              </View>
              <Text style={styles.recadoToName}>{item.to.username}</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Feather name="more-horizontal" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Message Card */}
        <View style={styles.messageCard}>
          <View style={styles.quoteIconTop}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#FF6B9D" opacity={0.3} />
          </View>
          <Text style={styles.messageContent}>{item.content.text}</Text>
          <View style={styles.quoteIconBottom}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#FF6B9D" opacity={0.3} />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.recadoFooter}>
          <View style={styles.recadoStats}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={14} color="#FF6B9D" />
              <Text style={styles.statNumber}>{item.likes.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble" size={14} color="#8E8E93" />
              <Text style={styles.statNumber}>{item.comments}</Text>
            </View>
          </View>

          <View style={styles.recadoActions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Ionicons
                  name={item.isLiked ? 'heart' : 'heart-outline'}
                  size={22}
                  color={item.isLiked ? '#FF3B30' : '#65676B'}
                />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
              <Ionicons name="chatbubble-outline" size={20} color="#65676B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
              <MaterialCommunityIcons name="share-outline" size={22} color="#65676B" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.recadoTimestamp}>{item.timestamp}</Text>
      </LinearGradient>
    </View>
  );
};

// ==========================================
// 🏠 TELA PRINCIPAL
// ==========================================
export const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [feedFilter, setFeedFilter] = useState('todos');
  const [feedData, setFeedData] = useState(FEED_DATA);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<PrivacyLevel | null>(null);

  const handleLike = (postId: string) => {
    setFeedData((prev) =>
      prev.map((item) =>
        item.id === postId
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  const handleSave = (postId: string) => {
    setFeedData((prev) =>
      prev.map((item) =>
        item.id === postId ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleOpenPostDetail = (post: any) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleCreatePost = (postType: PostType, privacy: PrivacyLevel) => {
    setSelectedPostType(postType);
    setSelectedPrivacy(privacy);
    setShowCreateModal(false);

    // Navegar para tela de criar post
    // Por enquanto, apenas mostramos as informações selecionadas
    console.log(`Criando ${postType} com privacidade: ${privacy}`);

    // Aqui você pode:
    // - Navegar para uma tela de criação de post
    // - Abrir um modal de criação de post
    // - Chamar uma ação de contexto
  };

  const getFilteredData = () => {
    if (feedFilter === 'momentos') {
      return feedData.filter((item) => item.type === 'momento');
    }
    if (feedFilter === 'recados') {
      return feedData.filter((item) => item.type === 'recado');
    }
    return feedData;
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => handleOpenPostDetail(item)}
        style={{ flex: 1 }}
      >
        {item.type === 'momento' ? (
          <MomentoCard item={item} onLike={handleLike} onSave={handleSave} />
        ) : (
          <RecadoCard item={item} onLike={handleLike} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.mainContent}>
        {/* Safe Area para Header */}
        <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LoveleLogo size={36} />
              <Text style={styles.logoText}>Lovele</Text>
            </View>

            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>3</Text>
              </View>
              <Ionicons name="notifications-outline" size={26} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              <TouchableOpacity
                style={[styles.filterTab, feedFilter === 'todos' && styles.filterTabActive]}
                onPress={() => setFeedFilter('todos')}
              >
                <Text style={[styles.filterText, feedFilter === 'todos' && styles.filterTextActive]}>
                  Todos
                </Text>
                {feedFilter === 'todos' && <View style={styles.filterIndicator} />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterTab, feedFilter === 'momentos' && styles.filterTabActive]}
                onPress={() => setFeedFilter('momentos')}
              >
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={feedFilter === 'momentos' ? '#FF6B9D' : '#8E8E93'}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.filterText, feedFilter === 'momentos' && styles.filterTextActive]}>
                  Momentos
                </Text>
                {feedFilter === 'momentos' && <View style={styles.filterIndicator} />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterTab, feedFilter === 'recados' && styles.filterTabActive]}
                onPress={() => setFeedFilter('recados')}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={16}
                  color={feedFilter === 'recados' ? '#FF6B9D' : '#8E8E93'}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.filterText, feedFilter === 'recados' && styles.filterTextActive]}>
                  Recados
                </Text>
                {feedFilter === 'recados' && <View style={styles.filterIndicator} />}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>

        {/* Feed */}
        <FlatList
          data={getFilteredData()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={styles.feedList}
          style={styles.flatList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name={feedFilter === 'momentos' ? 'time-outline' : 'chatbubble-ellipses-outline'}
                size={64}
                color="#DBDBDB"
              />
              <Text style={styles.emptyText}>
                {feedFilter === 'momentos' ? 'Nenhum momento por aqui ainda' : 'Nenhum recado por aqui ainda'}
              </Text>
            </View>
          }
        />
      </View>

      {/* Bottom Navigation */}
      <SafeAreaView style={styles.safeAreaBottom} edges={['bottom']}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('home')}>
            <Ionicons
              name={activeTab === 'home' ? 'home' : 'home-outline'}
              size={28}
              color={activeTab === 'home' ? '#1A1A1A' : '#8E8E93'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('search')}>
            <Ionicons
              name={activeTab === 'search' ? 'search' : 'search-outline'}
              size={28}
              color={activeTab === 'search' ? '#1A1A1A' : '#8E8E93'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn} onPress={() => setShowCreateModal(true)}>
            <View style={styles.createBtn}>
              <Ionicons name="add" size={28} color="#1A1A1A" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('messages')}>
            <View>
              <Ionicons
                name={activeTab === 'messages' ? 'chatbubbles' : 'chatbubbles-outline'}
                size={28}
                color={activeTab === 'messages' ? '#1A1A1A' : '#8E8E93'}
              />
              <View style={styles.messageBadge}>
                <Text style={styles.messageBadgeText}>5</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('profile')}>
            <View style={[styles.profileNav, activeTab === 'profile' && styles.profileNavActive]}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
                style={styles.profileNavImg}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal para Post Detalhado */}
      <Modal
        visible={showPostDetail}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPostDetail(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowPostDetail(false)}
              style={styles.closeBtn}
            >
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
          {selectedPost && (
            <PostDetail
              post={selectedPost}
              onLike={handleLike}
              onComment={(id) => console.log('Comentar em:', id)}
              onShare={(id) => console.log('Compartilhar:', id)}
              onSave={handleSave}
              variant="fullscreen"
              showFullContent={true}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Modal para Criar Post */}
      <CreatePostModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSelectType={handleCreatePost}
      />
    </View>
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
  mainContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeAreaTop: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  flatList: {
    flex: 1,
  },

  // === HEADER ===
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  iconBtn: {
    position: 'relative',
    padding: 8,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notifBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  // === FILTER TABS ===
  filterContainer: {
    paddingVertical: 8,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 24,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    position: 'relative',
  },
  filterTabActive: {},
  filterText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
  },
  filterTextActive: {
    fontWeight: '700',
    color: '#FF6B9D',
  },
  filterIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FF6B9D',
    borderRadius: 1,
  },

  // === FEED ===
  feedList: {
    paddingVertical: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },

  // === MOMENTO CARD ===
  momentoCard: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  momentoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  momentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 2,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  userInfo: {
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  username: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B9D',
  },
  momentoTextContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  momentoText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  imageWrapper: {
    position: 'relative',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  momentoImage: {
    width: '100%',
    height: width - 64,
    backgroundColor: '#F0F0F0',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  imageTimer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  heartAnimation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -40,
    marginTop: -40,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 1.5,
  },
  momentoFooter: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionBtn: {
    padding: 8,
  },

  // === RECADO CARD ===
  recadoCard: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  recadoContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  recadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recadoConnection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: 64,
    height: 40,
  },
  stackAvatar1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
  arrowBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 22,
    zIndex: 3,
  },
  stackAvatar2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: 24,
    zIndex: 1,
  },
  recadoUsers: {
    marginLeft: 12,
  },
  recadoUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recadoFromName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  recadoArrowRow: {
    marginVertical: 4,
  },
  recadoToName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B9D',
  },
  messageCard: {
    backgroundColor: 'rgba(255, 107, 157, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
  },
  quoteIconTop: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  quoteIconBottom: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    transform: [{ rotate: '180deg' }],
  },
  messageContent: {
    fontSize: 15,
    lineHeight: 24,
    color: '#1A1A1A',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  recadoFooter: {
    flexDirection: 'column',
    gap: 12,
  },
  recadoStats: {
    flexDirection: 'row',
    gap: 16,
  },
  recadoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  recadoTimestamp: {
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },

  // === BOTTOM NAV ===
  safeAreaBottom: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
  },
  bottomNav: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    paddingHorizontal: 0,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
  },
  createBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  messageBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  profileNav: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  profileNavActive: {
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  profileNavImg: {
    width: '100%',
    height: '100%',
  },

  // === MODAL ===
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
