import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [hiveDescription, setDescription] = useState('');
  const maxLength = 600;
  const [loading, setLoading] = useState(false)

  const chaneHiveName = async () => {
    try{
      setLoading(true)
      const { data: {user}} = await supabase.auth.getUser();
      if(!user) { Alert.alert("User not logged in");
      return;
      }

      const { data } = await supabase.from('property')
      .select('hostid').eq('userid', user.id).single();

      const { error: updateError} = await supabase.from('property')
      .update({description: hiveDescription}).eq('hostid', data?.hostid)

      if (updateError) {
        Alert.alert('Upload failed', updateError.message);
        setLoading(false)
      } else {
        console.log('Hive Description Upload successful');
        router.navigate('./profileupdate');
      }
      }catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
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
      <Text style={styles.title}>Describe your Hive to students </Text>
      <Text style={styles.description}>
      Write a quick summary of your hive. You can highlight what’s special about your place, the environment, and how you’ll interact with others.</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the rooms, environment, etc...."
        value={hiveDescription}
        onChangeText={setDescription}
        maxLength={maxLength}
        multiline={true}
      />
      <Text style={styles.characterCount}>
        {maxLength - hiveDescription.length} characters remaining
      </Text>


      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./uploadimage')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={chaneHiveName} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
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
    width: 140,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default App;
