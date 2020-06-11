import api from '../Api'

/**
 * Valida se ja existe a track na playlist, caso não tiver ele adiciona a track na playlist
 * @param {array} tracklist Array de objetos de tracks
 * @param {int} playlist_id Id da Playlist
 * @param {object} track Objecto de Track
 */
export async function addTrackInPlaylist(tracklist, playlist_id, track){

  const existTrack = tracklist.find( (track_item) => track_item.id === track.id)
  if(existTrack) return 

  await api.post(`/playlists/${playlist_id}/track/${track.id}`, {
    validateStatus: (s) => s === 204
  })
  tracklist.push(track)
}

/**
 * 
 * @param {array} tracklist Array de objetos track
 * @param {int} playlist_id ID da playlist
 * @param {object} track Objeto de track
 */
export async function removeTrackInPlaylist(tracklist, playlist_id, track){

  const existTrack = tracklist.find( (track_item) => track_item.id === track.id)
  if(!existTrack) return 

  await api.delete(`/playlists/${playlist_id}/track/${track.id}`, {
    validateStatus: (s) => s === 204
  })
  
}