/**
 * Function endpointTypeRouter
 * @param {int} id ID playlist | album
 * @param {string} type playlist | album | favorite
 * @return {string} Return URL endpoint to player get info
 */
export function endpointTypeRouter(id, type) {
  let endpoint = ""
  switch(type){
    case "playlist" : endpoint = `/playlists/${id}` 
      break
    case "album" : endpoint = `/albums/${id}`
      break
    case "favorite" : endpoint = `/me/favorites-player`
      break
    default : endpoint = `/playlists/${id}`
  }

  return endpoint
}