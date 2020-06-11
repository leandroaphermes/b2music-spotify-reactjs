import React, { useState, useEffect } from 'react'
import PropsTypes from 'prop-types'

import api from '../../../services/Api'
import { addTrackInPlaylist } from '../../../services/function/playlist'

import ComponentUILinkOfComma from '../../UI/LinkOfComma/LinkOfComma'

import { ReactComponent as IconMusicalNotes } from '../../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPlay } from '../../../assets/img/icons/play-outline.svg'

import "./SearchAddTrack.css"

const SearchAddTrack = function (props) {

  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])

  function handleClickAdd (track){
    addTrackInPlaylist(props.playlist.tracks, props.playlist.id, track)
    .then( ()=> {
      console.log("Deu CERTO")
      setResult([...result])
    })
    .catch( dataError => {
    })
  }


  useEffect(() => {

    if(search.length > 0){
      const timeoutID = setTimeout(() => {
          api.get(`/search/${search}/track`, {
            validateStatus: (s) => s === 200
          })
            .then( response => {
              setResult(response.data)
            })
            .catch( dataError => {
              console.dir(dataError)
            })
      }, 800);
      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [search])


  return (
    <div>
      <div className="form-group">
        <input 
          type="search" 
          className="form-control" 
          placeholder="Buscar Musica"
          onChange={(e)=> setSearch(e.target.value)}
        />
      </div>
      <div className="search-results">

        {result.map( track => (
          <div key={track.id} className="songs-list">
            <div className="songs-list-icon">
              <IconMusicalNotes className="songs-list-icon-notes" width="22px" height="22px" />
              <IconPlay className="songs-list-icon-play" width="22px" height="22px" />
            </div>
            <div className="songs-list-name">
            <div><a href={`/album/${track.id}`}>{track.name}</a></div>
              <div>
                <ComponentUILinkOfComma 
                  prefixRoute="/author/"
                  data={track.authors}
                />
              </div>
            </div>
            <div className="songs-list-time">
              { !props.playlist.tracks.find( track_item => track_item.id === track.id ) && (
                <button className="btn btn-sm btn-primary" onClick={() => handleClickAdd(track)}>Adicionar</button>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

SearchAddTrack.prototype = {
  playlist: PropsTypes.object.isRequired
}

export default SearchAddTrack
