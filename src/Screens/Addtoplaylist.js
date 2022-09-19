import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav';
import { backgroundColor1, backgroundColor2, primaryColor, secondaryColor } from '../Styles/Theme1';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Addtoplaylist = ({ navigation, route }) => {
    const { song } = route.params;
    const [newplaylist, setNewplaylist] = useState('');
    const [oldplaylist, setOldplaylist] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('old_playlists').then((value) => {
            if (value) {
                setOldplaylist(JSON.parse(value));
            }
        })
    }, [])



    const addtonewplaylist = (songuri) => {
        if (newplaylist.length == 0) {
            alert('Please enter a playlist name');
            return
        }

        let newdata = [...oldplaylist];
        newdata.push({ name: newplaylist, id: oldplaylist.length + 1, songs: [{ songuri }] });

        setOldplaylist(newdata);
        setNewplaylist('');
        alert('song added to new playlist');
        console.log(newdata);

        AsyncStorage.setItem('old_playlists', JSON.stringify(newdata))
    }


    const addtoexistingplaylist = ({ songuri, playlistid }) => {
        let newdata = [...oldplaylist];
        newdata[playlistid - 1].songs.push({ songuri });
        setOldplaylist(newdata);
        alert('song added to existing playlist');
        AsyncStorage.setItem('old_playlists', JSON.stringify(newdata))

    }


    const [keyword, setKeyword] = useState('');
    // console.log(keyword)
    return (
        <View style={styles.container}>
            <StatusBar />


            {/*  */}
            <View style={styles.bottomnav}>

                <BottomNav activepage={'allmusic'} navigation={navigation} />
            </View>


            <View style={styles.c1}>
                <Text style={styles.head2}>
                    Create new playlist
                </Text>
                <View style={styles.c1in}>
                    <TextInput style={styles.input} placeholder='Playlist name'
                        placeholderTextColor={secondaryColor}

                        onChangeText={(text) => {
                            setNewplaylist(text);
                        }}
                        value={newplaylist}
                    />
                    <AntDesign name="plussquare" size={24} color="black" style={styles.icon}

                        onPress={() => {
                            addtonewplaylist({ songuri: song.uri })
                        }}
                    />
                </View>
            </View>


            <View style={styles.c2}>
                <Text style={styles.head3}>
                    Add to existing playlist
                </Text>
                <TextInput style={styles.input1} placeholder='Search'
                    placeholderTextColor={secondaryColor}
                    onChangeText={(text) => setKeyword(text)}
                />

                <ScrollView style={styles.c2in}>
                    {
                        oldplaylist
                            .filter((item) => {
                                if (keyword == '') {
                                    return item;
                                }
                                else if (
                                    item.name.toLowerCase().includes(keyword.toLowerCase())
                                ) {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return (
                                    <TouchableOpacity key={item.id}
                                        onPress={() => {
                                            addtoexistingplaylist({ songuri: song.uri, playlistid: item.id })
                                        }}
                                    >
                                        <View style={styles.playlistcard}>
                                            <Text style={styles.playlistname}>
                                                {item.name}
                                            </Text>


                                            {
                                                item.songs.length != 1 ?
                                                    <Text style={styles.playlistcount}>
                                                        {item.songs.length} songs
                                                    </Text>
                                                    :
                                                    <Text style={styles.playlistcount}>
                                                        {item.songs.length} song
                                                    </Text>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                    }
                </ScrollView>
            </View>

        </View >
    )
}

export default Addtoplaylist

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
    head2: {
        color: primaryColor,
        fontSize: 20,
        marginTop: 20,
    },
    c1: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    c1in: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: backgroundColor2,
        width: '90%',
        borderRadius: 10,
        marginVertical: 20,
        padding: 10,
        color: primaryColor,
    },
    icon: {
        color: primaryColor,
        fontSize: 50,
    },
    input1: {
        backgroundColor: backgroundColor2,
        width: '90%',
        borderRadius: 10,
        marginVertical: 20,
        padding: 10,
        color: primaryColor,
    },
    c2: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: primaryColor,
        borderRadius: 20,
        marginTop: 20,
        padding: 20,
    },
    head3: {
        color: backgroundColor1,
        fontSize: 20,
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
        paddingBottom: 5,
        width: '100%',
        textAlign: 'center',
    },
    c2in: {
        width: '100%',
    },
    playlistcard: {
        width: '100%',

        // backgroundColor: backgroundColor2,
        borderRadius: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: secondaryColor,
        borderWidth: 1,
    }
})