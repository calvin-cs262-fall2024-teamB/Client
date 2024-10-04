// ItemDetail.js
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const ProfilePage = ({ route, navigation }) => {
  const {} = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.profileFiller}>PROFILE PAGE FILLER TEXT</Text>
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
  profileFiller: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
});


export default ProfilePage;
