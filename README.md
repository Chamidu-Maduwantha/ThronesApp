## <h1>React Native Thrones App</h1>
A small React Native application that integrates Firebase authentication, displays a list of Game of Thrones characters, and includes a voice-to-text feature.


[Table of Contents]
[Introduction]
[Features]
[Getting Started]
[Prerequisites]
[Installation]
[Firebase Integration]
[Game of Thrones API]
[Voice-to-Text Feature]


This React Native application is designed to provide the following features:

Authentication: Users can sign up and sign in using Firebase authentication.
User Persistence: Once a user signs in, their session is persisted across the application.
Game of Thrones Characters: Displays a list of Game of Thrones characters using data from the ThronesAPI.
User Profile: Users can view their profile information and log out if desired.
Voice-to-Text: Includes a voice-to-text feature for text input using the react-native-voice library.


Features

Sign up and sign in using Firebase authentication.
User sessions are persisted across the application.
List of Game of Thrones characters fetched from ThronesAPI.
User profile screen with information and logout functionality.
Voice-to-text input for enhanced user experience.

Getting Started

Prerequisites
Before setting up the project, ensure you have the following prerequisites:

Node.js and npm (or Yarn) installed on your development machine.
Firebase account and project for authentication and database integration.
Installation
Follow these steps to set up and run the project:

Clone the repository:

bash

git clone https://github.com/yourusername/react-native-thrones-app.git

Change to the project directory:

bash
Copy code
cd react-native-thrones-app
Install project dependencies:

bash
Copy code
npm install
# or
yarn install
Set up Firebase:

Create a Firebase project on the Firebase Console.
Set up Firebase Authentication and Realtime Database.
Copy your Firebase configuration and replace it in the project where needed (e.g., firebase.js).
Run the application:

bash
Copy code
npm start
# or
yarn start
The Metro Bundler will open in your browser. You can run the app on an Android or iOS emulator, or on a physical device using the Expo Go app.

Firebase Integration
This application integrates Firebase for authentication and database storage. Firebase provides a secure and scalable way to manage user authentication and store user data.

Game of Thrones API
The ThronesAPI (https://thronesapi.com/) is used to fetch data about Game of Thrones characters. You can customize the design of the character list screen according to your preferences.

Voice-to-Text Feature
The voice-to-text feature is implemented using the react-native-voice library. Users can use voice input for text fields in the application, enhancing the user experience.
