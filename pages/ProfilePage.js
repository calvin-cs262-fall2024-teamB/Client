// ProfilePage.js
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons' //Used: npm install react-native-vector-icons
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import ItemPage from './ItemPage';
import InterestedPage from './InterestedPage'
import exampleImage from '../assets/testUserPic.jpg'
import SettingsScreen from './settingsPage'
import * as ImagePicker from 'expo-image-picker';

const ProfilePage = ({ route, navigation }) => {
  const { username } = route.params || {};

  const [image, setImage] = useState(null);

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
      });

      if (!result.canceled) {
          setImage(result.assets[0].uri);
      }
  };


  return (

    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
      <View style={styles.imageContainer}>
        <Image source={image ? { uri: image } : exampleImage} style={styles.userImage} />
      </View>

        <View style={styles.imagePickerContainer}>
          {/* Button to pick image */}
          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Change Image</Text>
          </TouchableOpacity>
        </View>
          
          

        <View style={styles.settingsIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings Screen')} >
            <Icon name="settings" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>


      <Text style={styles.profileFiller}>{username} </Text> 


      <TouchableOpacity
        style={styles.myItemButton}
        onPress={() => navigation.navigate('ItemPage', { fromProfile: true, username })}>
        <Text style={styles.itemButtonText}>My Items</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.myItemButton} onPress={() => navigation.navigate('InterestedPage',)}>
        <Text style={styles.itemButtonText}>Saved Items</Text>
      </TouchableOpacity>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },

  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    marginVertical: 20,
  },

  imageContainer: {
    flex: 2,
    alignItems: 'center',
    left: '37%',
    marginVertical: 10,
  },

  imagePickerContainer: {
    marginTop: 120,
    marginLeft: 40,
    alignItems: 'center',
    marginVertical: 10,
  },

  imagePickerButton: {
    backgroundColor: '#fff',
    padding: 1,
    borderRadius: 5,
  },

  imagePickerText: {
    color: '#06ACB7',
    fontSize: 16,
  },

  settingsIconContainer: {
    flex: 3,
    alignItems: 'absolute',
    top: 0,
    right: 50,
    left: '50%',
    //marginVertical: 20,
  },

  profileFiller: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },

  myItemButton: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    padding: 10,
    backgroundColor: '#06ACB7',
    borderRadius: 10,
    alignItems: 'center',
  },

  itemButtonText: {
    color: '#fff',
  },

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }

});


export default ProfilePage;
