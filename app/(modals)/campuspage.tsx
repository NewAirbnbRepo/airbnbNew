import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Pressable, Image } from 'react-native' // Assuming 'Text' is from the 'react-native' library
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'


function campuspage() {
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <Text style={styles.searchtxt}>Campus</Text>
            <View style={styles.actionrow}>
                <Pressable style={styles.searchbtn}>
                   <Ionicons style={{left: 15, top: 7}} name='search' size= {30} color={'grey'}/>  
                   <TextInput style={{ fontSize: 30, bottom: 25, left: 50 }} placeholder='Search' />
                   
                </Pressable>
            </View>
            <View>
                <Pressable onPress={ () => router.replace('../(tabs)')}>
                    <Image source={{uri:'https://vguhsejvmsiaczfththm.supabase.co/storage/v1/object/public/campus_pics/mainpage/KNUST.png'}} 
                            style = {styles.image}>

                    </Image>
                    <Text style= {styles.maintxt}>Kwame Nkrumah University Of Scinece & Technology</Text>
                    <Text style= {styles.microtxt}>Campus Dorms, Hostels, Apartments all available.</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={ () => router.replace('../(tabs)')}>
                    <Image source={{uri:'https://vguhsejvmsiaczfththm.supabase.co/storage/v1/object/public/campus_pics/mainpage/University_of_Ghana.png'}} 
                            style = {styles.image}>

                    </Image>
                    <Text style= {styles.maintxt}>University Of Ghana</Text>
                    <Text style= {styles.microtxt}>Campus Dorms, Hostels, Apartments all available.</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={ () => router.replace('../(tabs)')}>
                    <Image source={{uri:'https://vguhsejvmsiaczfththm.supabase.co/storage/v1/object/public/campus_pics/mainpage/University_of_Cape_Coast.png?t=2024-07-11T03%3A59%3A00.866Z'}} 
                            style = {styles.image}>

                    </Image>
                    <Text style= {styles.maintxt}>University Of Cape Coast</Text>
                    <Text style= {styles.microtxt}>Campus Dorms, Hostels, Apartments all available.</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
    
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: 130,
    },
    searchbtn: {
        height: 50,
        width: '90%',
        borderWidth: 1,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        left: 20,
        textAlign : 'center',
        fontSize: 20,
        marginBottom: 20,
    },
    actionrow: {
        flexDirection: 'row',
    },
    searchtxt: {
        fontSize: 40,
        fontWeight: 'bold',
        left: 30,
        marginBottom: 40,
        top: 20,
        fontFamily : 'K2D',
        color: '#2D0C57'
    },
    searchmssg: {
        left: -140,
        
    },
    image: {
        width: '90%',
        height: 102,
        top: 20,
        left: 15,
        borderRadius: 8,
    },
    maintxt: {
        fontFamily: 'K2D-b',
        left: 20,
        marginTop: 25,
        fontSize: 20,
    },
    microtxt: {
        fontFamily: 'K2D',
        left: 20,
        marginTop: 1,
        fontSize: 15,
        color: '#c1c1c1',
        marginBottom: 15,
    }
})
export default campuspage
