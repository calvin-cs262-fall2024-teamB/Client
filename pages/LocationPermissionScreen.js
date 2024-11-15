import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function LocationPermissionScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                navigation.replace('ItemSelectionScreen');  // Move to next screen when permission is denied
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    }

    const handleContinue = () => {
        navigation.replace('ItemSelectionScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F8F4F9',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
