import React from 'react';
import {StyleSheet, Text, Button, TouchableOpacity, Alert} from 'react-native';
export default class BarList extends React.Component {

    constructor(props){
        super(props);
    }
    
    render (){
        const DrinkList = this.props.DrinkList;
        return (
                
            <TouchableOpacity 
                style={styles.todoItem}
                onPress={() => {this.props.addDrink(); this.props.updateRecent()}}
    
                /*onPress={() => this.props.drinkWarning()}
        */
            >
                <Text style={styles.name}>
                    {DrinkList.title}
                </Text>
                
            </TouchableOpacity>
        )
    }
}
    
const styles = StyleSheet.create({
    todoItem: {
        width: '100%',
        height: 100,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    name: {
        color: '#000000',
        fontSize: 70
    }
    })