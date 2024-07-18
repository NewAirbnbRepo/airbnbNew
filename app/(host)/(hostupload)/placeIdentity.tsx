import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [hiveName, setHiveName] = useState('');
  const maxLength = 50;

  return (
    <View style={styles.container}>
        <View style={{paddingRight: 30}}>
      <Text style={styles.title}>Name your place</Text>
      <Text style={styles.description}>
        Write a quick summary of your hive. You can highlight what's special about your place, the environment, and how you'll interact with others.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Hive name"
        value={hiveName}
        onChangeText={setHiveName}
        maxLength={maxLength}
      />
      <Text style={styles.characterCount}>
        {maxLength - hiveName.length} characters remaining
      </Text>


      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./uploadimage')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./profileupdate')} >
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
});

export default App;
