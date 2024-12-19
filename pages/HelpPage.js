import { StyleSheet, Text, ScrollView } from 'react-native';
import { React } from 'react';

export default HelpPage = ({ route }) => {
    const {} = route.params || {};
    return(
        <ScrollView style={styles.container}> 
            <Text style={styles.head}>Help Documentation{"\n"}</Text>
            <Text style={styles.subhead}>Finding Items</Text>
            <Text style={styles.reg}>• Click the filter button below the search bar {"\n"}
                  • Select the tags you are interested in (such as books) {"\n"}
                  • Select the tags of the items you are trading away {"\n"}
                  • Click ‘Apply Filters’ {"\n"}
                  • Browse the filtered market {"\n"}
            </Text>
            <Text style={styles.subhead}>
            Search
            </Text>
            <Text style={styles.reg}>
            • Click the search bar {"\n"}
            • Type in the name of the item you are looking for{"\n"}
            • Press the ‘return’ button on the keyboard to minimize the keyboard{"\n"}
            • Look through the results of the search for the desired item{"\n"}
            </Text>
            <Text style={styles.subhead}>
            Offering for an Item
            </Text>
            <Text style={styles.reg}>
            • Navigate to the Market page using the bottom navigation bar{"\n"}
            • Click on the item you are interested in{"\n"}
            • Press the ‘Make Trade Offer’ button{"\n"}
            • Select at least one of your listed items to offer{"\n"}
            • Click the ‘Offer’ button{"\n"}
            • Press ‘Done’ in the upper right-hand corner{"\n"} 
            </Text>
            <Text style={styles.subhead}>
            Accepting a Trade
            </Text>
            <Text style={styles.reg}>
            • Navigate to the Chats page using the bottom navigation bar{"\n"}
            • Find the new trade requests at the top of the page with a red dot next to them{"\n"}
            • Click on the new trade request{"\n"}
            • If you are interested in the trade request, press ‘Chat.’ If you are not interested in the trade request click ‘Decline’{"\n"}
            • If ‘Chat’ is clicked, you will be taken to a trade chat{"\n"}
            • Use the message feature to communicate with the user who requested the trade{"\n"}
            • Click the ‘Accept Offer’ button in the top right-hand corner if you would like to trade the items{"\n"}
            </Text>
            <Text style={styles.subhead}>
            Adding Items
            </Text>
            <Text style={styles.reg}>
            • Navigate to the Market page using the bottom navigation bar{"\n"}
            • Click on the plus symbol in the upper right-hand corner of the screen{"\n"}
            • Enter the item name and description in the indicated boxes{"\n"}
            • Click the ‘Pick and Image’ button to add a photo to your item{"\n"}
            • Click the ‘Add Item’ button to add your newly created item {"\n"}
            </Text>
            <Text style={styles.subhead}>
            Editing and Deleting Items
            </Text>
            <Text style={styles.reg}>
            • Navigate to the Profile page using the bottom navigation bar{"\n"}
            • Click on the ‘My Items’ button which is located under your user name{"\n"}
            • Scroll through the list of your items and find the item you wish to edit or delete{"\n"}
            • On the far right of the item listing are a blue pen and paper icon and a red trash can icon{"\n"}
            • Click on the blue pen and paper icon to edit the item{"\n"}
            • Click on the red trash can item to delete the item{"\n"}
            </Text>
            <Text style={styles.subhead}>
            Saving Items
            </Text>
            <Text style={styles.reg}>
            • Navigate to the Market page using the bottom navigation bar{"\n"}
            • Click on the heart on the upper left-hand corner of the item listing to save the item{"\n"}
            OR{"\n"}
            • Click on the item from the Market page{"\n"}
            • Click on the ‘Save’ button at the bottom of the page{"\n"}{"\n"}
            </Text>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    head: {
        fontWeight: 'bold',
        fontSize: 38,
        color:"#06ACB7"
    },
    subhead: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    reg: {
        fontSize: 15,
    },
    container: {
        padding: 10,   
    }
})