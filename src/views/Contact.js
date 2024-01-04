import React from 'react';
import { View, StyleSheet, ImageBackground,Text,TextInput,TouchableOpacity } from 'react-native';
import { useNavigation} from '@react-navigation/native';

const EditEmailScreen = () => {
  const navigation = useNavigation();

  const handleAnuluj = () => {
    navigation.navigate('Profil');
  }
  const handleZmien = () => {
    //navigation.navigate('Profil');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/profil.jpg')} style={styles.image}></ImageBackground>
      <View style={styles.container2}>
        <Text style={styles.text1}>Skontaktuj się z nami</Text>
        <Text style={styles.text4}>pn - pt : 09:00 - 20:00</Text>
        <Text style={styles.text4}>sob - nied : 12:00 - 17:00</Text>
        <Text style={styles.text5}>support@medpilot.com</Text>
        <View style={styles.container3}>
          <TouchableOpacity onPress={handleAnuluj}>
              <Text style={styles.text2}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity:0.4,
  },
  container2:{
    position: 'absolute', 
    top: '40%', left: '50%', 
    transform: [{ translateX: -145 }, { translateY: -125 }],
    backgroundColor:'white',
    padding:18,
    width:290,
    height:190,
  },
  text1: {
    fontSize:15,
    fontWeight:'bold',
    marginBottom:15,
  },
  input2:{
    fontSize:15,
    borderBottomWidth:1,
    borderBottomColor:'#808080',
    height:40,
    fontWeight:'bold',
    paddingLeft:5,
    marginBottom:5,
  },
  container3:{
    flexDirection:'row',
    justifyContent: 'flex-end',
    marginTop:5,
    marginRight:10,
  },
  text2:{
    color:'#009BB1',
    fontWeight:'bold',
  },
  text3:{
    color:'#009BB1',
    fontWeight:'bold',
    marginLeft:14,
  },
  text4:{
    color:'#808080',
    marginBottom:10,
    fontWeight:'bold',
  },
  text5:{
    color:'#009BB1',
    marginBottom:10,
    fontWeight:'bold',
  },
});

export default EditEmailScreen;
