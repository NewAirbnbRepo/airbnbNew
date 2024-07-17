import { View, Text, Button, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

// type UserData = {
//   id: string
//   username: string
//   firstname: string
//   lastname: string
//   avatar_url: string
//   created_at: string
// }

const profile = ({ session }: { session: Session }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [avatar_url, setAvatar_url] = useState('')
  const [newUsername, setNewUsername] = useState('');
  const [newFirstname, setNewFirstname] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const [newAvatar_url, setNewAvatar_url] = useState('');
  const [user, setUser] = useState([]);
  const [updated_at, setUpdated_at] = useState('')
  

  //becoming a host
  const handleBecomeAHost = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not logged in");
      setLoading(true)
    

      // Insert a new host record with the user's ID
      const { data, error } = await supabase.from('property').insert([
        {
          hostid: user.id,
          location: 'Kumasi'
          // Add any other host-specific data here
        },
      ]);

      if (error) {
        console.error('Error becoming a host:', error);
      } else {
        console.log('User is now a host');
      }
    } catch (error) {
      console.error('Error becoming a host:', error);
    }
  }


  // Load user data on mount
  useEffect(() => {
   getProfile()
  }, [])

    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("User not logged in");
        setLoading(true)

        const { data, error, status } = await supabase
          .from('user')
          .select(`firstname, lastname, username, avatar_url, created_at`)
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }else if (data) {
          setUsername(data.username);
          setFirstname(data.firstname);
          setLastname(data.lastname);
          setAvatar_url(data.avatar_url);
          setNewFirstname(data.firstname);
          setNewAvatar_url(data.avatar_url);
          setNewLastname(data.lastname);
          setUpdated_at(data.created_at);
        }
        
  }catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
    }
  } finally {
    setLoading(false)
  }
}

  // Update Clerk user data
  async function updateProfile({
    newFirstname,
    newLastname,
    newAvatar_url,
  }: {
    newFirstname: string
    newLastname: string
    newAvatar_url: string
  }) {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("User not logged in");
        setLoading(true)
      //if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: user.id,
        firstname: newFirstname,
        lastname: newLastname,
        avatar_url: newAvatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('user').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfileWithImageUrl = async (imageUrl: any) => {
    try {
      const response = await supabase.auth.getUser();
      if (response.error) {
        console.error('Error getting user:', response.error);
        return;
      }
      const user = response.data.user; // Adjusted based on the assumed correct structure
  
      const { data, error: updateError } = await supabase
        .from('user')
        .update({ avatar_url: imageUrl })
        .eq('id', user.id);
  
      if (updateError) {
        console.error('Error updating user profile:', updateError);
        return;
      }
  
      console.log('User profile updated with image URL:', imageUrl);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1,1],
      base64: true,
    });

    if (!result.canceled) {
        // Do something with the uploaded image URL, e.g., save it to the user's profile
        await updateUserProfileWithImageUrl(result.assets[0].uri);
        setAvatar_url(result.assets[0].uri)
      };
    }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>
      
      <View style={styles.card}>
        <View>
        <TouchableOpacity onPress={onCaptureImage}>
          <Image source={{ uri: avatar_url  || '@/assets/images/avatar.png'}} style={styles.avatar} />
        </TouchableOpacity>
        </View>
        
        <View style={{ flexDirection: 'row', gap: 6 }}>
          
        {!editing && (
              <View  style={styles.editRow}>
                <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                  {firstname} {lastname}
                </Text>
                <TouchableOpacity onPress={() => setEditing(true)}>
                  <Ionicons name="create-outline" size={24} />
                </TouchableOpacity>
              </View>
            )}
            {editing && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="grey"
                  value={newFirstname || ''}
                  onChangeText={setNewFirstname}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="grey"
                  value={newLastname || ''}
                  onChangeText={setNewLastname}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={() => updateProfile({ newFirstname, newLastname, newAvatar_url })}>
                  <Ionicons name="checkmark-outline" size={24} />
                </TouchableOpacity>
              </View>
            )}
            </View>
            <Text>{username }</Text>
          <Text>Since {updated_at}</Text>
          </View>

        <TouchableOpacity  onPress={handleBecomeAHost}>
          <Text style={styles.hostButton}>Log In As A Host?</Text>
          </TouchableOpacity> 
          

      <TouchableOpacity style={[defaultStyles.btn, styles.logoutbtn]} onPress={() => supabase.auth.signOut()} >
            <Text style={defaultStyles.btnText}>LOG OUT</Text>
      </TouchableOpacity>

      {!session && (
        <Link href={'/(modals)/login'} asChild>
          <Text>Log In"</Text>
        </Link>
      )}
        
          </SafeAreaView>
    
  );

}

  export default profile

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 26,
  },
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  logoutbtn: {
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    left: 30
  },
  hostButton: {
    textAlign: 'center',
    color : '#4EC7FD',
    fontSize : 16,
    fontWeight : '400',
    fontFamily : 'K2D',
    //bottom : 50
  },
});



