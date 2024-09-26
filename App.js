import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from './ItemDetail'; // Import the ItemDetail component

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemList, setItemList] = useState([]);

  const handleAddItem = () => {
    if (itemName.trim() && itemDescription.trim()) {
      const newItem = { name: itemName, description: itemDescription };
      setItemList((prevList) => [...prevList, newItem]);
      setItemName('');
      setItemDescription('');
    } else {
      alert('Please enter both item name and description');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', { item })}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter item description"
        value={itemDescription}
        onChangeText={setItemDescription}
      />
      <Button title="Add Item" onPress={handleAddItem} />
      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
});
