import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jsonServer from '../../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    jsonServer.get('/users',
      {
        headers: {
          'Cache-Control': 'no-cache'
        },
      })
      .then((response) => 
      setUsers(response.data));
  })

  const handleSignIn = () => {
    //to remove
    /*if (email === '' && password === '') {
      navigation.navigate('Home');
    }*/

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      navigation.navigate('Home');
    } else {
      alert('Login Failed');
    }
  };

  const handleNewAccount = () => {
    navigation.navigate('Registration'); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="New Account" onPress={handleNewAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
});

export default Login;
