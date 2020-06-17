import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import * as actionsAlert from '../../store/actions/alert'
import * as actionsPlayer from '../../store/actions/player'
import * as actionsThunkPlayer from '../../store/thunk/player'
import api from '../../services/Api'
import { secondsToMinutos } from '../../utils/utils'

/* Components Funcional */
import ComponentButtonsFavorite from '../../components/Buttons/Favorite/Favorite'

/* Components Generico */
import ComponentUILinkOfComma from '../../components/UI/LinkOfComma/LinkOfComma'
import ComponentUIDropdown from '../../components/UI/Dropdown/Dropdown'

import imageDefault from '../../assets/img/music/default.jpg'
import { ReactComponent as IconEllipsis } from '../../assets/img/icons/ellipsis-vertical-outline.svg'
import { ReactComponent as IconMusicalNotes } from '../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Album.css"

const Album = function ({ status, setStatus, player, setPlayByTrack, setNewPlaylist, setAlert }) {

  const [album, setAlbum] = useState({
    id: 0,
    name: "",
    photo_url: "",
    author: {
      id: null,
      name: "",
    },
    tracks: [],
  })
  const { id } = useParams()
  const history = useHistory()


  async function handleActionCopy(){
    await navigator.clipboard.writeText(window.location.href)
    setAlert({
      status: true,
      type: "success",
      message: "Link copiado para sua area de transferencia"
    })
  }


  /* Player */
  function handlePlayAlbum(){
        
    if(parseInt(id) === player.id) return setStatus(!status)

    setNewPlaylist(id, "album")
  }
  /* Ouvir uma musica especifica do album */
  function handlePlayByTrack(track_id){
    if(player.id === parseInt(id) && player.playing.id === track_id) return 
    setPlayByTrack(id, "album", track_id )
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
  }, [ id, history ])

  return (
    <section className="card overflow-visible">

      <header className="card-header">
        <div className="card-title just-content-base">
          <div className="card-flex">

            <img src={ album.photo_url ? album.photo_url : imageDefault} className="shadow favorite-img cover" alt={album.name}/>
            <div className="card-favorite ml-5">
              <div className="float-favorite-details">


                <div className="float-favorite-details-type">{album.categories}</div>
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

                  <ComponentButtonsFavorite
                    type="album"
                    dataID={album.id}
                  />

                  <ComponentUIDropdown
                    button={<IconEllipsis height="32px" width="32px" />}
                  >
                    <ul>
                      <li className="item-list" onClick={handleActionCopy} >Copiar link do album</li>
                    </ul>
                  </ComponentUIDropdown>
                </div>
                <div className="favorite-info">
                  <a 
                    href={`/author/${album.author.id}`} 
                    className="favorite-owner"
                  >{album.author.name}
                  </a>
                  <span className="ml-2">{album.tracks.length} músicas</span>
                  <span className="ml-2">Lançamento: {moment(album.releasedt).format('DD MMM YYYY') }</span>
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
            onDoubleClick={()=>handlePlayByTrack(track.id)}>
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
              <ComponentButtonsFavorite
                type="track"
                dataID={track.id}
              />
              <span className="ml-2">{secondsToMinutos(track.duration)}</span>
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
  setPlayByTrack: (id, type, track_id) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type, track_id)),
  setNewPlaylist: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type)),
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect( mapStateToProps, mapDispatchToProps)(Album)