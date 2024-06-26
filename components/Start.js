import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

/**
 * Start component to allow users to set their username, select a background color, and sign in anonymously to the chat application.
 * 
 * @param {object} props - Component props.
 * @param {object} props.navigation - React Navigation navigation object.
 * 
 * @returns {JSX.Element} - Start component.
 */
const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [background, setBackground] = useState('');

    /**
     * Sign in the user anonymously using Firebase Authentication and navigate to the Chat screen.
     */
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { name: name, background: background, userID: result.user.uid });
                Alert.alert("Signed in successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in");
            });
    };

    return (
        <View style={styles.container}>
            {/* Background image for start page */}
            <ImageBackground
                source={require("../images/bgImage.png")}
                style={styles.imageBackground}
            >
                {/* User selects username */}
                <Text style={styles.title}>Chat App</Text>
                <View style={styles.box}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your Username"
                    />
                    {/* User selects background color */}
                    <Text style={styles.chooseBgColor}>Select Background Color</Text>
                    <View style={styles.colorButtonContainer}>
                        {colors.map((color, index) => (
                            <TouchableOpacity key={index}
                                style={[styles.colorButton, { backgroundColor: color }, background === color && styles.selectedColor]}
                                onPress={() => setBackground(color)}
                            />
                        ))}
                    </View>
                    {/* Button to start the chat */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={signInUser}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

// Styles for the start component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    textInput: {
        width: '88%',
        borderColor: '#757083',
        borderRadius: 4,
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 50,
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    title: {
        flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        margin: 25,
    },
    box: {
        backgroundColor: '#f2f2f2',
        borderRadius: 4,
        width: '88%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    chooseBgColor: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 100,
    },
    colorButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5
    },
    selectedColor: {
        borderColor: '#c0c0c0',
        borderWidth: 1,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#757083',
        borderRadius: 4,
        height: '20%',
        justifyContent: 'center',
        padding: 10,
        width: '88%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    }
});

export default Start;
