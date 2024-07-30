import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AppState,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase'
import MainTabNavigator from '../MainTabNavigator/MainTabNavigator';

//Backend starts here
AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    })

// Assuming you have a stack navigator setup somewhere in your app
type RootStackParamList = {
  FirstScreen: undefined;
  MainTabNavigator: undefined;
};

// Define the type for the props expected by FirstScreen
type FirstScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'FirstScreen'>;
};

const SecondScreen = ({ navigation }: FirstScreenProps) => {
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
              navigation.navigate("MainTabNavigator"); // Navigate to the filter screen
            }
          };

  return (
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
                clearButtonMode="while-editing"
                onChangeText={ setFirstname }
                placeholder="John"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={firstname}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={ setLastname }
                placeholder="Doe"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={lastname}
              />
            </View>

            <View style={styles.seperatorView}>
      <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>Business Information</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Business Address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={ setEmail }
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Emergency Contact</Text>
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={ setPhone_number }
                placeholder="+233"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={phone_number}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={ setPassword }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={password}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={ setConfirmpassword }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={confirmpassword}
              />
            </View>
            <View style={styles.checkboxContainer}>
  <TouchableOpacity onPress={() => {
    // Handle checkbox state change
    setLoading(true);
  }}>
    <View style={[styles.checkbox, loading ? styles.checked : null]}>
      {loading && <Ionicons name="checkmark-outline" size={24} color={Colors.primary} />}
    </View>
  </TouchableOpacity>
   <Text style={styles.checkboxLabel}>Agree to Terms & Conditions</Text>
</View>

            <View style={styles.formAction}>
              
              <TouchableOpacity //@ts-ignore 
              onPress={handleSignUp}>
                <View style={defaultStyles.btn}>
                  <Text style={styles.btnText}>Get Started</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

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
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'mon-sb',
    color: '#929292',
    marginBottom: 15,
    marginTop: -5
  },
  /** Header */
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
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  seperatorView:{
    flexDirection:'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: '#929292',
    fontSize: 16,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontFamily: 'mon-sb',
    color: '#222',
    marginBottom: 8,
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
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'mon-sb',
    color: '#fff',
  },
});

export default SecondScreen;
