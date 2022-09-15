export const setAllSongs = (songs) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_ALL_SONGS',
            payload: songs
        })
    }
}

export const setActiveSong_global = (song) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_SONG',
            payload: song
        })
    }
}



export const setIsPlaying_global = (boolval) => {
    return (dispatch) => {
        dispatch({
            type: "SET_IS_PLAYING",
            payload: boolval
        })
    }
}