import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ResetWeight = (props) => {
    return (
        <View style={styles.inputContainer}>                
            <TouchableOpacity style={styles.addButton} onPress={() => {props.resetWeight()}}>
                <Text style={styles.addButtonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#171717',
        shadowOpacity: .1
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
    }
})

export default ResetWeight;