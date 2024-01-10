import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';  

const MedicineDescriptionScreen = ({ route }) => {
  const navigation = useNavigation();

  const { medicine } = route.params;

  const handleBack = () => {
    navigation.navigate('Leki');
    return true;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
      backHandler.remove();
    };
  }, []);

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={require('../assets/arrowleft.png')}/>
                </TouchableOpacity>
                <Text style={styles.header}>Leki</Text>
            </View>
            <Image source={{uri:medicine.img}} style={styles.medicineImage} />
            <View style={styles.container3}>
                <Text style={styles.title}>Działanie:</Text>
                <Text style={styles.description}>{medicine.effect}</Text>
                <Text style={styles.title}>Dawkowanie:</Text>
                <Text style={styles.description}>{medicine.dosageLong}</Text>
            </View>
            <View style={styles.container4}>
                <Text style={styles.title2}>Lek sprzedawany {medicine.prescription}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        marginBottom: 8,
    },
    title2:{
        textAlign:'center',
        fontSize:24,
    },
    container2:{
        backgroundColor:'#009BB1',
        height:80,
        paddingTop:40,
        flexDirection:'row',
        paddingLeft:18,
    },
    medicineImage: {
        width: 390,
        height: 381, 
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft:18,
        color:'white',
    },
    container3:{
        paddingLeft:18,
        paddingRight:10,
        paddingTop:10,
    },
    container4:{
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 50,
    },
});

export default MedicineDescriptionScreen;