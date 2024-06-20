import { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, background } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    {/* function is called after Chat component mounts */}
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ]);
    }, []);

{/* updates displayed name based on selection */}
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    const renderBubble = (props) => {
      return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
    }

{/* updates background colour based on selection*/}
return (
  <View style={[styles.container, { backgroundColor: background }]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
  </View>
)
}

{/* styling for Chat page */}
const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;