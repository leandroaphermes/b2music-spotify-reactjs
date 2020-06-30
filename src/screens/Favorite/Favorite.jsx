import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsAlert from '../../store/actions/alert'
import * as actionsPlayer from '../../store/actions/player'
import * as actionsThunkPlayer from '../../store/thunk/player'
import api from '../../services/Api'

/* Components Generico */
import ComponentUISongListMinute from '../../components/UI/SongListMinute/SongListMinute'

import imageDefault from '../../assets/img/music/default.jpg'

import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Favorite.css"

const Favorite = function ({ status, setStatus, player, setPlayByTrack, setNewPlaylist, session }) {

  const [favorites, setFavorites] = useState([])
  const history = useHistory()

  /* Player */
  function handlePlayAlbum(){
        
    if(player.type_list === 'favorite') return setStatus(!status)

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
          <ComponentUISongListMinute
            key={row.track.id}
            idplayer={0}
            type_list="favorite"
            track={row.track}
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