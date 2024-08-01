import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const maxLength = 50;
  const [done, setDone] = useState(false);

  const WorkingNumber = async () => {
    const { data: {user}} = await supabase.auth.getUser();
    if(!user) { Alert.alert("User not logged in");
    return;
    }
    const { data } = await supabase.from('property')
      .select('hostid').eq('userid', user.id).single();

    const { error: updateError} = await supabase.from('property').update({hostPhoneNumber: phoneNumber}).eq('hostid', data?.hostid)
    if (updateError) {
      Alert.alert('Upload failed', updateError.message);
      setLoading(false)
    } else {
      console.log('phone number Upload successful');
      router.navigate('./finish');
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.progressBar}>
        <View style={[styles.box,]}/>
        </View>
      </View>
        <View style={{paddingRight: 30}}>
      <Text style={styles.title}>Add your mobile number</Text>
      <Text style={styles.description}>
      We’ll send you booking requests, reminders,and other notifications. This number should be 
      able to receive texts or calls
      </Text>
      {!done ?(<TextInput
        style={styles.input}
        placeholder="Mobile number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={maxLength}
        keyboardType='numeric'
      />):(
      <Text style={{fontSize: 50, marginBottom: 8}}>{phoneNumber}</Text>)}
      <Text style={styles.description}>Students must be able to use this number to get in touch with you</Text>
      
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {!done &&<TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./profileupdate')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity>}
         {done && <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => setDone(false)} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity>}
          {!done &&<TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => setDone(true)} >
            <Text style={defaultStyles.btnText}> CONTINUE</Text>
          </TouchableOpacity>}
          {done &&<TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={WorkingNumber/*()=> router.navigate('./finish')*/} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  description: {
    fontSize: 17,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
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
