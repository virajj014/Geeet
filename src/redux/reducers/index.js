import { combineReducers } from 'redux';
import { allsongsReducer } from './allSongsReducer';


const reducers = combineReducers({
    allsongs: allsongsReducer
})


export default reducers;