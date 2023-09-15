import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { auth } from '../firebase'

const SplashScreen = ({ navigation }) => {


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setTimeout(() => {
                if (user) {
                    navigation.replace("Welcome"); // User is authenticated, navigate to the main screen
                } else {
                    navigation.replace("Login"); // User is not authenticated, navigate to the login screen
                }
            }, 3000); // Simulate some loading process
        });
    
        return unsubscribe;
      }, [navigation]);
    


  return (
    <View style={styles.container}>
      <Text style={styles.Text}>My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text:{
    fontSize: 24,
    color: 'white',

  }
  
});

export default SplashScreen;
