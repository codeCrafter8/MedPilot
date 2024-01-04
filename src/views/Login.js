import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity,Text, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { loginUser } = useUserContext();

  useEffect(() => {
    jsonServer.get('/users',
      {
        headers: {
          'Cache-Control': 'no-cache'
        },
      })
      .then((response) => 
      setUsers(response.data));
  }, []);

  const handleSignIn = () => {
    //to remove
    if (email === '' && password === '') {
      navigation.navigate('Home');
    }
    else {

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        loginUser(user);
        navigation.navigate('Home');
      } else {
        alert('Nieprawidłowy email lub hasło');
      }
    } 
  };

  const handleNewAccount = () => {
    navigation.navigate('Registration'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.med}>Med{'\n'}</Text>
        <Text style={styles.pilot}>Pilot</Text>
        <Image
          source={require('../assets/medicine.png')}
        />
      </View>
      <View style={styles.email}>
        <Image
          source={require('../assets/envelope.png')}
          style={styles.emailImage}
        />
        <TextInput
          style={{ ...styles.input, color: 'white' }}
          placeholder="E-mail"
          placeholderTextColor="white"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.password}>
        <Image
          source={require('../assets/padlock.png')}
          style={styles.hasloImage}
        />
        <TextInput
          style={{ ...styles.input, color: 'white' }}
          placeholder="Hasło"
          placeholderTextColor="white"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer2}
        onPress={handleNewAccount}
      >
        <Text style={styles.buttonText}>Nowe konto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009BB1',
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 140,
    marginBottom:170,
  },
  buttonContainer: {
    width: '70%',
    height: 50,
    backgroundColor: '#1DC4DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 90,
  },
  buttonContainer2: {
    width: '40%',
    height: 50,
    backgroundColor: '#009BB1',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'white',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  med:{
    color:'white',
    fontSize:32,
  },
  pilot:{
    color:'white',
    fontSize:32,
    marginTop:56,
  },
  email: {
    flexDirection: 'row',
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    padding: 10,
  },
  emailImage:{
    marginRight:10,
  },
  hasloImage:{
    marginRight:8,
    marginLeft:-3,
  },
  password: {
    flexDirection: 'row',
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    padding: 10,
  },
});

export default Login;