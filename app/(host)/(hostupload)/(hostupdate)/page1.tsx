import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';

const StudentRequirements = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Review HomeHive’s student requirements</Text>
      <Text style={styles.subtitle}>
        HomeHive has caveats and requirements students must meet before they book their hostels
      </Text>

      <Text style={styles.sectionTitle}>Make sure all students have provided:</Text>
      <Text style={styles.requirement}>✓ Their contact information (Email and confirmed phone number)</Text>
      <Text style={styles.requirement}>✓ Their payment information (You will confirm this with them upon arrival)</Text>

      <Text style={[styles.sectionTitle, {marginTop: 40}]}>Make sure all students have:</Text>
      <Text style={styles.requirement}>✓ Agreed to any rules and regulations you have set for your Hive</Text>
      <Text style={styles.requirement}>✓ Informed you about their arrival dates</Text>
      <Text style={styles.requirement}>✓ Let you know how many people are coming</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, backgroundColor: '#fff' }]} onPress={() => router.navigate('../finish')} >
            <Text style={[defaultStyles.btnText, {color: '#044D5B'}]}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140,}]} onPress={() => router.navigate('./page2')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
    margin: 5,
    paddingRight: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 60,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  requirement: {
    fontSize: 18,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default StudentRequirements;
