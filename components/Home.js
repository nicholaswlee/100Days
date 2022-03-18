import * as React from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Alert, Vibration, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import GenderButton from './GenderButton';
import ResetGender from './ResetGender';
import ResetWeight from './ResetWeight';
import ResetName from './ResetName';
import BacPage from './BacPage';
import { AlphabetList } from "react-native-section-alphabet-list";

export default class Home extends React.Component {
    constructor() {
        //We need super, but do not know wy
        super();
        //Can set a state like in react
        this.state = {
            weight: 100.55,
            weightInput: '',
            name: '',
            nameInput: '',
            gender: '',
            age: -1,
            ageInput: '',
            drinkingStatus: 'true',
            reset: 'false',
            friends: [
                {value: 'Alyssa', key: 'aan',age: 21},
                {value: 'Anke', key: 'ahao',age: 21},
                {value: 'Kaya', key: 'k', age: 21},
                {value: 'Raghav', key: 'r', age: 21},
                {value: 'Parnika', key: 'p', age: 21},
                {value: 'Ethan', key: 'e', age: 21},
                {value: 'Sanzhar', key: 'skhaidarov',age: 21},
                {value: 'Tim', key: 'tpouring',age: 21},
                {value: 'Nicholas', key: 'nlee', age: 21},
            ]
        }
    }
    componentDidMount(){
        setInterval(() => {
        },1000)
    }
    render(){
        const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
        return(
            <View style={styles.container}>
                {statusbar}
            
            <Header title="drink.me"/>
            <View style={styles.inputContainer}> 
              <Text style={styles.title}>Home</Text>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    doneButtonText: {
      color: '#171717',
      fontSize: 30,
      fontWeight: '700',
      shadowOffset: { width: 0, height: 3 },
      /*
      shadowColor: '#171717',
      shadowOpacity: .1,
      backgroundColor: '#F3F3F3'*/
    },
    title: {
      backgroundColor: '#FFCE00',
      textAlign: 'center',
      flex: 1,
      fontSize: 30,
      height: 36,
      fontWeight: 'bold',
      borderBottomColor: '#000000',
      borderBottomWidth: 5  
    },
    sectionTitle: {
      backgroundColor: '#AAAAAA',
      textAlign: 'left',
      fontSize: 20,
      height: 25,
      fontWeight: 'bold',
      borderBottomColor: '#000000',
      borderBottomWidth: 5  
    },
    doneButton: {
      width: (Dimensions.get('window').width)/1.25,
      backgroundColor: '#F3F3F3',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 20
    },
    buttonContainer: {
      //flex: 1,
      
      flexDirection: 'row',
      height: (Dimensions.get('window').width)/4,
      justifyContent: 'space-evenly',
      /*
      shadowOffset: { width: 0, height: 3 },
      shadowColor: '#171717',
      shadowOpacity: .1*/
    },
    data: {
      backgroundColor: '#f3f3f3',
      flex: 1,
      fontSize: 30,
      height: 36,
      borderBottomColor: '#000000',
      borderBottomWidth: 5
      /*
      width: '100%',
      height: 25,
      fontSize: 20,
      borderBottomColor: '#DDD',
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',*/
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#171717',
        shadowOpacity: .1,
        //borderTopWidth: 1,
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    },
    input: {
        backgroundColor: '#f3f3f3',
        flex: 1,
        fontSize: 18,
        height: 36
    },
    addButton: {
        width: 100,
        backgroundColor: '#FFCE00',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1
    },
    addButtonText: {
        color: '#171717',
        fontSize: 16,
        fontWeight: '700'
    },
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    list: {
      height: 400,
      flexGrow: 0
    },
    container: {
      flex: 1,
      backgroundColor: '#F3F3F3',
    },
    viewSpace:{
      flexDirection: 'row',
      height: (Dimensions.get('window').width)*0.25
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