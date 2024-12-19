import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddItemsScreen({ navigation }) {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAddItem = () => {
        if (itemName && itemDescription && image) {
            const newItem = { name: itemName, description: itemDescription, image };
            setItems([...items, newItem]);
            setItemName('');
            setItemDescription('');
            setImage(null);
        } else {
            alert('Please provide item details and an image.');
        }
    };

    const handleSubmit = () => {
        navigation.navigate('Dashboard');
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Add Items for Trading</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Item Name"
                    value={itemName}
                    onChangeText={setItemName}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.inputDescription}
                    placeholder="Enter Item Description"
                    value={itemDescription}
                    onChangeText={setItemDescription}
                    placeholderTextColor="#888"
                    multiline
                />
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Text style={styles.imagePickerText}>Pick an Image</Text>
                </TouchableOpacity>

                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

                <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>+ Add Item</Text>
                </TouchableOpacity>

                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemCard}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                            </View>
                        </View>
                    )}
                    style={styles.itemsList}
                    ListEmptyComponent={<Text style={styles.emptyText}>No items added yet</Text>}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit All Items</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    inputDescription: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 100,
        textAlignVertical: 'top',
    },
    imagePicker: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePickerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#06ACB7',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemsList: {
        marginBottom: 20,
    },
    itemCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#28A745',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    skipText: {
        color: '#06ACB7',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 20,
    },
});
