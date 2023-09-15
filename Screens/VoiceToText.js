import React, { Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

class VoiceToText extends Component {
    startSpeech = async () => {
      try {
        await Voice.start('en-US');
      } catch (e) {
        console.error(e);
      }
    };

  render() {
    return (
        <View style={styles.container}>
        {/* Display recognized text */}
        <TouchableOpacity style={styles.floatingButton} onPress={this.startListening}>
          <Text style={styles.buttonText}>🎙️</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', 
        alignItems: 'flex-end', 
        padding: 20, 
      },
      floatingButton: {
        backgroundColor: '#FFD482',
        borderRadius: 10, 
        padding: 10,
        elevation: 5, 
      },
      buttonText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
      },
  });
  

export default VoiceToText;
