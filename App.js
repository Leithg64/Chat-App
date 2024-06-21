import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { LogBox, StyleSheet } from "react-native";

import Chat from "./components/Chat";
import Start from "./components/Start";

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Stack = createNativeStackNavigator();

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCl8pHmobw4pRHC6am59XAkR8kVuPO32Xs",
    authDomain: "chat-app-dbcbc.firebaseapp.com",
    projectId: "chat-app-dbcbc",
    storageBucket: "chat-app-dbcbc",
    messagingSenderId: "994094769982",
    appId: "1:994094769982:web:7189a408e8d0882cbdae6f"
  };

  // Initialize Firebase if it hasn't been initialized yet
  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Firebase Storage
  const storage = getStorage(app);

  // Initialize Firebase Auth with persistence if not already initialized
  let auth;
  try {
    auth = getAuth(app);
  } catch (error) {
    if (error.code === 'auth/app-deleted') {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
    }
  }

  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected) {
      enableNetwork(db);
    } else {
      disableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} storage={storage} isConnected={connectionStatus.isConnected} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
