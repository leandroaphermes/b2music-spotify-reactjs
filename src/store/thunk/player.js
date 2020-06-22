import { endpointTypeRouter } from '../../services/function/player'
import api from '../../services/Api'


import * as actionsPlayer from '../actions/player'
import * as actionsAlert from '../actions/alert'


/**
 * Set new Playlist to Player
 * @param {int} id ID da playlist ou Album
 * @param {string} router playlist | album | favorite
 * @param {int} [track_id] Set track init player
 */
export function setNewPlaylist(id, router, track_id = null){
  return dispatch => {

    api.get( endpointTypeRouter(id, router), {
      validateStatus: (status) => status === 200
    })
    .then( response => {
      if(response.data.tracks.length > 0){
        const data = {
            id: response.data.id,
            type_list: router,
            playingIndex: 0,
            playing: { },
            playlist: response.data.tracks
        }  
        if(track_id !== null && data.playlist.findIndex( (item) => item.id === track_id ) !== -1 ){
          let index_track = data.playlist.findIndex( (item) => item.id === track_id )
          data.playing = data.playlist[index_track];
          data.playingIndex = index_track;
        }else if(data.playlist[0] && Object.keys(data.playing).length === 0){
          data.playing = data.playlist[0];
        }
  
        localStorage.setItem('last_player_id', response.data.id)
        localStorage.setItem('last_player_type', router)

        dispatch( actionsPlayer.status(true));
        dispatch( actionsPlayer.newPlaylist(data, "new-playlist-player", router));
      }
    })
    .catch( dataError => {
        dispatch( actionsAlert.set({
          status: true,
          type: "danger",
          message: `Erro de processo. Code: ${dataError.status}`
        }) )
    })
  }
}