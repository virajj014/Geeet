export const setAllSongs = (songs) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_ALL_SONGS',
            payload: songs
        })
    }
}