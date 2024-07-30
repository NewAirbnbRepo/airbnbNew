import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Linking, TouchableOpacity } from 'react-native';

const RulesAndRegulations = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rules, laws and regulations</Text>
      <Text style={styles.description}>
        Make sure you familiarize yourself with your local laws, as well as <Text style={styles.link} onPress={() => Linking.openURL('https://example.com')}>HomeHive’s Nondiscrimination Policy and terms</Text>
      </Text>

      <Text style={styles.description}>
        Take a moment to review the local laws that apply to your listing. We want to make sure you have everything you need to get off to a great start.
      </Text>

      <Text style={styles.description}>
        Most cities have rules covering homesharing, and the specific codes and ordinances can appear in many places(such as zoning, building, licensing or tax codes). In most places, you must register, get a permit, or obtain a license before you list your property or accept guests. You may also be responsible for collecting and remitting certain taxes in some places, short-term rentals could be prohibited altogether.
      </Text>

      <Text style={styles.description}>
        Since you are responsible for your own decision to list or book, you should get comfortable with the applicable rules before listing on HomeHive. Thanks!
      </Text>

      <Text style={styles.learnMore} onPress={() => Linking.openURL('https://example.com')}>Learn more</Text>

      <Text style={styles.description}>
        By accepting our Terms of Service and listing your space, you certify that you will follow applicable laws and regulations.
      </Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, backgroundColor: '#fff' }]} onPress={() => router.navigate('./page2')} >
            <Text style={[defaultStyles.btnText, {color: '#044D5B'}]}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140,}]} onPress={() => router.navigate('./page4')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
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
    textAlign: 'left',
    marginBottom: 20,
    marginTop : 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 20,
    color: 'gray',
  },
  link: {
    color: 'blue',
  },
  learnMore: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default RulesAndRegulations;
