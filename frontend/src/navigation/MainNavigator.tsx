import React from 'react';
import { createNativeStackNavigator } from '@react-native-stack';
import { HomeScreen } from '../screens/main/HomeScreen';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Lovele' }} />
    </Stack.Navigator>
  );
};
