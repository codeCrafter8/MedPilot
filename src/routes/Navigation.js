import React, { useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../views/Login';
import Registration from '../views/Registration';
import Medicines from '../views/Medicines';
import Map from '../views/Map';
import Appointments from '../views/Appointments';
import NewAppointment from '../views/NewAppointment';
import MedicineDescription from '../views/MedicineDescription';
import EditAppointment from '../views/EditAppointment';
import Therapy from '../views/Therapy';
import Welcome from '../views/Welcome';
import NewTherapy from '../views/NewTherapy';
import Profil from '../views/Profil';
import EditEmail from '../views/EditEmail';
import EditUsername from '../views/EditUsername';
import EditPassword from '../views/EditPassword';
import EditTherapy from '../views/EditTherapy';
import TherapyDescription from '../views/TherapyDescription';
import Contact from '../views/Contact';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { height: 64, paddingBottom: 10,paddingTop:8,paddingLeft:10,paddingRight:10}}}
    >
      <Tab.Screen
        name="Leki"
        component={Medicines}
        options={{
          tabBarLabel: 'Leki',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/MenuMedicineBlue.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarActiveTintColor: '#009BB1',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/MenuMapBlue.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarActiveTintColor: '#009BB1',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
      <Tab.Screen
        name="Wizyty"
        component={Appointments}
        options={{
          tabBarLabel: 'Wizyty',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/DoctorVisitGrey.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarActiveTintColor: '#009BB1',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
      <Tab.Screen
        name="Terapia"
        component={Therapy}
        options={{
          tabBarLabel: 'Terapia',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/pill.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarActiveTintColor: '#009BB1',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/userBlue.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarActiveTintColor: '#009BB1',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
    </Tab.Navigator>
  );
};

function Navigation() {
  const [welcomeScreenVisible, setWelcomeScreenVisible] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeScreenVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (welcomeScreenVisible) {
    return <Welcome />;
  }

  return (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="MedicineDescription" component={MedicineDescription} />
        <Stack.Screen name="NewAppointment" component={NewAppointment} />
        <Stack.Screen name="EditAppointment" component={EditAppointment} />
        <Stack.Screen name="NewTherapy" component={NewTherapy} />
        <Stack.Screen name="EditEmail" component={EditEmail} />
        <Stack.Screen name="EditUsername" component={EditUsername} /> 
        <Stack.Screen name="EditPassword" component={EditPassword} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="TherapyDescription" component={TherapyDescription} />
        <Stack.Screen name="EditTherapy" component={EditTherapy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

