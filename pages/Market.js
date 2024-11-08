import { View, TextInput, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import ItemDetail from './ItemDetail';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';


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

const MarketPage = ({ navigation, route }) => {
    const [searchText, setSearchText] = useState('');
    const [desiredLookingFor, setDesiredLookingFor] = useState(["furniture", "appliances", "electronics"]);
    const [desiredTags, setDesiredTags] = useState(["decor", "kitchenware"]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const userLocation = route.params?.userLocation;

    const filterItems = (itemsList, lookingFor, tags, nameText) => {
        return itemsList.filter(item => {
            const itemLocation = { latitude: item.latitude, longitude: item.longitude };
            const distance = userLocation ? haversine(userLocation, itemLocation) : null;

            return (
                (!userLocation || distance <= 5000) &&  // Filter items within 5km radius
                item.lookingFor.some(lf => lookingFor.includes(lf)) &&
                item.tags.some(tag => tags.includes(tag)) &&
                (nameText ? item.name.includes(nameText) : true)
            );
        });
    };


    const toggleSelection = (item, setState, getState) => {
        //if item in the state array, remove, else, add into array
        if (getState.includes(item)) {
            setState(getState.filter(i => i !== item));
        } else {
            setState([...getState, item]);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.details}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>{item.desc}</Text>
                <Text>Tags: {item.tags.join(', ')}</Text>
                <Text>Looking For: {item.lookingFor.join(', ')}</Text>
                <Text>Location: {item.location}</Text>
            </View>
            <Button title="  " style={styles.itemButton} onPress={() => navigation.navigate('ItemDetail', { item })} />
        </View>

    );

    const renderFilterDialog = () => (
        //defines the popup that allows users to select tags
        <Modal
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={() => setFilterModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.filterTitle}>I'm Looking For</Text>
                        {/*Creates a list of selectable text representing tags*/}
                        {allowedTags.map(tag => (
                            <TouchableOpacity
                                key={tag}
                                style={[
                                    styles.tagOption,
                                    desiredTags.includes(tag) ? styles.selectedOption : styles.unselectedOption
                                ]}
                                onPress={() => toggleSelection(tag, setDesiredTags, desiredTags)}
                            >
                                <Text>{tag}</Text>
                            </TouchableOpacity>
                        ))}

                        <Text style={styles.filterTitle}>I'm Trading Away</Text>
                        {allowedTags.map(category => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.tagOption,
                                    desiredLookingFor.includes(category) ? styles.selectedOption : styles.unselectedOption
                                ]}
                                onPress={() => toggleSelection(category, setDesiredLookingFor, desiredLookingFor)}
                            >
                                <Text>{category}</Text>
                            </TouchableOpacity>
                        ))}
                        <Button title="Done" onPress={() => setFilterModalVisible(false)} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )

    const filteredItems = filterItems(items, desiredLookingFor, desiredTags, searchText);
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for items..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Button title="Filter" style={styles.filterButton} onPress={() => setFilterModalVisible(true)} />
            </View>

            {filteredItems.length > 0 ? (
                <FlatList
                    data={filteredItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.noItemsText}>No items match your filters.</Text>
            )}

            {renderFilterDialog()}
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
        marginBottom: 20
    },
    searchInput: {
        flex: 1,
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginRight: 10
    },
    itemContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: "space-between"
    },
    itemDetails: {
        padding: 10,
    },
    itemName: {
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
        backgroundColor: '#d3f3d3',
    },
    unselectedOption: {
        backgroundColor: '#f3f3f3',
    },
    noItemsText: {
        textAlign: 'center',
        marginTop: 20,
    },
});

const allowedTags = ["books", "decor", "kitchenware", "furniture", "appliances", "electronics", "toys"];

const items = [
    {
        img: "asdklfj",
        name: "Item1",
        desc: "This is the description of item 1",
        location: "49546",
        lookingFor: ["furniture", "appliances", "decor"],
        owner: "User1",
        postedDate: "10-21-2024",
        tags: ["furniture", "electronics"]
    },
    {
        img: "exampleImage.jpg",
        name: "Item2",
        desc: "This is the description of item 2",
        location: "90210",
        lookingFor: ["furniture", "electronics", "kitchenware"],
        owner: "User2",
        postedDate: "10-15-2024",
        tags: ["appliances", "furniture"]
    },
    {
        img: "anotherImage.png",
        name: "Item3",
        desc: "This is the description of item 3",
        location: "30301",
        lookingFor: ["books", "furniture", "decor"],
        owner: "User3",
        postedDate: "09-30-2024",
        tags: ["books", "decor"]
    },
    {
        img: "item4.jpg",
        name: "Item4",
        desc: "This is the description of item 4",
        location: "60614",
        lookingFor: ["furniture", "decor"],
        owner: "User4",
        postedDate: "10-10-2024",
        tags: ["furniture", "toys"]
    },
    {
        img: "item5.jpg",
        name: "Item5",
        desc: "This is the description of item 5",
        location: "77005",
        lookingFor: ["furniture", "appliances"],
        owner: "User5",
        postedDate: "09-25-2024",
        tags: ["appliances", "kitchenware"]
    },
    {
        img: "item6.png",
        name: "Item6",
        desc: "This is the description of item 6",
        location: "33101",
        lookingFor: ["appliances", "electronics", "furniture"],
        owner: "User6",
        postedDate: "10-05-2024",
        tags: ["appliances", "furniture"]
    },
    {
        img: "item7.png",
        name: "Item7",
        desc: "This is the description of item 7",
        location: "80202",
        lookingFor: ["furniture", "decor"],
        owner: "User7",
        postedDate: "10-08-2024",
        tags: ["decor", "books"]
    },
    {
        img: "item8.jpg",
        name: "Item8",
        desc: "This is the description of item 8",
        location: "98101",
        lookingFor: ["kitchenware", "furniture", "decor"],
        owner: "User8",
        postedDate: "09-28-2024",
        tags: ["kitchenware", "furniture"]
    },
    {
        img: "item9.jpg",
        name: "Item9",
        desc: "This is the description of item 9",
        location: "15213",
        lookingFor: ["books", "decor"],
        owner: "User9",
        postedDate: "10-12-2024",
        tags: ["books", "decor"]
    }
];