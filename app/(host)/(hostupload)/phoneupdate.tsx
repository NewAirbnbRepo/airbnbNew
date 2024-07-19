import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const maxLength = 50;

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        {/* Add your progress bar here */}
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
      <TextInput
        style={styles.input}
        placeholder="Hive name"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={maxLength}
      />
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./profileupdate')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./finish')} >
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
    // Add styles for your header/progress bar here
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
