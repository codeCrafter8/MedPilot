import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import jsonServer from '../../api';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState(null);
  const navigation = useNavigation();
  const { loggedInUser } = useUserContext();

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    jsonServer.get('/appointments?userId=' + loggedInUser.id,
    {
      headers: {
        'Cache-Control': 'no-cache'
      },
    })
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [loggedInUser]);

  const handleAddAppointment = () => {
    navigation.navigate('NewAppointment');
  };

  const handleEditAppointment = (appointmentId) => {
    console.log(`Edit an appointment with ID ${appointmentId}`);
  };

  const handleDeleteAppointment = (appointmentId) => {
    jsonServer
    .delete(`/appointments/${appointmentId}`)
    .then(() => {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    })
    .catch((error) => {
      console.error(`Error deleting appointment with ID ${appointmentId}:`, error);
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.visitItem}>
      <View style={styles.leftContainer}>
        <Text style={styles.doctorName}>{item.doctorName}</Text>
        <Text style={styles.specialty}>{item.doctorSpecialty}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Button title="Edytuj" onPress={() => handleEditAppointment(item.id)} />
        <Button title="Usuń" onPress={() => handleDeleteAppointment(item.id)} />
      </View>

      <View style={styles.bottomContainer}>
        <Text>{item.date}</Text>
        <Text>{item.time}</Text>
      </View>
    </View>
  );

  if (appointments.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Zapisuj wizyty</Text>
        <Button title="Dodaj wizytę" onPress={handleAddAppointment} />
      </View>
    );
  }
  else {
    return (
      <View style={styles.visitsContainer}>
        <Text style={styles.header}>Wizyty</Text>
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: 'teal',
    color: 'white',
    padding: 10,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  visitItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 2,
    marginBottom: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#555',
  },
  bottomContainer: {
    marginTop: 10, 
  },
});

export default AppointmentsScreen;
