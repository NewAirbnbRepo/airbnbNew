import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';


const ProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [avatar_url, setAvatar_url] = useState('');
  const [newAvatar_url, setNewAvatar_url] = useState('');

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
        setAvatar_url(data.avatar_url);
        setNewAvatar_url(data.avatar_url);
      }
      
    }catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
    }

  const updateUserProfileWithImageUrl = async (imageUrl: string) => {
    try {
      const response = await supabase.auth.getUser();
      if (response.error) {
        console.error('Error getting user:', response.error);
        return;
      }
      const user = response.data.user; // Adjusted based on the assumed correct structure
  
      const { data, error: updateError } = await supabase
        .from('user')
        .update(avatar_url)
        .eq('id', user.id);
  
      if (updateError) {
        console.error('Error updating user profile:', updateError);
        return;
      }else{
        router.navigate('./phoneupdate')
      }
  
      console.log('User profile updated with image URL:', imageUrl);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };


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
    <View style={styles.container}>
        <View style={styles.header}>
        {/* Add your progress bar here */}
        <View style={styles.progressBar}>
        <View style={[styles.box,]}/>
        </View>
      </View>
      <Text style={styles.title}>Add your photo</Text>
      <Image
        source={avatar_url? { uri: avatar_url }: require('../../../assets/images/avatar.png')} // replace with your image URL
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={onCaptureImage}>
        <Icon name="cloud-upload-outline" size={25} color="#000000" />
          <Text style={styles.uploadButtonText}>UPLOAD PHOTOS</Text>
        </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.useCurrentPhoto}>USE CURRENT HOMEHIVE PHOTO</Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', bottom: 0}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./placeIdentity')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={()=>router.navigate('./phoneupdate')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 33,
    marginBottom: 20,
    marginLeft: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  uploadButton: {
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#888888',
    backgroundColor: '#ffff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    flexDirection: 'row',
    gap : 10,
    width: 200,
    marginBottom: 10,
  },
  uploadButtonText: {
    fontSize: 17,
    color: '#000',
  },
  useCurrentPhoto: {
    fontSize: 17,
    color: '#045F70',
    marginBottom: 15,
  },
  header: {
    // Add styles for your header/progress bar here
    marginBottom: 16,
    marginTop: 30,
  },
  progressBar: {
    backgroundColor: '#ccc',
    width: '100%',
    borderRadius: 5,
  },
  box: {
    width: 210,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default ProfileUpdate;
