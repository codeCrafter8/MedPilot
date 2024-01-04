import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation} from '@react-navigation/native';

const ProfilScreen = () => {
  const [username, setUsername] = useState('');
  const { loggedInUser } = useUserContext(); 
  const navigation = useNavigation();

  const fetchUser = useCallback(() => {
    if (!loggedInUser) {
      return;
    }

    jsonServer
      .get('/users/' + loggedInUser.id, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loggedInUser]);

  useFocusEffect(fetchUser);

  const handleEditEmail = () => {
    navigation.navigate('EditEmail');
  }

  const handleEditUsername = () => {
    navigation.navigate('EditUsername');
  }

  const handleEditPassword = () => {
    navigation.navigate('EditPassword');
  }

  const handleLogOut = () => {
    navigation.navigate('Login');
  }

  const handleContact = () => {
    navigation.navigate('Contact');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.header}>Witaj {username}</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text1}>Ogólne</Text>
        <TouchableOpacity onPress={handleEditEmail}>
            <Text style={styles.text2}>Zmień adres e-mail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditUsername}>
            <Text style={styles.text2}>Zmień nazwę użytkownika</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditPassword} style={styles.button}>
            <Text style={styles.text2}>Zmień hasło</Text>
        </TouchableOpacity>
        <Text style={styles.text1}>Informacje</Text>
        <TouchableOpacity onPress={handleContact}>
            <Text style={styles.text2}>Skontaktuj się z nami</Text>
        </TouchableOpacity>
        <View style={styles.container4}>
            <Text style={styles.text3}>MedPilot</Text>
            <Text style={styles.text3}>v1.0.0</Text>
        </View>
        <TouchableOpacity onPress={handleLogOut} style={styles.add2Button}>
            <Text style={styles.buttonText}>Wyloguj</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'F1F1F1',
        paddingBottom:60,
        height:710,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft:18,
        color:'white',
    },
        container2:{
        backgroundColor:'#009BB1',
        height:80,
        paddingTop:40,
    },
    container3:{
        padding:20,
    },
    text1:{
        color:'#009BB1',
        fontWeight:'bold',
        fontSize:16,
    },
    text2:{
        fontSize:15,
        fontWeight:'bold',
        marginTop:25,
    },
    text3:{
        fontSize:15,
        color:'#808080',
    },
    button:{
        borderBottomWidth:1,
        borderBottomColor:'#808080',
        paddingBottom:10,
        marginBottom:10,
    },
    container4:{
        marginTop:30,
    },
    add2Button:{
        backgroundColor:'#009BB1',
        height:60,
        width:350,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:100,
    },
    buttonText:{
        fontSize:20,
        fontWeight:'bold',
        color:'white',
    },
});

export default ProfilScreen;
    