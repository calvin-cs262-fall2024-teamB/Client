import { View, StyleSheet, Text, FlatList, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';



const items = [
    { name: "Squishmallow"},
    { name: "Juice Cups" },
];

const InitiateTrade = ({ navigation, route, markOfferMade }) => {
    const { item } = route.params || {};
    const [selectedItems, setSelectedItems] = useState([]);
    const [pressed, setPressed] = useState(false)
    const [buttonText, setButtonText] = useState("Offer");

    const handleOffer = () => {
        if (selectedItems.length === 0) {
            alert("No items selected");
            return; 
        }
        markOfferMade(item);
        setPressed(true);
        setButtonText("Offer made!");
    };

    // Function to toggle selection of an item
    const toggleSelection = (item) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(item)
                ? prevSelectedItems.filter(i => i !== item)
                : [...prevSelectedItems, item]
        );
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.itemContainer,
                selectedItems.includes(item) ? styles.selectedItem : styles.unselectedItem
            ]}
            onPress={() => toggleSelection(item)}
        >
            <Text style={selectedItems.includes(item) ? styles.selectedText : styles.unselectedText}>
                {item.name}
            </Text>
        </TouchableOpacity>
        
    );
    return(
        <View style={styles.container}>
            <View style={styles.topButtonsContainer}>
                <TouchableOpacity style={styles.topBackButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.topButtonText}>Back</Text>
                </TouchableOpacity>
                {pressed && ( <TouchableOpacity style={styles.topDoneButton} onPress={() => navigation.pop(2)}>
                    <Text style={styles.topButtonText}>Done</Text>
                </TouchableOpacity>
                )}
            </View>
            <Text style={styles.title}>
                Offer
            </Text>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                </ScrollView>
            </View>
            <TouchableOpacity 
                style={[styles.offerButton, pressed && styles.offerButtonPressed]} 
                onPress={handleOffer}
            >
            <Text style={styles.buttonText}>
                {buttonText}
            </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
      },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    topButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff'
    },
    topButtonsContainer: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between', 
        marginBottom: 16, 
    },
    topBackButton: {
        backgroundColor: '#06ACB7',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 4,
        marginBottom: 3,
        alignSelf: 'flex-start',
    },
    topDoneButton: {
        backgroundColor: '#06ACB7',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 4,
        marginBottom: 3,
        alignSelf: 'flex-start',
        marginLeft: 'auto',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    offerButton: {
        borderWidth: 2,
        borderColor: '#06ACB7',
        backgroundColor: '#ebfafa',
        transform: [{ scale: 0.97 }], 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginBottom: 10,
    },
    offerButtonPressed: {
        borderWidth: 2,
        borderColor: '#06ACB7',
        backgroundColor: '#06ACB7',
        transform: [{ scale: 1 }], 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginBottom: 10,
    },
    scrollView: {
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
    },
    selectedItem: {
        backgroundColor: '#06ACB7',
    },
    unselectedItem: {
        backgroundColor: '#f3f3f3',
    },
    selectedText: {
        color: '#fff',
    },
    unselectedText: {
        color: '#000',
    },
})

export default InitiateTrade;