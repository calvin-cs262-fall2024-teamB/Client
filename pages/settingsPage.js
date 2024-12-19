import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* THERE IS CURRENTLY NO ROUTING FOR SETTINGS PAGE ITEMS */

const SettingsScreen = () => {
  {/* const [isDarkMode, setIsDarkMode] = useState(false); */ }
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  {/* const toggleDarkMode = () => setIsDarkMode(previousState => !previousState); */ }
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
      });
    };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Dark Mode Toggle - not implemented
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      */}

      {/* Notifications Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Account Settings */}
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Account</Text>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Privacy Policy</Text>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>

      {/* Terms of Service */}
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Terms of Service</Text>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


// Literally just default colors since I couldnt figure out how to link it to global styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingArrow: {
    fontSize: 16,
    color: '#999',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    },
    logoutText: {
    fontSize: 16,
    color: 'red',
    },
    });

export default SettingsScreen;