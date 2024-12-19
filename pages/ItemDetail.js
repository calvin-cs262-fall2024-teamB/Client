import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import PropTypes from 'prop-types';

const ItemDetail = ({ route, navigation }) => {
  const { item, toggleInterested, interestedItems } = route.params || {};
  const [isInterested, setIsInterested] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

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

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.itemDetails}>
          <TouchableOpacity onPress={toggleImageSize}>
            <Image
              source={item.img}
              style={isImageEnlarged ? styles.itemImageLarge : styles.itemImage}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.desc}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.tagsLabel}>Tags:</Text>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tagBox}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <Text style={styles.tagsLabel}>Looking For:</Text>
        <View style={styles.tagsContainer}>
          {item.lookingFor.map((tag, index) => (
            <View key={index} style={styles.tagBox}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <Text style={styles.tagsLabel}>Location:</Text>
        <Text style={styles.locationText}>{item.location}</Text>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.tradeButton}
          onPress={() => navigation.navigate('InitiateTrade', { item: item })}
        >
          <Text style={styles.buttonText}>Make Trade Offer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interestedButton}
          onPress={handleInterested}
        >
          <Text style={styles.interestedButtonText}>{isInterested ? 'Item Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  itemDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 16,
  },
  itemImageLarge: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 2,
    backgroundColor: '#06ACB7',
    marginVertical: 16,
  },
  tagsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tagBox: {
    backgroundColor: '#1ABC9C',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  interestedButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: '#06ACB7',
    borderWidth: 2,
    borderColor: '#06ACB7',
  },
  interestedButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tradeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#06ACB7',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
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
        img: PropTypes.any.isRequired,
        desc: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        lookingFor: PropTypes.array.isRequired,
        location: PropTypes.string.isRequired,
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