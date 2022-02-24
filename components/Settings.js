import * as React from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Alert, Vibration, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import GenderButton from './GenderButton';
import ResetGender from './ResetGender';
import ResetWeight from './ResetWeight';
import ResetName from './ResetName';
import BacPage from './BacPage';


export default class Settings extends React.Component {
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
            ageInput: ''
        }
    }
    componentDidMount(){ 
        setInterval(() => {
            this.getMyWeight();
            this.getMyGender();
            this.getMyAge();
            this.getMyName();
        },1000)
    }
    getMyWeight = async () => {
        var weight;
        try {
           weight = await AsyncStorage.getItem('@USER_WEIGHT');
           console.log(weight);
        } catch(e) {
          console.log("No existing weight");
        }
        if(weight == null){
          this.setState({weight: 100.55})
        }else{
          this.setState({weight: weight})
        }
        
        console.log('Done.')
      
      }
      getMyGender = async () => {
        var gender;
        try {
           gender = await AsyncStorage.getItem('@USER_GENDER');
        } catch(e) {
          console.log("No existing gender");
        }
        if((gender == '') || (gender ==null)){
          this.setState({gender: ''})
          console.log("No existing gender");
        }else{
          this.setState({gender: gender})
        }
      
      }
      getMyName = async () => {
        var name;
        try {
           name = await AsyncStorage.getItem('@USER_NAME');
        } catch(e) {
          console.log("No existing name");
        }
        if((name == '') || (name ==null)){
          this.setState({name: ''})
          console.log("No existing name");
        }else{
          this.setState({name: name})
        }
      }
      getMyAge = async () => {
        var age;
        try {
          age = await AsyncStorage.getItem('@USER_AGE');
        } catch(e) {
          console.log("No existing age");
        }
        if((age == -1) || (age ==null)){
          this.setState({age: -1})
          console.log("No existing age");
        }else{
          this.setState({age: age})
        }
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
      addAge(){
        let age = this.state.age;
        age = Number(this.state.ageInput);
    
        this.setState({
          age,
          ageInput: ''
        });
        console.log(this.state.age);
        this.setAge(age);
      }
      addName(){
        let name = this.state.name;
        name = this.state.nameInput;
        this.setState({
          name,
          nameInput:''
        });
        console.log(this.state.name);
        this.setName(name);
      }

    setWeight = async (w) => {
        this.resetWeight();
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
      setAge = async (a) => {
        this.resetAge();
        try {
          await AsyncStorage.setItem('@USER_AGE', JSON.stringify(a))
          const current_age = await AsyncStorage.getItem('@USER_AGE')
          console.log(current_age)
        } catch(e){
            console.log("ERROR COULD NOT SET AGE");
        }
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }
      
        console.log(keys)
      }
      setName = async (a) => {
        this.resetName();
        try {
          await AsyncStorage.setItem('@USER_NAME', JSON.stringify(a))
          const current_name = await AsyncStorage.getItem('@USER_NAME')
          console.log(current_name)
        } catch(e){
            console.log("ERROR COULD NOT SET NAME");
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
        this.resetGender();
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
    resetName = async () => {
      try {
        await AsyncStorage.removeItem('@USER_NAME')
      } catch(e) {
        console.log("ERROR COULD NOT REMOVE NAME");
      }
    
      console.log('Name Reset');
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      this.setState({name: ''});
    }
    resetAge = async () => {
      try {
        await AsyncStorage.removeItem('@USER_AGE')
      } catch(e) {
        console.log("ERROR COULD NOT REMOVE AGE");
      }
    
      console.log('Age Reset');
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      this.setState({age: -1});
    }
    render(){
        const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
        return(
            <View style={styles.container}>
                {statusbar}
            
            <Header title="Beer Buddy"/>
            <View style={styles.inputContainer}> 
              <Text style={styles.title}>User Data</Text>
            </View>
              {this.state.name == '' ?  
              <View style={styles.inputContainer}> 
                <TextInput 
                  style={styles.input}
                  placeholder = "Enter Name Here"
                  onChangeText={nameInput => this.setState({nameInput})}
                  value={this.state.nameInput}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => {this.addName()}}>
                   <Text style={styles.addButtonText}>Add Name</Text>
                </TouchableOpacity> 
              </View>  : 
              <View style={styles.inputContainer}> 
                <Text style={styles.data}>Name: {this.state.name.replace(/['"]+/g, '')}</Text>
                <ResetName resetName={()=> this.resetName()}/>     
              </View>}
              {this.state.age == -1 ?  
              <View style={styles.inputContainer}> 
                <TextInput 
                  style={styles.input}
                  placeholder = "Enter Age Here"
                  onChangeText={ageInput => this.setState({ageInput})}
                  value={this.state.ageInput}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => {this.addAge()}}>
                   <Text style={styles.addButtonText}>Add Age</Text>
                </TouchableOpacity> 
              </View>  : 
              <View style={styles.inputContainer}> 
                <Text style={styles.data}>Age: {this.state.age}</Text>
                <ResetWeight resetWeight={()=> this.resetAge()}/>     
              </View>}
              {this.state.weight == 100.55 ?  
              <View style={styles.inputContainer}> 
                <TextInput 
                  style={styles.input}
                  placeholder = "Enter Weight Here"
                  onChangeText={weightInput => this.setState({weightInput})}
                  value={this.state.weightInput}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => {this.addWeight()}}>
                   <Text style={styles.addButtonText}>Add Weight</Text>
                </TouchableOpacity> 
              </View>  : 
              <View style={styles.inputContainer}> 
                <Text style={styles.data}>Weight: {this.state.weight}</Text>
                <ResetWeight resetWeight={()=> this.resetWeight()}/>     
              </View>}
            {/*
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder = {this.state.weight.toString()}
                    onChangeText={weightInput => this.setState({weightInput})}
                    value={this.state.weightInput}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => {this.addWeight()}}>
                    <Text style={styles.addButtonText}>Add Weight</Text>
                </TouchableOpacity>
            </View>*/}

          {this.state.gender == '' ?  
              <GenderButton genderMale={() => this.genderMale()} genderFemale={() => this.genderFemale()}/>
            :
            <View style={styles.inputContainer}>
              <Text style={styles.data}>Sex: {this.state.gender.replace(/['"]+/g, '')}</Text>
              <ResetGender resetGender={()=> this.resetGender()}/>
            </View>}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
      backgroundColor: '#f3f3f3',
      textAlign: 'center',
      flex: 1,
      fontSize: 30,
      height: 36,
      fontWeight: 'bold',
      borderBottomColor: '#000000',
      borderBottomWidth: 5  
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
        justifyContent: 'center'
    },
    addButtonText: {
        color: '#171717',
        fontSize: 18,
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