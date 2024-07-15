import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import  Colors  from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';


const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb',
      }
    }}>
      <Tabs.Screen name='index' options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name='bookings' options={{
        tabBarLabel: 'Bookings',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='checkmark-circle-outline' color={color} size={size}/>
        ),
      }} />
      <Tabs.Screen name='wishlist' options={{
        tabBarLabel: 'Wishlist',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='heart-outline' color={color} size={size}/>
        ),
      }} />
       <Tabs.Screen name='profile' options={{
        tabBarLabel: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <EvilIcons name='user' color={color} size={36}/>
        ),
      }} />
    </Tabs>
  );
};

export default Layout;
