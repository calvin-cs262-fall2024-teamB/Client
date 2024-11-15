import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TradePage = ({ navigation }) => {
    const handleAccept = () => {
        navigation.navigate('Chat', { chat: { user1: "Landon", user2: "Musa" } });
    };

    const handleDecline = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.tradeContainer}>
                <Text style={styles.headerText}>Landon is interested in your item: </Text>
                <View style={styles.itemBox}>
                    <Text style={styles.itemText}>Squishmallow</Text>
                </View>
                <Text style={styles.offerText}>They are offering:</Text>
                <View style={styles.itemBox}>
                    <Text style={styles.itemText}>Margic the Gathering Cards</Text>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.itemText}>Toaster</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.chatButton]} onPress={handleAccept}>
                        <Text style={styles.buttonText}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={handleDecline}>
                        <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    tradeContainer: {
        width: "90%",
        maxWidth: 400,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        alignItems: "center",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    itemBox: {
        backgroundColor: "#d3d3d3",
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    offerText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    chatButton: {
        backgroundColor: "#4caf50",
    },
    declineButton: {
        backgroundColor: "#d9534f",
    },
});

export default TradePage;
