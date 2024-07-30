import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import ProfileScreen from '../SettingScreen/ProfileScreen';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb',
      }
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <EvilIcons name='user' color={color} size={36}/>
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
