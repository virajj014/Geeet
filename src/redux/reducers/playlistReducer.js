const activeplaylistReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_PLAYLIST':
            return action.payload;
        default:
            return state;
    }
}


const isplayingplaylistReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_IS_PLAYING_PLAYLIST':
            return action.payload;
        default:
            return state;
    }
}

export { activeplaylistReducer, isplayingplaylistReducer };