/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  
  constructor () {
    super();
    this.state = {
      todoInput: '',

    }
  }*/
import * as React from 'react';

import {Platform, FlatList, StyleSheet, Text, View, Alert, Vibration} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*import Header from './components/Header';
import InputBar from './components/inputBar';
import DrinkList from './components/DrinkList';
import GenderButton from './components/GenderButton';
import ResetButton from './components/ResetButton';*/
import BarList from './components/BarList';
import BacPage from './components/BacPage';
import Settings from './components/Settings';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




function SettingsScreen() {
  return (
   <Settings/>
  );
}
function BacHome(){
  return (
   // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BacPage/>
    //</View>
  );
}
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{headerShown:false}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'BacPage') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'ios-home'
                      : 'ios-home-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Settings') {
              return (
                <Ionicons
                name={
                  focused
                    ? 'ios-cog'
                    : 'ios-cog-outline'
                }
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
      >
        
        <Tab.Screen
          name="BacPage"
          component={BacHome}
          options={{ headerShown: false }}
          //options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  list: {
    height: 400,
    flexGrow: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  statusbar: {
    backgroundColor: "#171717",
    height:20
  },
  layout: {
    lineHeight: 20,
    height: 10
  },
  counter: {
    width: '100%',
    height: 100,
    fontSize: 100,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  time: {
    width: '100%',
    height: 25,
    fontSize: 20,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
});
