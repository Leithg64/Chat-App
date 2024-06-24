import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, LogBox } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//initialize import from firebase
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);


//Create the navigator
const Stack = createNativeStackNavigator();


const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  //Web's Firebase Configuration
  const App = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyCl8pHmobw4pRHC6am59XAkR8kVuPO32Xs",
      authDomain: "chat-app-dbcbc.firebaseapp.com",
      projectId: "chat-app-dbcbc",
      storageBucket: "chat-app-dbcbc.appspot.com",
      messagingSenderId: "994094769982",
      appId: "1:994094769982:web:7189a408e8d0882cbdae6f"
    };
  }

  //Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  //initialize Firebase storage
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Start'
      >
      <Stack.Screen
      name="Start"
      component={Start}
      />
      <Stack.Screen name="Chat">
       {(props) => <Chat 
       isConnected={connectionStatus.isConnected} 
       db={db} 
       storage={storage}
       {...props} 
       />} 
      </Stack.Screen>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


