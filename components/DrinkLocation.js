import * as React from 'react';
import {Platform, FlatList, StyleSheet, Image, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import MapView, {AnimatedRegion} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import BarDescription from './BarDescription';


const barList = [
  {name: "The Pub", 
    coordinates: {latitude: 41.788083, longitude: -87.595506, latitudeDelta: 0.005, longitudeDelta: 0.005},
    description: "Longtime basement hangout with board & bar games offering pub grub, cocktails & craft beer on tap.",
    image: "../assets/thepub.png",
    visible: false
  },
  {name: "Jimmy's", 
    coordinates: {latitude: 41.795258, longitude: -87.596837, latitudeDelta: 0.005, longitudeDelta: 0.005},
    description: "Neighborhood watering hole that's a hangout for the University of Chicago community.",
    image: "../assets/thepub.png",
    visible: false
  },
  {name: "Cove Lounge", 
    coordinates: {latitude: 41.795373, longitude:  -87.581923, latitudeDelta: 0.005, longitudeDelta: 0.005},
    description: "Laid-back bar offering an ample beer selection & daily specials, plus trivia nights & games on TV.",
    image: "../assets/thepub.png",
    visible: false
  },
  {name: "Falcon Inn", 
    coordinates:{latitude: 41.799393, longitude: -87.586353, latitudeDelta: 0.005, longitudeDelta: 0.005},
    description: "Dive bar, Sports Bar",
    image: "../assets/thepub.png",
    visible: false
  },
    
  ,
]
const friendList = [
  {name: "Alyssa", 
  coordinates: {latitude: 41.794589, longitude: -87.596235, latitudeDelta: 0.005, longitudeDelta: 0.005}},
  {name: "Kevin", 
  coordinates: {latitude: 41.796260, longitude: -87.596536, latitudeDelta: 0.005, longitudeDelta: 0.005}},
  {name: "Tim", 
  coordinates: {latitude: 41.796258, longitude: -87.597838, latitudeDelta: 0.005, longitudeDelta: 0.005}},
  {name: "Sanzhar", 
  coordinates: {latitude: 41.795258, longitude: -87.597540, latitudeDelta: 0.005, longitudeDelta: 0.005}},

]
export default class DrinkLocation extends React.Component {
    constructor() {
      super();
      this.state = {
        barList: [
          {name: "The Pub", coordinates: {latitude: 41.788083, longitude: -87.595506, latitudeDelta: 0.005, longitudeDelta: 0.005}},
          {name: "Woodlawn Tap", coordinates: {latitude: 41.795258, longitude: -87.596837, latitudeDelta: 0.005, longitudeDelta: 0.005}},
          {name: "Cove Lounge", coordinates: {latitude: 41.795373, longitude:  -87.581923, latitudeDelta: 0.005, longitudeDelta: 0.005}},
          {name: "Falcon Inn", coordinates:{latitude: 41.799393, longitude: -87.586353, latitudeDelta: 0.005, longitudeDelta: 0.005}},
        ],
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        } 
      }
    }
    
    render(){
        const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
        return(
            <View style={styles.container}>
                {statusbar}
                <Header title="drink.me"/>
                <View style={styles.inputContainer}> 
                  <Text style={styles.title}>Map</Text>
                </View>
                <MapView showsUserLocation={true} 
                          style={styles.map} 
                          initialRegion={{latitude: 41.787994, 
                                          longitude: -87.599648,
                                          latitudeDelta: 0.015922,
                                          longitudeDelta: 0.015421}}
                          showsUserLocation={true}>
                            <BarDescription
                              barList={barList}                            
                            />
                            {friendList.map((item,index)=>(
                              <Marker    
                                key={index}
                                title={item.name}
                                coordinate={item.coordinates}
                              >
                                  <Image
                                  source={require('../assets/friend.png')}
                                  resizeMode="contain"
                                  style={{ width: 40, height: 57 }}
                                  resizeMode={"contain"}/>
                              </Marker>
                            ))

                            }
                            {/*{barList.map((item,index) => (
                              <Marker 
                                key={index}
                                title={item.name}
                                coordinate={item.coordinates}
                              >
                                <Image
                                  source={require('../assets/marker.png')}
                                  resizeMode="contain"
                                  style={{width: 40, height: 57}}
                                />
                              </Marker>
                            ))
                            }*/}
                </MapView>
            <Text style={styles.counter}>Maps</Text>
        </View>
        );
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
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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