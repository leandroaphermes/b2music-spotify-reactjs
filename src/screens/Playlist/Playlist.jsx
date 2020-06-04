import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsAlert from '../../store/actions/alert'
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
import { ReactComponent as IconHeartDislike } from '../../assets/img/icons/heart-dislike-outline.svg'
import { ReactComponent as IconHeartLike } from '../../assets/img/icons/heart-outline.svg'

import "./Playlist.css"

const Playlist = function ({ status, setStatus, player, setPlayIndex, setNewPlaylist, setAlert }) {

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
  const [favoritePlaylist, setFavoritePlaylist] = useState(false)
  const { id } = useParams()

  function handleFavorite(action){
    
    if(action){
      api.post(`/me/favorites/${id}/playlist`, {
        validateStatus: (status) =>  status === 204 
      })
      .then( response => {
        setFavoritePlaylist(true)
        setAlert({
          status: true,
          type: "success",
          message: "Agora você esta seguindo a playlist"
        })
        setPlaylist({...playlist, total_followers: playlist.total_followers + 1 })
      })
      .catch( dataError => {
        setAlert({
          status: true,
          type: "danger",
          message: "Ocorreu um erro ao seguir a playlist"
        })
      })
    }else{
      api.delete(`/me/favorites/${id}/playlist`, {
        validateStatus: (status) =>  status === 204 
      })
      .then( response => {
        setFavoritePlaylist(false)
        setAlert({
          status: true,
          type: "success",
          message: "Agora você não esta seguindo a playlist"
        })
        setPlaylist({...playlist, total_followers: playlist.total_followers - 1  })
      })
      .catch( dataError => {
        setAlert({
          status: true,
          type: "danger",
          message: "Ocorreu um erro"
        })
      })
    }
  }

  function handlePlayPlaylist(){
        
    if(parseInt(id) === player.id) return setStatus(!status)

    setNewPlaylist(id, "playlist")
  }

  /* Ouvir uma musica especifica da playlist */
  function handlePlay(index){
    if(player.id === parseInt(id) && player.playingIndex === index) return 
    setPlayIndex(id, "playlist", index )
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

    api.get(`/me/favorites/${id}/playlist`, {
      validateStatus: (status) => status === 200
    })
    .then( response => {
      setFavoritePlaylist(response.data.favorite)
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
                      {status && player.id === parseInt(id) ? 
                          (<IconPause width="22px" height="22px" />) 
                        : (<IconPlay width="22px" height="22px" />)
                      }
                    </button>

                    <button type="button" 
                      className="btn btn-clean btn-circle d-inline-block svg-fill-current ml-2"
                      onClick={()=> handleFavorite(!favoritePlaylist)}
                    > 
                      { favoritePlaylist ? 
                          (<IconHeartDislike className="svg-fill-current" width="32px" height="32px" />) 
                        : (<IconHeartLike className="svg-fill-current" width="32px" height="32px" />)
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
          
          {playlist.tracks.map( (track, index) => (
            <div key={track.id} className={`songs-list ${player.id === parseInt(id) && player.playingIndex === index ? `active-hover` :``}`} onClick={()=>handlePlay(index)}>
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
  setPlayIndex: (id, type, index) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type, index)),
  setNewPlaylist: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type)),
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect( mapStateToProps, mapDispatchToProps)(Playlist)