import React, { useState, useEffect } from 'react';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditAppointmentScreen = ({ route }) => {
  const { appointmentId } = route.params; 
  const [appointment, setAppointment] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorSurname, setDoctorSurname] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const { loggedInUser } = useUserContext();

  useEffect(() => {
    jsonServer.get(`/appointments/${appointmentId}`)
      .then(response => {
        const appointmentData = response.data;
        setAppointment(appointmentData);
        setDate(appointmentData.date);
        setTime(appointmentData.time);
        setDoctorName(appointmentData.doctorName);
        setDoctorSurname(appointmentData.doctorSurname);
        setDoctorSpecialty(appointmentData.doctorSpecialty);
        setAddress(appointmentData.address);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych wizyty:', error);
      });
  }, [appointmentId]);

  const handleUpdateAppointment = () => {
    const updatedAppointment = {
      date,
      time,
      doctorName,
      doctorSurname,
      doctorSpecialty,
      address,
      userId: loggedInUser.id
    };
  
    jsonServer.put(`/appointments/${appointmentId}`, updatedAppointment)
      .then(response => {
        console.log('Wizyta zaktualizowana:', response.data);
      })
      .catch(error => {
        console.error('Błąd podczas aktualizacji wizyty:', error);
      });
  };

  if (!appointment) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie danych wizyty...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edytuj wizytę</Text>
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
      <Button title="Aktualizuj" onPress={handleUpdateAppointment} />
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

export default EditAppointmentScreen;
