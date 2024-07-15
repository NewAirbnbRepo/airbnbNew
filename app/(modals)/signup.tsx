import React from "react";
import { ScrollView, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, AppState } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import Colors from '@/constants/Colors'

AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    })

const signup1 = () => {
      const [loading, setLoading] = useState(false)
      const [username, setUsername] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmpassword, setConfirmpassword] = useState('')
      const [firstname, setFirstname] = useState('')
      const [lastname, setLastname] = useState('')
      const [phone_number, setPhone_number] = useState('')
      const [address_line1, setAddress_line1] = useState('')
      const [address_line2, setAddress_line2] = useState('')
      const [city, setCity] = useState('')
      const [postal_code, setPostal_code] = useState('')
      const [country, setCountry] = useState('')

      const handleSignUp = async () => {
            setLoading(true);
        
            // Create a new user with Supabase authentication
            const { data: {session}, error } = await supabase.auth.signUp({
              email,
              password,
            });
        
            if (error) {
              Alert.alert('Sign Up failed', error.message);
              setLoading(false);
              return;
            }
            if (password !== confirmpassword) {
                Alert.alert('Passwords do not match')
                setLoading (false)
                return;
              }



            // Insert additional user details into your Supabase database
            const { error: insertError,  } = await supabase
             .from('user')
             .upsert([
            {
             id: session?.user.id,
             username,
             firstname,
             lastname,
             phone_number,
             address_line1,
             address_line2,
             city,
             postal_code,
             country,
            }
            ]);

            setLoading(false);

            if (insertError) {
                  Alert.alert('Sign Up failed', insertError.message);
                  setLoading(false)
                } else {
                  Alert.alert('Sign Up successful');
                  router.navigate('../(modals)/campuspage'); // Navigate to the filter screen
                }
              };

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.seperator}>FULL NAME</Text>
            <TextInput
            autoCapitalize="none"
            placeholder='First Name'
            placeholderTextColor="grey"
            value={firstname }
            onChangeText={setFirstname}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
        />
        
        <TextInput
            autoCapitalize="none"
            placeholder="Second Name"
            placeholderTextColor="grey"
            value={lastname}
            onChangeText={setLastname}
            style={[defaultStyles.inputField, { marginBottom: 10 }]}
        />
        <Text style={ {marginBottom: 10}}> Make sure this matches the name on your legally issued ID. </Text>
        <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>PROFILE INFO</Text>
      </View>
        
       <TextInput
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="grey"
            value={username}
            onChangeText={setUsername}
            style={[defaultStyles.inputField, { marginBottom: 30 },{ marginTop: 10}]}
        />
       <TextInput
            autoCapitalize="none"
            placeholder="example@gmail.com"
            placeholderTextColor="grey"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
        <TextInput
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
            autoCapitalize="none"
            placeholder=" Confirm Password"
            placeholderTextColor="grey"
            value={confirmpassword}
            onChangeText={setConfirmpassword}
            secureTextEntry={true}
            style={[defaultStyles.inputField, { marginBottom: 10 }]}
      />

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 2,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>CONTACT INFO</Text>
      </View>
      
      <TextInput
          value={phone_number}
          onChangeText={setPhone_number}
          placeholder="Phone Number "
          placeholderTextColor="grey"
          autoCapitalize={'none'}
          style={[defaultStyles.inputField, { marginBottom: 30 },{ marginTop: 10}]}
        />

      <TextInput
            autoCapitalize="none"
            placeholder="Address Line 1"
            placeholderTextColor="grey"
            value={address_line1}
            onChangeText={setAddress_line1}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
            autoCapitalize="none"
            placeholder="Address Line 2 (Optional)"
            placeholderTextColor="grey"
            value={address_line2}
            onChangeText={setAddress_line2}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
            autoCapitalize="none"
            placeholder="City"
            placeholderTextColor="grey"
            value={city}
            onChangeText={setCity}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
            autoCapitalize="none"
            placeholder="Postal Address"
            placeholderTextColor="grey"
            value={postal_code}
            onChangeText={setPostal_code}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
            autoCapitalize="none"
            placeholder="Country"
            placeholderTextColor="grey"
            value={country}
            onChangeText={setCountry}
            style={[defaultStyles.inputField, { marginBottom: 10 }]}
      />
      <Text style={ {marginBottom: 10}} >By selecting Agree and continue, I agree to StayFinder’s {"\b"}Terms {"\b"}of {"\b"}Service, {"\b"}Payments {"\b"}Terms {"\b"}of {"\b"}Service and {"\b"}Anti-Discrimination {"\b"}Policy and acknowledge the {"\b"}Privacy {"\b"}Policy.</Text>
      <TouchableOpacity style={[defaultStyles.btn,  {marginBottom: 200}]} onPress={handleSignUp} disabled={loading} >
        <Text style={defaultStyles.btnText}>AGREE AND CONTINUE</Text>
      </TouchableOpacity>
      </ScrollView>
    );
}

export default signup1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
      },
      seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
          },
        seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey,
        fontSize: 16,
          },
    })