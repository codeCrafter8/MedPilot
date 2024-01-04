import React, { useState, useCallback,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image } from 'react-native';
import jsonServer from '../../api';
import { useUserContext } from '../context/UserContext';
import { useNavigation} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const TherapyScreen = () => {
  const [therapyData, setTherapyData] = useState([]);
  const { loggedInUser } = useUserContext();
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState('');
  const [dates, setDates] = useState([]);
  const days = ['PN', 'WT', 'ŚR', 'CZW', 'PT', 'SB', 'ND'];
  

  useEffect(() => {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay() + 1; 
    const datesOfWeek = Array.from({length: 7}, (_, i) => new Date(today.getFullYear(), today.getMonth(), startOfWeek + i).getDate().toString());
    setDates(datesOfWeek);
    setSelectedDay(today.getDate().toString());
  }, []);

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
    navigation.navigate('NewTherapy');
  };

  const handleArrowButtonClick = (item) => {
    navigation.navigate('TherapyDescription', { therapy: item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.containerItem}>
      <View style={styles.therapyItem}>
        <View style={styles.leftContainer}>
          <Text style={styles.specialty}>{item.time}</Text>
          <Image source={require('../assets/buzkileki.png')}/>
        </View>

        <View style={styles.middleContainer}>
          <Text>{item.medicineName}</Text>
          <Text>Pozostało dawek: {item.doses}</Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => handleArrowButtonClick(item)}>
            <Image
              source={require('../assets/chevron.png')}
              style={styles.chevron}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const filteredTherapyData = therapyData.filter(item => 
    selectedDay ? item.selectedDays.includes(selectedDay) : true
  ); 

  return (
    <View style={styles.visitsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Terapia</Text>
        <TouchableOpacity onPress={handleAddTherapy} style={styles.addButton}>
           <Image source={require('../assets/plusWhite.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {days.map((day, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDay(day)}>
            <View style={styles.dayContainer}>
              <Text style={styles.textDay}>{day}</Text>
              <View style={[styles.dateContainer, {backgroundColor: day === selectedDay ? '#009BB1' : '#f0f0f0'}]}>
                <Text style={{ color: day === selectedDay ? '#ffffff' : '#000000' }}>{dates[index]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.containerFlat}>
        <FlatList
            data={filteredTherapyData} 
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
      </View>
    </View>
  );
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
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 18,
        color: 'white',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
      },
      therapyItem: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#009BB1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius:10,
        width:'88%',
        height:100,
        backgroundColor:'white',
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
        fontSize: 12,
        marginBottom:8,
      },
      middleContainer: {
        marginRight: 20,
      },
      textDay:{
        color:'#808080',
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding:8,
        marginTop:20,
      },
      dayContainer: {
        alignItems: 'center'
      },
      dateContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
      },
      containerItem:{
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
      },
      containerFlat:{
        height:638,
      },
      chevron:{
        marginRight:-20,
      },
});

export default TherapyScreen;
