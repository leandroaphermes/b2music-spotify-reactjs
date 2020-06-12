import api from '../Api'

/**
 * 
 * @param {int} id ID author, album, playlist or track
 * @param {string} type Type author, album, playlist or track
 */
const getFavorite = function (id, type){
  return new Promise( (resolve, reject) => {
    api.get(`/me/favorites/${id}/${type}`, {
      validateStatus: (s) => s === 200
    })
    .then( response => resolve(response.data.favorite) )
    .catch( dataError => reject(dataError.response.data) )
  })
}

/**
 * 
 * @param {int} id ID author, album, playlist or track
 * @param {string} type Type author, album, playlist or track
 */
const addFavorite = function(id, type){
  return new Promise( (resolve, reject) => {

    api.post(`/me/favorites/${id}/${type}`, {
      validateStatus: (status) =>  status === 204 
    })
    .then( () => resolve(true) )
    .catch( () => reject(false) )
  })
}

/**
 * 
 * @param {int} id ID author, album, playlist or track
 * @param {string} type Type author, album, playlist or track
 */
const removeFavorite = function(id, type){
  return new Promise( (resolve, reject) => {

    api.delete(`/me/favorites/${id}/${type}`, {
      validateStatus: (status) =>  status === 204 
    })
    .then( () => resolve(true) )
    .catch( () => reject(false) )
  })
}

export {
  getFavorite,
  addFavorite,
  removeFavorite
}