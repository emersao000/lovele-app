import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreatePress?: () => void;
  userAvatar?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  onCreatePress,
  userAvatar = 'https://i.pravatar.cc/100?img=8',
}) => {
  return (
    <SafeAreaView style={styles.safeAreaBottom} edges={['left', 'right']}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => onTabChange('home')}
        >
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={28}
            color={activeTab === 'home' ? '#1A1A1A' : '#8E8E93'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => onTabChange('search')}
        >
          <Ionicons
            name={activeTab === 'search' ? 'search' : 'search-outline'}
            size={28}
            color={activeTab === 'search' ? '#1A1A1A' : '#8E8E93'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navBtn}
          onPress={onCreatePress}
        >
          <View style={styles.createBtn}>
            <Ionicons name="add" size={28} color="#1A1A1A" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => onTabChange('messages')}
        >
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

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => onTabChange('profile')}
        >
          <View
            style={[
              styles.profileNav,
              activeTab === 'profile' && styles.profileNavActive,
            ]}
          >
            <Image
              source={{ uri: userAvatar }}
              style={styles.profileNavImg}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { Text } = require('react-native');

const styles = StyleSheet.create({
  safeAreaBottom: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
  },
  bottomNav: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 12,
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
});
