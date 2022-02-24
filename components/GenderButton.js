import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const GenderButton = (props) =>{
    return (

            <TouchableOpacity style={styles.inputContainer}  onPress={props.gender}>
                {/*<Text style={styles.label}>Sex:</Text>*/}
                <Text style={styles.addButtonl} onPress={() => props.genderMale()}>Male</Text>
                <Text style={styles.addButtonr} onPress={() => props.genderFemale()}>Female</Text>
            </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        shadowOffset: { width: 0, height: 5},
        shadowColor: '#171717',
        shadowOpacity: .1,
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    },
    addButtonl: {
        backgroundColor: '#f3f3f3',
        fontSize: 30,
        height: 36,
        width: 150,
        textAlign: 'center',
        backgroundColor: '#FFCE00',
        color: '#171717',
        fontWeight: '700'
    },
    addButtonr: {
        backgroundColor: '#f3f3f3',
        fontSize: 30,
        height: 36,
        width: 150,
        textAlign: 'center',
        backgroundColor: '#FFCE00',
        color: '#171717',
        fontWeight: '700'

    },
    label:{
        //backgroundColor: '#f3f3f3',
        fontSize: 30,
        height: 36,
        color: '#171717',
        fontWeight: '700'
    }


})

export default GenderButton;