import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set up your HomeHive!</Text>
      
      <View style={styles.stepContainer}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>1  Tell us about your Hive</Text>
          <Text style={styles.stepDescription}>Share some basic info, such as where it is and how many rooms are available.</Text>
        </View>
        <Image source={{uri: 'https://vguhsejvmsiaczfththm.supabase.co/storage/v1/object/public/campus_pics/setup%20host/tellusaboutyourhive.png'}} style={styles.stepImage} />
      </View>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        </View>
      
      <View style={styles.stepContainer}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>2  Make it stand out</Text>
          <Text style={styles.stepDescription}>Add 5 or more photos including interiors and exteriors, and titles and descriptions.</Text>
        </View>
        <Image source={{uri: 'https://vguhsejvmsiaczfththm.supabase.co/storage/v1/object/public/campus_pics/setup%20host/makeitstandout.png'}} style={styles.stepImage} />
      </View>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        </View>
      
      <View style={styles.stepContainer}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>3  Finish up and issue</Text>
          <Text style={styles.stepDescription}>Choose the specification of students you’d be accepting, set a starting price, and publish your listing.</Text>
        </View>
        <Image source={{uri: 'https://vguhsejvmsiaczfththm.supabase.co/storage/v1/object/public/campus_pics/setup%20host/finishupandissue.png'}} style={styles.stepImage} />
      </View>
      
      <TouchableOpacity style={[defaultStyles.btn, {width: 320}]} onPress={() => router.navigate('./SecondlyInfo')} >
        <Text style={defaultStyles.btnText}> GET STARTED</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    width: 373,
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 76,
    marginBottom: 80,
    color: '#2D0C57',
    fontFamily: 'K2D',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  stepContent: {
    flex: 1,
    marginLeft: 12,
    padding: 13,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'K2D',
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginLeft: 19,
    fontFamily: 'K2D',
  },
  stepImage: {
    width: 113,
    height: 103,
    marginLeft: 16,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#2D0C57',
    width: 320,
    height: 56,
    borderRadius: 8,
    textAlign: 'center',
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
});

export default App;
