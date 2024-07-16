import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Stack, Tabs, router, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import * as SecureStore from 'expo-secure-store';



SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getTokens(key: string) {
    try{
    return SecureStore.getItemAsync(key);
  } catch(err){
    return null;
  }
  },
  async saveTokens(key: string, value: string) {
    try{
    return SecureStore.setItemAsync(key, value);
  } catch(err){
    return null;
  }
  }
}

export default function RootLayout() {

  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    'K2D' : require('../assets/fonts/K2D-Regular.ttf'),
    'K2D-b' : require('../assets/fonts/K2D-Bold.ttf'),
    'K2D-sb' : require('../assets/fonts/K2D-SemiBold.ttf'),
    'K2D-xb' : require('../assets/fonts/K2D-ExtraBold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return <RootLayoutNav/>
}

function RootLayoutNav (){

  const router = useRouter();
  useEffect(() => {
    const checkUserSignedIn = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // If user is not signed in, navigate to welcome page
        router.push('(modals)/welcomepage');
      }
    };
    checkUserSignedIn();
    },[router]);


  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(modals)/welcomepage" options={{ headerShown: false }}/>
        <Stack.Screen name="(modals)/campuspage" options={{ headerShown: false }}/>
        <Stack.Screen name="(modals)/signup" options={{ headerShown: false }}/>
        <Stack.Screen name="(modals)/login" options={{
          title: "Log In",
          headerTitleStyle: {
            fontFamily: 'K2D-b',
          },
          presentation: 'modal',
          headerLeft: () =>(
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28}/>
            </TouchableOpacity>
          )
        }}/>
        <Stack.Screen name="Listing/[id]" options={ {headerTitle: '', headerTransparent: false}}/>
        <Stack.Screen name="(modals)/booking" options={ {presentation: 'transparentModal',
          animation: 'fade',
        headerLeft: () =>(
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28}/>
            </TouchableOpacity>
          )
          }}/>
      </Stack> 
      

  );
}
