import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ItemPage = ({ username }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemList, setItemList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  // Check if navigated from ItemSelectionScreen
  const fromItemSelection = route.params?.fromItemSelection;
  const fromProfile = route.params?.fromProfile;

  useEffect(() => {
    const loadItems = async () => {
      if (fromProfile) {
        await loadSavedItems();
      } else {
        setItemList(marketItems);
      }
    };
    loadItems();
  }, [fromProfile]);

  const loadSavedItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('savedItems');
      if (savedItems !== null) {
        setItemList(JSON.parse(savedItems));
      } else {
        setItemList([]);
      }
    } catch (error) {
      console.error('Error loading saved items:', error);
      setItemList([]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      console.error('No image selected');
    }
  };


  const handleAddItem = async () => {
    if (itemName.trim() && itemDescription.trim()) {
      let updatedList;
      if (editingItem) {
        updatedList = itemList.map(item =>
          item.id === editingItem.id ? { ...item, name: itemName, description: itemDescription, image } : item
        );
        setEditingItem(null);
      } else {
        const newItem = {
          id: Date.now().toString(),
          name: itemName,
          description: itemDescription,
          image,
        };
        updatedList = [...itemList, newItem];
      }
      setItemList(updatedList);
      setItemName('');
      setItemDescription('');
      setImage(null);

      if (fromProfile) {
        try {
          await AsyncStorage.setItem('savedItems', JSON.stringify(updatedList));
        } catch (error) {
          console.error('Error saving items:', error);
        }
      }
    } else {
      alert('Please enter both item name and description');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Dashboard', { username: 'Guest', initialPage: 'Items' });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemDescription(item.description);
    setImage(item.image);
  };

  const handleDeleteItem = async (id) => {
    const updatedList = itemList.filter(item => item.id !== id);
    setItemList(updatedList);

    if (fromProfile) {
      try {
        await AsyncStorage.setItem('savedItems', JSON.stringify(updatedList));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} />}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEditItem(item)} style={styles.icon}>
          <Icon name="edit" size={24} color="#06ACB7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.icon}>
          <Icon name="trash" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );



  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Item Addition</Text>
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
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>{editingItem ? "Update Item" : "Add Item"}</Text>
        </TouchableOpacity>
      </View>

      {fromItemSelection && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      )}

      {itemList.length > 0 && <Text style={styles.itemsTitle}>Your Items:</Text>}

      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyListText}>No items added yet.</Text>}
      />
    </View>
  );
};

const marketItems = [
  {
    img: "image.jpg",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#06ACB7',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6c757d',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});