import React, { useState, useEffect } from 'react'

import api from '../../../services/Api'

import ComponentUILinkOfComma from '../../UI/LinkOfComma/LinkOfComma'

import { ReactComponent as IconMusicalNotes } from '../../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPlay } from '../../../assets/img/icons/play-outline.svg'

import "./SearchAddTrack.css"

const SearchAddTrack = function (props) {

  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])

  function handleClickAdd (track_id){

  }


  useEffect(() => {

    if(search.length > 0){
      api.get(`/search/${search}/track`, {
        validateStatus: (s) => s === 200
      })
        .then( response => {
          setResult(response.data)
        })
        .catch( dataError => {
          console.dir(dataError)
        })
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

        {result.map( result => (
          <div key={result.id} className="songs-list">
            <div className="songs-list-icon">
              <IconMusicalNotes className="songs-list-icon-notes" width="22px" height="22px" />
              <IconPlay className="songs-list-icon-play" width="22px" height="22px" />
            </div>
            <div className="songs-list-name">
            <div><a href={`/album/${result.id}`}>{result.name}</a></div>
              <div>
                <ComponentUILinkOfComma 
                  prefixRoute="/author/"
                  data={result.authors}
                />
              </div>
            </div>
            <div className="songs-list-time">
              <button className="btn btn-sm btn-primary" onClick={() => handleClickAdd(result.id)}>Adicionar</button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default SearchAddTrack
