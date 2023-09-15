import React, { useState,useEffect} from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const emailLabelPosition = new Animated.Value(email ? 4 : 16);
  const passwordLabelPosition = new Animated.Value(password ? 4 : 16);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Welcome")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    navigation.navigate('Register'); 
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)  // Use signInWithEmailAndPassword function
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('Welcome'); // Navigate to WelcomeScreen
      })
      .catch(error => alert("Invalid email or password")); 
    };
  

  const handleFocus = () => {
    setFocusedInput(null);
    if (!email) {
      Animated.timing(emailLabelPosition, {
        toValue: 4,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    if (!password) {
      Animated.timing(passwordLabelPosition, {
        toValue: 4,
        duration: 200,
        useNativeDriver: false,
      }).start();

    }
    
  };

  const handleBlur = () => {
    setFocusedInput(null);

    if (!email) {
      Animated.timing(emailLabelPosition, {
        toValue: 16,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    if (!password) {
      Animated.timing(passwordLabelPosition, {
        toValue: 16,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlEmailChange = (text) => {
    setemail(text);
    if (text) {
      Animated.timing(emailLabelPosition, {
        toValue: 4,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(emailLabelPosition, {
        toValue: 16,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text) {
      Animated.timing(passwordLabelPosition, {
        toValue: 4,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(passwordLabelPosition, {
        toValue: 16,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My App</Text>
      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.inputLabel,
            { top: emailLabelPosition, fontSize: emailLabelPosition === 4 ? 12 : 16 },
          ]}
          onPress={() => emailInputRef.focus()}
        >
          Email
        </Animated.Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
          value={email}
          onChangeText={handlEmailChange}
          ref={(ref) => (emailInputRef = ref)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.inputLabel,
            { top: passwordLabelPosition, fontSize: passwordLabelPosition === 4 ? 12 : 16 },
          ]}
          onPress={() => passwordInputRef.focus()}
        >
          Password
        </Animated.Text>
        <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
            value={password}
            onChangeText={handlePasswordChange}
            ref={(ref) => (passwordInputRef = ref)}
        />
        <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
        >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.accountText} >Don't have an account? 
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupText}> Sign Up</Text>
          </TouchableOpacity>
        </Text>

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
    marginBottom: 85,
    color: 'white'
  },
  inputContainer: {
    width: '100%',
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
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 16,
    color: 'white'
  },
  signupText: {
    fontSize: 16,
    color: '#FFD482',
    bottom : 0,

  
  },
  signupContainer: {
    position: 'absolute',
    bottom: 0, 
    alignItems: 'center'
  },
  accountText:{
    color: 'white',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#FFD482',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 16,
    width: 345,
    height: 48,
    flexShrink: 0,
  },
  buttonText: {
     
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600', 
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15, 
  },

});

export default LoginScreen;
