import React from 'react';

const TradePage = ({ navigation }) => {
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f4f4",
        },
        tradeContainer: {
            width: "90%",
            maxWidth: "400px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
        },
        headerText: {
            fontWeight: "bold",
            fontSize: "1.1em",
            marginBottom: "20px",
        },
        itemBox: {
            backgroundColor: "#d3d3d3",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "5px",
            fontSize: "1em",
            fontWeight: "bold",
        },
        offerText: {
            marginTop: "20px",
            fontSize: "0.9em",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
        },
        button: {
            width: "45%",
            padding: "10px",
            fontSize: "1em",
            fontWeight: "bold",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            outline: "none",
        },
        chatButton: {
            backgroundColor: "#4caf50",
        },
        declineButton: {
            backgroundColor: "#d9534f",
        },
    };

    const handleAccept = () => {
        navigation.navigate('Chat', { chat: { user1: "USERNAME", user2: "ITEM OWNER" } });
    };

    const handleDecline = () => {
        navigation.goBack();
    };

    return (
        <div style={styles.container}>
            <div style={styles.tradeContainer}>
                <div style={styles.headerText}>USERNAME is interested in your ITEM NAME</div>
                <div style={styles.itemBox}>Bicycle</div>
                <div style={styles.offerText}>They are offering:</div>
                <div style={styles.itemBox}>Couch</div>
                <div style={styles.itemBox}>Couch pillows</div>
                <div style={styles.buttonContainer}>
                    <button style={{ ...styles.button, ...styles.chatButton }} onClick={handleAccept}>Chat</button>
                    <button style={{ ...styles.button, ...styles.declineButton }} onClick={handleDecline}>Decline</button>
                </div>
            </div>
        </div>
    );
};

export default TradePage;
