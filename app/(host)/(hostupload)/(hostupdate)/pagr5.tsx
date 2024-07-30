import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const ReadyToPublish = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You’re ready to {'\n'}publish!</Text>
      <Text style={styles.description}>
        You’ll be able to welcome your first guest starting August 10, 2024. If you’d like to update your calendar or house rules, you can easily do all that after you hit publish.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.publishButton} onPress={() => {/* Add publish listing functionality here */router.navigate('./(hostmainpage)/MainTabNavigator/MainTabNavigator')}}>
          <Text style={styles.publishButtonText}>PUBLISH LISTING</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => router.navigate('./page4')}>
          <Text style={styles.editButtonText}>EDIT LISTING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 20,
    
  },
  description: {
    fontSize: 17,
    textAlign: 'left',
    marginBottom: 40,
    color: 'gray',
    paddingRight: 60
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 45
  },
  publishButton: {
    //backgroundColor: '#00bfa5',
    backgroundColor: '#019AB7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#fff',
    //borderColor: '#00bfa5',
    borderColor: '#019AB7',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  editButtonText: {
    //color: '#00bfa5',
    color: '#019AB7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReadyToPublish;
