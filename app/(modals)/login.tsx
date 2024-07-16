import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, Pressable} from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Link, router } from 'expo-router'




const Page = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [ password, setPassword] = useState("")


  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (!session) Alert.alert('Please check your inbox for email verification!')
      setLoading(false)
    if (error) {
      Alert.alert('Login failed', error.message);
    } else {
      Alert.alert('Login successful');
      router.navigate('/');
    }
  } 


  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />

      <TouchableOpacity style={defaultStyles.btn} onPress={ ()=> signInWithEmail() } disabled={loading}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.signup}>
      <Text style = {styles.message2}>DON'T HAVE AN ACCOUNT? </Text>

      <Link href= {'../(modals)/signup'} style = {styles.loginButton}>SIGN UP</Link>
      </View>
    </View>
  );
};


export default Page;

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
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  message2: {
    fontFamily : 'K2D',
    fontWeight : '400',
    fontSize : 16,
    textAlign : 'center',
    bottom : 60
  },
  loginButton: {
    textAlign: 'center',
    color : '#4EC7FD',
    fontSize : 16,
    fontWeight : '400',
    fontFamily : 'K2D',
    bottom : 50
  },
  signup: {
    top: 230,
  }
});
