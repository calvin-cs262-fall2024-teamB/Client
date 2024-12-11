import { View, TextInput, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import ItemDetail from './ItemDetail';
import { Ionicons } from '@expo/vector-icons';
import InterestedPage from './InterestedPage';
import InitiateTrade from './InitiateTrade';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();

export default Market = () => {
    const [interestedItems, setInterestedItems] = useState([]);
    const [offeredItems, setOfferedItems] = useState([]);

    const toggleInterested = (item) => {
        setInterestedItems(prevItems =>
            prevItems.some(i => i.name === item.name)
                ? prevItems.filter(i => i.name !== item.name)
                : [...prevItems, item]
        );
    };

    const markOfferMade = (item) => {
        setOfferedItems(prevOfferedItems =>
            prevOfferedItems.includes(item.name)
                ? prevOfferedItems
                : [...prevOfferedItems, item.name]
        );
    };

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home">
                {(props) => (
                    <MarketPage
                        {...props}
                        offeredItems={offeredItems}
                        interestedItems={interestedItems}
                        toggleInterested={toggleInterested}
                        setOfferedItems={setOfferedItems}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="ItemDetail">
                {(props) => (
                    <ItemDetail
                        {...props}
                        route={{
                            ...props.route,
                            params: {
                                ...props.route.params,
                                toggleInterested,
                                interestedItems,
                            },
                        }}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="InterestedPage">
                {(props) => (
                    <InterestedPage
                        {...props}
                        route={{
                            ...props.route,
                            params: {
                                interestedItems,
                            },
                        }}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="InitiateTrade">
                {(props) => (
                    <InitiateTrade
                        {...props}
                        markOfferMade={markOfferMade}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const MarketPage = ({ navigation, interestedItems, offeredItems, toggleInterested }) => {
    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedItemTags, setSelectedItemTags] = useState([]);
    const [selectedLookingForTags, setSelectedLookingForTags] = useState([]);

    const API_URL = 'https://bombasticweb-dmenc3dmg9hhcxgk.canadaeast-01.azurewebsites.net/market/1';
    const ALLOWED_TAGS = ["books", "decor", "kitchenware", "furniture", "appliances", "electronics", "toys", "games"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                const data = await response.json();

                const formattedItems = data.map(item => ({
                    img: require('./item-images/toaster.png'), // Placeholder image
                    name: item.itemname,
                    desc: item.itemdescription,
                    location: `x: ${item.itemlocation.x}, y: ${item.itemlocation.y}`,
                    lookingFor: item.lookingfortags ? item.lookingfortags.map(tag => tag?.toLowerCase()) : [],
                    owner: `User ${item.itemownerid}`,
                    postedDate: new Date(item.dateposted).toLocaleDateString(),
                    tags: item.itemtags ? item.itemtags.map(tag => tag?.toLowerCase()) : [],
                }));

                setItems(formattedItems);
                setFilteredItems(formattedItems);
            } catch (error) {
                setError('Failed to load items.');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const applyFilters = () => {
        const filtered = items.filter(item =>
            (selectedItemTags.some(tag => item.tags.includes(tag)) ||
                selectedLookingForTags.some(tag => item.lookingFor.includes(tag)))
        );
        setFilteredItems(selectedItemTags.length > 0 || selectedLookingForTags.length > 0 ? filtered : items);
        setFilterModalVisible(false);
    };

    const toggleTagSelection = (tag, type) => {
        if (type === 'item') {
            setSelectedItemTags(prevTags =>
                prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
            );
        } else {
            setSelectedLookingForTags(prevTags =>
                prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
            );
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ItemDetail', { item })}
        >
            <Image source={item.img} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>{item.desc}</Text>
                <Text>Tags: {item.tags.join(', ')}</Text>
                <Text>Looking For: {item.lookingFor.join(', ')}</Text>
                <Text>Location: {item.location}</Text>
                {offeredItems.includes(item.name) && <Text style={styles.offerText}>Offer Made!</Text>}
            </View>
            <TouchableOpacity
                style={styles.savedIcon}
                onPress={() => toggleInterested(item)}
            >
                <Ionicons
                    name={interestedItems.some(i => i.name === item.name) ? "heart" : "heart-outline"}
                    size={24}
                    color={interestedItems.some(i => i.name === item.name) ? "red" : "black"}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        style={styles.savedItems}
                        onPress={() => navigation.navigate('InterestedPage', { interestedItems })}
                    >
                        <Text style={styles.interestedCountText}>Saved Items: {interestedItems.length}</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('ItemPage', { fromProfile: true })}>
                            <Icon name="plus" size={24} color="#06ACB7" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for items..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Button title="Filter" onPress={() => setFilterModalVisible(true)} />
            </View>

            {loading && <ActivityIndicator size="large" color="#1ABC9C" />}
            {error && <Text style={styles.errorText}>{error}</Text>}

            <FlatList
                data={filteredItems.filter(item =>
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />

<Modal visible={filterModalVisible} animationType="slide" transparent>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Tags to Filter</Text>

            <Text style={styles.sectionTitle}>Filter by Item Tags:</Text>
            <View style={styles.tagsGrid}>
                {ALLOWED_TAGS.map(tag => (
                    <TouchableOpacity
                        key={`item-${tag}`}
                        style={[
                            styles.tagButton,
                            selectedItemTags.includes(tag) && styles.tagButtonSelected
                        ]}
                        onPress={() => toggleTagSelection(tag, 'item')}
                    >
                        <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </View>
    
            <Text style={styles.sectionTitle}>Filter by Looking For Tags:</Text>
            <View style={styles.tagsGrid}>
                {ALLOWED_TAGS.map(tag => (
                    <TouchableOpacity
                        key={`looking-${tag}`}
                        style={[
                            styles.tagButton,
                            selectedLookingForTags.includes(tag) && styles.tagButtonSelected
                        ]}
                        onPress={() => toggleTagSelection(tag, 'looking')}
                    >
                        <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Button title="Apply Filters" onPress={applyFilters} />
        </View>
    </View>
</Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    itemContainer: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, marginBottom: 20 },
    itemDetails: { flex: 1, padding: 10 },
    itemName: { fontWeight: 'bold' },
    itemImage: { width: '35%', height: '100%', resizeMode: 'stretch' },
    noItemsText: { textAlign: 'center', marginTop: 20 },
    errorText: { textAlign: 'center', color: 'red', marginTop: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    searchInput: { flex: 1, height: 40, borderWidth: 1, borderRadius: 8, marginRight: 10, paddingLeft: 8 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tagsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    tagButton: {
        width: '48%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
    },
    tagButtonSelected: {
        backgroundColor: '#06ACB7',
        borderColor: '#06ACB7',
    },
    tagText: {
        color: '#000',
    },
    interestedCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    offerText: {
        color: '#28a745',
    },
    savedItems: {
        position: 'absolute', 
        backgroundColor: '#06ACB7',
        borderRadius: 15,
        paddingVertical: 5,
        marginTop: -8,
        paddingHorizontal: 10,
    },
    iconContainer: {
        flex: 1,
        marginTop: -8,
        justifyContent: 'flex-end',
        marginLeft:325,
        alignItems: 'center',
        marginBottom: 8,
    },
    headerButtons: {
        flexDirection: 'row',
    },
    header: {
        marginBottom: 16,
        position: 'relative',
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 10,
        paddingTop: 30,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
});