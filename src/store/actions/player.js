/** Set new value to State Player */
export function set(data){
    return {
        type: 'SET_PLAYER_DATA',
        data
    }
}

/** Set status Play & Pause */
export function status(status){
    return {
        type: 'SET_PLAYER_STATUS',
        status
    }
}
