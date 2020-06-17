import api from '../../services/Api'

import * as actionsPlayer from '../actions/player'


/**
 * Set new Playlist to Player
 * @param {int} id ID da playlist ou Album
 * @param {string} router playlist | album
 * @param {int} [track_id] Set track init player
 */
export function setNewPlaylist(id, router, track_id = null){
  return dispatch => {

    let prefixrouter = ""
    switch(router){
      case "playlist" : prefixrouter = "playlists"
        break
      case "album" : prefixrouter = "albums"
        break
      default : prefixrouter = "playlists"
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
        if(track_id !== null && data.playlist.findIndex( (item) => item.id === track_id ) !== -1 ){
          let index_track = data.playlist.findIndex( (item) => item.id === track_id )
          data.playing = data.playlist[index_track];
          data.playingIndex = index_track;
        }else if(data.playlist[0] && Object.keys(data.playing).length === 0){
          data.playing = data.playlist[0];
        }
  
        localStorage.setItem('last_player_id', response.data.id)
        localStorage.setItem('last_player_type', prefixrouter)

        dispatch( actionsPlayer.status(true));
        dispatch( actionsPlayer.newPlaylist(data, "new-playlist-player"));
      }
    })
    .catch( dataError => {
        console.error(`Erro de processo. Code: ${dataError.status}`)
    })
  }
}