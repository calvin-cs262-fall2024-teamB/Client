// ChatPage.js
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

const ChatPage = ({ route, navigation }) => {
  const { chat } = route.params || {};

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text style={styles.chatName}>No chat details available.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chatName}>{chat.user1} and {chat.user2}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignchats: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  chatName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

ChatPage.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        chat: PropTypes.shape({
          user1: PropTypes.string.isRequired,
          user2: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

export default ChatPage;
