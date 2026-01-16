import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const CreatePostScreen = () => {
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    if (postText.trim()) {
      // Handle post creation
      setPostText('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Criar Post</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.postContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="O que você está pensando?"
            value={postText}
            onChangeText={setPostText}
            multiline
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity 
          style={[styles.postButton, !postText.trim() && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={!postText.trim()}
        >
          <Text style={styles.postButtonText}>Publicar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
