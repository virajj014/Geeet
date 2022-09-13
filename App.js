import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Player from './src/Screens/Player';
import AllMusic from './src/Screens/AllMusic';
import AllPlaylists from './src/Screens/AllPlaylists';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [allsongs, setAllSongs] = useState('Permission Not Granted');

  const permissionPopUp = async () => {
    Alert.alert("Permission Required", "This app requires permission to access your media library", [
      { text: "Accept", onPress: () => MediaLibrary.requestPermissionsAsync() },
      { text: "Cancel", onPress: () => permissionPopUp() }
    ])
  }


  const getpermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);

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


  const getAllSongs = async () => {
    const songs = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    })

    // console.log(typeof (songs));
    // console.log(songs.assets);
    setAllSongs(songs.assets);
  }


  console.log(allsongs);
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="player" component={Player} options={
          { headerShown: false }
        } />
        <Stack.Screen name="allmusic" component={AllMusic} options={
          { headerShown: false }
        } />
        <Stack.Screen name="allplaylists" component={AllPlaylists} options={
          { headerShown: false }
        } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
