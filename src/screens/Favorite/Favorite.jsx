import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsAlert from '../../store/actions/alert'
import * as actionsPlayer from '../../store/actions/player'
import * as actionsThunkPlayer from '../../store/thunk/player'
import api from '../../services/Api'
import { secondsToMinutos } from '../../utils/utils'

/* Components Funcional */
import ComponentButtonsFavorite from '../../components/Buttons/Favorite/Favorite'

/* Components Generico */
import ComponentUILinkOfComma from '../../components/UI/LinkOfComma/LinkOfComma'

import imageDefault from '../../assets/img/music/default.jpg'

import { ReactComponent as IconMusicalNotes } from '../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Favorite.css"

const Favorite = function ({ status, setStatus, player, setPlayByTrack, setNewPlaylist, setAlert, session }) {

  const [favorites, setFavorites] = useState([])
  const history = useHistory()

  /* Player */
  function handlePlayAlbum(){
        
    if(player.id === 0) return setStatus(!status)

    setNewPlaylist( 0, "favorite")
  }
  /* Ouvir uma musica especifica do album */
  function handlePlayByTrack(track_id){
    if(player.id === 0 && player.playing.id === track_id) return 
    setPlayByTrack(0, "favorite", track_id )
  }

  useEffect( () => {

    api.get(`/me/favorites`, {
      validateStatus: (s) => s === 200
    })
    .then( response => {
      setFavorites(response.data)
    })
    .catch( dataError => {
      history.push("/notfound-error", {
        message: "Musicas favoritas não encontrada"
      })
    })
  }, [ history ])

  return (
    <section className="card overflow-visible">

      <header className="card-header">
        <div className="card-title just-content-base">
          <div className="card-flex">

            <img src={imageDefault} className="shadow favorite-img cover" alt="Favoritos"/>
            <div className="card-favorite ml-5">
              <div className="float-favorite-details">


                <div className="float-favorite-details-type">Playlist</div>
                <h3>Favoritos</h3>

                <div className="d-block mt-5">

                  <button type="button" 
                    className="btn d-inline-block btn-primary btn-bold btn-spacing"
                    onClick={handlePlayAlbum}
                    disabled={!favorites.length}
                  > 
                    {status && player.id === 0 ? 
                        (<IconPause width="22px" height="22px" />) 
                      : (<IconPlay width="22px" height="22px" />)
                    }
                  </button>

                </div>
                <div className="favorite-info">
                  <Link 
                    to={`/user/${session.username}`} 
                    className="favorite-owner"
                  >
                    {session.username}
                  </Link>
                  <span className="ml-2">{favorites.length} músicas</span>
                </div>

              </div>
            </div>
            {/* End DIV card favorite */}
            
          </div>
        </div>
      </header>
      
      <div className="card-content card-page p-0">
        <div className="separator"></div>
        
        { favorites.length ? (
          favorites.map( ( row, index) => (
          <div 
            key={row.id} 
            className={`songs-list ${player.playing.id === parseInt(row.track.id) ? `active-hover` :``}`} 
            onDoubleClick={()=>handlePlayByTrack(row.track.id)}>
            <div className="songs-list-icon">
              <IconMusicalNotes className="songs-list-icon-notes" width="22px" height="22px" />
              <IconPlay className="songs-list-icon-play" width="22px" height="22px" />
            </div>
            <div className="songs-list-name">
              <div>
                <Link to={`/album/${row.track.id}`}>
                  {row.track.name}
                </Link>
              </div>
              <div>
                <ComponentUILinkOfComma 
                  prefixRoute="/author/"
                  data={row.track.authors}
                />
              </div>
            </div>
            <div className="songs-list-time py-3 pt-1">
              <ComponentButtonsFavorite
                type="track"
                dataID={row.track.id}
              />
              <span className="ml-2">{secondsToMinutos(row.track.duration)}</span>
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
  session: state.session.user,
  status: state.player.status,
  player: state.player.player
})
const mapDispatchToProps = dispatch => ({
  setStatus: (dataStatus) => dispatch(actionsPlayer.status(dataStatus)),
  setPlayByTrack: (id, type, track_id) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type, track_id)),
  setNewPlaylist: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type)),
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect( mapStateToProps, mapDispatchToProps)(Favorite)