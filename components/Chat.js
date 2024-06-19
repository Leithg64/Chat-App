import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, background } = route.params;

{/* updates displayed name based on selection */}
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

{/* updates background colour based on selection*/}
 return (
  <View style={[styles.container, { backgroundColor: background }]}>
     <Text>Welcome {name}!</Text>
   </View>
 );
}

{/* styling for Chat page */}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;