import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,StyleSheet,FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import VoiceToText from './VoiceToText';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://thronesapi.com/api/v2/Characters')
      .then(response => {
        setCharacters(response.data);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, []);

  const goToSettings = () => {
    // Navigate to the settings screen
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Game of Thrones Characters</Text>
        <TouchableOpacity onPress={goToSettings} style={styles.settingsIcon}>
          <FontAwesome name="cog" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <VoiceToText />
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.characterItem}>
            <Text style={styles.characterName}>{item.fullName}</Text>
            <Text style={styles.characterTitle}>{item.title}</Text>
          </View>
         
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2A2A2A',
    paddingTop:30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    color: 'white',
  },
  settingsIcon: {
    padding: 5, // Add padding for touchable area
  },
  characterItem: {
    backgroundColor: '#3D3D3D',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  characterName: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  characterTitle: {
    fontSize: 14,
    color: '#FFD482',
  },
});

export default WelcomeScreen;