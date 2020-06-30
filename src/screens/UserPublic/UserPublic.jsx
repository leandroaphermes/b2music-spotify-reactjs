import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Moment from 'moment'


import api from '../../services/Api'

import ComponentCardsPlaylistsImage from '../../components/Cards/PlaylistImage/PlaylistImage'

import { ReactComponent as IconUserDefault } from '../../assets/img/icons/person-outline.svg'

import "./UserPublic.css"

export default function UserPublic() {

  const { username } = useParams()
  const [data, setData] = useState({
    truename: null,
    dtcreated_at: null,
    playlists: [],
  })

  useEffect(() => {
    
    api.get(`/users/${username}`, {
      validateStatus: s => s === 200
    })
      .then( response => {
        setData(response.data)
      })
      .catch( dataError => {

      })

  }, [ username ])

  return (
    <div className="container-user-public">
      <div className="content-user-header">
        { data.photo_url ? (
          <img className="content-user-header-photo shadow" src={data.photo_url} alt=""/>
        ) : (
          <IconUserDefault className="content-user-header-photo-svg" />
        )}
        <div className="content-user-header-title">
          <span>Perfil</span>
          <h2>{data.truename}</h2>
          <div className="content-user-header-title-info">
            <small>{data.playlists.length} Playlists</small>
            <small>Entrou {Moment(data.dtcreated_at).format('DD MMM YYYY')}</small>
          </div>
        </div>
      </div>
      <div className="content-user-playlist">
        <section className="card card-auto-rows">
          <header className="card-header">
            <div className="card-title">
                Playlists
            </div>
          </header> 

          {data.playlists.map( playlist => (
            <ComponentCardsPlaylistsImage
              key={playlist.id}
              prefixRoute="/playlist/"
              data={playlist}
            />
            )
          )}

        </section>
      </div>
    </div>
  )
}
