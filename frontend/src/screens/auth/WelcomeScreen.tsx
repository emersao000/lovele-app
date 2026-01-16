import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>❤️ Lovele</Text>
      <Text style={styles.subtitle}>Conecte-se com quem você ama</Text>
      
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonTextPrimary}>Entrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonTextSecondary}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 60,
  },
  buttons: {
    width: '100%',
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonTextSecondary: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
