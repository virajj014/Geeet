import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomNav from '../Components/BottomNav'
import { backgroundColor1, primaryColor, secondaryColor } from '../Styles/Theme1'



// icons 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Player = ({ navigation }) => {
    const [isplaying, setisplaying] = useState(false)

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
    return (
        <View style={styles.container}>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'player'} navigation={navigation} />
            </View>

            <Animated.Image source={{ uri: tempimg }} style={[styles.imgbig,
            { transform: [{ rotate: RotateData }] }
            ]} />
            <View style={styles.container2}>
                <Text style={styles.text1}>Heat Waves</Text>
                <Text style={styles.text2}>by - Glass Animals</Text>
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
                    isplaying == false ? <AntDesign name="play" size={50} color="black" style={styles.icon} onPress={() => setisplaying(true)} />
                        : <MaterialIcons name="pause-circle-filled" size={60} style={styles.icon} onPress={() => setisplaying(false)} />
                }
                <MaterialCommunityIcons name="skip-next" size={50} color="black" style={styles.icon} />
            </View>

        </View>
    )
}

export default Player

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
    },
    imgbig: {
        width: 300,
        height: 300,
        borderRadius: 150,
        marginVertical: 20,
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