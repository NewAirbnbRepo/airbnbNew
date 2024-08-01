import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Checkbox, Provider as PaperProvider, Divider } from 'react-native-paper';

const App = () => {
  const [loading, setLoading] = useState(false);
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

  const yourAmenities = async () => {
    try {
      setLoading(true)
      const { data: {user}} = await supabase.auth.getUser();
      if(!user) { Alert.alert("User not logged in");
      setLoading(false);
      return;
      }

      const { data } = await supabase.from('property')
      .select('hostid').eq('userid', user.id).single();

      const { error} = await supabase.from('amenities').insert([
        {
          host_id: data?.hostid,
          essentials: selectedAmenities.essentials,
          airConditioning: selectedAmenities.airConditioning,
          heater: selectedAmenities.heat,
          closetdrawers: selectedAmenities.closetDrawers,
          tv: selectedAmenities.tv,
          fridge: selectedAmenities.fridge,
          roomdesk: selectedAmenities.roomDesks,
        }
      ])

      setLoading(false);
    if (error) {
      Alert.alert('Uploadind data failed', error.message);
      setLoading(false)
    } else {
      console.log('Sign Up 2 successful');
      router.navigate('./finish');
    }
    } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
    }
    } finally {
    setLoading(false)
    }
  }

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header1}>
          <Pressable onPress={()=> router.navigate('../(tabs)/profile')}>
            <Text style={styles.exitText}>EXIT</Text>
          </Pressable>
        </View>
      <View style={styles.header}>
        <View style={styles.progressBar}>
        <View style={[styles.box,]}/>
        </View>
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
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={yourAmenities/*()=> router.navigate('./finish')*/} >
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
  header1: {
    alignItems: 'flex-end',
    marginBottom: 16,
    marginTop: 16,
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
  },
  header: {
    marginBottom: 16,
    marginTop: 30,
  },
  progressBar: {
    backgroundColor: '#ccc',
    width: '100%',
    borderRadius: 5,
  },
  box: {
    width: 280,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default App;
