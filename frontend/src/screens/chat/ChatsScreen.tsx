import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { BottomNavigation } from '@/components/common/BottomNavigation';

export const ChatsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mensagens</Text>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>💬</Text>
          <Text style={styles.emptyTitle}>Nenhuma mensagem ainda</Text>
          <Text style={styles.emptySubtitle}>Comece uma conversa com alguém</Text>
        </View>
      </ScrollView>

      <BottomNavigation
        activeTab="messages"
        onTabChange={(tab) => {
          switch (tab) {
            case 'home':
              navigation.navigate('Home');
              break;
            case 'search':
              navigation.navigate('Search');
              break;
            case 'messages':
              navigation.navigate('Chat');
              break;
            case 'profile':
              navigation.navigate('Profile');
              break;
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeAreaTop: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
