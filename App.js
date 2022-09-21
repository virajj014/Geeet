import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMusic from './src/Screens/AllMusic';
import AllPlaylists from './src/Screens/AllPlaylists';



import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import Addtoplaylist from './src/Screens/Addtoplaylist';
import MusicPlayer from './src/Screens/MusicPlayer';
import PlaylistPlayer from './src/Screens/PlaylistPlayer';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='allmusic'>
          <Stack.Screen name="musicplayer" component={MusicPlayer} options={
            { headerShown: false }
          } />
          <Stack.Screen name="playlistplayer" component={PlaylistPlayer} options={
            { headerShown: false }
          } />
          <Stack.Screen name="allmusic" component={AllMusic} options={
            { headerShown: false }
          } />
          <Stack.Screen name="allplaylists" component={AllPlaylists} options={
            { headerShown: false }
          } />
          <Stack.Screen name="addtoplaylist" component={Addtoplaylist} options={
            { headerShown: true, title: 'Add to playlist' }
          } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
