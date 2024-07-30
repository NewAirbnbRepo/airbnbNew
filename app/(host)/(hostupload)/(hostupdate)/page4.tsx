import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Switch, Checkbox, Button } from 'react-native-paper';

const HouseRules = () => {
  const [children, setChildren] = useState(false);
  const [infants, setInfants] = useState(false);
  const [pets, setPets] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [events, setEvents] = useState(false);
  const [additionalRules, setAdditionalRules] = useState('');
  const [stairs, setStairs] = useState( false)
  const [noise, setNoice] = useState(false)
  const [petsOnProperty, setPetsOnProperty] = useState(false)
  const [noParking, setNoParking] = useState (false)
  const [sharedSpaces, setSharedSpaces] = useState(false)
  const [surveillance, setSurveillance] = useState(false)
  const [dangerousAnimals, setDangerousAnimals] = useState(false)


  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Set house rules for your guests</Text>
      <Text style={styles.subtitle}>Students must agree to your house rules before they book.</Text>

      <View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>Suitable for children (2 - 12 years)</Text>
        <Switch value={children} onValueChange={setChildren} />
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>Suitable for infants (Under 2 years)</Text>
        <Switch value={infants} onValueChange={setInfants} />
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>Suitable for pets</Text>
        <Switch value={pets} onValueChange={setPets} />
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>Smoking allowed</Text>
        <Switch value={smoking} onValueChange={setSmoking} />
      </View>

      <View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>Events or parties allowed</Text>
        <Switch value={events} onValueChange={setEvents} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Anything else?"
        value={additionalRules}
        onChangeText={setAdditionalRules}
        multiline={true}
      />
      <Button mode="contained" onPress={() => { /* Add functionality to handle additional rules */ }} style={styles.addButton}>
        Add
      </Button>

      <Text style={styles.detailsTitle}>Details students must know about your hive</Text>
      <View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={stairs ? 'checked' : 'unchecked'}
          onPress={() => setStairs(!stairs)}
        />
        <Text>Must climb stairs</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={noise ? 'checked' : 'unchecked'}
          onPress={() => setNoice(!noise)}
        />
        <Text>Potential for noise</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={petsOnProperty ? 'checked' : 'unchecked'}
          onPress={() => setPetsOnProperty(!petsOnProperty)}
        />
        <Text>Pet(s) live on property</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={noParking ? 'checked' : 'unchecked'}
          onPress={() => setNoParking(!noParking)}
          />
          <Text>No parking on property</Text>
        </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={sharedSpaces ? 'checked' : 'unchecked'}
          onPress={() => setSharedSpaces(!sharedSpaces)}
        />
        <Text>Some spaces are shared</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={surveillance ? 'checked' : 'unchecked'}
          onPress={() => setSurveillance(!surveillance)}
        />
        <Text>Surveillance or recording devices on property</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={dangerousAnimals ? 'checked' : 'unchecked'}
          onPress={() => setDangerousAnimals(!dangerousAnimals)}
        />
        <Text>Dangerous animals live on property</Text>
      </View>

    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, backgroundColor: '#fff' }]} onPress={() => router.navigate('./page3')} >
            <Text style={[defaultStyles.btnText, {color: '#044D5B'}]}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140,}]} onPress={() => router.navigate('./pagr5')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
      </View>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingRight: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  ruleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ruleText: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#00bfa5',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default HouseRules;
