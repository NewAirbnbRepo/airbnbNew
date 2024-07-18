import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add your photo</Text>
      <Image
        source={{ uri: 'https://example.com/profile.jpg' }} // replace with your image URL
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={/*handleUploadPhotos*/()=>''}>
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
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./finish')} >
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
});

export default ProfileScreen;
