import { combineReducers } from 'redux';
import isplayingmusicorplaylist from './activemusicplaylistReducer';
import { activesongReducer, isplayingReducer } from './activesongReducer';
import { allsongsReducer } from './allSongsReducer';
import { activeplaylistReducer, isplayingplaylistReducer } from './playlistReducer';


const reducers = combineReducers({
    allsongs: allsongsReducer,
    activesong_global: activesongReducer,
    isplaying_global: isplayingReducer,
    activeplaylist_global: activeplaylistReducer,
    isplayingplaylist_global: isplayingplaylistReducer,
    isplayingMusicOrPlaylist_global: isplayingmusicorplaylist,
})


export default reducers;