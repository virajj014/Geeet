const isplayingmusicorplaylist = (state = '', action) => {
    switch (action.type) {
        case 'SET_IS_PLAYING_MUSIC_Or_PLAYLIST':
            return action.payload;
        default:
            return state;
    }
}

export default isplayingmusicorplaylist;