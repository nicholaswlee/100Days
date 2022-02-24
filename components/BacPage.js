import * as React from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Alert, Vibration, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import InputBar from './inputBar';
import DrinkList from './DrinkList';
import GenderButton from './GenderButton';
import ResetButton from './ResetButton';

export default class BacPage extends React.Component {
    //Constructors run as soon as the app is loaded
    constructor() {
      //We need super, but do not know wy
      super();
      //Can set a state like in react
      this.state = {
        //This is what will be updated when we take input.
        drinkInput: '',
        //This is an array.
        //Seems like the : is an equal sign 
        drinks: [
          {id: 0, title: 'beer', count: 0, alcoholContent: 5},
          {id: 1, title: 'wine', count: 0, alcoholContent: 12},
          {id: 2, title: 'seltzer', count: 0, alcoholContent: 5},
          {id: 3, title: 'shot', count: 0, alcoholContent: 40}
        ],
        totalcount: 0,
        overCapacity: true,
        bac: 0,
        weight: 100.55,
        weightInput: '',
        name: '',
        gender: '',
        startHour: 0,
        startMinute: 0,
        startSeconds: 0,
        recentHour: 0,
        recentMinute: 0,
        recentSeconds: 0, 
        timeSinceHour: 0, 
        timeSinceMinute:0, 
        timeSinceSeconds: 0,
        currentHour: 0,
        currentMinute: 0,
        drinking: false,
        oldCount: 0,
        timer: null,
        recentDrinking1: false,
        recentDrinking2: false,
      }
    }
  
    componentDidMount(){ 
      this.getMyWeight();
      this.getMyGender();
      setInterval(() => {
        this.getMyWeight();
        this.getMyGender();
        if(this.state.drinking){
          var sec = (Number(this.state.timeSinceSeconds) + 1),
            count = this.state.timeSinceMinute;
            hourCount = this.state.timeSinceHour;
          if (sec == 59) {
            count = (Number(this.state.timeSinceMinute) + 1);
            sec =  0;
          };
          if (count == 59) {
            hourCount = (Number(this.state.timeSinceHour) + 1);
            count = 0;
          };
          this.setState(
            {timeSinceHour: hourCount,
            timeSinceMinute: count,
            timeSinceSeconds: sec,
            bac: (this.state.gender== ("male")) ?  (((this.state.totalcount*14)/(this.state.weight*494*0.68) *100) - 0.015*((this.state.timeSinceHour) + ((this.state.timeSinceMinute)/60)))*100 : (((this.state.totalcount*14)/(this.state.weight*494*0.55) *100) - 0.015*((this.state.timeSinceHour) + ((this.state.timeSinceMinute)/60)))*100
            } 
          )  
        }}, 1000);
    }
    getMyWeight = async () => {
      var weight;
      try {
         weight = await AsyncStorage.getItem('@USER_WEIGHT');
         //console.log(weight);
      } catch(e) {
        //console.log("No existing weight");
      }
      if(weight == null){
        this.setState({weight: 100.55})
      }else{
        this.setState({weight: weight})
      }
      
  
    
      //console.log('Done.')
    
    }
    getMyGender = async () => {
      var gender;
      try {
         gender = await AsyncStorage.getItem('@USER_GENDER');
         //console.log(gender);
      } catch(e) {
        //console.log("No existing gender");
      }
      if((gender == '') || (gender ==null)){
        this.setState({gender: ''})
        //console.log("No existing gender");
      }else{
        this.setState({gender: gender})
      }
      
  
    
      //console.log('Done.')
    
    }
    genderMale(){
      let gender = this.state.gender;
      gender = "male";
      this.setState({
        gender
      });
      this.setGender(gender);
    }
    genderFemale(){
      let gender = this.state.gender;
      gender = "female";
      this.setState({
        gender
      });
      this.setGender(gender);
    }
    addWeight(){
      let weight = this.state.weight;
      weight = Number(this.state.weightInput);
  
      this.setState({
        weight,
        weightInput: ''
      });
      console.log(this.state.weight);
      this.setWeight(weight);
    }
    drinkWarning(){
      let totalcount = this.state.totalcount;
      let bac = this.state.bac;
      let startHour = this.state.startHour;
      let startMinute = this.state.startMinute;
      let currentHour = this.state.currentHour;
      let currentMinute = this.state.currentMinute;
      let gender = this.state.gender;
      let weight = this.state.weight;
      currentHour = new Date().getHours();
      currentMinute = new Date().getMinutes();
      if(gender == "male"){
        bac = (((totalcount*14)/(weight*494*0.68) *100) - 0.015*((currentHour - startHour) + (currentMinute - startMinute)/60)) * 100;
      }else{
        bac = (((totalcount*14)/(weight*494*0.55) *100) - 0.015*((currentHour - startHour) + (currentMinute - startMinute)/60)) * 100;
      }
      if(bac > 40){
        Vibration.vibrate([1*100], true)
        Alert.alert(
          "WARNING",
          "YOU HAVE EXCEDED YOUR LIMIT. THIS IS DANGEROUS",
          [/*
            {
              text: "Slowing Down",
              onPress: () => this.slowDownPress(),
            },*/
            { text: "I WILL NOT DRINK", onPress: () => this.okayPress() }
          ]
        );
      }else if(bac > 30){
        Vibration.vibrate([1*100], true)
        Alert.alert(
          "WARNING",
          "YOU ARE EXCEDING YOUR LIMIT",
          [/*
            {
              text: "Slowing Down",
              onPress: () => this.slowDownPress(),
            },*/
            { text: "I UNDERSTAND", onPress: () => this.okayPress() }
          ]
        );
      }
      this.setState({
        bac
      });
    }
    slowDownPress(){
      console.log("Slow down pressed");
      Vibration.cancel();
    }
    okayPress(){
      console.log("Ok Pressed");
      Vibration.cancel();
    }
    totalCount () {
      let totalcount = this.state.totalcount;
      let overCapacity = this.state.overCapacity;
      for(i = 0; i < 4; i++){
        overCapacity = true;
        totalcount = this.state.drinks[i].count + totalcount;
      }
      this.setState({totalcount,
                     overCapactiy
      });
    }
    addNewDrink () {
      let drinks = this.state.drinks;
      drinks.unshift({
        id: drinks.length + 1,
        title: this.state.drinkInput,
        count: 0,
        alcoholContent: 5
      });
      this.setState({
        drinks,
        drinkInput: ''
      });
    }
    
    addDrink (item){
      let drinks = this.state.drinks;
      let totalcount = this.state.totalcount;
      let startHour = this.state.startHour;
      let startMinute = this.state.startMinute;
      let startSeconds = this.startSeconds;
      let recentHour = this.state.recentHour;
      let recentMinute = this.state.recentMinute;
      let recentSeconds = this.recentSeconds;
      if(totalcount == 0){
        startHour = new Date().getHours();
        startMinute = new Date().getMinutes();
        startSeconds = new Date().getSeconds();
      }
      drinks = drinks.map((drink) => {
        if(drink.id == item.id) {
          drink.count += 1;
          this.state.totalcount +=1;
        }
        return drink;
      })
      this.drinkWarning();
      this.setState({drinks, 
                    drinking: true,
                    startHour,
                    startMinute,
                    startSeconds,
                    recentHour,
                    recentMinute,
                    recentSeconds});
    }
    setWeight = async (w) => {
      try {
        await AsyncStorage.setItem('@USER_WEIGHT', JSON.stringify(w))
        const current_weight = await AsyncStorage.getItem('@USER_WEIGHT')
        console.log(current_weight)
      } catch(e){
          console.log("ERROR COULD NOT SET WEIGHT");
      }
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
    }
    setGender = async (g) => {
      try {
        await AsyncStorage.setItem('@USER_GENDER', JSON.stringify(g))
        const current_weight = await AsyncStorage.getItem('@USER_GENDER')
        console.log(current_weight)
      } catch(e){
          console.log("ERROR COULD NOT SET GENDER");
      }
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
    }
    resetWeight = async () => {
      try {
        await AsyncStorage.removeItem('@USER_WEIGHT')
      } catch(e) {
        console.log("ERROR COULD NOT REMOVE WEIGHT");
      }
    
      console.log('Weight Reset');
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      this.setState({weight: 100.55});
    }
    resetGender = async () => {
      try {
        await AsyncStorage.removeItem('@USER_GENDER')
      } catch(e) {
        console.log("ERROR COULD NOT REMOVE GENDER");
      }
      
      console.log('Gender Reset');
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      this.setState({gender: ''});
    }
    updateRecent = (item) => {
      clearInterval(this.state.timer);
      this.setState(
        {recentHour: 0,
         recentMinute: 0,
         recentSeconds: 0
        } 
      ) 
      console.log("New Drink Timer");
      let timer = setInterval(() => {
        var sec = this.state.recentSeconds + 1,
          count = this.state.recentMinute;
          hourCount = this.state.recentHour;
        if (sec == 59) {
          count = (count + 1);
          sec =  0;
        };
        if (count == 59) {
          hourCount = (hourCount + 1);
          count = 0;
        };
        this.setState(
          {recentHour: hourCount,
           recentMinute: count,
           recentSeconds: sec
          } 
        )  
        }, 1000);
        this.setState(
          {timer}
        )
    }
    render(){
      const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
      return(
        <View style={styles.container}>
          {statusbar}
          <Header title="Beer Buddy"/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.drinkButton} onPress={() => {this.addDrink(this.state.drinks[2]); this.updateRecent()}}>
              <Text style={styles.addButtonText}>beer</Text>
              <Text role="img" style={styles.addButtonText} aria-label="beer">🍻</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.drinkButton} onPress={() => {this.addDrink(this.state.drinks[2]); this.updateRecent()}}>
              <Text style={styles.addButtonText}>wine</Text>
              <Text role="img" style={styles.addButtonText} aria-label="wine">🍷</Text>
            </TouchableOpacity> 
          {/*
          <FlatList
           color={(this.state.overCapacity) ? '#FF0000' : '#FF0000'}
           style={styles.list}
           data={this.state.drinks}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item,index}) => {
              return (
                  <DrinkList DrinkList={item} addDrink={() => this.addDrink(item)} updateRecent={() => this.updateRecent(item)} />
                )
              } }
  
          />*/}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.drinkButton} onPress={() => {this.addDrink(this.state.drinks[2]); this.updateRecent()}}>
              <Text style={styles.addButtonText}>seltzer</Text>
              <Text role="img" style={styles.addButtonText} aria-label="seltzer">🥤</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.drinkButton} onPress={() => {this.addDrink(this.state.drinks[3]); this.updateRecent()}}>
              <Text style={styles.addButtonText}>shot</Text>
              <Text role="img" style={styles.addButtonText} aria-label="shot">💉</Text>
            </TouchableOpacity> 
          </View>
          <Text style={styles.counter}>{this.state.totalcount}</Text>
          <Text style={styles.time}>Time Since First Drink: {this.state.timeSinceHour}h, {this.state.timeSinceMinute}m, and {this.state.timeSinceSeconds}s</Text>
          <Text style={styles.time}>Time Since Last Drink: {this.state.recentHour}h, {this.state.recentMinute}m, and {this.state.recentSeconds}s</Text>
          <Text style={styles.time}>Current BAC: {Math.round(this.state.bac*100)/100}%</Text>
        </View>
      );
    }
      
  
  }
  
  
  
  const styles = StyleSheet.create({
    addButtonText: {
      color: '#171717',
      fontSize: 30,
      fontWeight: '700'
    },
    drinkButton: {
      width: 200,
      backgroundColor: '#F3F3F3',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#000000',
      borderWidth: 1
    },
    buttonContainer: {
      //flex: 1,
      backgroundColor: '#F3F3F3',
      flexDirection: 'row',
      height: 200,
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 3 },
      shadowColor: '#171717',
      shadowOpacity: .1
    },
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
      height: 115,
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
      height: 35,
      fontSize: 20,
      borderBottomColor: '#DDD',
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }
  });
  