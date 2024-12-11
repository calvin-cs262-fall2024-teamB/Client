import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const InterestedPage = ({ navigation, route }) => {
    const { interestedItems } = route.params;

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
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Saved Items</Text>
            {interestedItems.length > 0 ? (
                <FlatList
                    data={interestedItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.noItemsText}>No saved items yet.</Text>
            )}
            <TouchableOpacity style={styles.topBackButton} onPress={() => navigation.goBack()}>
            <Text style={styles.topButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    itemImage: {
        width: '35%',
        height: 150,
        resizeMode: 'stretch',
    },
    itemDetails: {
        flex: 1,
        padding: 10,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    noItemsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    topButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff'
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
});

export default InterestedPage;