import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import jsonServer from '../../api';

const MedicineDescriptionScreen = ({ route }) => {
    const { medicine } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.description}>Działanie: {medicine.effect}</Text>
            <Text style={styles.description}>Dawkowanie: {medicine.dosageLong}</Text>
            <Text style={styles.description}>Lek sprzedawany {medicine.prescription}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default MedicineDescriptionScreen;