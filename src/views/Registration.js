import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jsonServer from '../../api';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    jsonServer
      .post('/users', {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          navigation.navigate('Home');
        } else {
          alert('Registration Failed');
        }
      })
  };

  const handleSignIn = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
        <Text style={styles.headertext1}>Utwórz</Text>
        <Text style={styles.headertext2}>Konto</Text>
       <View style={styles.username}>
        <Image
          source={require('../assets/User_Icon.png')}
          style={styles.userImage}
        />
        <TextInput
          style={{ ...styles.input, color: 'white' }}
          placeholder="Nazwa użytkownika"
          placeholderTextColor="white"
          value={username}
          onChangeText={(text) => setUsername(text)}
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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Utwórz konto</Text>
      </TouchableOpacity>
      <View style={styles.Container2}>
        <Text style={styles.container2text1}>Posiadasz już konto?</Text>
        <TouchableOpacity style={styles.buttonContainer2} onPress={handleSignIn}>
        <Text style={styles.container2text2}>Zaloguj się</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009BB1',
    flex: 1,
    alignItems: 'center',
  },
  headertext1:{
    color:'white',
    fontSize:40,
    marginTop:120,
  },
  headertext2:{
    color:'white',
    fontSize:40,
    marginBottom:170,
  },
  emailImage:{
    marginRight:10,
  },
  email: {
    flexDirection: 'row',
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    padding: 10,
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
  userImage:{
    marginLeft:-5,
    marginRight:5,
  },
  username: {
    flexDirection: 'row',
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    width: '70%',
    height: 50,
    backgroundColor: '#1DC4DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 120,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  Container2:{
    flexDirection: 'row',
  },
  container2text1:{
    color:'#DEDEDE',
    fontSize:17,
  },
  container2text2:{
    color:'white',
    fontSize:17,
  },
  buttonContainer2: {
    marginLeft:12,
  },
});

export default Registration;
