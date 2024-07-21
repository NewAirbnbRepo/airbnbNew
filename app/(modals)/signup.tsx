import React from "react";
import { ScrollView, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, AppState, SafeAreaView } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import Colors from '@/constants/Colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
        <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Let's Get Started!</Text>
        </View>
        <Text style={styles.subtitle}>Additional Information</Text>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
                autoCapitalize="none"
                placeholder='First Name'
                placeholderTextColor="grey"
                value={firstname }
                onChangeText={setFirstname}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
            />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
                autoCapitalize="none"
                placeholder="Last Name"
                placeholderTextColor="grey"
                value={lastname}
                onChangeText={setLastname}
                style={[defaultStyles.inputField, { marginBottom: 10 }]}
            />
            </View>
            
            <Text style={ {marginBottom: 10}}> Make sure this matches the name on your legally issued ID. </Text>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>Username</Text>
          <TextInput
                autoCapitalize="none"
                placeholder="Username"
                placeholderTextColor="grey"
                value={username}
                onChangeText={setUsername}
                style={[defaultStyles.inputField, { marginBottom: 30 },{ marginTop: 10}]}
            />
            </View>

          
            <View style={styles.seperatorView}>
        <View
              style={{
                flex: 2,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            /><Text style={styles.seperator}>Business Information</Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email</Text>
          <TextInput
                autoCapitalize="none"
                placeholder="example@gmail.com"
                placeholderTextColor="grey"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          </View>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
            <TextInput
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor="grey"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          </View>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
                autoCapitalize="none"
                placeholder=" Confirm Password"
                placeholderTextColor="grey"
                value={confirmpassword}
                onChangeText={setConfirmpassword}
                secureTextEntry={true}
                style={[defaultStyles.inputField, { marginBottom: 10 }]}
          />
          </View>

          
            <View style={styles.input}>
            <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
              value={phone_number}
              onChangeText={setPhone_number}
              placeholder="Phone Number "
              placeholderTextColor="grey"
              autoCapitalize={'none'}
              style={[defaultStyles.inputField, { marginBottom: 30 },{ marginTop: 10}]}
            />
            </View>
          
            <View style={styles.input}>
            <Text style={styles.inputLabel}>Address Line 1</Text>
          <TextInput
                autoCapitalize="none"
                placeholder="Address Line 1"
                placeholderTextColor="grey"
                value={address_line1}
                onChangeText={setAddress_line1}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          </View>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>Address Line 2</Text>
          <TextInput
                autoCapitalize="none"
                placeholder="Address Line 2 (Optional)"
                placeholderTextColor="grey"
                value={address_line2}
                onChangeText={setAddress_line2}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          </View>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>City</Text>
          <TextInput
                autoCapitalize="none"
                placeholder="City"
                placeholderTextColor="grey"
                value={city}
                onChangeText={setCity}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          </View>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>Postal Address</Text>
          <TextInput
                autoCapitalize="none"
                placeholder="Postal Address"
                placeholderTextColor="grey"
                value={postal_code}
                onChangeText={setPostal_code}
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          </View>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>Country</Text>
          <TextInput
                autoCapitalize="none"
                placeholder="Country"
                placeholderTextColor="grey"
                value={country}
                onChangeText={setCountry}
                style={[defaultStyles.inputField, { marginBottom: 10 }]}
          />
          </View>

          <Text style={ {marginBottom: 10}} >By selecting Agree and continue, I agree to StayFinder’s {"\b"}Terms {"\b"}of {"\b"}Service, {"\b"}Payments {"\b"}Terms {"\b"}of {"\b"}Service and {"\b"}Anti-Discrimination {"\b"}Policy and acknowledge the {"\b"}Privacy {"\b"}Policy.</Text>
          <TouchableOpacity style={[defaultStyles.btn,  {marginBottom: 200}]} onPress={handleSignUp} disabled={loading} >
            <Text style={defaultStyles.btnText}>AGREE AND CONTINUE</Text>
          </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
    );
}

export default signup1

const styles = StyleSheet.create({
      container: {
        paddingVertical: 35,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      title: {
        fontSize: 31,
        textAlign: 'center',
        fontFamily: 'mon-b',
        color: '#1D2A32',
        marginBottom: 6,
        flex: 1,
      },
      form: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      formFooter: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
      },
      seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
      },
      seperator: {
        fontFamily: 'mon-sb',
        color: '#929292',
        fontSize: 16,
      },
      header: {
        alignItems: 'center',
        justifyContent: 'center',  
        marginBottom: 24,
        paddingHorizontal: 24,
        flexDirection: 'row',
      },
      headerBack: {
        padding: 8,
        paddingTop: 0,
        position: 'absolute',
        left: 24,
      },
      subtitle: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'mon-sb',
        color: '#929292',
        marginBottom: 15,
        marginTop: -5
      },
      inputLabel: {
        fontSize: 17,
        fontFamily: 'mon-sb',
        color: '#222',
        marginBottom: 8,
      },
      input: {
        marginBottom: 16,
      },
      inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontFamily: 'mon',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
      },
      checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#6b7280',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      },
      checked: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
      },
      checkboxLabel: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: '#6b7280',
      },
    })