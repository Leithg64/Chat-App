import { useState, useEffect } from 'react';
import { GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { onSnapshot, query, orderBy, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

     // useEffect hook that sets messages options
     let unsubMessages;
     useEffect(() => {
       if (isConnected === true){
         // remove onSnapshot() listener to avoid registering multiple if useEffect code is re-executed
       if (unsubMessages) unsubMessages();
       unsubMessages = null;
         navigation.setOptions({ title: username });
         // Create a query to get the "messages" collection from the Firestore database
         const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
         // This function will be called whenever there are changes in the collection.
         unsubMessages = onSnapshot(q, (docs) => {
           let newMessages = [];
           // Iterate through each document in the snapshot
           docs.forEach(doc => {
             newMessages.push({ id: doc.id, ...doc.data(),  createdAt: new Date(doc.data().createdAt.toMillis()), })
           });
           cacheMessages(newMessages);
           setMessages(newMessages);
         });
       } else loadCachedMessages();
 
         // Clean up code
         return () => {
           if (unsubMessages) unsubMessages();
         }
       }, [isConnected]); //dependency value that allows for callback of useEffect if the props in isConnected change.
 
       const cacheMessages = async (messagesToCache) => {
         try {
           await AsyncStorage.setItem(
             "messages",
             JSON.stringify(messagesToCache)
           );
         } catch (error) {
           console.log(error.message);
         }
       };
 
       // Calls if isConnected is false
       const loadCachedMessages = async () => {
         // Empty array for cachedMessages if AsyncStorage() fails if message not set in AsyncStorage.
         const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
         setMessages(JSON.parse(cachedMessages));
       };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: username,
        }}
      />
      {Platform.OS === "android" || Platform.OS === 'ios'? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );     
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Chat;
