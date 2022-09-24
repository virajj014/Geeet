import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'


// icons import
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { backgroundColor1, backgroundColor2, primaryColor, themecol } from '../Styles/Theme1';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomNav = ({ activepage, navigation }) => {
    const [isplayingMusicOrPlaylist, setisplayingMusicOrPlaylist] = useState('music')

    AsyncStorage.getItem('isplayingmusicorplaylist').then((value) => {
        setisplayingMusicOrPlaylist(value)
    })

    return (
        <View style={styles.container}>
            {
                activepage == 'allmusic' ?
                    <Entypo name="folder-music" size={50} color="black" style={styles.iconactive}
                        onPress={() => navigation.navigate('allmusic')}
                    />
                    : <Entypo name="folder-music" size={50} color="black" style={styles.icon}
                        onPress={() => navigation.navigate('allmusic')}
                    />
            }


            {
                activepage == 'player' ?

                    <View>
                        {
                            isplayingMusicOrPlaylist == 'music' ?
                                <MaterialCommunityIcons name="headphones" size={50} color={primaryColor} style={styles.iconactive} onPress={() => navigation.navigate('musicplayer')} />
                                :
                                <MaterialCommunityIcons name="headphones" size={50} color={primaryColor} style={styles.iconactive} onPress={() => navigation.navigate('playlistplayer')} />
                        }
                    </View>
                    :
                    <View>
                        {
                            isplayingMusicOrPlaylist == 'music' ?
                                <MaterialCommunityIcons name="headphones" size={50} color={primaryColor} style={styles.icon} onPress={() => navigation.navigate('musicplayer')} />
                                :
                                <MaterialCommunityIcons name="headphones" size={50} color={primaryColor} style={styles.icon} onPress={() => navigation.navigate('playlistplayer')} />
                        }
                    </View>
            }



            {
                activepage == 'allplaylists' ?
                    <MaterialCommunityIcons name="playlist-music" size={50} color={primaryColor} style={styles.iconactive}
                        onPress={() => navigation.navigate('allplaylists')}
                    />

                    :
                    <MaterialCommunityIcons name="playlist-music" size={50} color={primaryColor} style={styles.icon}
                        onPress={() => navigation.navigate('allplaylists')}
                    />
            }

        </View>
    )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    icon: {
        color: primaryColor,
    },
    iconactive: {
        color: themecol,
    }
})