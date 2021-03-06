import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#171717',
        height: (Dimensions.get('window').width)*0.25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#F3F3F3',
        fontSize: (Dimensions.get('window').width)*0.1,
        fontWeight: '900',
        textTransform: 'uppercase'
    }
});

export default Header;