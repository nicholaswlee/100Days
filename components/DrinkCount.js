import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
export default class DrinkCount extends React.Component {
    constructor(){
        super();
    }
    render (){
            const DrinkList = this.props.DrinkList;
        return (
            <Text style={styles.name}>
                {DrinkList.title}
            </Text>
        )    
    }
}

const styles = StyleSheet.create({
    counter: {
        width: '100%',
        height: 100,
        fontSize: 50,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})