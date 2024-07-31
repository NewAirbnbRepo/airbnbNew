import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Switch, Checkbox } from 'react-native-paper';

const HouseRules = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  const [done3, setDone3] = useState(false);
  const [done4, setDone4] = useState(false);

  const [children, setChildren] = useState(false);
  const [infants, setInfants] = useState(false);
  const [pets, setPets] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [events, setEvents] = useState(false);
  const [stairs, setStairs] = useState( false)
  const [petsOnProperty, setPetsOnProperty] = useState(false)
  const [noParking, setNoParking] = useState (false)
  const [surveillance, setSurveillance] = useState(false)

  const [additionalRules, setAdditionalRules] = useState('');
  const [additionalRules1, setAdditionalRules1] = useState('');
  const [additionalRules2, setAdditionalRules2] = useState('');
  const [additionalRules3, setAdditionalRules3] = useState('');
  const [additionalRules4, setAdditionalRules4] = useState('');

  const handleNext = async() => {
    try {
      setLoading(true);
      const {data: {user}} = await supabase.auth.getUser();
      if (!user) {
        Alert.alert('User not logged in');
        return;
      }

      const{ data } = await supabase.from('property')
      .select('host_id').eq('userid', user.id).single();

      const { error: updateError } = await supabase.from('hiverules')
      .insert({
        host_id: data?.host_id,
        children,
        infants,
        pets,
        smoking,
        event: events,
        stairs,
        noparking: noParking,
        surveillance,
        additionalrules1: additionalRules,
        additionalrules2: additionalRules1,
        additionalrules3: additionalRules2,
        additionalrules4: additionalRules3,
        additionalrules5: additionalRules4,
      })

      if(updateError) {
        Alert.alert('Upload failed', updateError.message);
        setLoading(false);
      } else {
        console.log('Upload successful');
        router.navigate('./page5');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


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

      {done &&<View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>{additionalRules}</Text>
        <Pressable onPress={()=> setDone(!done)}> 
          <Text style={styles.ruleText}>EDIT</Text> 
        </Pressable>
      </View>}
      {done1 &&<View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>{additionalRules1}</Text>
        <Pressable onPress={()=> setDone1(!done1)}> 
          <Text style={styles.ruleText}>EDIT</Text> 
        </Pressable>
      </View>}
      {done2 &&<View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>{additionalRules2}</Text>
        <Pressable onPress={()=> setDone2(!done2)}>
          <Text style={styles.ruleText}>EDIT</Text>
        </Pressable>
      </View>}
      {done3 &&<View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>{additionalRules3}</Text>
        <Pressable onPress={()=> setDone3(!done3)}>
          <Text style={styles.ruleText}>EDIT</Text>
        </Pressable>
      </View>}
      {done4 &&<View style={styles.ruleContainer}>
        <Text style={styles.ruleText}>{additionalRules4}</Text>
        <Pressable onPress={()=> setDone4(!done4)}>
          <Text style={styles.ruleText}>EDIT</Text>
        </Pressable>
      </View>}

      {!done &&<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        style={styles.input}
        placeholder="Anything else?"
        value={additionalRules}
        onChangeText={setAdditionalRules}
        multiline={true}
      />
      <TouchableOpacity style={[defaultStyles.btn, {width: '30%'}]} onPress={()=>setDone(true)} >
        <Text style={defaultStyles.btnText}> ADD</Text>
      </TouchableOpacity>
      </View>}

      {!done1 && done &&<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        style={styles.input}
        placeholder="Anything else?"
        value={additionalRules1}
        onChangeText={setAdditionalRules1}
        multiline={true}
      />
      <TouchableOpacity style={[defaultStyles.btn, {width: '30%'}]} onPress={()=>setDone1(true)} >
        <Text style={defaultStyles.btnText}> ADD</Text>
      </TouchableOpacity>
      </View>}

      {!done2 && done1 &&<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        style={styles.input}
        placeholder="Anything else?"
        value={additionalRules2}
        onChangeText={setAdditionalRules2}
        multiline={true}
      />
      <TouchableOpacity style={[defaultStyles.btn, {width: '30%'}]} onPress={()=>setDone2(true)} >
        <Text style={defaultStyles.btnText}> ADD</Text>
      </TouchableOpacity>
      </View>}

      {!done3 && done2 &&<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        style={styles.input}
        placeholder="Anything else?"
        value={additionalRules3}
        onChangeText={setAdditionalRules3}
        multiline={true}
      />
      <TouchableOpacity style={[defaultStyles.btn, {width: '30%'}]} onPress={()=>setDone3(true)} >
        <Text style={defaultStyles.btnText}> ADD</Text>
      </TouchableOpacity>
      </View>}

      {!done4 && done3 &&<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        style={styles.input}
        placeholder="Anything else?"
        value={additionalRules4}
        onChangeText={setAdditionalRules4}
        multiline={true}
      />
      <TouchableOpacity style={[defaultStyles.btn, {width: '30%'}]} onPress={()=>setDone4(true)} >
        <Text style={defaultStyles.btnText}> ADD</Text>
      </TouchableOpacity>
      </View>}

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
          status={surveillance ? 'checked' : 'unchecked'}
          onPress={() => setSurveillance(!surveillance)}
        />
        <Text>Surveillance or recording devices on property</Text>
      </View>

    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, backgroundColor: '#fff' }]} onPress={() => router.navigate('./page3')} >
            <Text style={[defaultStyles.btnText, {color: '#044D5B'}]}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140,}]} onPress={/*handleNext*/() => router.navigate('./page5')} >
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
    width: '70%',
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
