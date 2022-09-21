import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'
import { backgroundColor1, backgroundColor2, primaryColor } from '../Styles/Theme1'

const PlaylistPlayer = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'player'} navigation={navigation} />
            </View>
            <Text style={styles.head1}>Playing Playlist
            </Text>
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
})