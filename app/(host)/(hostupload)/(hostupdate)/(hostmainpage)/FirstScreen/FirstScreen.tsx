import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import Colors from '@/constants/Colors';




const places = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Kwame Nkrumah University Of Science & Technology',
    description: 'Main Campus - Kumasi',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Kwame Nkrumah University Of Science & Technology',
    description: 'Obuasi Campus - Obuasi',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Tucson, Arizona',
    description: 'A city in Arizona known for its desert landscapes and rich history.',
  },
];
//@ts-ignore
const FirstScreen = ({navigation}) => (
  
  <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
    <View style={styles.container}>
      <Text style={styles.title}>Campus</Text>
      <Text style={styles.instructions}>
        Select the location of your Hostel/Homestel
      </Text>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {places.map(
          ({ id, img, name,  description }, index) => {
            function handleSave(id: number): void {
              throw new Error('Function not implemented.');
            }

            return (
              <TouchableOpacity
                 key={id}
                 onPress={() => navigation.navigate(/*'SecondScreen'*/'MainTabNavigator')}>
                <View style={styles.card}>
                  <Image source={{ uri: img }} style={styles.cardImg} />
                  <View style={styles.cardLikeWrapper}>
                    <TouchableOpacity onPress={() => handleSave(id)}>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardTop}></View>
                  <View style={styles.cardBody}>
      

                  <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{name}</Text>
                    </View>
                    <Text style={styles.cardDescription}>{description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          },
        )}
      </ScrollView>
    </View>
  </SafeAreaView>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 24,
    
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20, // Adjust based on your layout needs
  },
  title: {
    fontSize: 32,
    fontFamily: 'mon-b',
    color: '#1d1d1d',
    marginTop: 12,
    textAlign: 'justify',
    marginLeft: 5
  },
  subheading: {
    fontFamily: 'mon-b',
    fontSize: 35,
    color: '#11C3C3',
    marginTop: 14,
    marginLeft: 5,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    fontFamily: 'mon-sb'
  },
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'mon-b',
    color: '#232425',
    marginRight: 'auto',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: '500',
    color: '#232425',
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.grey,
    fontFamily: 'mon'
  },
});

export default FirstScreen;
