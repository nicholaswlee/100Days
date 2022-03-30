import * as React from 'react';
import {useState} from 'react';
import {Platform, FlatList, StyleSheet, Text, Modal, View, Alert, Vibration, TextInput, TouchableOpacity, Dimensions} from 'react-native';
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
            ageInput: '',
            drinkingStatus: 'true',
            reset: 'false',
            newUser: false,
            sexSet: false
        }
    }
    componentDidMount(){
        this.resetDrinkingStatus();
        this.resetReset();
        this.getDrinkingStatus();
        this.getReset();
        this.getMyWeight();
        this.getMyGender();
        this.getMyAge();
        this.getMyName();
        this.getDrinkingStatus();
        setTimeout(() =>{
          if( this.state.name == '' &&
              this.state.gender == '' &&
              this.state.age == -1 &&
              this.state.weight == 100.55
          ){
            this.setState({newUser: true})
          }else{
            this.setState({newUser: false})
          }
          
        }, 500);
        setTimeout(() =>{
          if (this.state.gender == ''){
            this.setState({sexSet: true})
          }else{
            this.setState({sexSet: false})
          }
        }, 600);
        setInterval(() => {
            /*console.log("WACK");
            console.log(this.drinkingStatus);
            console.log("WACK");*/
            this.getReset();
            this.getMyWeight();
            this.getMyGender();
            this.getMyAge();
            this.getMyName();
            this.getDrinkingStatus();
            if( this.state.name != '' &&
              this.state.gender != '' &&
              this.state.age != -1 &&
              this.state.weight != 100.55
            ){
            this.setState({newUser: false})
            }

        },1000)
    }
    getDrinkingStatus = async () => {
      var status;
        try {
           status = await AsyncStorage.getItem('@DRINKING_STATUS');
        } catch(e) {
          console.log("No existing status");
        }
        if((status === '') || (status ==null)){
          this.setState({drinkingStatus: 'true'});
        }else{
          this.setState({drinkingStatus: status});
        }
        
    }
    getReset = async () => {
      var status;
        try {
           status = await AsyncStorage.getItem('@RESET_STATUS');
        } catch(e) {
          console.log("No existing status");
        }
        if((status === '') || (status ==null)){
          this.setState({reset: 'false'});
        }else{
          this.setState({reset: status});
        }
        
    }
    getMyWeight = async () => {
        var weight;
        try {
           weight = await AsyncStorage.getItem('@USER_WEIGHT');
        } catch(e) {
          console.log("No existing weight");
        }
        if(weight == null){
          this.setState({weight: 100.55})
        }else{
          this.setState({weight: weight})
        }
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
      genderIntersex(){
        let gender = this.state.gender;
        gender = "intersex";
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
      setDrinkingStatus = async (s) => {
        try {
          await AsyncStorage.setItem('@DRINKING_STATUS', JSON.stringify(s))
          const status = await AsyncStorage.getItem('@DRINKING_STATUS')
          console.log(status)
        } catch(e){
            console.log("ERROR COULD NOT SET DRINKING STATUS");
        }
        let keys = [];
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }

        console.log(keys);
      }
      setReset = async (s) => {
        try {
          await AsyncStorage.setItem('@RESET_STATUS', JSON.stringify(s))
          const status = await AsyncStorage.getItem('@RESET_STATUS')
          console.log(status)
        } catch(e){
            console.log("ERROR COULD NOT SET RESET STATUS");
        }
        let keys = [];
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }

        console.log(keys);
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
    resetDrinkingStatus = async () => {
      try {
        await AsyncStorage.removeItem('@DRINKING_STATUS')
      } catch(e) {
        console.log("ERROR COULD NOT REMOVE DRINKING STATUS");
      }
    
      console.log('Drinking Status Reset');
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      this.setState({drinkingStatus: 'true'}); 
    }
    resetReset = async () => {
      try {
        await AsyncStorage.removeItem('@RESET_STATUS')
      } catch(e) {
        console.log("ERROR COULD NOT REMOVE RESET STATUS");
      }
    
      console.log('Reset Status Reset');
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      this.setState({reset: 'false'}); 
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
            
            <Header title="drink.me"/>
            <View style={styles.inputContainer}> 
              <Text style={styles.title}>User Data</Text>
            </View>
            <Modal 
                animationType="slide"
                transparent={true}
                visible = {this.state.newUser}
                backdropOpacity={0.3}
                >
                <View style={styles.centeredView}>
                <View style={styles.profile}>
                <Text style={[{fontSize: 24}]}>Welcome to Drink.Me</Text>
                <Text style={[{fontSize: 24}]}>Please fill out some info</Text>
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
                    {(this.state.gender != '') ?
                    <View style={styles.inputContainer}>
                      <Text style={styles.data}>Sex: {this.state.gender.replace(/['"]+/g, '')}</Text>
                      <ResetGender resetGender={()=> {this.resetGender(); this.setState({setSex: true})}}/>
                    </View>:
                    <><Text style={[{ fontSize: 24 }]}>What is your sex?</Text>
                    <TouchableOpacity style={styles.addGender} onPress={() => this.genderMale()}>
                      <Text style={styles.addButtonText}>Male</Text>
                    </TouchableOpacity><TouchableOpacity style={styles.addGender} onPress={() => this.genderIntersex()}>
                        <Text style={styles.addButtonText}>Intersex</Text>
                      </TouchableOpacity><TouchableOpacity style={styles.addGender} onPress={() => this.genderFemale()}>
                        <Text style={styles.addButtonText}>Female</Text>
                      </TouchableOpacity></>
                  }
                </View>
                </View>
            </Modal>

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
          <Modal 
            animationType="slide"
            transparent={true}
            visible = {this.state.sexSet}
            backdropOpacity={0.3}
            >
            <View style={styles.centeredView}>
            <View style={styles.profile}>
                <Text style={[{fontSize: 24}]}>What is your sex?</Text>
                <TouchableOpacity style={styles.addGender} onPress={() => {this.genderMale(); this.setState({sexSet: false})}}>
                    <Text style={styles.addButtonText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addGender} onPress={() => {this.genderIntersex(); this.setState({sexSet: false})}}>
                    <Text style={styles.addButtonText}>Intersex</Text>
                </TouchableOpacity>       
                <TouchableOpacity style={styles.addGender} onPress={() => {this.genderFemale(); this.setState({sexSet: false})}}>
                    <Text style={styles.addButtonText}>Female</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
          <View style={styles.inputContainer}>
              <Text style={styles.data}>Sex: {this.state.gender.replace(/['"]+/g, '')}</Text>
              <ResetGender resetGender={()=> {this.resetGender(); this.setState({sexSet: true})}}/>
          </View>
            <View style={styles.viewSpace}></View>
            {this.state.drinkingStatus == 'true' ?
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.doneButton, {backgroundColor: '#e52736'}]} onPress={() => this.setDrinkingStatus('false')} >
                <Text style={styles.doneButtonText}>STOP DRINKING</Text>
              </TouchableOpacity>
            </View> :
            <View style={[styles.buttonContainer]}>
            <TouchableOpacity style={[styles.doneButton, {backgroundColor: '#0fad1f'}]} onPress={() => {this.resetDrinkingStatus(); this.setReset('true')}} >
              <Text style={styles.doneButtonText}>RESET DRINKING</Text>
            </TouchableOpacity>
          </View>}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
      flexDirection: 'column',
      height: (Dimensions.get('window').width),
      width: '75%',
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: '#EEEEEE',
      borderColor: '#000000',
      borderWidth: 0.5,
      borderRadius: 10
    },
    data: {
      backgroundColor: '#f3f3f3',
      flex: 1,
      fontSize: 30,
      height: 36,
      borderBottomColor: '#000000',
      borderBottomWidth: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      addGender: {
        width: 100,
        height: 50,
        backgroundColor: '#FFCE00',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5
    },
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
      backgroundColor: '#f3f3f3',
      textAlign: 'center',
      flex: 1,
      fontSize: 30,
      height: 36,
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