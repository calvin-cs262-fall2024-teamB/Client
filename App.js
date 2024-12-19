import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LogBox } from 'react-native';



// Importing new pages
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import LocationPermissionScreen from './pages/LocationPermissionScreen';
import ItemSelectionScreen from './pages/ItemSelectionScreen';
import ItemPage from './pages/ItemPage';
import SettingsScreen from './pages/settingsPage';
import HelpPage from './pages/HelpPage'
import { useNavigation } from '@react-navigation/native'; 
import ItemDetail from './pages/ItemDetail'

const Stack = createNativeStackNavigator();

function HeaderWithHelpButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.customHeader}>
    <TouchableOpacity onPress={() => navigation.navigate('HelpPage')}>
      <Ionicons style={styles.question} name="question" size={35} color="#06ACB7"/>
    </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: {
            backgroundColor: '#ffffff', 
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
            headerRight: () => <HeaderWithHelpButton />,
            headerShadowVisible: false,
        }}
      initialRouteName="Login">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ItemSelectionScreen" component={ItemSelectionScreen} />
        <Stack.Screen name="ItemPage" component={ItemPage} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
        <Stack.Screen name="Settings Screen" component={SettingsScreen} />
        <Stack.Screen name="HelpPage" component={HelpPage} />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}

LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  question: {
    
    alignSelf: "flex-end",
    marginTop: -22,
    marginBottom: -30,
  },
  customHeader: {
    height: 30, 
    backgroundColor: '#ffffff', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 15, 
  },
})
