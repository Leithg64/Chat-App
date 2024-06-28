import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

/**
 * CustomActions component to provide additional functionalities such as
 * picking images from the library, taking photos, and sending the device location.
 * 
 * @param {object} props - Component props.
 * @param {object} props.wrapperStyle - Style for the wrapper.
 * @param {object} props.iconTextStyle - Style for the icon text.
 * @param {function} props.onSend - Function to handle sending data.
 * @param {object} props.storage - Firebase storage instance.
 * @param {string} props.userID - User ID.
 * 
 * @returns {JSX.Element} - CustomActions component.
 */
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();

    /**
     * Handle the action button press and show action sheet with options.
     */
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

    /**
     * Upload image to cloud storage and send image URL.
     * 
     * @param {string} imageURI - URI of the image to upload.
     */
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref);
            onSend({ image: imageURL });
        });
    };

    /**
     * Generate a unique reference string for each saved photo.
     * 
     * @param {string} uri - URI of the image.
     * 
     * @returns {string} - Unique reference string.
     */
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/").pop();
        return `${userID}-${timeStamp}-${imageName}`;
    };

    /**
     * Pick an image from the device library and upload it.
     */
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    /**
     * Take a photo using the device camera and upload it.
     */
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    /**
     * Send the current device location.
     */
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else {
                Alert.alert("Error occurred while fetching location");
            }
        } else {
            Alert.alert('Permissions have not been granted');
        }
    };

    // Button to open the action menu
    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

// Styles for the action menu button
const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 3,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;
