import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen';
import SignUpScreen from './Screens/SignUpScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import VoiceToText from './Screens/VoiceToText';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={SignUpScreen} options={{headerShown:false}} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}} />
        <Stack.Screen name="VoiceToTextScreen" component={VoiceToText} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;

