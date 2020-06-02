import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import api from '../../services/Api'
import { secondsToMinutos } from '../../utils/utils'

import ComponentUILinkOfComma from '../../components/UI/LinkOfComma/LinkOfComma'

import imageDefault from '../../assets/img/music/default.jpg'
import { ReactComponent as IconEllipsis, ReactComponent } from '../../assets/img/icons/ellipsis-vertical-outline.svg'
import { ReactComponent as IconMusicalNotes } from '../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Playlist.css"

const Playlist = function () {

  const [playlist, setPlaylist] = useState({
    id: 1,
    name: "",
    photo_url: "",
    owner: {
      id: null,
      ussername: "",
      truename: ""
    },
    tracks: [],
  })
  const { id } = useParams()

  function handlePlay(){

    alert("Clicou na musica")

  }

  useEffect( () => {

    api.get(`/playlists/${id}`, {
      validateStatus: (status) => status === 200
    })
    .then( response => {

      setPlaylist(response.data)

    })
    .catch( dataError => {
      console.log(dataError)
    })

  }, [ id ])

  return (
    <>
      <section className="card">
        
        <header className="card-header">
          <div className="card-title just-content-base">
            <div className="card-flex">

              <img src={ playlist.photo_url ? playlist.photo_url : imageDefault} className="shadow favorite-img" alt={playlist.name}/>
              <div className="card-favorite ml-5">
                <div className="float-favorite-details">


                  <h3>{playlist.name}</h3>
                  { playlist.description !== "" && (
                    <small>{playlist.description}</small>
                  )}

                  <div className="d-block mt-5">

                    <button type="button" 
                      className="btn d-inline-block btn-primary btn-bold btn-spacing"
                    >
                      Play
                    </button>

                    <div className="dropdown">
                      <button className="btn btn-clean btn-circle d-inline-block ">
                        <IconEllipsis height="32px" width="32px" />
                      </button>
                      <div className="dropdown-menu">
                        <a href="#">Editar nome de playlist</a>
                        <a href="#">Compartilhar</a>
                        <a href="#">Excluir</a>
                      </div>
                    </div>

                  </div>
                  <div className="favorite-info">
                    <a 
                      href={`/user/${playlist.owner.username}`} 
                      className="favorite-owner"
                    >{playlist.owner.truename}
                    </a>
                    <span className="ml-2">{playlist.tracks.length} músicas</span>
                    <span className="ml-2">Tocados: {playlist.playcount} vezes</span>
                  </div>

                </div>
              </div>
              {/* End DIV card favorite */}
              
            </div>
          </div>
        </header>
        
        <div className="card-content card-page p-0">
          <div className="separator"></div>
          
          {playlist.tracks.map( track => (
            <div key={track.id} className="songs-list" onClick={handlePlay}>
              <div className="songs-list-icon">
                <IconMusicalNotes className="songs-list-icon-notes" width="22px" height="22px" />
                <IconPlay className="songs-list-icon-play" width="22px" height="22px" />
              </div>
              <div className="songs-list-name">
                <div><a href={`/album/${track.album.id}`}>{track.name}</a></div>
                <div>
                  <ComponentUILinkOfComma 
                    prefixRoute="/author/"
                    data={track.authors}
                  />
                </div>
              </div>
              <div className="songs-list-time py-3 pt-1">
                {secondsToMinutos(track.duration)}
              </div>
            </div>
          ))}

        </div>


      </section>
      {/* End section Card */}
    </>
  )
}

const mapStateToProps = state => ({
  
})
const mapDispatchToProps = dispatch => ({

})

export default connect( mapStateToProps, mapDispatchToProps)(Playlist)