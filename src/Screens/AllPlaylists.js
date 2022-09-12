import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'

const AllPlaylists = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>All playlists</Text>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'allplaylists'} navigation={navigation} />
            </View>
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
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    }
})