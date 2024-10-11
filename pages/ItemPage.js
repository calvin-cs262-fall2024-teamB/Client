import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default ItemPage = ({ username }) => {  // Extract username from props

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemList, setItemList] = useState([]);

    const handleAddItem = () => {
        if (itemName.trim() && itemDescription.trim()) {
            const newItem = {
                id: Date.now().toString(),
                name: itemName,
                description: itemDescription,
            };
            setItemList((prevList) => [...prevList, newItem]);
            setItemName('');
            setItemDescription('');
        } else {
            alert('Please enter both item name and description');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemTouchable}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Display the passed username */}
            <Text style={styles.welcomeText}>Welcome, {username}</Text>
            <Text style={styles.subtitleText}>Item Addition</Text>
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

            {/* Display 'Your Items:' only when the list has items */}
            {itemList.length > 0 && <Text style={styles.itemsTitle}>Your Items:</Text>}

            <FlatList
                data={itemList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
                ListEmptyComponent={<Text style={styles.emptyListText}>No items added yet.</Text>}
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
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    subtitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    list: {
        marginTop: 20,
    },
    itemTouchable: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemContainer: {
        paddingVertical: 15,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    itemsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    emptyListText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 50,
        fontSize: 16,
    },
});

