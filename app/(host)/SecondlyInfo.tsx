import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert, Platform } from 'react-native';
import { Checkbox, Button, RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [placeType, setPlaceType] = useState('');
  const [university, setUniversity] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [privateRoom, setPrivateRoom] = useState(false);
  const [sharedRoom, setSharedRoom] = useState(false);
  const [numPrivateRooms, setNumPrivateRooms] = useState(0);
  const [numSharedRooms, setNumSharedRooms] = useState(0);
  const [bathroomOption, setBathroomOption] = useState('no');

  const handleSubmit = async () => {
    try{
    const { data:{user}} = await supabase.auth.getUser();
    if(!user) { Alert.alert("User not logged in");
      setLoading(false);
      return;
      }
    const { error} = await supabase.from('property').insert([
      {
        userid: user.id,
        typeofplace: placeType,
        university: university,
        address1: address1,
        address2: address2,
        private_room: privateRoom,
        shared_room: sharedRoom,
        private_room_amount: numPrivateRooms,
        shared_room_amount: numSharedRooms,
        singlebath: bathroomOption,
      }
    ])

    setLoading(false);
    if (error) {
      Alert.alert('Uploading data failed', error.message);
      setLoading(false)
    } else {
      console.log('Sign Up successful');
      router.navigate('./ThirdlyInfo');
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header1}>
            <Text style={styles.maintitle}>About your Hive</Text>
        </View>
      <View style={styles.header}>
        <View style={styles.progressBar}>
        <View style={[styles.box,]}/>
        </View>
      </View>
      <Text style={styles.title}>Tell us about your{'\n'} HomeHive!</Text>

        <Text style={styles.label}>First, select the type of place</Text>
        <View style={styles.border}>
      <RNPickerSelect
        onValueChange={(value) => setPlaceType(value)}
        items={[
          { label: 'Hostel', value: 'Hostel' },
          { label: 'Homestel', value: 'Homestel' },
          { label: 'Apartment', value: 'Apartment' },
          { label: 'Campus Hall', value: 'Campus Hall' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select one', value: null }}
      />
      </View>

      

      <Text style={[styles.label, {top: 30}]}>Now tell us about the setting:</Text>
      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        </View>

      <Text style={styles.subLabel}>University/College</Text>
      <View style={styles.border}>
      <RNPickerSelect
        onValueChange={(value) => setUniversity(value)}
        items={[
          { label: 'Kwame Nkrumah University Of Science & Technology', value: 'university1' },
          { label: 'University of Ghana', value: 'university2' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Which university is this for?', value: null }}
      />
      </View>

      <Text style={styles.subLabel}>Location details</Text>
      <TextInput
        style={styles.input}
        placeholder="Address 1"
        value={address1}
        onChangeText={setAddress1}
      />
      <TextInput
        style={styles.input}
        placeholder="Address 2 (Optional)"
        value={address2}
        onChangeText={setAddress2}
      />

      <Text style={styles.subLabel}>What can students have?</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={privateRoom ? 'checked' : 'unchecked'}
          onPress={() => setPrivateRoom(!privateRoom)}
        />
        <Text>Private room</Text>
      </View>
      <Text style={styles.checkboxmessg}>Students have a room to themselves.</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={sharedRoom ? 'checked' : 'unchecked'}
          onPress={() => setSharedRoom(!sharedRoom)}
        />
        <Text>Shared room</Text>
      </View>
      <Text style={styles.checkboxmessg}>Students sleep in a room or common area{'\n'}
      that could be shared with other roommates</Text>

      {privateRoom && <Text style={styles.subLabel}>How many private rooms?</Text>}
      {privateRoom &&<TextInput
        style={styles.input}
        placeholder="Enter number"
        value={numPrivateRooms.toString()}
        onChangeText={(text) => setNumPrivateRooms(parseFloat(text))}
        keyboardType="numeric"
      />}

      {sharedRoom && <Text style={styles.subLabel}>How many shared rooms?</Text>}
      {sharedRoom &&<TextInput
        style={styles.input}
        placeholder="Enter number"
        value={numSharedRooms.toString()}
        onChangeText={(text) => setNumSharedRooms(parseFloat(text))}
        keyboardType="numeric"
      />}

      <Text style={styles.subLabel}>Are there bathrooms in each room?</Text>
      <RadioButton.Group
        onValueChange={newValue => setBathroomOption(newValue)}
        value={bathroomOption}
      >
        <View style={styles.radioContainer}>
          <RadioButton
          color={Platform.OS === 'ios' ? '#007AFF' : undefined}
           value="yes" />
          <Text>Yes</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
          uncheckedColor={Platform.OS === 'ios' ? 'yellow' : undefined}
           value="no" />
          <Text>No, they're shared</Text>
        </View>
      </RadioButton.Group>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./FirstlyInfo')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={/*handleSubmit*/()=> router.navigate('./ThirdlyInfo')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
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
  maintitle: {
    color: '#2D0C57',
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'K2D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  border: {
    borderWidth: 1,
    borderColor: '#8B8B8B', 
    borderRadius: 4,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  checkboxmessg: {
    fontSize: 14,
    color: '#888888',
    marginLeft: 35,
    marginBottom: 16,
    top: -10,
  },
  header1: {
    marginBottom: 16,
    marginTop: 16,
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
    width: 120,
    borderWidth: 1,
    borderColor: 'black',
  }
});

const pickerSelectStyles = {
   inputIOS: {
     height: 40,
     marginBottom: 12,
     color: 'black',
   },
  inputAndroid: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 3,
    color: 'black',
  },
};

export default App;
