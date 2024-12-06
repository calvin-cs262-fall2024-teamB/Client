import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const ItemDetail = ({ route, navigation }) => {
  const { item, toggleInterested, interestedItems } = route.params || {};
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    if (interestedItems) {
      setIsInterested(interestedItems.some(i => i.name === item.name));
    }
  }, [interestedItems, item]);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.itemDescription}>No item details available.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleInterested = () => {
    setIsInterested(!isInterested);
    toggleInterested(item);
  };

  return (
    <View style={styles.container}>
      <Image source={item.img} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.desc}</Text>
      <TouchableOpacity
        style={[
          styles.interestedButton,
          false ? styles.interestedButtonActive : styles.interestedButtonInactive /* change to change if offer is made */
        ]}
        onPress={() => navigation.navigate('InitiateTrade' , { item: item })} 
      >
        <Text style={styles.buttonText}>
          Make Trade Offer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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
    textAlign: 'center',
  },
  itemImage: {
    width: '90%',
    height: "70%",
    resizeMode: "stretch",
    marginBottom: 20,
  },
  interestedButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 10,
  },
  interestedButtonActive: {
    borderWidth: 2,
    borderColor: '#4ecdc4',
    backgroundColor: '#4ecdc4',
    transform: [{ scale: 1 }], 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  interestedButtonInactive: {
    borderWidth: 2,
    borderColor: '#4ecdc4',
    backgroundColor: '#ebfafa',
    transform: [{ scale: 0.97 }], 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    
    
  },
  backButton: {
    backgroundColor: '#45aaf2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});


ItemDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      toggleInterested: PropTypes.func.isRequired,
      interestedItems: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default ItemDetail;