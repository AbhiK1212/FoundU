// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { CameraScreen } from './src/screens/CameraScreen';
import { NameConfirmationScreen } from './src/screens/NameConfirmationScreen';
import { ActionSelectionScreen } from './src/screens/ActionSelectionScreen';
import { LocationScreen } from './src/screens/LocationScreen';
import { ThankYouScreen } from './src/screens/ThankYouScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{ title: 'Take Photo' }}
        />
        <Stack.Screen 
          name="NameConfirmation" 
          component={NameConfirmationScreen}
          options={{ title: 'Confirm Name' }}
        />
        <Stack.Screen 
          name="ActionSelection" 
          component={ActionSelectionScreen}
          options={{ title: 'Select Action' }}
        />
        <Stack.Screen 
          name="Location" 
          component={LocationScreen}
          options={{ title: 'Location Details' }}
        />
        <Stack.Screen 
          name="ThankYou" 
          component={ThankYouScreen}
          options={{ title: 'Thank You' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}