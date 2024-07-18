import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Checkbox, Provider as PaperProvider, Divider } from 'react-native-paper';

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
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.exitText}>EXIT</Text>
        </View>

        <Text style={styles.title}>What amenities do you offer?</Text>
        <Text style={styles.description}>
          This is important for process. Please check the boxes that apply and don’t accidentally choose something you don't have.
        </Text>
        <View>
          <Text style={styles.essentialdiscription}>
          Towels, bed sheets,  pillows, etc</Text>
        </View>

        {Object.keys(selectedAmenities).map((amenity, index) => (
          <View key={amenity}>
            <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
            <Checkbox
              status={selectedAmenities[amenity as AmenityKey] ? 'checked' : 'unchecked'}
              onPress={() => toggleAmenity(amenity as AmenityKey)}
              color="#00695c"
            />
            </View>
            {index < Object.keys(selectedAmenities).length - 1 && <Divider />}
          </View>
        ))}

        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./SecondlyInfo')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./finish')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PaperProvider>
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
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 17,
    color: '#666',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  checkboxLabel: {
    fontSize: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  essentialdiscription: {
    fontSize: 18,
    color: '#666',
    top: 70,
  }
});

export default App;
