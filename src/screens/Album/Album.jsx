import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import * as actionsAlert from '../../store/actions/alert'
import * as actionsPlayer from '../../store/actions/player'
import * as actionsThunkPlayer from '../../store/thunk/player'
import api from '../../services/Api'

/* Components Funcional */
import ComponentButtonsFavorite from '../../components/Buttons/Favorite/Favorite'

/* Components Generico */
import ComponentUISongListMinute from '../../components/UI/SongListMinute/SongListMinute'
import ComponentUIDropdown from '../../components/UI/Dropdown/Dropdown'

import imageDefault from '../../assets/img/music/default.jpg'
import { ReactComponent as IconEllipsis } from '../../assets/img/icons/ellipsis-vertical-outline.svg'
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
                  <Link 
                    to={`/author/${album.author.id}`} 
                    className="favorite-owner"
                  >{album.author.name}
                  </Link>
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
            <ComponentUISongListMinute
              key={track.id}
              idplayer={id}
              type_list="album"
              track={track}
              index={index}
              player={player}
              handleDoubleClick={handlePlayByTrack}
           />
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