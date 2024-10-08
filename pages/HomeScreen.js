import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemList, setItemList] = useState([]);

    const handleAddItem = () => {
        if (itemName.trim() && itemDescription.trim()) {
            const newItem = { name: itemName, description: itemDescription };
            setItemList((prevList) => [...prevList, newItem]);
            setItemName('');
            setItemDescription('');
        } else {
            alert('Please enter both item name and description');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', { item })}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}> {item.name} </Text>
                <Text style={styles.itemDescription}> {item.description} </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Welcome! </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter item name"
                value={itemName}
                onChangeText={setItemName}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter item description"
                value={itemDescription}
                onChangeText={setItemDescription}
            />
            <Button title="Add Item" onPress={handleAddItem} />
            <FlatList
                data={itemList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
    },
    itemContainer: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 16,
        color: '#555',
    },
    list: {
        marginTop: 20,
    },
});

export default HomeScreen;
