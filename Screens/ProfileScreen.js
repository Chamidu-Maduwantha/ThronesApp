// ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../firebase'; 

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
        } else {
          console.log('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>My APP</Text>
        {userData && (
        <View>
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <Text style={styles.input}>{userData.name}</Text>
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <Text style={styles.input}>{userData.email}</Text>
            </View>
        </View>
        )}
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.logButton}>
            <Text style={{ color: 'black' , fontSize : 20}}>Log Out</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#2A2A2A',
      },
      heading: {
        fontSize: 24,
        marginBottom: 16,
        color: 'white',
        paddingBottom: 80,
      },
      inputContainer: {
        width: 345,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        position: 'relative',
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '##3D3D3D',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      inputLabel: {
        position: 'absolute',
        left: 0,
        color: '#C0C0C0',
        paddingLeft: 10,
        paddingTop: 2,
        fontSize: 12, 
      },
      input: {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 16,
        marginTop: 16,
        color: 'white',
      },
      buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: 345,
        height: 48,
        alignItems: 'center',
        backgroundColor: '#FFD482', 
        borderRadius: 10, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
      },
      
});

export default ProfileScreen;
