import * as React from 'react';
import {useState} from 'react';
import {Platform, 
        FlatList, 
        StyleSheet, 
        Text, 
        View, 
        Image,
        Alert, 
        Vibration, 
        TextInput, 
        TouchableOpacity, 
        Dimensions,
        Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import GenderButton from './GenderButton';
import ResetGender from './ResetGender';
import ResetWeight from './ResetWeight';
import ResetName from './ResetName';
import BacPage from './BacPage';


const FriendProfile = (props) => {
    const name = props.name
    const bio = props.bio
    const img = '../assets/user.png'
    //const img = props.img
    const[visible, setVisible] = useState(false)
    return (
        <>
        <TouchableOpacity style={styles.inputContainer} onPress={() => setVisible(true)}>
            <Text style={styles.data}>{name}</Text>
        </TouchableOpacity>
        <Modal 
            animationType="slide"
            transparent={true}
            visible = {visible}
            backdropOpacity={0.3}
            >
            <View style={styles.centeredView}>
            <View style={styles.profile}>
                <Image
                    style=
                    {{resizeMode: "contain",
                    height: 150,
                    width: 150,
                    borderColor: '#000000',
                    borderRadius: 100    
                }}
                    source={require(img)}
                />
                <Text style={styles.name}>{name}</Text>       
                <Text style={styles.bio}>{bio}</Text>      
                <TouchableOpacity style={styles.addButton} onPress={() => {setVisible(false)}}>
                    <Text style={styles.addButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
        </>
    
    )
}

const styles = StyleSheet.create({
    bio: {
        fontSize: 15,
        color: '#777777',
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
    name: {
      fontSize: 30,
      borderBottomColor: '#000000',
      borderBottomWidth: 5
    },
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
    input: {
        backgroundColor: '#f3f3f3',
        flex: 1,
        fontSize: 18,
        height: 36
    },
    addButton: {
        width: 100,
        height: 50,
        backgroundColor: '#FFCE00',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5
    },
    data: {
        backgroundColor: '#f3f3f3',
        flex: 1,
        fontSize: 30,
        height: 36,
        borderBottomColor: '#000000',
        borderBottomWidth: 5
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

  });

  export default FriendProfile;