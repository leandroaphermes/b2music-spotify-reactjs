const INITIAL_STATE = {
    player: {
        playingIndex: 0,
        playing: {},
        playlist: [ ]
    }
}

export default function player(state = INITIAL_STATE, action){
    switch (action.type) {
        case "SET_PLAYER_DATA":
            return {...state, player: action.data }
    
        default:
            return state
    }
}