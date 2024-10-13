import {View, TextInput, StyleSheet, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import ItemDetail from './ItemDetail';

const Stack = createNativeStackNavigator();


export default Market = () => {
    // Contains the stack navigator for the home screen to allow for navigation to the ItemDetail page
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={MarketPage} />
            <Stack.Screen name="ItemDetail" component={ItemDetail} />
        </Stack.Navigator>
    );
}

const MarketPage = () => {
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
});