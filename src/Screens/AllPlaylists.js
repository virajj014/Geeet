import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomNav from '../Components/BottomNav'
import { backgroundColor1, backgroundColor2, primaryColor, secondaryColor } from '../Styles/Theme1'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePlaylist_global, setIsPlayingMusicOrPlaylist_global, setIsPlayingPlaylist_global, setIsPlaying_global } from '../redux/actions';

import { MaterialIcons } from '@expo/vector-icons';


const AllPlaylists = ({ navigation }) => {
    const [oldPlaylists, setOldPlaylists] = useState([])

    const dispatch = useDispatch()

    const getolddata = async () => {
        AsyncStorage.getItem('old_playlists').then((value) => {
            if (value) {
                setOldPlaylists(JSON.parse(value));
            }
        })
        AsyncStorage.getItem('active_playlist').then((value) => {
            if (value) {
                dispatch(setActivePlaylist_global(JSON.parse(value)))
                // console.log("active playlist", JSON.parse(value))
            }
        })
    }
    useEffect(() => {
        getolddata()
    }, [])




    // console.log(oldPlaylists);
    const [keyword, setKeyword] = useState('');
    // console.log(keyword)


    const deletePlaylist = (index) => {
        let temp = oldPlaylists;
        temp.splice(index, 1);
        setOldPlaylists(temp);
        AsyncStorage.setItem('old_playlists', JSON.stringify(temp));
        getolddata()
    }

    const activeplaylist = useSelector(state => state.activeplaylist_global)
    // console.log("active playlist", activeplaylist)
    const isplayingplaylist = useSelector(state => state.isplayingplaylist_global)

    const setactiveplaylist = (item) => {
        dispatch(setIsPlayingPlaylist_global(true))
        dispatch(setActivePlaylist_global(item))
        AsyncStorage.setItem('active_playlist', JSON.stringify(item));
        dispatch(setIsPlayingMusicOrPlaylist_global('playlist'))
        AsyncStorage.setItem('isplayingmusicorplaylist', JSON.stringify('playlist'));

        dispatch(setIsPlaying_global(false))  // for music
    }


    const playpauseplaylist = () => {
        dispatch(setIsPlayingPlaylist_global(!isplayingplaylist))
        dispatch(setIsPlaying_global(false))  // for music
        dispatch(setIsPlayingMusicOrPlaylist_global('playlist'))
        AsyncStorage.setItem('isplayingmusicorplaylist', JSON.stringify('playlist'));

    }

    return (
        <View style={styles.container}>
            <Text>All playlists</Text>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'allplaylists'} navigation={navigation} />
            </View>


            <ScrollView style={styles.playlistouter}>
                <TextInput style={styles.input1} placeholder='Search'
                    placeholderTextColor={secondaryColor}
                    onChangeText={(text) => setKeyword(text)}
                />
                {oldPlaylists
                    .filter((item) => {
                        if (keyword == '') {
                            return item;
                        } else if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
                            return item;
                        }
                    })
                    .map((item, index) =>
                        <View key={index}>
                            {
                                JSON.stringify(item) === JSON.stringify(activeplaylist) ?
                                    <TouchableOpacity >
                                        <View style={styles.playlistcard1}>
                                            <Text style={styles.txt11}>{item.name}</Text>
                                            <View style={styles.playlistcardin}>
                                                {
                                                    item.songs.length != 1 ?
                                                        <Text style={styles.txt21}>
                                                            {item.songs.length} songs
                                                        </Text>
                                                        :
                                                        <Text style={styles.txt21}>
                                                            {item.songs.length} song
                                                        </Text>
                                                }
                                                {
                                                    isplayingplaylist == true ?
                                                        <MaterialIcons name="pause-circle-filled" size={40} style={styles.icon2} onPress={
                                                            () => {
                                                                playpauseplaylist()
                                                            }

                                                        } />
                                                        :
                                                        <Feather name="play-circle" size={24} color="black" style={styles.icon2} onPress={
                                                            () => {
                                                                setactiveplaylist(item)
                                                            }

                                                        } />
                                                }

                                                <AntDesign name="delete" size={24} color="black" style={styles.icon2}
                                                    onPress={() => {
                                                        deletePlaylist(index)
                                                    }}

                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity >
                                        <View style={styles.playlistcard}>
                                            <Text style={styles.txt1}>{item.name}</Text>
                                            <View style={styles.playlistcardin}>
                                                {
                                                    item.songs.length != 1 ?
                                                        <Text style={styles.txt2}>
                                                            {item.songs.length} songs
                                                        </Text>
                                                        :
                                                        <Text style={styles.txt2}>
                                                            {item.songs.length} song
                                                        </Text>
                                                }

                                                <Feather name="play-circle" size={24} color="black" style={styles.icon1} onPress={
                                                    () => {
                                                        setactiveplaylist(item)
                                                    }

                                                } />


                                                <AntDesign name="delete" size={24} color="black" style={styles.icon1}
                                                    onPress={() => {
                                                        deletePlaylist(index)
                                                    }}

                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                            }
                        </View>
                    )}

            </ScrollView>
        </View>
    )
}

export default AllPlaylists

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor1,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },
    playlistouter: {
        width: '100%',

    },
    playlistcard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: primaryColor,
        width: '90%',
        alignSelf: 'center',
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 10,

    },
    playlistcardin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt1: {
        color: primaryColor,
        fontSize: 20,
    },
    txt2: {
        color: secondaryColor,
        fontSize: 15,
    },
    icon1: {
        color: primaryColor,
        fontSize: 30,
        marginHorizontal: 10,
    },
    input1: {
        backgroundColor: backgroundColor2,
        width: '90%',
        borderRadius: 10,
        marginVertical: 20,
        padding: 10,
        color: primaryColor,
        alignSelf: 'center',
    },
    playlistcard1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: primaryColor,
        width: '90%',
        alignSelf: 'center',
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderRadius: 10,

    },
    txt11: {
        color: backgroundColor1,
        fontSize: 20,
        marginLeft: 10,
    },
    txt21: {
        color: secondaryColor,
        fontSize: 15,
    },
    icon2: {
        color: backgroundColor1,
        fontSize: 30,
        marginHorizontal: 10,
    },
})