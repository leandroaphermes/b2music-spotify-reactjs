import api from '../../services/Api'

import * as actionsPlayer from '../actions/player'

/**
 * 
 * @param {int} id ID da playlist ou Album
 * @param {string} router playlist | album
 */
export function setNewPlaylist(id, router){
  return dispatch => {

    let prefixrouter = ""
    switch(router){
      case "playlist" : prefixrouter = "playlists"
        break
      case "album" : prefixrouter = "albums"
      break
    }

    api.get(`/${prefixrouter}/${id}`, {
      validateStatus: (status) => status === 200
    })
    .then( response => {
      if(response.data.tracks.length > 0){
        const data = {
            id: response.data.id,
            playingIndex: 0,
            playing: { },
            playlist: response.data.tracks
        }
  
        if(data.playlist[0] && Object.keys(data.playing).length === 0){
            data.playing = data.playlist[0];
        }
  
        localStorage.setItem('last_player_id', response.data.id)
        localStorage.setItem('last_player_type', prefixrouter)

        dispatch( actionsPlayer.status(true));
        dispatch( actionsPlayer.set(data));
      }
    })
    .catch( dataError => {
        console.error(`Erro de processo. Code: ${dataError.status}`)
    })

  }
}