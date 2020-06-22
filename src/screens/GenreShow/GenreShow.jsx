import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../services/Api'

import ComponentCardsPlaylistImage from '../../components/Cards/PlaylistImage/PlaylistImage'

import "./GenreShow.css"

export default function GenreShow() {

  const { genre_url } = useParams()
  const history = useHistory()
  const [data, setData] = useState({
    name: null,
    albums: []
  })


  

  useEffect(() => {
   if(genre_url && genre_url.length > 3){
     
    api.get(`/genres/${genre_url}`, {
      validateStatus: s => s === 200
    })
      .then( response => {
        setData(response.data)
      })
      .catch( dataError => {
        history.push("/notfound-error", {
          message: "Genero não encontrado"
        })
      })
   }
  }, [genre_url, history])

  return (
    <section className="container-genre-show">
      <header className="content-genre-show-header">
        <h2>{data.name}</h2>
      </header>
      <article>
        <section className="card card-auto-rows">
          <header className="card-header">
            <div className="card-title">
                Albuns
            </div>
          </header> 
            
            {data.albums.map( albums => (
              <ComponentCardsPlaylistImage
                key={albums.id}
                prefixRoute="/album/"
                data={albums}
                type="album"
              />
              )
            )}

          </section>
      </article>
    </section>
  )
}
