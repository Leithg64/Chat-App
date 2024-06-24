import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Alert} from "react-native";
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation}) => {
    const auth= getAuth();
    const [name, setName] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [background, setBackground] = useState('');

    const signInUser = () => {
        signInAnonymously(auth)
        .then(result => {
            navigation.navigate("Chat", { name: name, background: background, userID: result.user.uid});
            Alert.alert("Signed in successfully!");
        })
        .catch((error) => {
            Alert.alert("Unable to sign in");
        })
    }

    return(
        <View style={styles.container}>
            {/*background image for start page*/}
            <ImageBackground
            source={require("../images/bgImage.png")}
                style={styles.imageBackground}
                >
            {/*user selects username*/}
            <Text style={styles.title}>Connect to Chat!</Text>
            <View style={styles.box}>
            <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your Username here"
            />
            {/* the user selects background color*/}
            <Text style={styles.chooseBgColor}>Choose Background Color</Text>
            <View style={styles.colorButtonContainer}>
                {colors.map((color, index) => (
                    <TouchableOpacity key={index}
                    style={[styles.colorButton, {backgroundColor: color}, background === color && styles.selectedColor,]}
                    onPress={() => setBackground(color)}
                    />
                ))}
            </View>
            {/*to start the chat*/}
            <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
            >
            <Text style={styles.buttonText}>Start the chat</Text>
           </TouchableOpacity>
           </View>
            </ImageBackground>
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imageBackground:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height: '100%',
        width: '100%'
    },
    textInput:{
        width: '88%',
        borderColor: '#757083',
        borderRadius: 4,
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity:50,
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    title:{
        Flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        margin: 25,
    },
    box:{
        backgroundColor: '#f2f2f2',
        borderRadius: 4,
        width:'88%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    chooseBgColor:{
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 100,
        },
    colorButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
        },
    colorButton:{
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5
    },
    selectedColor:{
        borderColor: '#c0c0c0',
        borderWidth:1,
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#757083',
        borderRadius: 4,
        height: '20%',
        justifyContent: 'center',
        padding: 10,
        width: '88%',
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    }
});

export default Start;