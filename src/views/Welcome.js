import { View, TextInput, TouchableOpacity,Text, StyleSheet,Image } from 'react-native';


const Welcome= () => {
return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.med}>Med{'\n'}</Text>
        <Text style={styles.pilot}>Pilot</Text>
        <Image
          source={require('../assets/medicine.png')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009BB1',
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 140,
    marginBottom:140,
  },
  med:{
    color:'white',
    fontSize:32,
  },
  pilot:{
    color:'white',
    fontSize:32,
    marginTop:56,
  },
});

export default Welcome;