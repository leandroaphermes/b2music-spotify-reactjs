import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsPlayer from '../../store/actions/player'
import * as actionsThunkPlayer from '../../store/thunk/player'
import api from '../../services/Api'
import { secondsToMinutos } from '../../utils/utils'

import ComponentUILinkOfComma from '../../components/UI/LinkOfComma/LinkOfComma'
import ComponentUIDropdown from '../../components/UI/Dropdown/Dropdown'

import imageDefault from '../../assets/img/music/default.jpg'
import { ReactComponent as IconEllipsis } from '../../assets/img/icons/ellipsis-vertical-outline.svg'
import { ReactComponent as IconMusicalNotes } from '../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Playlist.css"

const Playlist = function ({ status, setStatus, player, setPlayer }) {

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

  function handlePlayPlaylist(){
    setPlayer(id, "playlist")
    alert("Foi só deu bugs")
  }

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
                      onClick={handlePlayPlaylist}
                    > 
                      {status && player.id === id ? 
                          (<IconPause width="22px" height="22px" />) 
                        : (<IconPlay width="22px" height="22px" />)
                      }
                      
                    </button>


                    <ComponentUIDropdown
                      button={<IconEllipsis height="32px" width="32px" />}
                    >
                      <button type="button" className="btn btn-block btn-clean" >Editar nome de playlist</button>
                      <button type="button" className="btn btn-block btn-clean" >Compartilhar</button>
                      <button type="button" className="btn btn-block btn-clean" >Excluir</button>
                    </ComponentUIDropdown>

                  </div>
                  <div className="favorite-info">
                    <a 
                      href={`/user/${playlist.owner.username}`} 
                      className="favorite-owner"
                    >{playlist.owner.truename}
                    </a>
                    <span className="ml-2">{playlist.tracks.length} músicas</span>
                    <span className="ml-2">Seguidores: {playlist.total_followers}</span>
                    <span className="ml-2">Ouvidos: {playlist.playcount} vezes</span>
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
  status: state.player.status,
  player: state.player.player
})
const mapDispatchToProps = dispatch => ({
  setStatus: (dataStatus) => dispatch(actionsPlayer.status(dataStatus)),
  setPlayer: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type))
})

export default connect( mapStateToProps, mapDispatchToProps)(Playlist)