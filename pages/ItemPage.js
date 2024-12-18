import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const ItemPage = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemLocation, setItemLocation] = useState({ lat: 43.012, lon: -85.641 });
  const [image, setImage] = useState(null);
  const [itemTags, setItemTags] = useState([]);
  const [lookingForTags, setLookingForTags] = useState([]);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [lookingForModalVisible, setLookingForModalVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { fromProfile } = route.params || {};

  const ALLOWED_TAGS = ['books', 'decor', 'kitchenware', 'furniture', 'appliances', 'electronics', 'toys', 'games'];

  const MAX_IMAGE_SIZE_MB = 0.5; // Maximum size in MB
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

  useEffect(() => {
    const loadItems = async () => {
      if (fromProfile) {
        try {
          const savedItems = await AsyncStorage.getItem('savedItems');
          if (savedItems) setItemList(JSON.parse(savedItems));
        } catch (error) {
          console.error('Error loading saved items:', error);
        }
      }
    };
    loadItems();
  }, [fromProfile]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // Start with the highest quality
    });
  
    if (result.assets && result.assets.length > 0) {
      let imageUri = result.assets[0].uri;
      try {
        let compressedImage = await compressImageToLimit(imageUri);
  
        // Convert the image to base64
        const base64Image = await FileSystem.readAsStringAsync(compressedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        setImage(`${base64Image}`);
      } catch (error) {
        console.error('Error processing the image:', error);
        alert('Failed to process the image. Please try again.');
      }
    }
  };

  const compressImageToLimit = async (uri) => {
    let quality = 0.9; // Start at 90% quality
    let width = 1024; // Initial width
    let height = 768; // Initial height
  
    let image = { uri };
    let fileSize = await getImageSize(uri);
  
    // Keep reducing quality and dimensions until the image is below the limit
    while (fileSize > MAX_IMAGE_SIZE_BYTES && quality > 0.1) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width, height } }],
        { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
      );
  
      fileSize = await getImageSize(manipulatedImage.uri);
      image = manipulatedImage;
  
      quality -= 0.1; // Reduce quality by 10%
      width = Math.floor(width * 0.9); // Reduce width by 10%
      height = Math.floor(height * 0.9); // Reduce height by 10%
    }
  
    return image;
  };
  
  // Helper function to get the file size of an image
  const getImageSize = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    return fileInfo.size || 0;
  };

  const toggleTagSelection = (tag, selectedTags, setSelectedTags) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddItem = async () => {
    if (!itemName.trim() || !itemDescription.trim()) {
      alert('Please enter both item name and description');
      return;
    }

    // Construct the item data to send to the server
    const newItem = {
      ownerAccount: 6, // Replace with the actual user ID
      name: itemName,
      description: itemDescription,
      location: `${itemLocation.lat}, ${itemLocation.lon}`,
      itemTags: itemTags,
      lookingForTags: lookingForTags,
      imageData: image ? [{ data: image, description: "Image description" }] : [], // Adjust as needed
    };

    try {
      // Make the POST request using fetch
      const response = await fetch('http://10.0.0.154:8080/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem), // Convert the item object to a JSON string
      });

      if (!response.ok) {
        // Handle errors based on the HTTP response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item');
      }

      const responseData = await response.json(); // Parse the response JSON

      // Handle success
      alert('Item added successfully!');
      setItemName('');
      setItemDescription('');
      setImage(null);
      setItemTags([]);
      setLookingForTags([]);
      setItemList([...itemList, responseData]); // Add the new item to the local list

      if (fromProfile) {
        // Save the updated list to AsyncStorage
        await AsyncStorage.setItem('savedItems', JSON.stringify([...itemList, responseData]));
      }
    } catch (error) {
      // Handle errors
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again later.');
    }
  };

  const renderTagModal = (visible, onClose, tags, selectedTags, setSelectedTags) => (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Tags</Text>
          <FlatList
            data={tags}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.tagButton, selectedTags.includes(item) && styles.tagButtonSelected]}
                onPress={() => toggleTagSelection(item, selectedTags, setSelectedTags)}
              >
                <Text style={selectedTags.includes(item) ? styles.tagTextSelected : styles.tagText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="times" size={24} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <TextInput
          style={styles.input}
          placeholder="Selected Item Tags"
          value={itemTags.join(', ')}
          editable={false}
        />
        <TouchableOpacity style={styles.button} onPress={() => setTagModalVisible(true)}>
          <Text style={styles.buttonText}>Select Item Tags</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Selected Looking For Tags"
          value={lookingForTags.join(', ')}
          editable={false}
        />
        <TouchableOpacity style={styles.button} onPress={() => setLookingForModalVisible(true)}>
          <Text style={styles.buttonText}>Select Looking For Tags</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter item location (lat, lon)"
          value={`${itemLocation.lat}, ${itemLocation.lon}`}
          onChangeText={(text) => {
            const [lat, lon] = text.split(',').map((v) => parseFloat(v.trim()));
            if (!isNaN(lat) && !isNaN(lon)) {
              setItemLocation({ lat, lon });
            }
          }}
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>{editingItem ? 'Update Item' : 'Add Item'}</Text>
        </TouchableOpacity>

        {renderTagModal(tagModalVisible, () => setTagModalVisible(false), ALLOWED_TAGS, itemTags, setItemTags)}
        {renderTagModal(
          lookingForModalVisible,
          () => setLookingForModalVisible(false),
          ALLOWED_TAGS,
          lookingForTags,
          setLookingForTags
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#06ACB7',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#06ACB7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  tagButton: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  tagButtonSelected: {
    backgroundColor: '#06ACB7',
  },
  tagText: {
    color: '#000',
  },
  tagTextSelected: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ItemPage;
