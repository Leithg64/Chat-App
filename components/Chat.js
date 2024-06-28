import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from "react-native-maps";

/**
 * Chat component to render a chat interface using GiftedChat, with Firebase Firestore integration,
 * offline message caching, custom actions, and custom views for displaying locations.
 * 
 * @param {object} props - Component props.
 * @param {object} props.db - Firestore database instance.
 * @param {object} props.route - React Navigation route object containing parameters.
 * @param {object} props.navigation - React Navigation navigation object.
 * @param {boolean} props.isConnected - Network connectivity status.
 * @param {object} props.storage - Storage instance.
 * 
 * @returns {JSX.Element} - Chat component.
 */
const Chat = ({ db, route, navigation, isConnected, storage }) => {
    const [messages, setMessages] = useState([]);
    const { name, background, userID } = route.params;

    /**
     * Function to handle sending a new message.
     * 
     * @param {Array} newMessages - Array containing the new message object.
     */
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    // Set the username in the navigation bar title
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    let unsubMessages;

    // Effect hook to manage real-time message updates and message caching
    useEffect(() => {
        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (documentSnapshot) => {
                let newMessages = [];
                documentSnapshot.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    });
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else {
            loadCachedMessages();
        }
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, [isConnected]);

    /**
     * Load cached messages from AsyncStorage.
     */
    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
        setMessages(JSON.parse(cachedMessages));
    };

    /**
     * Cache messages to AsyncStorage.
     * 
     * @param {Array} messagesToCache - Array of messages to cache.
     */
    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };

    /**
     * Customize the appearance of sent and received message bubbles.
     * 
     * @param {object} props - Bubble component props.
     * 
     * @returns {JSX.Element} - Customized Bubble component.
     */
    const renderBubble = (props) => {
        return (
            <Bubble
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
        );
    };

    /**
     * Customize the input toolbar.
     * 
     * @param {object} props - InputToolbar component props.
     * 
     * @returns {JSX.Element|null} - Customized InputToolbar component or null if not connected.
     */
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    /**
     * Render custom actions for the chat (e.g., sending images, location).
     * 
     * @param {object} props - CustomActions component props.
     * 
     * @returns {JSX.Element} - CustomActions component.
     */
    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} {...props} userID={userID} />;
    };

    /**
     * Render a custom view for displaying location messages.
     * 
     * @param {object} props - CustomView component props.
     * 
     * @returns {JSX.Element|null} - MapView component for location or null if no location.
     */
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID,
                    name: name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;
