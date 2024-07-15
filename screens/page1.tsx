import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const Page1 = () => {
    const [fontsLoaded] = useFonts({
        'mon' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
      });

  return (
    <View style={styles.container}>
      <Image source={require("../img/1.png")} style={styles.img} />
      <Text style={styles.title}>Maxx Scooter</Text>
      <Text style={styles.detail}>
        With an updated motor, and integrated anti-theft tech, the Maxx scooters
        are custom-tuned for the ultimate riding experience.
      </Text>
      <View>
        <Link href={'/(modals)/booking'}/>
      
      <TouchableOpacity
        style={styles.btn}>
        <Text style={styles.text}>
        Next
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212"
  },
  img: {
    height: "50%",
    width: "120%",
    resizeMode: "contain"
  },
  title: {
    color: '#FFF',
    fontFamily: "Montserrat_700Bold",
    fontSize: 30,
    marginTop: 20
  },
  detail: {
    color: "#FFF",
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 30,
    marginTop: 30
  },
btn: {
  marginTop: 80,
  backgroundColor: '#E2443a',
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 30
},

text: {
  fontFamily: "Montserrat_600SemiBold",
  fontSize: 30,
  color: '#FFF'
}

});

export default Page1;