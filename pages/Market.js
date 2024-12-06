import { View, TextInput, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import ItemDetail from './ItemDetail';
import { Ionicons } from '@expo/vector-icons';
import InterestedPage from './InterestedPage';
import InitiateTrade from './InitiateTrade';

const Stack = createNativeStackNavigator();

export default Market = () => {
    // Contains the stack navigator for the home screen to allow for navigation to the ItemDetail page

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
}

const MarketPage = ({ navigation, interestedItems, offeredItems, toggleInterested }) => {
    const [searchText, setSearchText] = useState('');
    const [desiredLookingFor, setDesiredLookingFor] = useState(["furniture", "appliances", "electronics"]);
    const [desiredTags, setDesiredTags] = useState(["decor", "kitchenware"]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);



    const filterItems = (itemsList, lookingFor, tags, nameText) => {
        //filters the item list to only include items with at least one desired tag in each field
        //if searchtext is truthy, also requires searchtext to be in name
        return itemsList.filter(item =>
            item.lookingFor.some(lf => lookingFor.includes(lf)) &&
            item.tags.some(tag => tags.includes(tag)) && (nameText ? item.name.includes(nameText) : true)
        );
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
                {offeredItems.includes(item.name) && <Text style={styles.offerText} >Offer Made!</Text>}
            </View>
            <TouchableOpacity
                style={styles.savedIcon}
                onPress={() => {
                    toggleInterested(item);
                }}
            >
                <Ionicons
                    name={interestedItems.some(i => i.name === item.name) ? "heart" : "heart-outline"}
                    size={24}
                    color={interestedItems.some(i => i.name === item.name) ? "red" : "black"}
                />
            </TouchableOpacity>
        </TouchableOpacity>
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
                                <Text style={desiredTags.includes(tag) ? styles.selectedText : styles.unselectedText}>{tag}</Text>
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
                                <Text style={desiredLookingFor.includes(category) ? styles.selectedText : styles.unselectedText}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                        <Button title="Close" onPress={() => setFilterModalVisible(false)} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )

    const filteredItems = filterItems(items, desiredLookingFor, desiredTags, searchText);

   

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for items..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity
                        style={styles.interestedCount}
                        onPress={() => navigation.navigate('InterestedPage', { interestedItems })}
                    >
                        <Text style={styles.interestedCountText}>Saved Items: {interestedItems.length}</Text>
                    </TouchableOpacity>
                </View>
                <Button title="Filter" onPress={() => setFilterModalVisible(true)} />
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
        marginBottom: 10
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
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    itemDetails: {
        flex: 1,
        padding: 10,
        flexShrink: 1,
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
        backgroundColor: '#1ABC9C',
    },
    unselectedOption: {
        backgroundColor: '#f3f3f3',
    },
    noItemsText: {
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
    },

    itemImage: {
        width: '35%',
        height: "100%",
        resizeMode: "stretch",
    },
    header: {
        marginBottom: 16,
        position: 'relative',
    },
    interestedCount: {
        position: 'absolute',
        top: -30,
        right: 10,
        backgroundColor: '#1ABC9C',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        zIndex: 1,
    },
    interestedCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }, header: {
        marginBottom: 16,
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
    interestedCount: {
        position: 'absolute',
        top: -5,
        right: 10,
        backgroundColor: '#1ABC9C',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    interestedCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    offerText: {
        color: '#28a745',
    }
});

const allowedTags = ["books", "decor", "kitchenware", "furniture", "appliances", "electronics", "toys", "games"];

const items = [
    {
        img: require('./item-images/squish.png'),
        name: "Squishmallow",
        desc: "Destroyer of worlds but a very squishy lil guy",
        location: "Calvin",
        lookingFor: ["decor", "toys"],
        owner: "Landon",
        postedDate: "10-21-2024",
        tags: ["decor", "toys"]
    },
    {
        img: require('./item-images/catan.png'),
        name: "Catan Starfarers Boardgame",
        desc: "2nd Edition, perfect condition",
        location: "3602 Burton St SE",
        lookingFor: ["appliances", "electronics", "kitchenware"],
        owner: "JaxSolo",
        postedDate: "10-15-2024",
        tags: ["games"],
    },
    {
        img: require('./item-images/MTG.png'),
        name: "Magic the Gathering Cards",
        desc: "~100 cards, good condition",
        location: "Calvin",
        lookingFor: ["books", "toys", "decor"],
        owner: "Musa",
        postedDate: "09-30-2024",
        tags: ["toys"]
    },
    {
        img: require('./item-images/totoro.png'),
        name: "My Neighbor Totoro Poster",
        desc: "Unused, 20x30, unframed",
        location: "6071 E Paris Ave",
        lookingFor: ["games", "decor", "appliances"],
        owner: "Jack287",
        postedDate: "10-10-2024",
        tags: ["decor"]
    },
    {
        img: require('./item-images/couch.png'),
        name: "Sleeper Couch",
        desc: "Queen pull out sofa, barely used",
        location: "Calvin",
        lookingFor: ["furniture", "appliances"],
        owner: "JRY48",
        postedDate: "09-25-2024",
        tags: ["furniture"]
    },
    {
        img: require('./item-images/toaster.png'),
        name: "Toaster",
        desc: "Used stainless steel toaster oven",
        location: "3313 Embassy Drive",
        lookingFor: ["appliances", "electronics"],
        owner: "John",
        postedDate: "10-05-2024",
        tags: ["appliances", "kitchenware"]
    },
    {
        img: require('./item-images/cups.png'),
        name: "Juice Cups",
        desc: "Comes with 1 pitcher and 4 glasses",
        location: "East Grand Rapids",
        lookingFor: ["books", "decor", "kitchenware"],
        owner: "Ems4",
        postedDate: "10-08-2024",
        tags: ["kitchenware"]
    },
    {
        img: require('./item-images/keypad.png'),
        name: "MILITARY M1 ABBRAMS TANK FIRE CONTROL SYSTEM FRONT SWITCH PANAL KEYPAD",
        desc: "used",
        location: "9801 Burton St",
        lookingFor: ["kitchenware", "appliances", "decor"],
        owner: "Just_A_Potato",
        postedDate: "09-28-2024",
        tags: ["electronics"]
    },
    {
        img: require('./item-images/bible.png'),
        name: "Bible",
        desc: "1889 Swedish bible, falling apart a little but intact",
        location: "1521 Burton Forest",
        lookingFor: ["books", "decor"],
        owner: "book_lover36",
        postedDate: "10-12-2024",
        tags: ["books"]
    }
];


// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ItemDetail from './ItemDetail';
// import InterestedPage from './InterestedPage';

// const Stack = createNativeStackNavigator();

// const Market = () => {
//     const [interestedItems, setInterestedItems] = useState([]);

//     const markInterested = (item) => {
//         if (!interestedItems.find(i => i.name === item.name)) {
//             setInterestedItems([...interestedItems, item]);
//         }
//     };

//     return (
//         <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Home">
//                 {(props) => <MarketPage {...props} markInterested={markInterested} />}
//             </Stack.Screen>
//             <Stack.Screen name="ItemDetail" component={ItemDetail} />
//             <Stack.Screen name="Interested" component={InterestedPage} initialParams={{ interestedItems }} />
//         </Stack.Navigator>
//     );
// };

// const MarketPage = ({ navigation, markInterested }) => {
//     const [searchText, setSearchText] = useState('');
//     const [desiredLookingFor, setDesiredLookingFor] = useState(["furniture", "appliances", "electronics"]);
//     const [desiredTags, setDesiredTags] = useState(["decor", "kitchenware"]);
//     const [filterModalVisible, setFilterModalVisible] = useState(false);

//     const filterItems = (itemsList, lookingFor, tags, nameText) => {
//         return itemsList.filter(item =>
//             item.lookingFor.some(lf => lookingFor.includes(lf)) &&
//             item.tags.some(tag => tags.includes(tag)) &&
//             (nameText ? item.name.toLowerCase().includes(nameText.toLowerCase()) : true)
//         );
//     };

//     const toggleSelection = (item, setState, getState) => {
//         if (getState.includes(item)) {
//             setState(getState.filter(i => i !== item));
//         } else {
//             setState([...getState, item]);
//         }
//     };

//     const renderItem = ({ item }) => (
//         <TouchableOpacity
//             style={styles.itemContainer}
//             onPress={() => navigation.navigate('ItemDetail', { item, markInterested })}
//         >
//             <Image source={item.img} style={styles.itemImage} />
//             <View style={styles.itemDetails}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text>{item.desc}</Text>
//                 <Text>Tags: {item.tags.join(', ')}</Text>
//                 <Text>Looking For: {item.lookingFor.join(', ')}</Text>
//                 <Text>Location: {item.location}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     const renderFilterDialog = () => (
//         <Modal
//             transparent={true}
//             visible={filterModalVisible}
//             onRequestClose={() => setFilterModalVisible(false)}
//         >
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <ScrollView>
//                         <Text style={styles.filterTitle}>I'm Looking For</Text>
//                         {allowedTags.map(tag => (
//                             <TouchableOpacity
//                                 key={tag}
//                                 style={[
//                                     styles.tagOption,
//                                     desiredTags.includes(tag) ? styles.selectedOption : styles.unselectedOption
//                                 ]}
//                                 onPress={() => toggleSelection(tag, setDesiredTags, desiredTags)}
//                             >
//                                 <Text style={desiredTags.includes(tag) ? styles.selectedText : styles.unselectedText}>
//                                     {tag}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                         <Text style={styles.filterTitle}>I'm Trading Away</Text>
//                         {allowedTags.map(category => (
//                             <TouchableOpacity
//                                 key={category}
//                                 style={[
//                                     styles.tagOption,
//                                     desiredLookingFor.includes(category) ? styles.selectedOption : styles.unselectedOption
//                                 ]}
//                                 onPress={() => toggleSelection(category, setDesiredLookingFor, desiredLookingFor)}
//                             >
//                                 <Text style={desiredLookingFor.includes(category) ? styles.selectedText : styles.unselectedText}>
//                                     {category}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                         <Button title="Close" onPress={() => setFilterModalVisible(false)} />
//                     </ScrollView>
//                 </View>
//             </View>
//         </Modal>
//     );

//     const filteredItems = filterItems(items, desiredLookingFor, desiredTags, searchText);

//     return (
//         <View style={styles.container}>
//             <View style={styles.input}>
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search for items..."
//                     value={searchText}
//                     onChangeText={setSearchText}
//                 />
//                 <Button title="Filter" onPress={() => setFilterModalVisible(true)} />
//             </View>
//             {filteredItems.length > 0 ? (
//                 <FlatList
//                     data={filteredItems}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={renderItem}
//                 />
//             ) : (
//                 <Text style={styles.noItemsText}>No items match your filters.</Text>
//             )}
//             {renderFilterDialog()}
//         </View>
//     );
// };

// // Styles and other constants remain the same as in the original code

// export default Market;