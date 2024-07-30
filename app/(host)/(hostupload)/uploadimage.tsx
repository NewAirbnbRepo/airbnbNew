import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { FileObject } from '@supabase/storage-js';
import * as ImagePicker  from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';


const App = () => {

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState('');
  const [showUpload2, setShowUpload2] = useState('');
  const [showUpload3, setShowUpload3] = useState('');
  const [showUpload4, setShowUpload4] = useState('');
  const [showUpload5, setShowUpload5] = useState('');


  
  const uploadPhotos = async () => {
    // Handle photo upload logic
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("User not logged in");
        setLoading(true)
    if (!result.canceled && result.assets) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const filePath = `${user.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
      await supabase.storage.from('homehive').upload(filePath, decode(base64!), { contentType });
      setShowUpload(img.uri)
      }
    }
    const uploadPhotos2 = async () => {
      // Handle photo upload logic
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      const { data: { user } } = await supabase.auth.getUser()
          if (!user) throw new Error("User not logged in");
          setLoading(true)
      if (!result.canceled && result.assets) {
        const img = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
        const filePath = `${user.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
        const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
        await supabase.storage.from('homehive').upload(filePath, decode(base64!), { contentType });
        setShowUpload2(img.uri)
        }
      }
      const uploadPhotos3 = async () => {
        // Handle photo upload logic
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: true,
        });
        const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("User not logged in");
            setLoading(true)
        if (!result.canceled && result.assets) {
          const img = result.assets[0];
          const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
          const filePath = `${user.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
          const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
          await supabase.storage.from('homehive').upload(filePath, decode(base64!), { contentType });
          setShowUpload3(img.uri)
          }
        }
        const uploadPhotos4 = async () => {
          // Handle photo upload logic
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
          });
          const { data: { user } } = await supabase.auth.getUser()
              if (!user) throw new Error("User not logged in");
              setLoading(true)
          if (!result.canceled && result.assets) {
            const img = result.assets[0];
            const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
            const filePath = `${user.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
            const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
            await supabase.storage.from('homehive').upload(filePath, decode(base64!), { contentType });
            setShowUpload4(img.uri)
            }
          }
          const uploadPhotos5 = async () => {
            // Handle photo upload logic
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
              base64: true,
            });
            const { data: { user } } = await supabase.auth.getUser()
                if (!user) throw new Error("User not logged in");
                setLoading(true)
            if (!result.canceled && result.assets) {
              const img = result.assets[0];
              const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
              const filePath = `${user.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
              const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
              await supabase.storage.from('homehive').upload(filePath, decode(base64!), { contentType });
              setShowUpload5(img.uri)
              }
            }


            const onRemoveImage = async (item: FileObject) => {
              const { data: { user } } = await supabase.auth.getUser()
              if (!user) throw new Error("User not logged in");

              supabase.storage.from('files').remove([`${user!.id}/${item.name}`]);
              return true;
            };

  return (
    < ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Add your progress bar here */}
        <View style={styles.progressBar}>
        <View style={[styles.box,]}/>
        </View>
      </View>

      <Text style={styles.title}>Add photos of your Hive</Text>
      <Text style={styles.description}>
        Photos help students imagine staying in your place. You can start with one and add more after you publish.
      </Text>

      
      
        <TouchableOpacity onPress={uploadPhotos}>
          <Image source={showUpload? {uri: showUpload}: require('../../../assets/images/default Hostel.jpg')} style={styles.uploadContainer} /> 
          <View style={{alignItems: 'center'}}>
            {!showUpload && <View style={styles.uploadButton }>
              <Icon name="cloud-upload-outline" size={25} color="#fff" />
              <Text style={styles.uploadButtonText}>UPLOAD {'\n'}PHOTOS</Text>
            </View>}
          </View> 
        </TouchableOpacity>
      
       {showUpload && (
      <TouchableOpacity onPress={uploadPhotos2}>
          <Image source={showUpload? {uri: showUpload2}: require('../../../assets/images/hostel coridor.png')} style={styles.uploadContainer} /> 
          <View style={{alignItems: 'center'}}>
              {!showUpload2 && <View style={styles.uploadButton }>
                <Text style={styles.uploadButtonText}>+ ADD IMAGE</Text>
              </View>}
            </View> 
          </TouchableOpacity>
        )}

      {showUpload2 && (
      <TouchableOpacity onPress={uploadPhotos3}>
          <Image source={showUpload? {uri: showUpload3}: require('../../../assets/images/hostelbath.jpg')} style={styles.uploadContainer} /> 
          <View style={{alignItems: 'center'}}>
              {!showUpload3 && <View style={styles.uploadButton }>
                <Text style={styles.uploadButtonText}>+ ADD IMAGE</Text>
              </View>}
            </View> 
          </TouchableOpacity>
        )}
        {showUpload3 && (
      <TouchableOpacity onPress={uploadPhotos4}>
          <Image source={showUpload? {uri: showUpload4}: require('../../../assets/images/hostel studyroom.jpg')} style={styles.uploadContainer} /> 
          <View style={{alignItems: 'center'}}>
              {!showUpload4 && <View style={styles.uploadButton }>
                <Text style={styles.uploadButtonText}>+ ADD IMAGE</Text>
              </View>}
            </View> 
          </TouchableOpacity>
        )}
        {showUpload4 && (
      <TouchableOpacity onPress={uploadPhotos5}>
          <Image source={showUpload? {uri: showUpload5}: require('../../../assets/images/gettyimages.png')} style={styles.uploadContainer} /> 
          <View style={{alignItems: 'center'}}>
              {!showUpload5 && <View style={styles.uploadButton }>
                <Text style={styles.uploadButtonText}>+ ADD IMAGE</Text>
              </View>}
            </View> 
          </TouchableOpacity>
        )}

    { showUpload && <TouchableOpacity onPress={()=>onRemoveImage} style={{marginBottom: 30, alignItems: 'center'}}>
        <Icon2 name = 'cancel' size={40} color='#045F70'/>
        <Text style={{fontSize: 30, color: '#045F70'}}> Clear all</Text>
      </TouchableOpacity>}

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, backgroundColor: '#fff' }]} onPress={() => router.navigate('../finish')} >
            <Text style={[defaultStyles.btnText, {color: '#044D5B'}]}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140,}]} onPress={() => router.navigate('./placeIdentity')} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    // Add styles for your header/progress bar here
    marginBottom: 16,
    marginTop: 30,
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
  imagebox: {
    aspectRatio: 1,
    width: '95%',
    borderRadius: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    //marginBottom: 20,
    backgroundColor: 'white',
    objectFit: 'cover',
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
    width: 150,
    bottom: 250,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressBar: {
    backgroundColor: '#ccc',
    width: '100%',
    borderRadius: 5,
  },
  box: {
    width: 70,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default App;
