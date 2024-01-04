import React, { useState, useCallback } from 'react';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const TherapyDescriptionScreen = ({ route }) => {
    const navigation = useNavigation();
  
    const { therapy } = route.params;

    const handleBack = () => {
        navigation.navigate('Terapia');
    };

    const handleDone = () => {
        navigation.navigate('Terapia');
    };
    const handleEdit = () => {
      navigation.navigate('EditTherapy',{ therapy2: therapy});
  };

    return (
        <View style={styles.container}>
          <View style={styles.container2}>
            <TouchableOpacity onPress={handleBack}>
               <Image source={require('../assets/arrowleft.png')}/>
            </TouchableOpacity>
            <Text style={styles.header}>{therapy.medicineName}</Text>
          </View>
          <View style={styles.container3}>
            <Image source={require('../assets/medicine2.png')}/>
          </View>
          <View style={styles.container5}>
          <View style={styles.container4}>
            <TouchableOpacity onPress={handleEdit}style={styles.addButton}>
                <Text style={styles.buttonText}>Edytuj</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDone} style={styles.add3Button}>
                <Text style={styles.buttonText}>Usuń</Text>
            </TouchableOpacity>
          </View>
            <View style={styles.container7}>
                <Text style={styles.header2}>{therapy.medicineName}</Text>
                <View style={styles.therapyItem}>
                    <Image source={require('../assets/buzkileki.png')}/>
                    <View style={styles.middleContainer}>
                        <Text>{therapy.time}</Text>
                        <Text>Pozostało dawek: {therapy.doses}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleDone} style={styles.add2Button}>
                    <Text style={styles.buttonText}>Zrobione</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:'white',
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
      header2: {
        fontSize: 32,
        fontWeight: 'bold',
        color:'#009BB1',
        paddingRight:280,
        paddingTop:20,
      },
      addButton:{
        backgroundColor:'#009BB1',
        height:46,
        width:145,
        borderRadius:60,
        alignItems:'center',
        justifyContent:'center',
        marginTop:-30,
        marginLeft:20,
      },
      add3Button:{
        backgroundColor:'#B10000',
        height:46,
        width:145,
        borderRadius:60,
        alignItems:'center',
        justifyContent:'center',
        marginTop:-30,
        marginLeft:60,
      },
      add2Button:{
        backgroundColor:'#009BB1',
        height:60,
        width:350,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:100,
      },
      buttonText:{
        fontSize:20,
        fontWeight:'bold',
        color:'white',
      },
      container7:{
        alignItems:'center',
      },
      container3:{
        alignItems:'center',
        marginTop:140,
      },
      container4:{
        flexDirection:'row',
        marginTop:5,
      },
      container5:{
        backgroundColor:'#F1F1F1',
        flex:1,
        borderTopEndRadius:20,
        borderTopStartRadius:20,
        marginTop:0,
      },
      therapyItem: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius:10,
        width:'88%',
        height:100,
        backgroundColor:'white',
        marginTop:30,
      },
      middleContainer: {
        marginRight: 80,
      },
    });
    
    export default TherapyDescriptionScreen;
    