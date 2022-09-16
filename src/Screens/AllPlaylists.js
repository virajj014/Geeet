import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'
import { backgroundColor1, primaryColor, secondaryColor } from '../Styles/Theme1'
import { Feather } from '@expo/vector-icons';
const AllPlaylists = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>All playlists</Text>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'allplaylists'} navigation={navigation} />
            </View>


            <ScrollView style={styles.playlistouter}>
                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>
                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>
                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>
                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>


                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>
                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>


                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>
                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>


                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>

                <View style={styles.playlistcard}>
                    <Text style={styles.txt1}>Playlist 1</Text>
                    <View style={styles.playlistcardin}>
                        <Feather name="play-circle" size={24} color="black" style={styles.icon1} />
                        <Feather name="plus-square" size={24} color="black" style={styles.icon1} />
                    </View>
                </View>


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
    },
    txt1: {
        color: primaryColor,
        fontSize: 20,
    },
    icon1: {
        color: primaryColor,
        fontSize: 30,
        marginHorizontal: 10,
    }
})