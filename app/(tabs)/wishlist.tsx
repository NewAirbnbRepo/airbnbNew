import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { defaultStyles } from '@/constants/Styles';

const WishlistScreen = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
    <View style={styles.title}>
      <Text style={styles.subheading}>Create your first wishlist</Text>
      <Text style={styles.instructions}>
        As you search, tap the heart icon to save your favorite places to stay or etc.
      </Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'mon-b',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginLeft: 10,
  },
  subheading: {
    fontFamily: 'mon-b',
    fontSize: 35,
    color: '#11C3C3',
    marginTop: 10,
    marginLeft: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
export default WishlistScreen;
