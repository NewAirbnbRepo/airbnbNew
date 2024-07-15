import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Account Settings</Text>
      </View>
      
      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <EvilIcons name="user" size={30} />
          <Text style={styles.optionText}>Personal Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="lock-closed-outline" size={25} />
          <Text style={styles.optionText}>Login & Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="card-outline" size={25} />
          <Text style={styles.optionText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="language-outline" size={25} />
          <Text style={styles.optionText}>Translation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Support</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="call-outline" size={25} />
          <Text style={styles.optionText}>Call for Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle-outline" size={25} />
          <Text style={styles.optionText}>Get Help with a Safety Issue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="alert-circle-outline" size={25} />
          <Text style={styles.optionText}>Report a Host</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="chatbox-outline" size={25} />
          <Text style={styles.optionText}>Give Us Feedback</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout}>
        <Ionicons name="log-out-outline" size={25} />
        <Text style={styles.optionText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0000</Text>
        <Text style={styles.footerText}>© All Rights Reserved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  header: {
    fontFamily: 'mon-sb',
    fontSize: 20,
  },
  section: {
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
});

export default Settings;
