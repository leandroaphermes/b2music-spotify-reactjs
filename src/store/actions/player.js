import { sendAction } from '../../services/function/actions_triggers'

/** Set new value to State Player */
export function set(data){
    return {
        type: 'SET_PLAYER_DATA',
        data
    }
}

/** Set new value to State Player */
export function newPlaylist(data, action){
    
    sendAction( 
        "set-new-playlist", 
        action, 
        "user",
        {
            playlist_id: data.id
        }
    ).then().catch()

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
