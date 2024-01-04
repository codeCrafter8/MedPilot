import React, { useState } from 'react';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { useNavigation} from '@react-navigation/native';

const NewAppointmentScreen = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorSurname, setDoctorSurname] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const { loggedInUser } = useUserContext();
  const navigation = useNavigation();

  const handleAddAppointment = () => {
    const newAppointment = {
      date,
      time,
      doctorName,
      doctorSurname,
      doctorSpecialty,
      address,
      userId: loggedInUser.id
    };
  
    jsonServer.post('/appointments', newAppointment)
      .then(response => {
        console.log('Nowa wizyta dodana:', response.data);
      })
      .catch(error => {
        console.error('Błąd podczas dodawania nowej wizyty:', error);
      });

      navigation.navigate('Wizyty');
  };  

  const handleBack = () => {
    navigation.navigate('Wizyty');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleBack}>
           <Image source={require('../assets/arrowleft.png')}/>
        </TouchableOpacity>
        <Text style={styles.header}>Nowa wizyta</Text>
      </View>
      <View style={styles.container3}>
        <View style={styles.container4}>
          <View style={styles.datacointainer}>
            <Text style={styles.textData}>Data</Text>
          </View>
          <View style={styles.inputdata}>
            <TextInput
              style={{ ...styles.input, color: '#009BB1'}}
              placeholder="DD.MM.YYYY"
              placeholderTextColor="#009BB1"
              value={date}
              onChangeText={setDate}
            />
            <TouchableOpacity style={styles.buttonContainer}>
            <Image
              source={require('../assets/downarrow.png')}
              style={styles.downArrow}
            />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container5}>
          <View style={styles.godzinacointainer}>
            <Text style={styles.textData}>Godzina</Text>
          </View>
          <View style={styles.inputdata}>
            <TextInput
              style={{ ...styles.input, color: '#009BB1'}}
              placeholder="HH:MM"
              placeholderTextColor="#009BB1"
              value={time}
              onChangeText={setTime}
            />
            <TouchableOpacity style={styles.buttonContainer}>
            <Image
              source={require('../assets/downarrow.png')}
              style={styles.downArrow}
            />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container6}>
          <Image
            source={require('../assets/doctor200.png')}
            style={styles.doctor}
          />
        </View>
        <TextInput
          style={styles.input2}
          placeholder="Imię"
          value={doctorName}
          onChangeText={setDoctorName}
        />
        <TextInput
          style={styles.input2}
          placeholder="Nazwisko"
          value={doctorSurname}
          onChangeText={setDoctorSurname}
        />
        <TextInput
          style={styles.input2}
          placeholder="Specjalność"
          value={doctorSpecialty}
          onChangeText={setDoctorSpecialty}
        />
        <TextInput
          style={styles.input2}
          placeholder="Adres wizyty" 
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.container7}>
          <TouchableOpacity onPress={handleAddAppointment} style={styles.add2Button}>
            <Text style={styles.buttonText}>Dodaj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize:20
  },
  input2: {
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:'#808080',
    height:50,
    padding:8,
    marginBottom:15,
  },
  container2:{
    backgroundColor:'#009BB1',
    height:80,
    paddingTop:40,
    flexDirection:'row',
    paddingLeft:18,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft:18,
    color:'white',
  },
  container3:{
    padding:20,
  },
  container4:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
  },
  container5:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:25,
  },
  container6:{
    alignItems:'center',
  },
  textData:{
    fontSize:20,
  },
  datacointainer:{
    marginRight:170,
  },
  godzinacointainer:{
    marginRight:191,
  },
  inputdata:{
    flexDirection:'row',
    height:22,
  },
  downArrow:{
    marginLeft:8,
  },
  add2Button:{
    backgroundColor:'#009BB1',
    height:74,
    width:334,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    marginTop:50,
  },
  buttonText:{
    fontSize:16,
    fontWeight:'bold',
    color:'white',
  },
  doctor:{
    marginBottom:30,
  },
  container7:{
    alignItems:'center',
  }
});

export default NewAppointmentScreen;
