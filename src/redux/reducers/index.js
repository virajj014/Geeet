import { combineReducers } from 'redux';
import { activesongReducer, isplayingReducer } from './activesongReducer';
import { allsongsReducer } from './allSongsReducer';


const reducers = combineReducers({
    allsongs: allsongsReducer,
    activesong_global: activesongReducer,
    isplaying_global: isplayingReducer
})


export default reducers;