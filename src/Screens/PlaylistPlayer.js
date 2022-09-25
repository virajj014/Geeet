import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'
import { backgroundColor1, backgroundColor2, primaryColor, secondaryColor } from '../Styles/Theme1'
import { useState } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useEffect } from 'react'
import musicimg from '../../assets/musicimg1.png'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage'

const PlaylistPlayer = ({ navigation }) => {
    const [activesong, setActivesong] = useState(null);

    const [isplaying, setisplaying] = useState(false)

    TrackPlayer.addEventListener('playback-state', async (state) => {
        if (state.state == 2) {
            setisplaying(true)
        }
        else {
            setisplaying(false)
        }
    })

    const getactivesong = async () => {
        let trackdata = await TrackPlayer.getQueue();
        let track = trackdata[await TrackPlayer.getCurrentTrack()]

        setActivesong(track)
    }

    useEffect(() => {
        getactivesong()
    }, [])

    const skiptonext = async () => {
        // console.log('skipping to next')
        await TrackPlayer.skipToNext()
        getactivesong()
    }

    const skiptoprevious = async () => {
        console.log('skipping to previous')
        await TrackPlayer.skipToPrevious()
        getactivesong()
    }

    return (
        <View style={styles.container}>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'player'} navigation={navigation} />
            </View>
            <Text style={styles.head1}>Playing Playlist
            </Text>


            {
                activesong ?
                    <View style={styles.container}>

                        <Image source={musicimg} style={styles.imgbig} />
                        <View style={styles.container2}>
                            <Text style={styles.text1}>{activesong?.title}</Text>
                            <Text style={styles.text2}>{activesong?.artistname}</Text>
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
                            <MaterialCommunityIcons name="skip-previous" size={50} color="black" style={styles.icon}

                                onPress={
                                    () => {
                                        skiptoprevious()
                                    }
                                }
                            />
                            {
                                isplaying == false ? <AntDesign name="play" size={50} color="black" style={styles.icon} onPress={
                                    () => {
                                        TrackPlayer.play()
                                        setisplaying(true)
                                        AsyncStorage.setItem('isplaying_localstorage', 'true')
                                    }
                                } />
                                    : <MaterialIcons name="pause-circle-filled" size={60} style={styles.icon} onPress={() => {
                                        TrackPlayer.pause()
                                        setisplaying(false)
                                        AsyncStorage.setItem('isplaying_localstorage', 'false')
                                    }} />
                            }
                            <MaterialCommunityIcons name="skip-next" size={50} color="black" style={styles.icon}
                                onPress={
                                    () => {
                                        skiptonext()
                                    }
                                }

                            />
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

export default PlaylistPlayer

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
    head1: {
        color: primaryColor,
        fontSize: 20,
        backgroundColor: backgroundColor2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 20,
        width: '50%',
        textAlign: 'center',
        alignItems: 'center',
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