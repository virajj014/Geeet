import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomNav from '../Components/BottomNav'
import { backgroundColor1, backgroundColor2, primaryColor, secondaryColor } from '../Styles/Theme1'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
const AllPlaylists = ({ navigation }) => {
    const [oldPlaylists, setOldPlaylists] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('old_playlists').then((value) => {
            if (value) {
                setOldPlaylists(JSON.parse(value));
            }
        })
    }, [])




    // console.log(oldPlaylists);
    const [keyword, setKeyword] = useState('');
    // console.log(keyword)


    const deletePlaylist = (id) => {
        console.log(id);
        let newdata = [...oldPlaylists];
        newdata.splice({}, 1);
        // setOldPlaylists(newdata);
        // AsyncStorage.setItem('old_playlists', JSON.stringify(newdata))
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
                    .map((item) => {
                        return (
                            <TouchableOpacity key={item.id}>
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
                                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />

                                        <AntDesign name="delete" size={24} color="black" style={styles.icon1}
                                            onPress={() => {
                                                deletePlaylist(item.id)
                                            }}

                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    })}

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
})