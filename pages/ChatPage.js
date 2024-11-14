import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

const ChatPage = ({ route, navigation }) => {
  const { chat } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'You' }]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'You' ? styles.yourMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text style={styles.chatName}>No chat details available.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 140 : 0}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{chat.user1} and {chat.user2}</Text>
        </View>
      </TouchableWithoutFeedback>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatHeader: {
    padding: 16,
    backgroundColor: '#1ABC9C',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
    maxWidth: '80%',
  },
  yourMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#1ABC9C',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1ABC9C',
    borderRadius: 5,
  },
  goBackText: {
    color: '#fff',
    fontWeight: 'bold',
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
