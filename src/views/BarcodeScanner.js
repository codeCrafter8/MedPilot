import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BarcodeScannerScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const navigation = useNavigation();
  const [isAlertVisible, setAlertVisible] = useState(false);
  const { medicines } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const showAlert = () => {
    if (!isAlertVisible) {
      setAlertVisible(true);
      alert('Nie odnaleziono leku');
      setTimeout(() => {
        setAlertVisible(false);
      }, 1500);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    const scannedMedicine = medicines.find((item) => item.EAN === data);
    if (scannedMedicine) {
      navigation.navigate('MedicineDescription', { medicine: scannedMedicine });
    } else {
      showAlert();
    }
  };

  if (hasPermission === null) {
    return <Text>Proszę oczekiwać...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Brak dostępu do kamery</Text>;
  }

  const handleBack = () => {
    navigation.navigate('Leki');
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#000', padding: 0 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
      >
         <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Image source={require('../assets/arrowleft.png')} />
          </TouchableOpacity>
        </View>
        
      </BarCodeScanner>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    marginHorizontal: 0, marginLeft: 0, marginStart: 0,
    paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
    height: '102%',
    padding: 0
},
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 40,
    left: 18,
  },
});

export default BarcodeScannerScreen;
