import { StyleSheet, Text, View, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong_global, setAllSongs, setIsPlayingMusicOrPlaylist_global, setIsPlayingPlaylist_global, setIsPlaying_global } from '../redux/actions';
import { backgroundColor1, backgroundColor2, primaryColor } from '../Styles/Theme1';


import musicimg from '../../assets/musicimg1.png'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';



import TrackPlayer, { Capability, Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
];


const AllMusic = ({ navigation }) => {
    const dispatch = useDispatch()
    const permissionPopUp = async () => {
        Alert.alert("Permission Required", "This app requires permission to access your media library", [
            {
                text: "Accept", onPress: () => {
                    MediaLibrary.requestPermissionsAsync()
                    getAllSongs()
                }
            },
            { text: "Cancel", onPress: () => permissionPopUp() }
        ])
    }
    const getpermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();
        // console.log(permission);

        // {"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
        // {"canAskAgain": true, "expires": "never", "granted": false, "status": "undetermined"}

        if (permission.granted == true) {
            console.log("Permission Granted, showing all music");
            getAllSongs();
        }

        if (permission.granted == false && permission.canAskAgain == true) {
            const askpermission = await MediaLibrary.requestPermissionsAsync();
            // console.log(askpermission);

            if (askpermission.status == "denied" && askpermission.canAskAgain == true) {
                permissionPopUp();
                getAllSongs();
                console.log("Permission Denied, Please allow permission to show all music");
            }
            if (askpermission.status == "granted") {
                getAllSongs()
                console.log("Permission Granted, showing all music");
            }
            if (askpermission.status == "denied" && askpermission.canAskAgain == false) {
                console.log("Can't Show Music");
            }
        }
    }
    const getAllSongs = async () => {
        const songs = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
        })
        dispatch(setAllSongs(songs));
        // console.log(songs);
        return songs?.assets;
    }

    const mysongs = useSelector(state => state.allsongs);


    // Track player setup --------------------------------------------
    const [trackdata, setTrackdata] = useState([]);
    const setUpPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                stopWithApp: true,
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ]
            })
            await TrackPlayer.setRate(1);


            const data = await getAllSongs();
            // console.log(data);
            let temparr = data.map((song) => {
                return {
                    id: song.id,
                    url: song.uri,
                    title: song.filename,
                    artist: song.artist,
                    artwork: song.artwork,
                }
            })
            // console.log(temparr);
            setTrackdata(temparr);
            await TrackPlayer.add(temparr);
            // console.log(await TrackPlayer.getQueue());
        }
        catch (error) {
            console.log(error);
        }
    }
    //----------------------------------------------------------------


    // set active song from local storage ---------------------------------
    const [activeSong, setActiveSong] = useState(null);

    const getlocalsong = async () => {
        AsyncStorage.getItem('activesong_localstorage').then(async (value) => {
            // console.log('local storage has active song - ', value);
            dispatch(setActiveSong_global(JSON.parse(value)));
            setActiveSong(JSON.parse(value));

        })
    }
    // -------------------------------------------------------------------



    useEffect(() => {
        getpermission();
        setUpPlayer();
        getlocalsong();
    }, [])








    // Update current song ---------------------------------------
    const updatecurrentsong = async (song) => {
        dispatch(setActiveSong_global(song));
        setActiveSong(song);
        AsyncStorage.setItem('activesong_localstorage', JSON.stringify(song));
        AsyncStorage.setItem('isplaying_localstorage', JSON.stringify(true));
        let index = trackdata.findIndex((song1) => song1.id == song.id);

        try {
            await TrackPlayer.skip(index);
            await TrackPlayer.setRate(1);
            await TrackPlayer.play();
        }
        catch (error) {
            console.log(error);
        }
        setIsPlayingMusicOrPlaylist_global('music')
        AsyncStorage.setItem('isplayingmusicorplaylist', 'music');
    }
    //-------------------------------------------------------------


    // platback state play pause btn track player notification bar to app ---------------
    const [playerState, setPlayerState] = useState(null)

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn('An error occured while playing the current track.');
        }
        if (event.type === Event.PlaybackState) {
            setPlayerState(event.state);
        }
    })

    const isplaying = playerState === State.Playing;


    //----------------------------------------------------------------------------------

    // Play and Pause ---------------------------------------------


    const playpausesong = async () => {
        if (playerState == State.Playing) {
            try {
                await TrackPlayer.pause()
                AsyncStorage.setItem('isplaying_localstorage', JSON.stringify(false));
            }
            catch (err) {
                console.log('play pause song error 1 ', err)
            }
        }
        else {
            try {
                await TrackPlayer.play()
                AsyncStorage.setItem('isplaying_localstorage', JSON.stringify(true));

            }
            catch (err) {
                console.log('play pause song error 2 ', err)
            }
        }
        AsyncStorage.setItem('isplayingmusicorplaylist', 'music');

    }



    TrackPlayer.addEventListener('playback-track-changed', async (state) => {
        let trackdata = await TrackPlayer.getQueue();
        let track = trackdata[await TrackPlayer.getCurrentTrack()]
        setActiveSong(track)
        AsyncStorage.setItem('activesong_localstorage', JSON.stringify(track));
    })


    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.bottomnav}>
                <BottomNav activepage={'allmusic'} navigation={navigation} />
            </View>
            <Text style={styles.head1}>Your Songs
            </Text>
            <ScrollView style={styles.cont2}>
                {
                    mysongs?.assets && mysongs.assets.map((item) =>
                        <View key={item.id}>
                            {
                                item.uri == activeSong?.uri || item.uri == activeSong?.url ?
                                    <View style={styles.songcardactive}>
                                        <Image source={musicimg} style={styles.songimage} />
                                        <Text style={styles.songtitle1}>{item.filename}</Text>
                                        {

                                            isplaying == true ?
                                                <MaterialIcons name="pause-circle-filled" size={40} style={styles.iconactive}
                                                    onPress={
                                                        () => playpausesong(item)
                                                    }

                                                />
                                                :
                                                <MaterialIcons name="play-circle-filled" size={40} style={styles.iconactive}
                                                    onPress={
                                                        () => playpausesong(item)
                                                    }

                                                />
                                        }
                                        <MaterialIcons name="playlist-add" size={24} color="black" style={styles.iconactive}
                                            onPress={
                                                () => navigation.navigate('addtoplaylist',
                                                    { song: item })
                                            }
                                        />
                                    </View>

                                    :

                                    <View style={styles.songcard}>
                                        <Image source={musicimg} style={styles.songimage} />
                                        <Text style={styles.songtitle}>{item.filename}</Text>
                                        <AntDesign name="play" size={24} color="black" style={styles.icon}
                                            onPress={() => updatecurrentsong(item)}

                                        />
                                        <MaterialIcons name="playlist-add" size={24} color="black" style={styles.icon}
                                            onPress={
                                                () => navigation.navigate('addtoplaylist',
                                                    { song: item })
                                            }
                                        />
                                    </View>
                            }
                        </View>

                    )
                }
            </ScrollView>
        </View>
    )
}

export default AllMusic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: backgroundColor1,
        width: "100%"
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

    const2: {
        width: "100%",
    },
    songcard: {
        width: '95%',
        backgroundColor: backgroundColor2,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    songimage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: backgroundColor1,
    },
    songtitle: {
        color: primaryColor,
        fontSize: 17,
        fontWeight: 'bold',
        margin: 10,
        width: '60%',
    },
    icon: {
        marginHorizontal: 10,
        color: primaryColor,
    },
    iconactive: {
        marginHorizontal: 2,
        color: backgroundColor1,
    },
    songcardactive: {
        width: '95%',
        backgroundColor: primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    songtitle1: {
        color: backgroundColor1,
        fontSize: 17,
        fontWeight: 'bold',
        margin: 10,
        width: '60%',
    },

    bottomsong: {
        backgroundColor: primaryColor,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,

    }
})



