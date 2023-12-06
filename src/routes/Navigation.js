import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../views/Login';
import Registration from '../views/Registration';
import Medicines from '../views/Medicines';
import Map from '../views/Map';
import Appointments from '../views/Appointments'
import NewAppointment from '../views/NewAppointment';
import MedicineDescription from '../views/MedicineDescription';
import EditAppointment from '../views/EditAppointment';
import Therapy from '../views/Therapy';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}}>
      <Tab.Screen name="Leki" component={Medicines} />
      <Tab.Screen name="Mapa" component={Map} />
      <Tab.Screen name="Wizyty" component={Appointments} />
      <Tab.Screen name="Terapia" component={Therapy} />
      <Tab.Screen name="Profil" component={Login} />
    </Tab.Navigator>
  );
};

function Navigation() {
  return (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="MedicineDescription" component={MedicineDescription} />
        <Stack.Screen name="NewAppointment" component={NewAppointment} />
        <Stack.Screen name="EditAppointment" component={EditAppointment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
