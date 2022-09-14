import { StyleSheet, Text, View, StatusBar, ScrollView, Image } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { setAllSongs } from '../redux/actions';
import { backgroundColor1, backgroundColor2, primaryColor } from '../Styles/Theme1';


import musicimg from '../../assets/musicimg1.png'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AllMusic = ({ navigation }) => {

    // const [allsongs, setAllSongs] = useState('Permission Not Granted');

    const mysongs = useSelector(state => state.allsongs);

    const permissionPopUp = async () => {
        Alert.alert("Permission Required", "This app requires permission to access your media library", [
            { text: "Accept", onPress: () => MediaLibrary.requestPermissionsAsync() },
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
                console.log("Permission Granted, showing all music");
            }
            if (askpermission.status == "denied" && askpermission.canAskAgain == false) {
                console.log("Can't Show Music");
            }
        }
    }

    useEffect(() => {
        getpermission();
    }, [])


    const dispatch = useDispatch()

    const getAllSongs = async () => {
        const songs = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
        })

        dispatch(setAllSongs(songs));

        // setAllSongs(songs.assets);
    }


    // console.log(mysongs.assets);

    let activesonguri = 'null';
    if (mysongs?.assets) {
        activesonguri = mysongs?.assets[0]?.uri;
        // console.log(activesonguri);
    }

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
                                item.uri == activesonguri ?
                                    <View style={styles.songcardactive}>
                                        <Image source={musicimg} style={styles.songimage} />
                                        <Text style={styles.songtitle1}>{item.filename}</Text>
                                        <MaterialIcons name="pause-circle-filled" size={40} style={styles.iconactive} />
                                        <MaterialIcons name="playlist-add" size={24} color="black" style={styles.iconactive} />
                                    </View>

                                    :

                                    <View style={styles.songcard}>
                                        <Image source={musicimg} style={styles.songimage} />
                                        <Text style={styles.songtitle}>{item.filename}</Text>
                                        <AntDesign name="play" size={24} color="black" style={styles.icon} />
                                        <MaterialIcons name="playlist-add" size={24} color="black" style={styles.icon} />
                                    </View>
                            }
                        </View>


                        // <Text style={styles.songtitle1}>{item.filename}</Text>

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
})