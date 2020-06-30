import React, { useState, useEffect, memo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsAlert from '../../store/actions/alert'
import * as actionsPlayer from '../../store/actions/player'
import * as actionsThunkPlayer from '../../store/thunk/player'
import { removeTrackInPlaylist } from '../../services/function/playlist'
import api from '../../services/Api'

/* Components Funcional */
import ComponentButtonsFavorite from '../../components/Buttons/Favorite/Favorite'
import ComponentCardsSearchAddTrack from '../../components/Cards/SearchAddTrack/SearchAddTrack'
import Form from './Form/Form'

/* Components Generico */
import ComponentUISongListMinute from '../../components/UI/SongListMinute/SongListMinute'
import ComponentUIDropdown from '../../components/UI/Dropdown/Dropdown'
import ComponentUIModal from '../../components/UI/Modal/Modal'

import imageDefault from '../../assets/img/music/default.jpg'
import { ReactComponent as IconEllipsis } from '../../assets/img/icons/ellipsis-vertical-outline.svg'
import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Playlist.css"

const Playlist = function ({ status, setStatus, player, setPlayByTrack, setNewPlaylist, setAlert }) {

  const [playlist, setPlaylist] = useState({
    id: 0,
    name: "",
    photo_url: "",
    owner: {
      id: null,
      ussername: "",
      truename: ""
    },
    tracks: [],
  })
  const [modalEdit, setModalEdit] = useState(false)
  const [modalAddTrack, setModalAddTrack] = useState(false)
  const { id } = useParams()
  const history = useHistory()


/* Options Playlist */
function handleActionEdit() { 
  setModalEdit(true)
}
async function handleActionCopy(){
  await navigator.clipboard.writeText(window.location.href)
  setAlert({
    status: true,
    type: "success",
    message: "Link copiado para sua area de transferencia"
  })
}
function handleActionDelete(){
  
  api.delete(`/playlists/${id}`, {
    validateStatus: (s) => s === 204
  })
  .then( response => {
    history.push(`/my-library/playlists`)
  })
  .catch( dataError => {
    setAlert({
      status: true,
      type: "danger",
      message: dataError.response.data.message
    })
  })

}


/* Btn Add Track */
function handleClickBtnAddTrack(){
  setModalAddTrack(!modalAddTrack)
}
function handleClickBtnRemoveTrack(track){

  removeTrackInPlaylist(playlist.tracks, playlist.id, track)
  .then(() => {
  
    setPlaylist({...playlist, tracks: playlist.tracks.filter( track_item => track_item.id !== track.id )})
    
  })
  .catch()


}

  /* Player */
  function handlePlayPlaylist(){
        
    if(parseInt(id) === player.id) return setStatus(!status)

    setNewPlaylist(id, "playlist")
  }
  /* Ouvir uma musica especifica da playlist */
  function handlePlayByTrack(track_id){
    if(player.id === parseInt(id) && player.playing.id === track_id) return 
    setPlayByTrack(id, "playlist", track_id )
  }

  useEffect( () => {

    api.get(`/playlists/${id}`, {
      validateStatus: (s) => s === 200
    })
    .then( response => {
      setPlaylist(response.data)
    })
    .catch( dataError => {
      history.push("/notfound-error", {
        message: "Playlist não encontrada"
      })
    })

  }, [ id, history ])

  return (
    <section className="card overflow-visible">

      <ComponentUIModal
        title="Editar Playlist"
        visible={modalEdit}
        onToggleModal={ () => setModalEdit(!modalEdit)}
      >
        <Form
          data={playlist}
          setData={(data) => setPlaylist(data)}
          onToggleModal={ () => setModalEdit(!modalEdit)}
        />
      </ComponentUIModal>

      <ComponentUIModal
        title="Adicionar Musicas"
        visible={modalAddTrack}
        onToggleModal={ ()=> setModalAddTrack(!modalAddTrack)}
      >
        <ComponentCardsSearchAddTrack
          playlist={playlist}
        />
      </ComponentUIModal>

      <header className="card-header">
        <div className="card-title just-content-base">
          <div className="card-flex">

            <img src={ playlist.photo_url ? playlist.photo_url : imageDefault} className="shadow favorite-img cover" alt={playlist.name}/>
            <div className="card-favorite ml-5">
              <div className="float-favorite-details">


                <div className="float-favorite-details-type">Playlist</div>
                <h3>{playlist.name}</h3>
                { playlist.description !== "" && (
                  <small>{playlist.description}</small>
                )}

                <div className="d-block mt-5">

                  <button type="button" 
                    className="btn d-inline-block btn-primary btn-bold btn-spacing"
                    onClick={handlePlayPlaylist}
                    disabled={!playlist.tracks.length}
                  > 
                    {status && player.id === parseInt(id) ? 
                        (<IconPause width="22px" height="22px" />) 
                      : (<IconPlay width="22px" height="22px" />)
                    }
                  </button>
                  
                  { playlist.id > 0 && (
                    <ComponentButtonsFavorite 
                      type="playlist"
                      dataID={playlist.id}
                      onAddFavorite={ () =>  setPlaylist({...playlist, total_followers: playlist.total_followers + 1 }) }
                      onRemoveFavorite={ () => setPlaylist({...playlist, total_followers: playlist.total_followers - 1 }) }
                    />
                  )}

                  <ComponentUIDropdown
                    button={<IconEllipsis height="32px" width="32px" />}
                  >
                    <ul>
                      <li className="item-list" onClick={handleActionEdit} >Editar playlist</li>
                      <li className="item-list" onClick={handleActionCopy} >Copiar link da playlist</li>
                      <li className="item-list" onClick={handleActionDelete} >Apagar</li>
                    </ul>
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
        
        { playlist.tracks.length ? (
          playlist.tracks.map( (track, index) => (
          <ComponentUISongListMinute
           key={track.id}
           idplayer={id}
           type_list="playlist"
           track={track}
           index={index}
           player={player}
           handleDoubleClick={handlePlayByTrack}
          >
            <ComponentUIDropdown
              button={<IconEllipsis width="22px" height="22px" />}
              buttonSize="sm"
              dropDirection="left"
            >
              <ul>
                <li className="item-list" onClick={() => handleClickBtnRemoveTrack(track)}>Remover da playlist</li>
              </ul>
            </ComponentUIDropdown>
          </ComponentUISongListMinute>
        ))
        ) : (
          <div className="text-center">
            <p>Não há musicas</p>
          </div>
        ) }

        
        <div className="text-center">
          <button type="button" className="btn btn-primary mt-5" onClick={handleClickBtnAddTrack} >
            Adicionar musicas a playlist
          </button>
        </div>

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
  setPlayByTrack: (id, type, index) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type, index)),
  setNewPlaylist: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type)),
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect( mapStateToProps, mapDispatchToProps)(memo(Playlist))