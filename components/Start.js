import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const [background, setBackground] = useState('');

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          background: background,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <ImageBackground source={require("../img/background-image.png")} resizeMode="cover" style={styles.bgimage}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Chat App</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
            placeholderTextColor="white" 
          />
          <Text style={styles.chooseBgColor}>Select Background Color</Text>
          <View style={styles.colorButtonContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                accessibilityLabel="Color Button"
                accessibilityHint="Allows you to select the background colour of the chat screen"
                accessibilityRole="button"
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selectedColor,
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              if (name === '') {
                Alert.alert('You must enter a username');
              } else {
                signInUser();
              }
            }}
            accessible={true}
            accessibilityLabel="Start chatting"
            accessibilityHint="takes you to the chat screen of the app"
            accessibilityRole="button"
          >
            <Text>Start chatting</Text>
          </TouchableOpacity>
        </View>
        { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
  },
  textInput: {
    width: '88%',
    borderColor: 'black',
    borderRadius: 4,
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    padding: 15,
    borderWidth: 2,
    marginBottom: 10,
  },
  chooseBgColor: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  selectedColor: {
    borderColor: 'white',
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
});

export default Start;
