import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

function HomeScreenSimple() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>🏠 Início</Text>
      <TouchableOpacity 
        style={{ backgroundColor: '#FF6B6B', padding: 12, borderRadius: 8 }}
        onPress={logout}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Home"
        component={HomeScreenSimple}
      />
    </Stack.Navigator>
  );
};
