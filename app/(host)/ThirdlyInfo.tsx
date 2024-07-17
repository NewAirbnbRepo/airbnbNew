import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [selectedAmenities, setSelectedAmenities] = useState({
    essentials: true,
    airConditioning: true,
    heat: false,
    closetDrawers: false,
    tv: false,
    fridge: false,
    roomDesks: false,
  });

  type AmenityKey = 'essentials' | 'airConditioning' | 'heat' | 'closetDrawers' | 'tv' | 'fridge' | 'roomDesks';

  const toggleAmenity = (amenity: AmenityKey) => {
    setSelectedAmenities((prev) => ({ ...prev, [amenity]: !prev[amenity] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.exitText}>EXIT</Text>
      </View>

      <Text style={styles.title}>What amenities do you offer?</Text>
      <Text style={styles.description}>
        This is important for process. Please check the boxes that apply and don’t accidentally choose something you don't have.
      </Text>

      {Object.keys(selectedAmenities).map((amenity) => (
        <View key={amenity} style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>
            {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
          </Text>
          <CheckBox
            value={selectedAmenities[amenity as AmenityKey]}
            onValueChange={() => toggleAmenity(amenity as AmenityKey)}
            tintColors={{ true: '#00695c', false: '#757575' }}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="BACK" onPress={() => { /* Handle Back action */ }} color="#00695c" />
        <Button title="NEXT" onPress={() => { /* Handle Next action */ }} color="#00695c" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  exitText: {
    color: '#00695c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default App;
