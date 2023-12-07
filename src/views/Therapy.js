import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import jsonServer from '../../api';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';

const TherapyScreen = () => {
  const [therapyData, setTherapyData] = useState([]);
  const { loggedInUser } = useUserContext();

  const fetchTherapy = () => {
    if (!loggedInUser) {
      return;
    }

    jsonServer.get('/therapy?userId=' + loggedInUser.id,
    {
      headers: {
        'Cache-Control': 'no-cache'
      },
    })
    .then(response => {
      setTherapyData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchTherapy();
    }, [loggedInUser])
  );

  const handleAddTherapy = () => {
    //navigation.navigate('NewAppointment');
  };

  const handleArrowButtonClick = (item) => {
    //navigation.navigate('MedicineDescription', { medicine: item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.therapyItem}>
      <View style={styles.leftContainer}>
        <Text style={styles.specialty}>{item.time}</Text>
      </View>

      <View style={styles.middleContainer}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => handleArrowButtonClick(item)}>
            <Text style={styles.arrowButton}>➡️</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <View style={styles.visitsContainer}>
      <View style={styles.headerContainer}>
          <Text style={styles.header}>Terapia</Text>
          <TouchableOpacity onPress={handleAddTherapy} style={styles.addButton}>
            <Ionicons name="ios-add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
            data={therapyData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'teal',
        padding: 10,
      },
      addButton: {
        padding: 5,
        marginTop: 30,
        marginRight: 15,
      },
      header: {
        fontSize: 32,
        backgroundColor: 'teal',
        color: 'white',
        padding: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
      },
      therapyItem: {
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
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 10,
      },
      doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      specialty: {
        fontSize: 16,
        color: '#555',
      },
      middleContainer: {
        marginTop: 10, 
        marginRight: 150,
      },
});

export default TherapyScreen;
