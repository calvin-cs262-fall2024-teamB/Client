import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ItemDetail from './ItemDetail'; // Import the ItemDetail component
import ProfilePage from './ProfilePage'; // Import the ProfilePage component

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
    // Contains the stack navigator for the home screen to allow for navigation to the ItemDetail page
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ItemDetail" component={ItemDetail} />
        </Stack.Navigator>
    );
}



const HomeScreen = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for items..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <Text style={styles.dummyText}>Items will be added upon backend creation</Text>
        </View>
    );
};

export default function Dashboard({ route }) {
    // Extract the username from the navigation route parameters
    const { username } = route.params;

    return (
        <Tab.Navigator>
            <Tab.Screen name="Market" component={HomeScreen} />
            {/* Pass the username to the ProfilePage */}
            <Tab.Screen name="Profile">
                {() => <ProfilePage username={username} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    dummyText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888',
    },
});
