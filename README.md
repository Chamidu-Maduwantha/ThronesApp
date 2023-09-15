# React Native Thrones App

A small React Native application that integrates Firebase authentication, displays a list of Game of Thrones characters, and includes a voice-to-text feature.


## Introduction

This React Native application is designed to provide the following features:

1. **Authentication**: Users can sign up and sign in using Firebase authentication.
2. **User Persistence**: Once a user signs in, their session is persisted across the application.
3. **Game of Thrones Characters**: Displays a list of Game of Thrones characters using data from the [ThronesAPI](https://thronesapi.com/).
4. **User Profile**: Users can view their profile information and log out if desired.
5. **Voice-to-Text**: Includes a voice-to-text feature for text input using the [react-native-voice](https://github.com/react-native-voice/voice) library.

## Features

- Sign up and sign in using Firebase authentication.
- User sessions are persisted across the application.
- List of Game of Thrones characters fetched from ThronesAPI.
- User profile screen with information and logout functionality.
- Voice-to-text input for enhanced user experience.

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following prerequisites:

- Node.js and npm (or Yarn) installed on your development machine.
- Firebase account and project for authentication and database integration.

### Installation

Follow these steps to set up and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/react-native-thrones-app.git

1. Change to the project directory:
   cd react-native-thrones-app

2.  Install project dependencies:



      ```bash
      npm install
         # or
      yarn install

3. Set up Firebase:

  . Create a Firebase project on the Firebase Console.
  . Set up Firebase Authentication and Realtime Database.
  . Copy your Firebase configuration and replace it in the project where needed (e.g., firebase.js).

4. Start the application

    ```bash
   npm start
      # or
   yarn start

5. The Metro Bundler will open in your browser. You can run the app on an Android or iOS emulator, or on a physical device using the Expo Go app.

   For Android, can also run:
       
       npm run android

   For iOS, you can run:

         npm run ios


### Firebase Integration
This application integrates Firebase for authentication and database storage. Firebase provides a secure and scalable way to manage user authentication and store user data.

### Game of Thrones API
The ThronesAPI (https://thronesapi.com/) is used to fetch data about Game of Thrones characters. You can customize the design of the character list screen according to your preferences.

#### Voice-to-Text Feature
The voice-to-text feature is implemented using the react-native-voice library. Users can use voice input for text fields in the application, enhancing the user experience.
