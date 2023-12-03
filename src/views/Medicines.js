import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import jsonServer from '../../api';
import { useNavigation } from '@react-navigation/native';

const MedicinesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
      jsonServer.get('/medicines',
      {
        headers: {
          'Cache-Control': 'no-cache'
        },
      })
      .then(response => {
        const fetchedMedicines = response.data;

        if (Array.isArray(fetchedMedicines)) {
          setMedicines(fetchedMedicines);
          setFilteredMedicines(fetchedMedicines);
        } else {
          setMedicines([]);
          setFilteredMedicines([]);
        }
      })
  }, []);

  useEffect(() => {
    const filtered = medicines.filter(item => (item.name)?.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredMedicines(filtered);
  }, [searchQuery, medicines]);

  const handleArrowButtonClick = (item) => {
    navigation.navigate('MedicineDescription', { medicine: item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.medicineItem}>
      <Image source={require('../assets/favicon.png')} style={styles.medicineImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text>{item.dosage}</Text>
      </View>
      <TouchableOpacity onPress={() => handleArrowButtonClick(item)}>
        <Text style={styles.arrowButton}>➡️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leki</Text>
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  medicineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  medicineName: {
    fontSize: 18,
    marginRight: 8,
  },
  arrowButton: {
    fontSize: 24,
    color: 'blue',
  },
  medicineImage: {
    width: 50,
    height: 50, 
    marginRight: 8
  }
});

export default MedicinesScreen;
