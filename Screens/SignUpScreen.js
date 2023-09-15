import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';


const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasMinLength: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nameLabelPosition = new Animated.Value(name ? 4 : 16);
  const emailLabelPosition = new Animated.Value(email ? 4 : 16);
  const passwordLabelPosition = new Animated.Value(password ? 4 : 16);
  const confirmPasswordLabelPosition = new Animated.Value(confirmPassword ? 4 : 16);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Welcome")
      }
    });

    return unsubscribe;
  }, []);

  const handleInputChange = (field, text) => {
    switch (field) {
      case 'name':
        setName(text);
        break;
      case 'email':
        setEmail(text);
        break;
      case 'password':
        setPassword(text);
        break;
      case 'confirmPassword':
        setConfirmPassword(text);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    const validations = {
      hasLowerCase: /[a-z]/.test(text),
      hasUpperCase: /[A-Z]/.test(text),
      hasNumber: /\d/.test(text),
      hasMinLength: text.length >= 8,
    };

    setPasswordValidations(validations);
  };
  
  //when click sign in button
  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  //when click register button
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        const uid = user.uid;

        // Save user details to the Firebase Realtime Database
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}`);
        const userData = {
          name,
          email,
        };
        set(userRef, userData);

        Alert.alert('Registration successful!');

      })
      .catch(err => setError(err.message))
  }

  
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <View style={styles.inputContainer}>
            <Animated.Text
            style={[
                styles.inputLabel,
                { top: nameLabelPosition, fontSize: nameLabelPosition === 4 ? 12 : 16 },
            ]}
            onPress={() => emailInputRef.focus()}
            >
            Name
            </Animated.Text>
            <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => handleInputChange('name', text)}
        />
        </View>
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
                value={email}
                onChangeText={(text) => handleInputChange('email', text)}
            />
        
        </View>
        <View style={styles.inputContainer}>
            <Animated.Text
            style={[
                styles.inputLabel,
                { top: passwordLabelPosition, fontSize: passwordLabelPosition === 4 ? 12 : 16 },
            ]}
            onPress={() => emailInputRef.focus()}
            >
            Password
            </Animated.Text>
        
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>

            <View style={styles.validationContainer}>
            <Text style={styles.validationText}>
                {passwordValidations.hasLowerCase ? '✓' : 'x'} One lowercase character
            </Text>
            <Text style={styles.validationText}>
                {passwordValidations.hasUpperCase ? '✓' : 'x'} One uppercase character
            </Text>
            <Text style={styles.validationText}>
                {passwordValidations.hasNumber ? '✓' : 'x'} One number
            </Text>
            <Text style={styles.validationText}>
                {passwordValidations.hasMinLength ? '✓' : 'x'} 8 characters minimum
            </Text>
            </View>
        </View>
        <View style={styles.inputContainer}>
            <Animated.Text
            style={[
                styles.inputLabel,
                { top: confirmPasswordLabelPosition, fontSize: confirmPasswordLabelPosition === 4 ? 12 : 16 },
            ]}
            onPress={() => emailInputRef.focus()}
            >
            Confirm Password
            </Animated.Text>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry={!showConfirmPassword} // Toggle secureTextEntry based on showConfirmPassword state
              value={confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.accountText} >Have an account? 
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.signinText}> Sign In</Text>
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
    marginBottom: 16,
    color: 'white',
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
  validationContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  validationText: {
    color: 'white',
    fontSize: 12,
  },

  signinText: {
    fontSize: 16,
    color: '#FFD482',
    bottom : 0,
  },
  signInContainer: {
    position: 'absolute',
    bottom: 16, // Adjust this value as needed
    alignItems: 'center'
  },
  accountText:{
    color: 'white',
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, 
    top: 15, 
  },
});

export default SignUpScreen;
