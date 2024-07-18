import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  const handleUploadPhotos = () => {
    // Handle photo upload logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Add your progress bar here */}
      </View>
      <Text style={styles.title}>Add photos of your Hive</Text>
      <Text style={styles.description}>
        Photos help students imagine staying in your place. You can start with one and add more after you publish.
      </Text>
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhotos}>
        <Icon name="cloud-upload-outline" size={25} color="#fff" />
          <Text style={styles.uploadButtonText}>UPLOAD {'\n'}PHOTOS</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('../finish')} >
            <Text style={defaultStyles.btnText}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, }]} onPress={() => router.navigate('./placeIdentity')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    // Add styles for your header/progress bar here
    marginBottom: 16,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 17,
    color: '#666',
    marginBottom: 24,
  },
  uploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: '#ccc',
    borderRadius: 10,
    height: 364,
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#045F70',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    flexDirection: 'row',
    gap : 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
