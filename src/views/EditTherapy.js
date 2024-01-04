import React, { useState, useEffect } from 'react';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation} from '@react-navigation/native';

const AddMedicineScreen = ({ route }) => {

  const {therapy2} = route.params;
  const [medicineName, setMedicineName] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [time, setTime] = useState('');
  const [doses, setDoses] = useState('');
  const { loggedInUser } = useUserContext();
  const navigation = useNavigation();

  const daysOfWeek = ['PN', 'WT', 'ŚR', 'CZW', 'PT', 'SB', 'ND'];

  const handleDayPress = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  const handleAddMedicine = () => {
    const newMedicine = {
      medicineName,
      selectedDays,
      time,
      doses,
      userId: loggedInUser.id
    };

    jsonServer.post('/therapy', newMedicine)
    .then(response => {
      console.log('Zaktualizowano terapie:', response.data);
    })
    .catch(error => {
      console.error('Błąd podczas aktualizacji terapii:', error);
    });

    navigation.navigate('Terapia');
  };

  const handleBack = () => {
    navigation.navigate('Terapia');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleBack}>
           <Image source={require('../assets/arrowleft.png')}/>
        </TouchableOpacity>
        <Text style={styles.header}>Edytuj terapie</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text1}>Dla jakiego leku chcesz ustawić przypomnienie?</Text>
        <View style={styles.container4}>
          <TextInput
            style={styles.input}
            placeholder="Nazwa"
            value={therapy2.medicineName}
            onChangeText={setMedicineName}
          />
          <Image
            source={require('../assets/barcode.png')}
            style={styles.searchImage}
          />
        </View>
        <Text style={styles.text2}>W jakie dni przyjmujesz leki?</Text>
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day) => (
            <View key={day} style={styles.dayBox}>
              <TouchableOpacity style={styles.dayTouchable} onPress={() => handleDayPress(day)}>
                <View style={[styles.checkBox, { borderColor: therapy2.selectedDays.includes(day) ? '#009BB1' : 'gray', borderWidth: 1, backgroundColor: therapy2.selectedDays.includes(day) ? '#009BB1' : 'white' }]} />
              </TouchableOpacity>
              <Text style={styles.text3}>{day}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.text4}>W jakich godzinach?</Text>
        <View style={styles.container5}>
          <View style={styles.godzinacointainer}>
            <Text style={styles.textData}>Godzina:</Text>
          </View>
          <View style={styles.inputdata}>
            <TextInput
              style={{ ...styles.input2, color: '#009BB1'}}
              placeholder="HH:MM"
              placeholderTextColor="#009BB1"
              value={therapy2.time}
              onChangeText={setTime}
            />
          </View>
        </View>

        <Text style={styles.text4}>Ile dawek musisz przyjąć w terapii?</Text>
        
        <View style={styles.container6}>
          <Text style={styles.textData}>Liczba dawek:</Text>
          <TextInput
            style={{ ...styles.input2, color: '#009BB1'}}
            placeholder="Podaj liczbę dawek"
            placeholderTextColor="#009BB1"
            value={therapy2.doses}
            onChangeText={setDoses}
          />
        </View>
        <View style={styles.container7}>
          <TouchableOpacity onPress={handleAddMedicine} style={styles.add2Button}>
            <Text style={styles.buttonText}>Aktualizuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayBox: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '9%', 
  },
  dayTouchable: {
    width: '100%',
    aspectRatio: 1, // To keep it a square
  },
  checkBox: {
    width: '70%',
    aspectRatio: 1, // To keep it a square
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
  container3:{
    padding:18,
  },
  text1:{
    fontSize:20,
  },
  text2:{
    fontSize:18,
    marginTop:40,
    marginBottom:20,
  },
  text3:{
    marginLeft:-10,
    marginTop:-5,
  },
  text4:{
    fontSize:18,
    marginTop:40,
    marginBottom:5,
  },
  input:{
    flex:1,
    fontSize:20,
    height:50,
    paddingLeft:8,
  },
  input2:{
    flex:1,
    fontSize:17,
    paddingLeft:8,
  },
  container4:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor:'#808080',
    height:40,
    marginTop:8,
  },
  container5:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:5,
  },
  textData:{
    fontSize:16,
  },
  container6:{
    flexDirection:'row',
    alignItems:'center',
  },
  container7:{
    alignItems:'center',
  },
  add2Button:{
    backgroundColor:'#009BB1',
    height:60,
    width:350,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    marginTop:200,
  },
  buttonText:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  },
});

export default AddMedicineScreen;
