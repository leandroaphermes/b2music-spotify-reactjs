import React, { useState, useEffect } from 'react'

import api from '../../../services/Api'

import ComponentHeader from '../Header'
import ComponentCardAlbumImage from '../../../components/Cards/AlbumImage/AlbumImage'

const Albums = function () {

  const [albums, setAlbums] = useState([])

  useEffect( ()=> {

    api.get("/me/albums", {
      validateStatus: (status) => status === 200
    })
    .then( response => {
      setAlbums(response.data)
    })
    .catch( dataError => {
      console.log(dataError)
    })

  }, [ ])

  return (
    <div>
      <section className="card card-auto-rows">
        <ComponentHeader />

        { albums.map( album => (
          <ComponentCardAlbumImage
            key={album.id}
            prefixRoute="/album/"
            data={album.album}
          />
        ))}
      </section>
    </div>
  )
}

export default Albums