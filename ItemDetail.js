// ItemDetail.js
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const ItemDetail = ({ route, navigation }) => {
  const { item } = route.params; // Get the item passed from the previous screen

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});

export default ItemDetail;
