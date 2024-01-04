import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const initialRegion = {
    latitude: 50.87952938628677,
    longitude: 20.640646091512203,
    latitudeDelta: 0.02,  
    longitudeDelta: 0.01, 
  };

  const markers = [
    { id: 1, title: 'Tu jesteś', coordinate: { latitude: 50.87952938628677, longitude: 20.640646091512203 } },
    // Dodaj więcej markerów według potrzeb
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
      </MapView>
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
