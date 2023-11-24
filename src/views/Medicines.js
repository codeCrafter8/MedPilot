import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const MedicinesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Przykładowe dane o lekach (możesz dostosować do swoich potrzeb)
  const medicinesData = [
    { id: '1', name: 'Paracetamol', description: 'Środek przeciwbólowy' },
    { id: '2', name: 'Aspirin', description: 'Przeciwzapalny lek przeciwbólowy' },
    // Dodaj więcej informacji o lekach, jeśli potrzebujesz
  ];

  // Filtruj leki na podstawie wpisanego zapytania
  const filteredMedicines = medicinesData.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leki</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Szukaj leków..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medicineItem}>
            <Text style={styles.medicineName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  medicineItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MedicinesScreen;
