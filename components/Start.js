import { useState } from 'react';
import { StyleSheet, ImageBackground, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const colors = ['red', 'blue', 'green', 'yellow'];
  const [background, setBackground] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../img/background-image.png")} resizeMode="cover" style={styles.bgimage}>
        <View style={styles.content}>
          {/* This is the App's title */}
          <Text style={styles.title}>Chat App</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
            placeholderTextColor="white" // Added to ensure placeholder is visible
          />
          {/* background colour selector for chat page */}
          <Text style={styles.chooseBgColor}>Select Background Color</Text>
          <View style={styles.colorButtonContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
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
          {/* button to navigate to chat page */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', { name: name, background: background })}>
            <Text>Go to Chat</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

{/* styling for Start page */}
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
    padding: 20, // Optional: adds some padding around the content
  },
  title: {
    fontSize: 60,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20, // Optional: adds space between elements
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
    marginBottom: 20, // Optional: adds space between elements
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
