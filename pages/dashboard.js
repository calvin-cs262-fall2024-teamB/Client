import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //new bottom nav bar

import ItemDetail from './ItemDetail'; // Import the ItemDetail component
import ProfilePage from './ProfilePage'; //import the profile page component
import HomeScreen from './HomeScreen'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); //new for bottom nav bar

function Home() {
    // contains the stack navigator for the home screen to allow for navigation to the ItemDetail page
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false // Removes the headers of the screens as this is a nested navigation stack
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ItemDetail" component={ItemDetail} />
        </Stack.Navigator>
    );
}

export default function Dashboard() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfilePage} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 10,
    },
    list: {
        width: '100%',
        marginTop: 20,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
    },
});
