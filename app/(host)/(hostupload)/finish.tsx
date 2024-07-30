import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.progressBar}>
        <View style={[styles.box,]}/>
        </View>
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <Text style={styles.stepTitle}>Final Step!</Text>
          
        </View>
        <Text style={styles.stepDescription}>
          Tell us about your Hive so you can start publishing your place
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity>
          <Text style={styles.changeText}>CHANGE</Text>
        </TouchableOpacity>
        <Icon name="check-circle" size={40} color="#00695c" />
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepSubHeader}>STEP 2</Text>
        <Text style={styles.stepTitle}>Make it stand out</Text>
        <Text style={styles.stepDescription}>
          Photos, short description, title
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity>
          <Text style={styles.changeText}>CHANGE</Text>
        </TouchableOpacity>
        <Icon name="check-circle" size={40} color="#00695c" />
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepSubHeader}>STEP 3</Text>
        <Text style={[styles.stepTitle]}>Finish up</Text>
        <Text style={styles.stepDescription}>
          Set price, booking settings, etc
        </Text>
        <TouchableOpacity onPress={() => { /* Handle Continue action */router.navigate('./(hostupdate)/page1')}} style={[defaultStyles.btn, {width: 150, marginBottom: 15}]}>
          <Text style={defaultStyles.btnText}>CONTINUE</Text>
        </TouchableOpacity>
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
  stepContainer: {
    paddingVertical: 16,
    marginRight: 50,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  stepTitle: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  stepSubHeader: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    marginTop: 40,
  },
  stepDescription: {
    fontSize: 17,
    color: '#666',
    marginBottom: 8,
  },
  changeText: {
    color: '#00695c',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 17,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#00695c',
  },
  divider: {
    marginVertical: 8,
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
    width: 350,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default App;
