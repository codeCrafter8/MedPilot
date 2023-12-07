import React, { useState } from 'react';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const NewAppointmentScreen = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorSurname, setDoctorSurname] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const { loggedInUser } = useUserContext();

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
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nowa wizyta</Text>
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Godzina"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazwisko"
        value={doctorSurname}
        onChangeText={setDoctorSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Specjalność"
        value={doctorSpecialty}
        onChangeText={setDoctorSpecialty}
      />
      <TextInput
        style={styles.input}
        placeholder="Adres wizyty" 
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Dodaj" onPress={handleAddAppointment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
  },
});

export default NewAppointmentScreen;
