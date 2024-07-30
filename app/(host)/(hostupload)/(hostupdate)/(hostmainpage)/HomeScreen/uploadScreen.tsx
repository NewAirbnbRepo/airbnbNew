import React, { useMemo, useState } from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, Pressable, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker  from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { defaultStyles } from '@/constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UploadScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [image, setImage ] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  

  const  insets = useSafeAreaInsets();

    const createPost = async () => {
        setUploading(true);
        try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not logged in");
      setLoading(true) 

      const { error: updateError } = await supabase
      .from('property')
      .update({ title, description, image })
      .eq('hostid', user.id);

      if (updateError) {
        Alert.alert('Upload failed', updateError.message);
        setLoading(false)
      } else {
        Alert.alert('Upload successful');
        navigation.canGoBack(); // Navigate to the filter screen
      }
      }catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

    if (!result.canceled && result.assets) {
        setImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
        }
    }

  return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
        <Pressable onPress={pickImage}>
            <Text style={styles.uploadtxt}>Upload Image Here</Text>
             <Image source={{uri: image}} style={styles.imagebox} />
        </Pressable>

        <View style={styles.input}>
        <Text style={styles.uploadtxt}>Name Of Hostel</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={ setTitle }
                placeholder="Input your hostel name here"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={title}
              />
            </View>

        <View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={8}
        style={styles.textArea}
        placeholder="Enter your long text here..."
      />
    </View>

    <TouchableOpacity onPress={createPost}>
    <View style={defaultStyles.btn}>
       <Text style={styles.btnText}>Get Started</Text>
    </View>
    </TouchableOpacity>
    </KeyboardAwareScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    flex: 1,
    backgroundColor: '#f5f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
 uploadtxt: {
  marginTop: 50,
    textAlign: 'left',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textArea: {
    width: 350,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 20,
    marginTop: 30,
    backgroundColor:'white',
    marginBottom: 30,
  },
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
    width: 350,
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
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'mon-sb',
    color: '#fff',
    width: 150,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default UploadScreen;
