import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const GenderButton = (props) =>{
    return (
        <TouchableOpacity style={styles.inputContainer} inputContainer onPress={props.gender}>
            
            <Text style={styles.addButtonl} onPress={() => props.genderMale()}>Male</Text>
            <Text style={styles.label}>Biological Gender?</Text>
            <Text style={styles.addButtonr} onPress={() => props.genderFemale()}>Female</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 5},
        shadowColor: '#171717',
        shadowOpacity: .1
    },
    addButtonl: {
        width: 100,
        backgroundColor: '#FFCE00',
        color: '#171717',
        fontSize: 18,
        fontWeight: '700'
    },
    addButtonr: {
        width: 100,
        backgroundColor: '#FFCE00',
        color: '#171717',
        fontSize: 18,
        fontWeight: '700'

    },
    label:{
        color: '#171717',
        fontSize: 18,
        fontWeight: '700'
    }


})

export default GenderButton;