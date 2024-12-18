import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        console.log('Attempting login with:', email, password); // Debug: log credentials
        axios.post('https://bombasticweb-dmenc3dmg9hhcxgk.canadaeast-01.azurewebsites.net/login', {
            email: email.trim().toLowerCase(),
            password: password
        })
            .then(response => {
                console.log('Login response:', response); // Debug: log response
                alert('Login successful');
                navigation.replace('Dashboard', { username: email });
            })
            .catch(error => {
                console.log('Login error:', error.response || error); // Debug: log error
                if (error.response) {
                    const { status, data } = error.response;
                    if (status === 401) {
                        alert('Authentication failed: Incorrect email or password');
                    } else if (status === 404) {
                        alert('User not found');
                    } else {
                        alert('Login failed: ' + (data.message || 'Please check your credentials'));
                    }
                } else {
                    alert('Network error or server is down');
                }
            });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Image source={require('../assets/LogoTransparent.png')} style={styles.logo} />

                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Login to continue</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.loginText}>
                        Don't have an account? <Text style={styles.loginLink}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F8F4F9',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        color: '#666',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});
