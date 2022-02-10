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
import React from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Alert, Vibration} from 'react-native';
import Header from './components/Header';
import InputBar from './components/inputBar';
import DrinkList from './components/DrinkList';
import GenderButton from './components/GenderButton';
export default class App extends React.Component {
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
      bac: 0.5,
      weight: 0.1,
      weightInput: '',
      gender: '',
      startHour: 0,
      startMinute: 0,
      startSeconds: 0,
      recentHour: 0,
      recentMinute: 0,
      recentSeconds: 0,
      currentHour: 0,
      currentMinute: 0
    }
  }/*
  getBac(){
    let totalcount = this.state.totalcount;
    let bac = this.state.bac;
    let startHour = this.state.startHour;
    let startMinute = this.state.startMinute;
    let currentHour = this.state.currentHour;
    let currentMinute = this.state.curretMinute;
    let gender = this.state.gender;
    let weight = this.state.weight;
    currentHour = new Date().getHours();
    currentMinute = new Date().getMinutes();
    if(gender == "male"){
      bac = ((totalcount*14)/(weight*494*0.68) *100) - 0.015*((currentHour - startHour) + (currentHour - startMinute)/60);
    }else{
      bac = ((totalcount*14)/(weight*494*0.55) *100) - 0.015*((currentHour - startHour) + (currentMinute - startMinute)/60);
    }
    this.setState({
      bac
    });
  }
  componentDidMount(){ 
    setInterval(() => (
      
      this.setState(
        { bac: this.getBac()}
      )
    ), 1000);
  }*/
  genderMale(){
    let gender = this.state.gender;
    gender = "male";
    this.setState({
      gender
    });
  }
  genderFemale(){
    let gender = this.state.gender;
    gender = "female";
    this.setState({
      gender
    });
  }
  addWeight(){
    let weight = this.state.weight;
    weight = Number(this.state.weightInput);
    this.setState({
      weight,
      weightInput: ''
    });
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
      bac = ((totalcount*14)/(weight*494*0.68) *100) - 0.015*((currentHour - startHour) + (currentMinute - startMinute)/60);
    }else{
      bac = ((totalcount*14)/(weight*494*0.55) *100) - 0.015*((currentHour - startHour) + (currentMinute - startMinute)/60);
    }
    if(bac > 0.4){
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
    }else if(bac > 0.3){
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
  }/*
  toggleDone(item){
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if(todo.id == item.id) {
        todo.done = !todo.done;
      }
      return todo;
    })
    this.setState({todos});
  }*/
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
    }else{
      recentHour = new Date().getHours();
      recentMinute = new Date().getMinutes();
      recentSeconds = new Date().getSeconds();
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
                  startHour,
                  startMinute,
                  startSeconds,
                  recentHour,
                  recentMinute,
                  recentSeconds});
  }
  
  render(){
    //'andriod'
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    return (
      <View style={styles.container}>
        {statusbar}
        <Header title="Beer Buddy"/>
        {this.state.weight == 0.1 ? <InputBar 
          addWeight={() => this.addWeight()}
          textChange={weightInput => this.setState({ weightInput })}
          weightInput={this.state.weightInput}/> : null}
        {this.state.gender == ''? <GenderButton genderMale={() => this.genderMale()} genderFemale={() => this.genderFemale()}/>: null}
        <FlatList
          color={(this.state.overCapacity) ? '#FF0000' : '#FF0000'}
          style={styles.list}
          data={this.state.drinks}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item,index}) => {
            return (
              <DrinkList DrinkList={item} addDrink={() => this.addDrink(item)} />
            )
          } }

        />
        <Text style={styles.counter}>{this.state.totalcount}</Text>
        <Text style={styles.time}>First Drink Start: {this.state.startHour}h, {this.state.startMinute}m, and {this.state.startSeconds}s</Text>
        <Text style={styles.time}>Most Recent Drink: {this.state.recentHour}h, {this.state.recentMinute}m, and {this.state.recentSeconds}s</Text>
        <Text style={styles.time}>Current BAC: {this.state.bac}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  list: {
    height: 400,
    flexGrow: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusbar: {
    backgroundColor: "#FFCE00",
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
