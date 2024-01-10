import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import jsonServer from '../../api';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const MedicinesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const navigation = useNavigation();

  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);


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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleArrowButtonClick = (item) => {
    navigation.navigate('MedicineDescription', { medicine: item });
  };

  const handleBarcodeButtonClick = () => {
    setIsBarcodeScannerOpen(true);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.medicineItem}>
        <Image source={{uri:item.img}} style={styles.medicineImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Text>{item.dosage}</Text>
        </View>
        <TouchableOpacity onPress={() => handleArrowButtonClick(item)}>
          <Image
            source={require('../assets/chevron.png')}
            style={styles.chevron}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setIsBarcodeScannerOpen(false);
    const scannedMedicine = medicines.find((item) => item.EAN === data);
    if (scannedMedicine) {
      navigation.navigate('MedicineDescription', { medicine: scannedMedicine });
    } else {
      alert('Nie odnaleziono leku');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.header}>Leki</Text>
      </View>
      <View style={styles.container3}>
        <View style={styles.search}>
          <Image
            source={require('../assets/search.png')}
            style={styles.searchImage}
          />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <TouchableOpacity onPress={handleBarcodeButtonClick}>
            <Image
              source={require('../assets/barcode.png')}
              style={styles.searchImage}
            />
          </TouchableOpacity>
        </View>
        {isBarcodeScannerOpen && hasPermission && (
      <BarCodeScanner
      style={{ height: 300 }}
        onBarCodeScanned={handleBarCodeScanned}
      />
    )}
        <FlatList
          data={filteredMedicines}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
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
  searchInput: {
    width:'65%',
    height: 40,
    paddingHorizontal: 12,
    borderBottomColor:'#808080',
    borderBottomWidth:1,
  },
  medicineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    height:120,
    backgroundColor:'white',
    borderRadius:10,
  },
  medicineName: {
    fontSize: 18,
    marginRight: 8,
  },
  medicineImage: {
    width: 100,
    height: 100, 
    marginRight: 8
  },
  container2:{
    backgroundColor:'#009BB1',
    height:80,
    paddingTop:40,
  },
  container3:{
    padding:16,
  },
  search:{
    flexDirection:'row',
    backgroundColor:'white',
    height:60,
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:25,
    marginTop:9,
  },
  searchImage:{
    marginRight:10,
    marginLeft:10,
  },
  chevron:{
    marginRight:10,
  },
});

export default MedicinesScreen;