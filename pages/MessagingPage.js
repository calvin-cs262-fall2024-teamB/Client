import {View, TextInput, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity, ScrollView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import ChatPage from './ChatPage';

const Stack = createNativeStackNavigator();

export default MessagingPage = () => {
    // Contains the stack navigator for the home screen to allow for navigation to the chatDetail page
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={ChatsPage} />
            <Stack.Screen name="Chat" component={ChatPage} />
        </Stack.Navigator>
    );
}

const ChatsPage = ({ navigation }) => {    
    const renderChat = ({ item }) => (
        <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => navigation.navigate('Chat', { chat: item })} // Navigate with item data
        >
            <View style={styles.details}>
                <Text style={styles.chatName}>{item.user1}, {item.user2}</Text>
                <Text>Trade Items Filler</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {chats.length > 0 ? (
                <FlatList
                    data={chats}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderChat} // Use the corrected `renderItem` prop
                />
            ) : (
                <Text style={styles.noChatsText}>No chats as of yet.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        flexDirection: "row",
        marginBottom:20
    },
    searchInput: {
        flex:1,
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginRight:10
    },
    chatContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom:20,
        justifyContent: "space-between"
    },
    chatDetails: {
        padding: 10,
    }, 
    chatName: {
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tagOption: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: '#1ABC9C',
    },
    unselectedOption: {
        backgroundColor: '#f3f3f3',
    },
    noChatsText: {
        textAlign: 'center',
        marginTop: 20,
    },

    selectedText:
    {
        color: '#fff',
    },

    unselectedText:
    {
        color: '#000',
    }
});

const chats = [
    {
        user1: "TESTUSER1",
        user2: "TESTUSER2"
    },
    {
        user1: "testuser3",
        user2: "testuser4"
    }
]

