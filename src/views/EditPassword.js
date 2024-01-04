import React, { useState } from 'react';
import { Alert, View, StyleSheet, ImageBackground,Text,TextInput,TouchableOpacity } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';

const EditPasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loggedInUser } = useUserContext();

  const handleCancel = () => {
    navigation.navigate('Profil');
  }
  const handleChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Błąd', 'Nowe hasła nie pasują do siebie');
      return;
    }

    if (oldPassword !== loggedInUser.password) {
      Alert.alert('Błąd', 'Podane stare hasło nie zgadza się z aktualnym hasłem');
      return;
    }

    jsonServer.put(`/users/${loggedInUser.id}`, {
      password: newPassword,
      email: loggedInUser.email,
      username: loggedInUser.username
    })
      .then(() => {
        loggedInUser.password = newPassword;
        navigation.navigate('Profil');
      })
      .catch(error => {
        console.error('Błąd podczas zmiany hasła', error);
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/profil.jpg')} style={styles.image}></ImageBackground>
      <View style={styles.container2}>
        <Text style={styles.text1}>Zmiana hasła</Text>
        <TextInput
          style={styles.input2}
          placeholder="Podaj stare hasło"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
        />
        <TextInput
          style={styles.input2}
          placeholder="Podaj nowe hasło"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
        <TextInput
          style={styles.input2}
          placeholder="Potwierdź nowe hasło"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <View style={styles.container3}>
          <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.text2}>Anuluj</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChange}>
              <Text style={styles.text3}>Zmień</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity:0.4,
  },
  container2:{
    position: 'absolute', 
    top: '40%', left: '50%', 
    transform: [{ translateX: -145 }, { translateY: -125 }],
    backgroundColor:'white',
    padding:18,
    width:290,
    height:250,
  },
  text1: {
    fontSize:15,
    fontWeight:'bold',
    marginBottom:15,
  },
  input2:{
    fontSize:15,
    borderBottomWidth:1,
    borderBottomColor:'#808080',
    height:40,
    fontWeight:'bold',
    paddingLeft:5,
    marginBottom:5,
  },
  container3:{
    flexDirection:'row',
    justifyContent: 'flex-end',
    marginTop:25,
  },
  text2:{
    color:'#009BB1',
    fontWeight:'bold',
  },
  text3:{
    color:'#009BB1',
    fontWeight:'bold',
    marginLeft:14,
  }
});

export default EditPasswordScreen;
