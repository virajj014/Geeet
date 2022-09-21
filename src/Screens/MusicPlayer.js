import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomNav from '../Components/BottomNav'
import { backgroundColor1, primaryColor, secondaryColor } from '../Styles/Theme1'
import musicimg from '../../assets/musicimg1.png'


// icons 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlaying_global } from '../redux/actions'


const MusicPlayer = ({ navigation }) => {
    const isplaying = useSelector(state => state.isplaying_global);  // for music
    const isplayingplaylist = useSelector(state => state.isplayingplaylist_global);  // for playlist
    const isplayingmusicorplaylist = useSelector(state => state.isplayingmusicorplaylist_global);  // for playlist

    const tempimg = "https://upload.wikimedia.org/wikipedia/en/b/b0/Glass_Animals_-_Heat_Waves.png"

    let rotateValueHolder = new Animated.Value(0);
    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false
        }).start(() => startImageRotateFunction());
    }

    useEffect(() => {
        if (isplaying == true) {
            startImageRotateFunction()
        }
        else {
            rotateValueHolder.setValue(0);
            rotateValueHolder.stopAnimation()
        }
    }, [isplaying])


    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    const activesong_global = useSelector(state => state.activesong_global)

    // console.log("player page - ", activesong_global)
    const dispatch = useDispatch()
    const playpausesong = () => {
        dispatch(setIsPlaying_global(!isplaying))
    }


    console.log(isplayingmusicorplaylist)

    return (
        <View style={styles.container}>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'player'} navigation={navigation} />
            </View>

            {
                activesong_global?.uri ?
                    <View style={styles.container}>
                        <Animated.Image source={musicimg} style={[styles.imgbig,
                        { transform: [{ rotate: RotateData }] }
                        ]} />
                        <View style={styles.container2}>
                            <Text style={styles.text1}>{activesong_global?.filename}</Text>
                            <Text style={styles.text2}>{activesong_global?.artistname}</Text>
                        </View>
                        <View style={styles.container3}>
                            <View style={styles.musiccompletedout}>
                                <View style={styles.musiccompletedin}></View>
                            </View>
                            <View style={styles.timecont}>
                                <Text style={styles.time}>00:00</Text>
                                <Text style={styles.time}>01:00</Text>
                            </View>
                        </View>

                        <View style={styles.container4}>
                            <MaterialCommunityIcons name="skip-previous" size={50} color="black" style={styles.icon} />
                            {
                                isplaying == false ? <AntDesign name="play" size={50} color="black" style={styles.icon} onPress={() => playpausesong()} />
                                    : <MaterialIcons name="pause-circle-filled" size={60} style={styles.icon} onPress={() => playpausesong()} />
                            }
                            <MaterialCommunityIcons name="skip-next" size={50} color="black" style={styles.icon} />
                        </View>
                    </View>

                    :

                    <View style={styles.container}>
                        <Text style={styles.text1}>No song selected</Text>
                    </View>
            }

        </View>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor1,
        width: '100%',
        height: '100%',
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        zIndex: 10
    },
    imgbig: {
        width: 300,
        height: 300,
        borderRadius: 150,
        marginVertical: 20,
        borderColor: primaryColor,
        borderWidth: 2,
    },
    text1: {
        fontSize: 20,
        color: primaryColor,
        width: 300,
        textAlign: 'center',
        alignSelf: 'center',
    },
    text2: {
        fontSize: 15,
        color: secondaryColor,
        width: 200,
        textAlign: 'center',
        alignSelf: 'center',
    },
    container3: {
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    time: {
        fontSize: 15,
        color: secondaryColor,
    },
    musiccompletedout: {
        width: '100%',
        height: 5,
        backgroundColor: secondaryColor,
        borderRadius: 5,
    },
    musiccompletedin: {
        width: '70%',
        height: 5,
        backgroundColor: primaryColor,
    },
    timecont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    icon: {
        color: primaryColor,
    },
    container4: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
    }
})