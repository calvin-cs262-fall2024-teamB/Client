import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ItemDetail from './ItemDetail'; // Import the ItemDetail component
import ProfilePage from './ProfilePage'; // Import the profile page component

const RootStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// Home Stack Navigator
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ItemDetail" component={ItemDetail} />
    </HomeStack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={HomeStackScreen} />
      <MainTab.Screen name="Profile" component={ProfilePage} />
    </MainTab.Navigator>
  );
}

// Login Screen Component
const LoginScreen = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      // Future Authenticity Check
      onLogin();
    } else {
      alert('Please enter a valid username and password');
    }
  };

  const handleCreateAccount = () => {
    Alert.alert('Create Account', 'WIP');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'WIP');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />

      {}
      <View style={styles.buttonContainer}>
        <Button 
          title="Create Account" 
          onPress={handleCreateAccount} 
          color="#1E90FF"
        />
        <Button 
          title="Forgot Password?" 
          onPress={handleForgotPassword} 
          color="#FF6347"
        />
      </View>
    </View>
  );
};

// Home Screen Component
const HomeScreen = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemLocation, setItemLocation] = useState('');
  const [itemList, setItemList] = useState([]);

  const handleAddItem = () => {
    if (itemName.trim() && itemDescription.trim()) {
      const newItem = { id: Date.now().toString(), name: itemName, description: itemDescription, location: itemLocation };
      setItemList((prevList) => [...prevList, newItem]);
      setItemName('');
      setItemDescription('');
      setItemLocation('');
    } else {
      alert('Please enter both item name and description');
    }
  };

  // Function to handle removing an item
  const handleRemoveItem = (id) => {
    setItemList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', { item })}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
      </TouchableOpacity>
      <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
    </View>
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
      <TextInput
        style={styles.input}
        placeholder="Enter item location"
        value={itemLocation}
        onChangeText={setItemLocation}
      />
      <Button title="Add Item" onPress={handleAddItem} />
      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

// Main App Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <RootStack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// Styles
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemLocation: {
    fontSize: 14,
    color: '#555',
  },
});
