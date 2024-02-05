import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  });

  const [pharmacies, setPharmacies] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
          });

          setUserLocation({ latitude, longitude });
        } else {
          console.log("Permission to access location denied");
        }
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    const fetchPharmacies = async () => {
      try {
        const location = `${region.latitude},${region.longitude}`;
        const radius = 5000;

        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=pharmacy&key=${process.env.REACT_APP_KEY}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setPharmacies(data.results);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchUserLocation();
    fetchPharmacies();
  }, [region]);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Tu jesteś"
            pinColor="blue" 
          />
          {pharmacies.map((pharmacy, index) => (
            <Marker
              key={`${pharmacy.id}-${index}`}
              coordinate={{
                latitude: pharmacy.geometry.location.lat,
                longitude: pharmacy.geometry.location.lng,
              }}
              title={pharmacy.name}
            />
          ))}
        </MapView>
      )}
      {!userLocation && <Text>Ładowanie lokalizacji...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
