import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
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

import "./Album.css"

const Album = function ({ status, setStatus, player, setPlayIndex, setNewPlaylist, setAlert }) {

  const [album, setAlbum] = useState({
    id: 1,
    name: "",
    photo_url: "",
    author: {
      id: null,
      name: "",
    },
    tracks: [],
  })
  const [favoriteAlbum, setFavoriteAlbum] = useState(false)
  const { id } = useParams()
  const history = useHistory()



  /* Player */
  function handleFavorite(action){
    
    if(action){
      api.post(`/me/favorites/${id}/album`, {
        validateStatus: (status) =>  status === 204 
      })
      .then( response => {
        favoriteAlbum(true)
        setAlert({
          status: true,
          type: "success",
          message: "Agora você esta seguindo o album"
        })
      })
      .catch( dataError => {
        setAlert({
          status: true,
          type: "danger",
          message: "Ocorreu um erro ao seguir o album"
        })
      })
    }else{
      api.delete(`/me/favorites/${id}/album`, {
        validateStatus: (status) =>  status === 204 
      })
      .then( response => {
        setFavoriteAlbum(false)
        setAlert({
          status: true,
          type: "success",
          message: "Agora você não esta seguindo o album"
        })
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
  function handlePlayAlbum(){
        
    if(parseInt(id) === player.id) return setStatus(!status)

    setNewPlaylist(id, "album")
  }
  /* Ouvir uma musica especifica do album */
  function handlePlay(index){
    if(player.id === parseInt(id) && player.playingIndex === index) return 
    setPlayIndex(id, "album", index )
  }

  useEffect( () => {

    api.get(`/albums/${id}`, {
      validateStatus: (s) => s === 200
    })
    .then( response => {
      setAlbum(response.data)
    })
    .catch( dataError => {
      history.push("/notfound-error", {
        message: "Album não encontrado"
      })
    })

    api.get(`/me/favorites/${id}/album`, {
      validateStatus: (s) => s === 200
    })
    .then( response => {
      setFavoriteAlbum(response.data.favorite)
    })
    .catch( dataError => {
      console.log(dataError)
    })

  }, [ id, history ])

  return (
    <section className="card overflow-visible">

      <header className="card-header">
        <div className="card-title just-content-base">
          <div className="card-flex">

            <img src={ album.photo_url ? album.photo_url : imageDefault} className="shadow favorite-img cover" alt={album.name}/>
            <div className="card-favorite ml-5">
              <div className="float-favorite-details">


                <h3>{album.name}</h3>
                { album.description !== "" && (
                  <small>{album.description}</small>
                )}

                <div className="d-block mt-5">

                  <button type="button" 
                    className="btn d-inline-block btn-primary btn-bold btn-spacing"
                    onClick={handlePlayAlbum}
                    disabled={!album.tracks.length}
                  > 
                    {status && player.id === parseInt(id) ? 
                        (<IconPause width="22px" height="22px" />) 
                      : (<IconPlay width="22px" height="22px" />)
                    }
                  </button>

                  <button type="button" 
                    className="btn btn-clean btn-circle d-inline-block svg-fill-current ml-2"
                    onClick={()=> handleFavorite(!favoriteAlbum)}
                  > 
                    { favoriteAlbum ? 
                        (<IconHeartDislike className="svg-fill-current" width="32px" height="32px" />) 
                      : (<IconHeartLike className="svg-fill-current" width="32px" height="32px" />)
                    }
                  </button>


                  <ComponentUIDropdown
                    button={<IconEllipsis height="32px" width="32px" />}
                  >
                    <ul>
                      <li className="item-list" >Copiar link do album</li>
                    </ul>
                  </ComponentUIDropdown>
                </div>
                <div className="favorite-info">
                  <a 
                    href={`/user/${album.author.id}`} 
                    className="favorite-owner"
                  >{album.author.name}
                  </a>
                  <span className="ml-2">{album.tracks.length} músicas</span>
                  <span className="ml-2">Lançamento: {album.releasedt }</span>
                </div>

              </div>
            </div>
            {/* End DIV card favorite */}
            
          </div>
        </div>
      </header>
      
      <div className="card-content card-page p-0">
        <div className="separator"></div>
        
        { album.tracks.length ? (
          album.tracks.map( (track, index) => (
          <div 
            key={track.id} 
            className={`songs-list ${player.id === parseInt(id) && player.playingIndex === index ? `active-hover` :``}`} 
            onDoubleClick={()=>handlePlay(index)}>
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
              <ComponentUIDropdown
                button={<IconEllipsis width="22px" height="22px" />}
                buttonSize="sm"
                dropDirection="left"
              >
                <ul>
                  <li className="item-list">Adicionar no Favoritos</li>
                </ul>
              </ComponentUIDropdown>

              {secondsToMinutos(track.duration)}
            </div>
          </div>
        ))
        ) : (
          <div className="text-center">
            <p>Não há musicas</p>
          </div>
        ) }
      </div>


    </section>
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

export default connect( mapStateToProps, mapDispatchToProps)(Album)