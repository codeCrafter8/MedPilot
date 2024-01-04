import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity,Image } from 'react-native';
import jsonServer from '../../api';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [viewWithoutAppointments, setViewWithoutAppointments] = useState(false);
  const navigation = useNavigation();
  const { loggedInUser } = useUserContext();

  const fetchAppointments = () => {
    if (!loggedInUser) {
      return;
    }

    jsonServer
      .get('/appointments?userId=' + loggedInUser.id, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then((response) => {
        setAppointments(response.data);
        setViewWithoutAppointments(response.data.length === 0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [loggedInUser])
  );

  const handleAddAppointment = () => {
    navigation.navigate('NewAppointment');
  };

  const handleEditAppointment = (appointmentId) => {
    console.log(`Edit an appointment with ID ${appointmentId}`);
    navigation.navigate('EditAppointment', { appointmentId });
  };  

  const handleDeleteAppointment = (appointmentId) => {
    jsonServer
      .delete(`/appointments/${appointmentId}`)
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
        fetchAppointments();
      })
      .catch((error) => {
        console.error(`Error deleting appointment with ID ${appointmentId}:`, error);
      });
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.visitItem}>
      <View style={styles.leftContainer}>
        <Image source={require('../assets/doctor80.png')}/>
        <View style={styles.leftText}>
          <Text style={styles.doctorName}>{item.doctorName} {item.doctorSurname}</Text>
          <Text style={styles.specialty}>{item.doctorSpecialty}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => handleEditAppointment(item.id)} style={styles.editButton}>
            <Image source={require('../assets/edit20.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteAppointment(item.id)}  style={styles.trashButton}>
            <Image source={require('../assets/bin20.png')}/>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>{item.date}</Text>
          <Text style={styles.bottomText}>{item.time}</Text>
          <Text style={styles.bottomText}>{item.address}</Text>

        </View>
      </View>
    </View>
  );

  if (viewWithoutAppointments) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Wizyty</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.ImageContainer}>
            <Image
              source={require('../assets/doctor.png')}
            />
          </View>
          <Text style={styles.title}>Zapisuj wizyty</Text>
          <TouchableOpacity onPress={handleAddAppointment} style={styles.add2Button}>
            <Text style={styles.buttonText}>Dodaj wizytę</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.visitsContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Wizyty</Text>
          <TouchableOpacity onPress={handleAddAppointment} style={styles.addButton}>
            <Image source={require('../assets/plusWhite.png')}/>
          </TouchableOpacity>
        </View>
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#009BB1',
    height: 80,
    paddingTop: 40,
  },
  addButton: {
    marginRight:10,
  },
  container: {
    backgroundColor:'F1F1F1',
    paddingBottom:60,
    height:710,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 18,
    color: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'regular',
    marginBottom: 10,
    marginTop:15,
  },
  visitItem: {
    marginLeft:18,
    marginRight:18,
    marginTop:18,
    paddingLeft:5,
    paddingRight:25,
    borderRadius:10,
    height:120,
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection:'row',
  },
  topContainer: {
    flexDirection: 'row',
    marginTop:8,
    marginBottom:15,
  },
  doctorName: {
    fontSize: 13,
    marginTop:-5,
    marginBottom:5,
  },
  specialty: {
    fontSize: 13,
  },
  bottomContainer: {
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },
  ImageContainer:{
    backgroundColor:'white',
    height:200,
    width:200,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:80,
  },
  mainContainer:{
    alignItems:'center',
    marginTop:120,
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
  rightContainer:{
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },
  leftText:{
    marginLeft:9,
  },
  editButton:{
    marginRight:5,
  },
  bottomText:{
    fontSize:13,
  }
});

export default AppointmentsScreen;
