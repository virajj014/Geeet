import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Player from './src/Screens/Player';
import AllMusic from './src/Screens/AllMusic';
import AllPlaylists from './src/Screens/AllPlaylists';



import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={Store}>
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
