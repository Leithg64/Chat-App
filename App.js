import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

// The app’s main Chat component that renders the chat UI
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
        name="Start"
        component={Start}
        />
        <Stack.Screen
        name="Chat"
        component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;