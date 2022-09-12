import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'

const AllMusic = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>AllMusic</Text>
            <View style={styles.bottomnav}>
                <BottomNav activepage={'allmusic'} navigation={navigation} />
            </View>
        </View>
    )
}

export default AllMusic

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