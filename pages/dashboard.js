import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Market from './Market'; // Import the ItemDetail component
import ItemPage from './ItemPage'; // Import the ProfilePage component

const Tab = createBottomTabNavigator();

export default function Dashboard({ route }) {
    // Extract the username from the navigation route parameters

    const { username } = route.params || { username: 'Guest' };

    return (
        <Tab.Navigator>
            <Tab.Screen name="Market" component={Market} />
            {/* Pass the username to the ProfilePage */}
            <Tab.Screen name="Items">
                {() => <ItemPage username={username} />}
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




