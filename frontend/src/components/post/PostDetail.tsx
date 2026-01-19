import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ==========================================
// 📋 TIPOS/INTERFACES
// ==========================================

export interface PostUser {
  id?: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
}

export interface PostContent {
  text?: string;
  image?: string;
  video?: string;
  audioUrl?: string;
  type: 'texto' | 'imagem' | 'video' | 'audio' | 'misto';
}

export interface Post {
  id: string;
  type: 'momento' | 'recado';
  user?: PostUser;
  from?: PostUser;
  to?: PostUser;
  content: PostContent;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
  expiresIn?: number;
}

export interface PostDetailProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string) => void;
  showFullContent?: boolean;
  variant?: 'card' | 'fullscreen' | 'modal';
}

// ==========================================
// 🎨 COMPONENTE PRINCIPAL
// ==========================================

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onSave,
  showFullContent = true,
  variant = 'card',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showHeart, setShowHeart] = useState(false);
  const heartAnim = useRef(new Animated.Value(0)).current;
  const [postData, setPostData] = useState(post);

  // ==========================================
  // 🎬 ANIMAÇÕES
  // ==========================================

  const handleDoubleTap = () => {
    if (!postData.isLiked && onLike) {
      handleLike();
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

    setPostData((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));

    if (onLike) {
      onLike(post.id);
    }
  };

  // ==========================================
  // 🎨 RENDERIZADORES DE CONTEÚDO
  // ==========================================

  const renderHeader = () => {
    if (post.type === 'momento') {
      return renderMomentoHeader();
    }
    return renderRecadoHeader();
  };

  const renderMomentoHeader = () => {
    const user = postData.user!;
    return (
      <View style={styles.header}>
        <View style={styles.userSection}>
          <LinearGradient
            colors={['#FF6B9D', '#C44569']}
            style={styles.avatarGradient}
          >
            <View style={styles.avatarBorder}>
              <Image source={{ uri: user.avatar }} style={styles.avatarImg} />
            </View>
          </LinearGradient>

          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.username}>{user.username}</Text>
              {user.verified && (
                <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
              )}
            </View>
            <Text style={styles.timestamp}>{postData.timestamp}</Text>
          </View>
        </View>

        {postData.expiresIn && (
          <View style={styles.timerBadge}>
            <Ionicons name="time-outline" size={14} color="#FF6B9D" />
            <Text style={styles.timerText}>{postData.expiresIn}h</Text>
          </View>
        )}
      </View>
    );
  };

  const renderRecadoHeader = () => {
    const { from, to } = postData;
    return (
      <View style={styles.recadoHeaderContainer}>
        <View style={styles.recadoConnection}>
          <View style={styles.avatarStack}>
            <Image source={{ uri: from!.avatar }} style={styles.stackAvatar1} />
            <View style={styles.arrowBadge}>
              <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
            </View>
            <Image source={{ uri: to!.avatar }} style={styles.stackAvatar2} />
          </View>

          <View style={styles.recadoUsers}>
            <View style={styles.recadoUserRow}>
              <Text style={styles.recadoFromName}>{from!.username}</Text>
              {from!.verified && (
                <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
              )}
            </View>
            <View style={styles.recadoArrowRow}>
              <Ionicons name="arrow-forward" size={14} color="#FF6B9D" />
            </View>
            <Text style={styles.recadoToName}>{to!.username}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    const { content } = postData;

    return (
      <View style={styles.contentContainer}>
        {/* Texto */}
        {content.text && (
          <View style={styles.textSection}>
            <Text
              style={[
                styles.contentText,
                variant === 'fullscreen' && styles.contentTextFullscreen,
              ]}
              numberOfLines={showFullContent ? undefined : 3}
            >
              {content.text}
            </Text>
          </View>
        )}

        {/* Imagem */}
        {content.image && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleDoubleTap}
            style={styles.imageWrapper}
          >
            <Image
              source={{ uri: content.image }}
              style={[
                styles.contentImage,
                variant === 'fullscreen' && styles.contentImageFullscreen,
              ]}
              resizeMode="cover"
            />

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.2)']}
              style={styles.imageOverlay}
            />

            {postData.expiresIn && (
              <View style={styles.imageTimer}>
                <Ionicons name="hourglass-outline" size={16} color="#FFFFFF" />
              </View>
            )}

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

        {/* Vídeo - Placeholder */}
        {content.video && (
          <View style={styles.videoContainer}>
            <View style={styles.videoPlaceholder}>
              <Ionicons name="play-circle" size={64} color="#FF6B9D" />
            </View>
            <Text style={styles.videoText}>Vídeo</Text>
          </View>
        )}

        {/* Áudio - Placeholder */}
        {content.audioUrl && (
          <View style={styles.audioContainer}>
            <View style={styles.audioPlayer}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.audioProgressBar}>
                <View style={[styles.audioProgress, { width: '30%' }]} />
              </View>
              <Text style={styles.audioTime}>0:30</Text>
            </View>
          </View>
        )}

        {/* Barra de Progresso de Tempo */}
        {postData.expiresIn && variant !== 'fullscreen' && (
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['#FF6B9D', '#C44569']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressBar,
                { width: `${((24 - postData.expiresIn) / 24) * 100}%` },
              ]}
            />
          </View>
        )}
      </View>
    );
  };

  const renderActions = () => {
    return (
      <View style={styles.actionsContainer}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={16} color="#FF6B9D" />
            <Text style={styles.statNumber}>{postData.likes.toLocaleString('pt-BR')}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="chatbubble" size={16} color="#8E8E93" />
            <Text style={styles.statNumber}>{postData.comments}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={handleLike}
            activeOpacity={0.7}
            style={styles.actionBtn}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons
                name={postData.isLiked ? 'heart' : 'heart-outline'}
                size={24}
                color={postData.isLiked ? '#FF3B30' : '#1A1A1A'}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onComment?.(post.id)}
            activeOpacity={0.7}
            style={styles.actionBtn}
          >
            <Ionicons name="chatbubble-outline" size={22} color="#1A1A1A" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onShare?.(post.id)}
            activeOpacity={0.7}
            style={styles.actionBtn}
          >
            <MaterialCommunityIcons name="share-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          {onSave && (
            <TouchableOpacity
              onPress={() => onSave(post.id)}
              activeOpacity={0.7}
              style={styles.actionBtn}
            >
              <Ionicons
                name={postData.isSaved ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={postData.isSaved ? '#FF6B9D' : '#1A1A1A'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ==========================================
  // 🎨 RENDERIZAÇÃO PRINCIPAL
  // ==========================================

  if (variant === 'fullscreen') {
    return (
      <ScrollView style={styles.fullscreenContainer}>
        <View style={styles.fullscreenContent}>
          {renderHeader()}
          {renderContent()}
          {renderActions()}
        </View>
      </ScrollView>
    );
  }

  if (variant === 'modal') {
    return (
      <View style={styles.modalContainer}>
        {renderHeader()}
        {renderContent()}
        {renderActions()}
      </View>
    );
  }

  // Default: Card variant
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {renderHeader()}
        {renderContent()}
        {renderActions()}
      </View>
    </View>
  );
};

// ==========================================
// 🎨 ESTILOS
// ==========================================

const styles = StyleSheet.create({
  // === CONTAINERS ===
  cardContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  fullscreenContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 16,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },

  // === HEADER ===
  header: {
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

  // === RECADO HEADER ===
  recadoHeaderContainer: {
    padding: 16,
    paddingBottom: 12,
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

  // === CONTENT ===
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  textSection: {
    paddingBottom: 8,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  contentTextFullscreen: {
    fontSize: 18,
    lineHeight: 28,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  contentImage: {
    width: '100%',
    height: width - 64,
    backgroundColor: '#F0F0F0',
  },
  contentImageFullscreen: {
    height: 400,
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

  // === VIDEO ===
  videoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginBottom: 12,
  },
  videoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    marginTop: 8,
    fontSize: 12,
    color: '#8E8E93',
  },

  // === AUDIO ===
  audioContainer: {
    paddingVertical: 12,
    marginBottom: 12,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 107, 157, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  audioProgress: {
    height: '100%',
    backgroundColor: '#FF6B9D',
    borderRadius: 2,
  },
  audioTime: {
    fontSize: 12,
    color: '#FF6B9D',
    fontWeight: '600',
    minWidth: 40,
  },

  // === PROGRESS BAR ===
  progressBarContainer: {
    height: 3,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 1.5,
  },

  // === ACTIONS ===
  actionsContainer: {
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
});
